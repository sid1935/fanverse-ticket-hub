
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UserNav = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <a href="/auth">Sign In</a>
        </Button>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <a href="/auth">Get Started</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate('/dashboard')}
        className="text-gray-300 hover:text-white"
      >
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Dashboard
      </Button>
      <div className="flex items-center space-x-2 text-gray-300">
        <User className="w-4 h-4" />
        <span className="text-sm">{user.email}</span>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleSignOut}
        className="text-gray-300 hover:text-white"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};
