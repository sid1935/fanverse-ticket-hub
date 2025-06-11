
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WaitlistPageProps {
  userType?: "fan" | "organizer";
}

const Waitlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"fan" | "organizer">("fan");
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get user type from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get("type") as "fan" | "organizer" | null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            name,
            email,
            user_type: typeFromUrl || userType
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already registered",
            description: "This email is already on our waitlist!",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to join waitlist. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been added to our waitlist. We'll be in touch soon!"
        });
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-sm border-white/10 p-8">
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/4d06c6a1-82fc-4fbc-b781-6c35bcf89ec8.png" 
            alt="ReXDeX Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">
            Join the Waitlist
          </h1>
          <p className="text-gray-400 mt-2">
            {typeFromUrl === "organizer" 
              ? "Be the first to know when ReXDeX launches for organizers"
              : typeFromUrl === "fan"
              ? "Be the first to know when ReXDeX launches for fans"
              : "Be the first to know when ReXDeX launches"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {!typeFromUrl && (
            <div>
              <Label className="text-white">I'm interested as a</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input
                    type="radio"
                    value="fan"
                    checked={userType === "fan"}
                    onChange={(e) => setUserType(e.target.value as "fan" | "organizer")}
                    className="text-blue-500"
                  />
                  <span>Fan</span>
                </label>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input
                    type="radio"
                    value="organizer"
                    checked={userType === "organizer"}
                    onChange={(e) => setUserType(e.target.value as "fan" | "organizer")}
                    className="text-blue-500"
                  />
                  <span>Organizer</span>
                </label>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Back to home
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Waitlist;
