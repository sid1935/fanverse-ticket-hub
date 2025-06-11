
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const UserNav = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-white"
        onClick={() => navigate("/waitlist")}
      >
        Join Waitlist
      </Button>
    </div>
  );
};
