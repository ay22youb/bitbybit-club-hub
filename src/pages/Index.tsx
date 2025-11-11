import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import RobotChatbot from "@/components/RobotChatbot";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
      </main>
      <Footer />
      <RobotChatbot />
    </div>
  );
};

export default Index;
