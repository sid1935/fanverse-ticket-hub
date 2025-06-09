
import { Json } from "@/integrations/supabase/types";

export interface TicketTier {
  tier: string;
  price: number;
  quantity: number;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  venue: string;
  start_time: string;
  end_time: string;
  image_url: string | null;
  ticket_tiers: Json;
  created_at: string;
}
