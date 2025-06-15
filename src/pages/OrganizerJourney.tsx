
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Settings, BarChart3, DollarSign, Shield, Users } from "lucide-react";

const OrganizerJourney = () => {
  const navigate = useNavigate();

  const journeySteps = [
    {
      phase: "Setup",
      title: "Account & Verification",
      description: "Register as an organizer with business verification. Get access to the complete event management suite.",
      features: ["Business verification process", "Organizer dashboard access", "Smart contract wallet setup", "Initial platform training"],
      icon: <Settings className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      phase: "Event Creation",
      title: "Launch Your Event",
      description: "Create events with custom pricing, tiers, and resale rules. Set your royalty rates for secondary sales.",
      features: ["Event details & media upload", "Ticket tier configuration", "Dynamic pricing setup", "Resale rules & royalty rates"],
      icon: <Calendar className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      phase: "Sales Management",
      title: "Monitor & Control",
      description: "Real-time analytics, fan insights, and complete control over your ticket distribution with AI bot protection.",
      features: ["Real-time sales dashboard", "Fan demographic insights", "Anti-bot monitoring", "Inventory management"],
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      phase: "Revenue",
      title: "Automatic Royalties",
      description: "Earn from every resale with automatic royalty collection. Transparent blockchain transactions and instant payouts.",
      features: ["Automatic royalty collection", "Real-time revenue tracking", "Instant blockchain payouts", "Transparent transaction history"],
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    { name: "Zero Scalping", description: "AI-powered bot detection eliminates unfair resales", icon: <Shield className="w-6 h-6" /> },
    { name: "Fan Analytics", description: "Deep insights into your audience demographics", icon: <BarChart3 className="w-6 h-6" /> },
    { name: "Perpetual Revenue", description: "Earn royalties on every ticket resale forever", icon: <DollarSign className="w-6 h-6" /> },
    { name: "Community Building", description: "Tools to engage and reward your top fans", icon: <Users className="w-6 h-6" /> }
  ];

  const pricingFeatures = [
    "No upfront costs or monthly fees",
    "Pay only a small % on ticket sales",
    "Automatic royalty collection",
    "Transparent blockchain transactions",
    "Real-time revenue tracking",
    "Instant payouts"
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <button
            onClick={() => navigate("/")}
            className="text-green-400 hover:text-green-300 mb-8 inline-flex items-center"
          >
            ← Back to Home
          </button>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Organizer Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your event ticketing with blockchain security, AI protection, and perpetual revenue streams
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
                          <ArrowRight className="w-5 h-5 text-green-400 mr-3" />
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

        {/* Benefits Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Organizer Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.name}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Model */}
        <div className="mt-24">
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-green-500/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Simple, Fair Pricing</h2>
              <p className="text-gray-300 text-lg">No hidden fees, no upfront costs. You succeed, we succeed.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What You Pay</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">Small %</div>
                <p className="text-gray-300">Only on successful ticket sales</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What You Get</h3>
                <ul className="space-y-2">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <ArrowRight className="w-4 h-4 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg px-8 py-4"
            onClick={() => navigate("/waitlist?type=organizer")}
          >
            Start as Organizer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerJourney;
