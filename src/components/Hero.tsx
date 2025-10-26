import { Button } from "@/components/ui/button";
import { Sparkles, Code, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      />
      <div className="absolute inset-0 z-0 gradient-hero" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Code className="w-12 h-12 text-primary opacity-20" />
      </div>
      <div className="absolute bottom-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-16 h-16 text-secondary opacity-20" />
      </div>
      <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '2s' }}>
        <Zap className="w-10 h-10 text-accent opacity-20" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium">Where Innovation Meets Education</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Learn Technology,
            <br />
            <span className="text-gradient">Bit By Bit</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Join a community of young innovators. Master programming, robotics, and AI through 
            interactive challenges, gamified learning, and real-world projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="lg" className="group">
              Start Learning Now
              <Zap className="ml-2 group-hover:animate-pulse" />
            </Button>
            <Button variant="outline" size="lg">
              Explore Courses
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gradient">500+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gradient">50+</div>
              <div className="text-sm text-muted-foreground">Courses</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gradient">1000+</div>
              <div className="text-sm text-muted-foreground">Projects Built</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
