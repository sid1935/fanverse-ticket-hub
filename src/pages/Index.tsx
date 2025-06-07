
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { UserTypes } from "@/components/landing/UserTypes";
import { Team } from "@/components/landing/Team";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { FanSignup } from "@/components/signup/FanSignup";
import { OrganizerSignup } from "@/components/signup/OrganizerSignup";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <UserTypes />
      <Team />
      <FanSignup />
      <OrganizerSignup />
      <Footer />
    </div>
  );
};

export default Index;
