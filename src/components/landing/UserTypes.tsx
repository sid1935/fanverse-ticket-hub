
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const UserTypes = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built for Everyone
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether you're a passionate fan or an event organizer, ReXDeX has the tools you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20 p-8 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-black mb-4">For Fans</h3>
            <ul className="space-y-3 text-black mb-6 bg-white/90 p-4 rounded-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Get fair access to tickets through fan verification
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Earn ReXCoins for platform engagement
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Compete on leaderboards for exclusive access
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Trade tickets safely on our P2P exchange
              </li>
            </ul>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => navigate("/waitlist?type=fan")}
            >
              Join as Fan
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-green-500/20 p-8 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300">
            <div className="text-4xl mb-4">🎪</div>
            <h3 className="text-2xl font-bold text-black mb-4">For Organizers</h3>
            <ul className="space-y-3 text-black mb-6 bg-white/90 p-4 rounded-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Set custom resale rules and royalty rates
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Automatic royalty collection on every resale
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Real-time analytics and fan insights
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Eliminate scalping with AI bot detection
              </li>
            </ul>
            <Button 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              onClick={() => navigate("/waitlist?type=organizer")}
            >
              Become Organizer
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
