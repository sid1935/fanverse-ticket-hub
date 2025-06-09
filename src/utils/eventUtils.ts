
import { Json } from "@/integrations/supabase/types";
import { TicketTier } from "@/types/event";

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getTotalTickets = (ticketTiers: Json) => {
  if (!Array.isArray(ticketTiers)) return 0;
  return (ticketTiers as unknown as TicketTier[]).reduce((total, tier) => total + (tier.quantity || 0), 0);
};

export const getLowestPrice = (ticketTiers: Json) => {
  if (!Array.isArray(ticketTiers) || ticketTiers.length === 0) return 0;
  return Math.min(...(ticketTiers as unknown as TicketTier[]).map(tier => tier.price || 0));
};
