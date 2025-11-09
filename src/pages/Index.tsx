import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import RobotChatbot from "@/components/RobotChatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
      <RobotChatbot />
    </div>
  );
};

export default Index;
