import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium">Join Our Growing Community</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Ready to Start Your
            <br />
            <span className="text-gradient">Learning Journey?</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Become part of a global community of innovators. Learn, build, and grow with us — one bit at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="lg" className="group">
              Get Started Free
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            No credit card required • Start learning in minutes
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
