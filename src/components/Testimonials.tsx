import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student",
    content: "Bit By Bit Club transformed my learning experience. The structured curriculum and expert mentorship helped me land my first internship at a tech company.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Engineering Major",
    content: "The hands-on projects and real-world challenges gave me practical skills that go beyond theory. This platform is a game-changer for serious learners.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "AI Enthusiast",
    content: "The AI and machine learning courses are exceptional. The progression from fundamentals to advanced topics was perfectly paced and incredibly comprehensive.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Student Success</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Trusted by Ambitious Students
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Join hundreds of students who have accelerated their tech careers through our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 bg-card border border-border shadow-card hover:shadow-professional transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="pt-4 border-t border-border">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
