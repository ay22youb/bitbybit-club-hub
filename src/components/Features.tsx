import { Card } from "@/components/ui/card";
import { BookOpen, Trophy, Users, Code2, Zap, GraduationCap } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description: "Industry-aligned courses designed by experts, covering fundamentals to advanced topics with clear learning paths.",
  },
  {
    icon: GraduationCap,
    title: "Expert Mentorship",
    description: "Access to experienced mentors who provide guidance, code reviews, and career advice throughout your journey.",
  },
  {
    icon: Code2,
    title: "Live Code Environment",
    description: "Professional-grade code editor with instant feedback, testing capabilities, and collaborative features.",
  },
  {
    icon: Trophy,
    title: "Skill Certifications",
    description: "Earn recognized certifications upon course completion to validate your skills and boost your portfolio.",
  },
  {
    icon: Users,
    title: "Professional Community",
    description: "Network with ambitious peers, participate in study groups, and collaborate on real-world projects.",
  },
  {
    icon: Zap,
    title: "Continuous Assessment",
    description: "Regular quizzes, projects, and challenges that ensure you're mastering concepts before moving forward.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Everything You Need to Excel in Technology
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A comprehensive learning platform built on proven educational principles and industry best practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card border border-border shadow-card hover:shadow-professional transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
