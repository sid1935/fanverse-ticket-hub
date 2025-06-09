
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { Event } from "@/types/event";
import { formatDate, getTotalTickets, getLowestPrice } from "@/utils/eventUtils";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (id && user) {
      fetchEvent();
    }
  }, [id, user]);

  const fetchEvent = async () => {
    if (!id || !user) return;

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch event details",
          variant: "destructive"
        });
        navigate("/dashboard");
      } else {
        setEvent(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch event details",
        variant: "destructive"
      });
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="text-white hover:text-gray-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Image */}
          {event.image_url && (
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Event Details */}
          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <h1 className="text-3xl font-bold text-white mb-4">{event.title}</h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>{formatDate(event.start_time)} - {formatDate(event.end_time)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 mr-3" />
                  <span>{getTotalTickets(event.ticket_tiers)} tickets available</span>
                </div>
                {Array.isArray(event.ticket_tiers) && event.ticket_tiers.length > 0 && (
                  <div className="flex items-center text-gray-300">
                    <DollarSign className="w-5 h-5 mr-3" />
                    <span>From ${getLowestPrice(event.ticket_tiers)}</span>
                  </div>
                )}
              </div>

              {event.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Edit Event
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                  View Analytics
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
