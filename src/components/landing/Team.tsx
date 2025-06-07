
import { Card } from "@/components/ui/card";

export const Team = () => {
  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experienced leaders driving innovation in the ticketing industry
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <img 
                src="/lovable-uploads/4f6229a2-8b47-4230-8df5-a8d69b76b353.png" 
                alt="Siddharth Pandya"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">Siddharth Pandya</h3>
              <p className="text-blue-400 font-semibold">Founder & CEO</p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Siddharth Pandya is a sales strategist and global-minded entrepreneur with a strong foundation in business and impact. At Web3preneur, he led the execution of a Pan-Asia Web3 event series across 5 countries, securing $50,000 in sponsorships through targeted outreach and strategic partnerships. A multiple-time Outstanding Delegate at international Model UNs, Siddharth is passionate about global wellness and long-term solutions to the UN SDGs. He is pursuing a BSc in Economics and Management from the University of London.
            </p>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <img 
                src="/lovable-uploads/05d80900-51e1-48c2-b4ad-c79f665c7049.png" 
                alt="Dinesh Sastry"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">Dinesh Sastry</h3>
              <p className="text-green-400 font-semibold">Co-Founder & CSO</p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Dinesh Sastry is a global investment strategist, political advisor, and technology entrepreneur with 20+ years of leadership across North America, Asia, and Africa. He is the Founder of Illuminant Capital Holdings, Vice Chairman of Simba Fiber, and Venture Partner at Redwood Collective, which gives UHNWI access to top-tier Silicon Valley VC funds. A UC Berkeley and Georgetown Law graduate, Dinesh has structured capital for startups, sovereigns, and defense deals, including the first U.S.–India defense tech transfer. A former top fundraiser and advisor to U.S. Presidents and Indian Prime Ministers, he now focuses on frontier tech and impact infrastructure in emerging markets.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
