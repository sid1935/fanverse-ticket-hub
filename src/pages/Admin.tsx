
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Users, UserCheck, Calendar } from "lucide-react";

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  user_type: string;
  created_at: string;
}

const Admin = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "fan" | "organizer">("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWaitlistEntries();
  }, []);

  const fetchWaitlistEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch waitlist entries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || entry.user_type === filter;
    return matchesSearch && matchesFilter;
  });

  const exportData = () => {
    const csvContent = [
      ["Name", "Email", "User Type", "Date Joined"],
      ...filteredEntries.map(entry => [
        entry.name,
        entry.email,
        entry.user_type,
        new Date(entry.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "waitlist-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: entries.length,
    fans: entries.filter(e => e.user_type === "fan").length,
    organizers: entries.filter(e => e.user_type === "organizer").length,
    thisWeek: entries.filter(e => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(e.created_at) > weekAgo;
    }).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your ReXDeX waitlist</p>
          </div>
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="border-white/20 text-white"
          >
            Back to Site
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="flex items-center space-x-3">
              <Users className="text-blue-400 w-8 h-8" />
              <div>
                <p className="text-gray-400 text-sm">Total Signups</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="flex items-center space-x-3">
              <UserCheck className="text-purple-400 w-8 h-8" />
              <div>
                <p className="text-gray-400 text-sm">Fans</p>
                <p className="text-2xl font-bold text-white">{stats.fans}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="text-green-400 w-8 h-8" />
              <div>
                <p className="text-gray-400 text-sm">Organizers</p>
                <p className="text-2xl font-bold text-white">{stats.organizers}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">7d</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">This Week</p>
                <p className="text-2xl font-bold text-white">{stats.thisWeek}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  onClick={() => setFilter("all")}
                  size="sm"
                  className={filter === "all" ? "" : "border-white/20 text-white"}
                >
                  All
                </Button>
                <Button
                  variant={filter === "fan" ? "default" : "outline"}
                  onClick={() => setFilter("fan")}
                  size="sm"
                  className={filter === "fan" ? "" : "border-white/20 text-white"}
                >
                  Fans
                </Button>
                <Button
                  variant={filter === "organizer" ? "default" : "outline"}
                  onClick={() => setFilter("organizer")}
                  size="sm"
                  className={filter === "organizer" ? "" : "border-white/20 text-white"}
                >
                  Organizers
                </Button>
              </div>
            </div>
            
            <Button onClick={exportData} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </Card>

        {/* Entries List */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Waitlist Entries ({filteredEntries.length})
            </h2>
            
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No entries found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{entry.name}</h3>
                      <p className="text-gray-400 text-sm">{entry.email}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={entry.user_type === "organizer" ? "default" : "secondary"}
                        className={entry.user_type === "organizer" 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "bg-blue-600 hover:bg-blue-700"
                        }
                      >
                        {entry.user_type}
                      </Badge>
                      
                      <p className="text-gray-400 text-sm">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
