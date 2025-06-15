
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI bot detection work?",
      answer: "Our advanced machine learning algorithms analyze user behavior patterns, device fingerprints, and transaction patterns in real-time to identify and block automated bot purchases. The system continuously learns and adapts to new bot strategies."
    },
    {
      question: "What are ReXCoins and how do I earn them?",
      answer: "ReXCoins are our platform's utility tokens that you earn by engaging with the community, following artists, completing promotional tasks, and climbing leaderboards. Top fan scores get priority access to pre-sale tickets."
    },
    {
      question: "Is my wallet secure?",
      answer: "Yes! We auto-generate secure wallets for every user using industry-standard encryption. Your private keys are protected, and all transactions are secured by blockchain technology. You don't need any crypto knowledge to use our platform safely."
    },
    {
      question: "When will the platform launch?",
      answer: "We're currently in development and building our waitlist. Subscribers will be the first to know about our beta launch and get early access to the platform. Join our waitlist to stay updated!"
    },
    {
      question: "How does the P2P exchange work?",
      answer: "Our decentralized orderbook allows secure peer-to-peer ticket trading with smart contract protection. All transactions include automatic royalty distribution to artists and organizers, ensuring everyone benefits from resales."
    },
    {
      question: "What makes ReXDeX different from other ticketing platforms?",
      answer: "We combine AI-powered bot detection, blockchain security, fair pricing models, and reward systems to create the most transparent and fan-friendly ticketing experience. No more scalping, no more unfair prices."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about ReXDeX and how it works
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 mb-4 overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                {openItem === index ? (
                  <ChevronUp className="text-blue-400 w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-blue-400 w-5 h-5 flex-shrink-0" />
                )}
              </button>
              {openItem === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
