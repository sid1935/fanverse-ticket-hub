import { Button } from "@/components/ui/button";
import { Wallet, Users } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/4d06c6a1-82fc-4fbc-b781-6c35bcf89ec8.png" 
            alt="ReXDeX Logo" 
            className="h-8 w-auto"
          />
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
          <a href="#for-fans" className="text-gray-300 hover:text-white transition-colors">For Fans</a>
          <a href="#for-organizers" className="text-gray-300 hover:text-white transition-colors">For Organizers</a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <Users className="w-4 h-4 mr-2" />
            Organizer Login
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};
