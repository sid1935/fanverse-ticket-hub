
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <div className="flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
          <a href="#for-fans" className="text-gray-300 hover:text-white transition-colors">For Fans</a>
          <a href="#for-organizers" className="text-gray-300 hover:text-white transition-colors">For Organizers</a>
          <a href="#team" className="text-gray-300 hover:text-white transition-colors">Team</a>
        </div>
      </div>
    </nav>
  );
};
