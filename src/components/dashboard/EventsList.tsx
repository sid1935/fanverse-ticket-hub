
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Users, DollarSign, Edit, Trash2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  start_time: string;
  end_time: string;
  image_url: string;
  ticket_tiers: any[];
  created_at: string;
}

export const EventsList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch events",
          variant: "destructive"
        });
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete event",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Event deleted successfully"
        });
        fetchEvents(); // Refresh the list
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalTickets = (ticketTiers: any[]) => {
    return ticketTiers.reduce((total, tier) => total + (tier.quantity || 0), 0);
  };

  const getLowestPrice = (ticketTiers: any[]) => {
    if (!ticketTiers.length) return 0;
    return Math.min(...ticketTiers.map(tier => tier.price || 0));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading events...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No Events Yet</h2>
        <p className="text-gray-300 mb-6">You haven't created any events. Start by creating your first event!</p>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          Create Your First Event
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Events</h2>
        <p className="text-gray-300">{events.length} event{events.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
            {event.image_url && (
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={event.image_url} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(event.start_time)}
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.venue}
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  {getTotalTickets(event.ticket_tiers)} tickets available
                </div>
                {event.ticket_tiers.length > 0 && (
                  <div className="flex items-center text-gray-300 text-sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    From ${getLowestPrice(event.ticket_tiers)}
                  </div>
                )}
              </div>

              {event.description && (
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
              )}

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/5"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteEvent(event.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
