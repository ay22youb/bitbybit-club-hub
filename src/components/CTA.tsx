import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-60" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="bg-card rounded-2xl shadow-professional border border-border p-12 md:p-16">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Ready to Accelerate Your
              <span className="block text-primary">Tech Career?</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Join Bit By Bit Club today and gain access to comprehensive courses, expert mentorship, 
              and a supportive community of learners.
            </p>

            <div className="flex flex-wrap justify-center gap-8 py-6">
              {[
                "No credit card required",
                "7-day money-back guarantee",
                "Lifetime access to materials"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" className="group">
                Start Learning Today
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule a Demo
              </Button>
            </div>

            <div className="pt-6 text-sm text-muted-foreground">
              Join 500+ students already learning with us
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
