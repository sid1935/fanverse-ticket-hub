
import { Card } from "@/components/ui/card";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Sign Up & Get Verified",
      description: "Create your account with basic details. We auto-generate a secure wallet and airdrop ReXCoins to get you started.",
      color: "text-blue-400"
    },
    {
      step: "02", 
      title: "Build Your Fan Score",
      description: "Follow artists, complete promotional tasks, and engage with the community to climb the leaderboard.",
      color: "text-purple-400"
    },
    {
      step: "03",
      title: "Access Pre-Sales",
      description: "Top fans get exclusive access to pre-sale tickets at fixed prices - no scalping, just fair distribution.",
      color: "text-green-400"
    },
    {
      step: "04",
      title: "Trade Securely",
      description: "Resell tickets on our P2P exchange with smart contract protection and automatic royalty distribution.",
      color: "text-orange-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How ReXDeX Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From signup to resale, every step is designed to protect fans and ensure fair access to events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full"></div>
              <div className={`text-6xl font-bold ${step.color} mb-4 opacity-20 absolute top-2 right-2`}>
                {step.step}
              </div>
              <div className={`text-2xl font-bold ${step.color} mb-3 relative z-10`}>
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed relative z-10">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
