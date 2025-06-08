
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, BarChart3 } from "lucide-react";
import { CreateEventForm } from "@/components/dashboard/CreateEventForm";
import { EventsList } from "@/components/dashboard/EventsList";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'events'>('overview');

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Organizer Dashboard</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'create'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Event</span>
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'events'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Events</span>
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-gray-300 text-sm">Total Events</p>
                        <p className="text-2xl font-bold text-white">0</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                    <div className="flex items-center space-x-4">
                      <Users className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-gray-300 text-sm">Tickets Sold</p>
                        <p className="text-2xl font-bold text-white">0</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                    <div className="flex items-center space-x-4">
                      <BarChart3 className="w-8 h-8 text-purple-400" />
                      <div>
                        <p className="text-gray-300 text-sm">Total Revenue</p>
                        <p className="text-2xl font-bold text-white">$0</p>
                      </div>
                    </div>
                  </Card>
                </div>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      onClick={() => setActiveTab('create')}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Event
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('events')}
                      className="border-white/20 text-white hover:bg-white/5"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      View All Events
                    </Button>
                  </div>
                </Card>
              </div>
            )}
            
            {activeTab === 'create' && <CreateEventForm />}
            {activeTab === 'events' && <EventsList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
