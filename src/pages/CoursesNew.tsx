import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import CoursePreviewModal from "@/components/CoursePreviewModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ParticleBackground from "@/components/ParticleBackground";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Course {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  difficulty: string;
  category: string;
}

const CoursesNew = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchQuery, selectedDifficulty, selectedCategory, courses]);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("title");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
    } else {
      setCourses(data || []);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((course) => course.difficulty === selectedDifficulty);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  };

  const handlePreview = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to enroll in courses",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("user_progress")
      .insert({
        user_id: user.id,
        course_id: courseId,
        progress: 0,
      });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already enrolled",
          description: "You're already enrolled in this course",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to enroll in course",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Success!",
        description: "You've been enrolled in the course",
      });
      setIsModalOpen(false);
    }
  };

  const categories = ["all", ...Array.from(new Set(courses.map((c) => c.category)))];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
        <ParticleBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div
            ref={headerRef}
            className={`text-center mb-12 transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl font-bold mb-4 text-gradient animate-fade-in">
              Course Catalog
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Choose your path and start learning
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-professional border-2 border-primary/20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff}>
                        {diff === "all" ? "All Difficulties" : diff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Card
                key={course.id}
                className="shadow-professional hover:shadow-neon transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                onClick={() => handlePreview(course)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{course.difficulty}</Badge>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{course.xp_reward} XP</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{course.category}</Badge>
                    <Button variant="ghost" size="sm" className="group">
                      Preview
                      <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No courses found matching your criteria</p>
            </div>
          )}
        </main>

        <CoursePreviewModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEnroll={handleEnroll}
        />
      </div>
    </ProtectedRoute>
  );
};

export default CoursesNew;
