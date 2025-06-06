
import { Card } from "@/components/ui/card";

export const Features = () => {
  const features = [
    {
      title: "AI Bot Detection",
      description: "Advanced machine learning algorithms detect and prevent bot purchases in real-time",
      icon: "🤖",
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Blockchain Security",
      description: "Immutable smart contracts ensure transparent and secure ticket transactions",
      icon: "🔗",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Fair Pricing",
      description: "Dynamic pricing models and resale caps protect fans from scalping",
      icon: "⚖️",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "ReXCoin Rewards",
      description: "Earn tokens for platform engagement and use them for exclusive access",
      icon: "💎",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      title: "P2P Exchange",
      description: "Decentralized orderbook for secure peer-to-peer ticket trading",
      icon: "🔄",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "No Crypto Knowledge",
      description: "Web2 experience with Web3 benefits - wallets created automatically",
      icon: "🎯",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Revolutionizing Ticketing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology to create the fairest, most secure ticketing experience ever built.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
