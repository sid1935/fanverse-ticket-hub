
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const OrganizerSignup = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: "",
    age: "",
    eventTypes: []
  });

  const eventTypeOptions = [
    "Music Concerts",
    "Sports Events", 
    "Comedy Shows",
    "Theatre & Arts",
    "Festivals",
    "Conferences",
    "Corporate Events",
    "Other"
  ];

  const handleEventTypeChange = (eventType: string) => {
    setFormData(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(eventType)
        ? prev.eventTypes.filter(type => type !== eventType)
        : [...prev.eventTypes, eventType]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to update your profile.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          role: 'organizer',
          location: formData.location,
          age: parseInt(formData.age),
          event_types: formData.eventTypes,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profile updated!",
          description: "Your organizer profile has been updated successfully."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return (
      <section id="organizer-signup" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Become an Organizer</h2>
            <p className="text-center text-gray-300 mb-6">
              Please <a href="/auth" className="text-blue-400 hover:text-blue-300">sign in</a> to create your organizer profile.
            </p>
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              <a href="/auth">Sign In / Sign Up</a>
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="organizer-signup" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border-white/10 p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Complete Your Organizer Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="org-location" className="text-white">Location</Label>
              <Input
                id="org-location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Your city/country"
              />
            </div>
            
            <div>
              <Label htmlFor="org-age" className="text-white">Age</Label>
              <Input
                id="org-age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Your age"
              />
            </div>
            
            <div>
              <Label className="text-white mb-3 block">What type of events do you want to publish?</Label>
              <div className="grid grid-cols-2 gap-3">
                {eventTypeOptions.map((eventType) => (
                  <label key={eventType} className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.eventTypes.includes(eventType)}
                      onChange={() => handleEventTypeChange(eventType)}
                      className="rounded border-white/20"
                    />
                    <span className="text-sm">{eventType}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              Update Organizer Profile
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
