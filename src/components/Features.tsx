import { Card } from "@/components/ui/card";
import { BookOpen, Trophy, Users, Code2, Zap, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description: "Master tech skills through hands-on coding exercises, quizzes, and real-world projects.",
    color: "text-primary",
  },
  {
    icon: Trophy,
    title: "Gamified Progress",
    description: "Earn XP, unlock achievements, and climb the leaderboard as you learn and grow.",
    color: "text-accent",
  },
  {
    icon: Code2,
    title: "Code Editor",
    description: "Write, test, and run code directly in your browser with our powerful integrated editor.",
    color: "text-secondary",
  },
  {
    icon: Users,
    title: "Community Hub",
    description: "Connect with fellow learners, join group projects, and collaborate on challenges.",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Daily Challenges",
    description: "Keep your skills sharp with fresh coding challenges and streak tracking.",
    color: "text-accent",
  },
  {
    icon: Sparkles,
    title: "AI Assistance",
    description: "Get personalized help and feedback powered by cutting-edge AI technology.",
    color: "text-secondary",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to <span className="text-gradient">Excel</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            A complete platform designed to transform curious minds into confident creators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card hover:bg-card/80 border-border card-shadow transition-all duration-300 hover:scale-105 hover:glow-primary animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
