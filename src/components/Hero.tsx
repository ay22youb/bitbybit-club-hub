import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          opacity: 0.3
        }} />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">Join the Bit by Bit Community</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
                Welcome to Bit by Bit
                <span className="block text-primary">Your Learning Adventure</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                The official e-learning platform for the Bit by Bit club.
                Level up your skills in programming, design, and more through fun, gamified courses.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-3">
              {[
                "Interactive gamified challenges",
                "Community-driven curriculum",
                "Peer-to-peer mentor support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="premium" size="lg" className="group">
                Start Your Quest
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Courses
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">120+</div>
                <div className="text-sm text-muted-foreground">Club Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">25+</div>
                <div className="text-sm text-muted-foreground">Quests Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">1500</div>
                <div className="text-sm text-muted-foreground">XP Awarded</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative bg-card rounded-2xl shadow-professional p-8 border border-border">
              <div className="space-y-6">
                {/* Code Editor Mockup */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2">
                    <div className="text-muted-foreground">
                      <span className="text-primary">function</span> <span className="text-foreground">levelUp</span>() {'{'}
                    </div>
                    <div className="text-muted-foreground pl-4">
                      <span className="text-primary">const</span> <span className="text-foreground">skill</span> = <span className="text-accent">'new Skill()'</span>;
                    </div>
                    <div className="text-muted-foreground pl-4">
                      <span className="text-primary">return</span> <span className="text-foreground">unlocked</span>;
                    </div>
                    <div className="text-muted-foreground">{'}'}</div>
                  </div>
                </div>

                {/* Achievement Card */}
                <div className="bg-gradient-hero rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Rank</div>
                      <div className="text-2xl font-bold text-foreground">Code Novice</div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">Lv. 1</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-full w-1/4 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
