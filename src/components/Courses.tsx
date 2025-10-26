import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, TrendingUp } from "lucide-react";

const courses = [
  {
    category: "Programming Fundamentals",
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, and Node.js from scratch",
    duration: "12 weeks",
    students: "2,450",
    rating: "4.9",
    level: "Beginner",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    category: "Artificial Intelligence",
    title: "Machine Learning & AI Fundamentals",
    description: "Learn Python, TensorFlow, and build your first AI models",
    duration: "10 weeks",
    students: "1,820",
    rating: "4.8",
    level: "Intermediate",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    category: "Robotics",
    title: "Robotics Engineering Essentials",
    description: "Design, build, and program robots using Arduino and ROS",
    duration: "14 weeks",
    students: "1,230",
    rating: "4.9",
    level: "Intermediate",
    color: "bg-green-500/10 text-green-600 border-green-200",
  },
  {
    category: "Mobile Development",
    title: "iOS & Android App Development",
    description: "Create cross-platform mobile apps with React Native",
    duration: "11 weeks",
    students: "1,650",
    rating: "4.7",
    level: "Intermediate",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
  {
    category: "Data Science",
    title: "Data Analysis & Visualization",
    description: "Master Python, pandas, and create stunning data visualizations",
    duration: "9 weeks",
    students: "2,100",
    rating: "4.8",
    level: "Beginner",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
  },
  {
    category: "Cybersecurity",
    title: "Ethical Hacking & Security",
    description: "Learn penetration testing, network security, and defense strategies",
    duration: "13 weeks",
    students: "980",
    rating: "4.9",
    level: "Advanced",
    color: "bg-red-500/10 text-red-600 border-red-200",
  },
];

const Courses = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Popular Courses</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Explore Our Course Catalog
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From fundamentals to advanced topics, find the perfect course to match your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="bg-card border border-border shadow-card hover:shadow-professional transition-all duration-300 animate-fade-in group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 space-y-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${course.color}`}>
                  {course.category}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {course.level}
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    Learn More →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
