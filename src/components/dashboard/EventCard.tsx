
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, DollarSign, Edit, Trash2 } from "lucide-react";
import { Event } from "@/types/event";
import { formatDate, getTotalTickets, getLowestPrice } from "@/utils/eventUtils";

interface EventCardProps {
  event: Event;
  onDelete: (eventId: string) => void;
}

export const EventCard = ({ event, onDelete }: EventCardProps) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
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
          {Array.isArray(event.ticket_tiers) && event.ticket_tiers.length > 0 && (
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
            onClick={() => onDelete(event.id)}
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
