
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse"></div>
      
      <div className="container mx-auto px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/4d06c6a1-82fc-4fbc-b781-6c35bcf89ec8.png" 
              alt="ReXDeX Logo" 
              className="h-48 w-auto mx-auto mb-6"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Fair Ticketing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            AI-powered, blockchain-secured ticket exchange that puts fans first. 
            Say goodbye to scalpers and hello to fair prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4">
              <a href="#fan-signup">Start as a Fan</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-black bg-white hover:bg-gray-100 text-lg px-8 py-4">
              <a href="#organizer-signup">Join as Organizer</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-blue-400 mb-2">0%</div>
              <div className="text-white">Bot Success Rate</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-white">Fair Distribution</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
              <div className="text-white">Transparency</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/60 w-6 h-6" />
      </div>
    </section>
  );
};
