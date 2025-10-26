import { Card } from "@/components/ui/card";
import { UserPlus, BookOpen, Code, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Your Account",
    description: "Sign up in minutes and complete your profile to get personalized course recommendations.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Choose Your Path",
    description: "Select from curated learning paths in programming, AI, robotics, or create your custom curriculum.",
  },
  {
    icon: Code,
    number: "03",
    title: "Learn & Build",
    description: "Work through interactive lessons, complete coding challenges, and build real-world projects.",
  },
  {
    icon: Award,
    number: "04",
    title: "Earn Certifications",
    description: "Complete assessments, showcase your projects, and earn industry-recognized certifications.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Start Learning in Four Easy Steps
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our streamlined onboarding process gets you learning in minutes, not hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="p-6 bg-card border border-border shadow-card hover:shadow-professional transition-all duration-300 group h-full">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
