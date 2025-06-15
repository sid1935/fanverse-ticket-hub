
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, Trophy, Coins, Users, Shield, Zap } from "lucide-react";

const FanJourney = () => {
  const navigate = useNavigate();

  const journeySteps = [
    {
      phase: "Getting Started",
      title: "Sign Up & Verification",
      description: "Create your account with basic details. We auto-generate a secure wallet and airdrop initial ReXCoins.",
      features: ["Instant account creation", "Auto-generated secure wallet", "Welcome ReXCoins bonus", "Email verification"],
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      phase: "Building Status",
      title: "Earn Fan Score",
      description: "Engage with artists, complete tasks, and climb leaderboards to unlock exclusive access.",
      features: ["Follow your favorite artists", "Complete promotional tasks", "Participate in community challenges", "Climb fan leaderboards"],
      icon: <Star className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      phase: "Ticket Access",
      title: "Priority Pre-Sales",
      description: "Top fans get first access to tickets at fixed prices - no scalping, no price manipulation.",
      features: ["Priority access based on fan score", "Fixed price guarantees", "Anti-bot protection", "Fair distribution system"],
      icon: <Trophy className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      phase: "Secure Trading",
      title: "P2P Exchange",
      description: "Safely buy and sell tickets with smart contract protection and automatic royalty distribution.",
      features: ["Decentralized orderbook", "Smart contract security", "Price cap protection", "Instant transfers"],
      icon: <Shield className="w-8 h-8" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  const rewards = [
    { name: "ReXCoins", description: "Earn tokens for platform engagement", icon: <Coins className="w-6 h-6" /> },
    { name: "Early Access", description: "First dibs on hot tickets", icon: <Zap className="w-6 h-6" /> },
    { name: "Exclusive Events", description: "VIP meetups and backstage passes", icon: <Star className="w-6 h-6" /> },
    { name: "Community Status", description: "Recognition as a top fan", icon: <Trophy className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300 mb-8 inline-flex items-center"
          >
            ← Back to Home
          </button>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Fan Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your path to fair tickets, exclusive access, and true fan rewards on ReXDeX
          </p>
        </div>

        {/* Journey Steps */}
        <div className="space-y-16">
          {journeySteps.map((step, index) => (
            <div key={index} className="relative">
              {index < journeySteps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-1 h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
              )}
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 === 0 ? "order-1" : "order-2"}>
                    <div className="flex items-center mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white mr-4`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">{step.phase}</div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <ArrowRight className="w-5 h-5 text-blue-400 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={index % 2 === 0 ? "order-2" : "order-1"}>
                    <div className={`w-full h-64 bg-gradient-to-br ${step.color} opacity-20 rounded-xl flex items-center justify-center`}>
                      <div className="text-6xl text-white opacity-50">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Rewards Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Fan Rewards & Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                  {reward.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{reward.name}</h3>
                <p className="text-gray-300 text-sm">{reward.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4"
            onClick={() => navigate("/waitlist?type=fan")}
          >
            Start Your Fan Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FanJourney;
