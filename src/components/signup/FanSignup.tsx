
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const FanSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    age: "",
    email: "",
    eventTypes: []
  });

  const eventTypeOptions = [
    "Music Concerts",
    "Sports Events", 
    "Comedy Shows",
    "Theatre & Arts",
    "Festivals",
    "Conferences",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fan signup data:", formData);
    // Handle form submission
  };

  return (
    <section id="fan-signup" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border-white/10 p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Join as a Fan</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fan-name" className="text-white">Name</Label>
              <Input
                id="fan-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="fan-location" className="text-white">Location</Label>
              <Input
                id="fan-location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Your city/country"
              />
            </div>
            
            <div>
              <Label htmlFor="fan-age" className="text-white">Age</Label>
              <Input
                id="fan-age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Your age"
              />
            </div>
            
            <div>
              <Label htmlFor="fan-email" className="text-white">Email</Label>
              <Input
                id="fan-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <Label className="text-white mb-3 block">What type of events do you like?</Label>
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
            
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Create Fan Account
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
