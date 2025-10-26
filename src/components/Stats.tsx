import { Award, BookOpen, Users, Briefcase } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Active Students",
    description: "Learning and growing daily",
  },
  {
    icon: BookOpen,
    value: "50+",
    label: "Expert Courses",
    description: "Across multiple domains",
  },
  {
    icon: Award,
    value: "2,000+",
    label: "Certificates Issued",
    description: "Skills validated and recognized",
  },
  {
    icon: Briefcase,
    value: "85%",
    label: "Career Success",
    description: "Students landing tech roles",
  },
];

const Stats = () => {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm opacity-90">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
