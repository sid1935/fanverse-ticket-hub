
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Upload } from "lucide-react";

interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface EventFormData {
  title: string;
  description: string;
  venue: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export const CreateEventForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([]);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EventFormData>();

  const addTicketTier = () => {
    const newTier: TicketTier = {
      id: Date.now().toString(),
      name: "",
      price: 0,
      quantity: 0
    };
    setTicketTiers([...ticketTiers, newTier]);
  };

  const removeTicketTier = (id: string) => {
    setTicketTiers(ticketTiers.filter(tier => tier.id !== id));
  };

  const updateTicketTier = (id: string, field: keyof Omit<TicketTier, 'id'>, value: string | number) => {
    setTicketTiers(ticketTiers.map(tier => 
      tier.id === id ? { ...tier, [field]: value } : tier
    ));
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadBanner = async (): Promise<string | null> => {
    if (!bannerFile || !user) return null;

    const fileExt = bannerFile.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('event-banners')
      .upload(fileName, bannerFile);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('event-banners')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const onSubmit = async (data: EventFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create an event",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Upload banner if provided
      let imageUrl = null;
      if (bannerFile) {
        imageUrl = await uploadBanner();
        if (!imageUrl) {
          toast({
            title: "Error",
            description: "Failed to upload banner image",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
      }

      // Combine date and time for start and end timestamps
      const startDateTime = new Date(`${data.startDate}T${data.startTime}`).toISOString();
      const endDateTime = new Date(`${data.endDate}T${data.endTime}`).toISOString();

      // Create event in database
      const { error } = await supabase
        .from('events')
        .insert({
          organizer_id: user.id,
          title: data.title,
          description: data.description,
          venue: data.venue,
          start_time: startDateTime,
          end_time: endDateTime,
          image_url: imageUrl,
          ticket_tiers: ticketTiers.map(tier => ({
            name: tier.name,
            price: tier.price,
            quantity: tier.quantity
          }))
        });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success!",
          description: "Event created successfully"
        });
        // Reset form
        reset();
        setTicketTiers([]);
        setBannerFile(null);
        setBannerPreview(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Event</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Event Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title" className="text-white">Event Title *</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter event title"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="venue" className="text-white">Venue *</Label>
            <Input
              id="venue"
              {...register("venue", { required: "Venue is required" })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Venue name and address"
            />
            {errors.venue && <p className="text-red-400 text-sm mt-1">{errors.venue.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-white">Event Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Describe your event..."
            rows={4}
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="text-white">Start Date & Time *</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                {...register("startDate", { required: "Start date is required" })}
                className="bg-white/10 border-white/20 text-white"
              />
              <Input
                type="time"
                {...register("startTime", { required: "Start time is required" })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            {(errors.startDate || errors.startTime) && (
              <p className="text-red-400 text-sm">Start date and time are required</p>
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-white">End Date & Time *</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                {...register("endDate", { required: "End date is required" })}
                className="bg-white/10 border-white/20 text-white"
              />
              <Input
                type="time"
                {...register("endTime", { required: "End time is required" })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            {(errors.endDate || errors.endTime) && (
              <p className="text-red-400 text-sm">End date and time are required</p>
            )}
          </div>
        </div>

        {/* Banner Upload */}
        <div>
          <Label className="text-white">Event Banner</Label>
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="hidden"
              id="banner-upload"
            />
            <label
              htmlFor="banner-upload"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors"
            >
              {bannerPreview ? (
                <img src={bannerPreview} alt="Banner preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Click to upload banner image</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Ticket Tiers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-white">Ticket Tiers</Label>
            <Button
              type="button"
              onClick={addTicketTier}
              className="bg-green-500 hover:bg-green-600"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Tier
            </Button>
          </div>

          <div className="space-y-4">
            {ticketTiers.map((tier) => (
              <div key={tier.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg">
                <Input
                  placeholder="Tier name (e.g., VIP)"
                  value={tier.name}
                  onChange={(e) => updateTicketTier(tier.id, 'name', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={tier.price || ''}
                  onChange={(e) => updateTicketTier(tier.id, 'price', parseFloat(e.target.value) || 0)}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={tier.quantity || ''}
                  onChange={(e) => updateTicketTier(tier.id, 'quantity', parseInt(e.target.value) || 0)}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button
                  type="button"
                  onClick={() => removeTicketTier(tier.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setTicketTiers([]);
              setBannerFile(null);
              setBannerPreview(null);
            }}
            className="border-white/20 text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
