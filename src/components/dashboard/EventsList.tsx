
import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "./EventCard";
import { EmptyEventsState } from "./EmptyEventsState";

export const EventsList = () => {
  const { events, loading, deleteEvent } = useEvents();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading events...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyEventsState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Events</h2>
        <p className="text-gray-300">{events.length} event{events.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={deleteEvent}
          />
        ))}
      </div>
    </div>
  );
};
