import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ProtectedRoute from "@/components/ProtectedRoute";
import LessonViewer from "@/components/LessonViewer";
import ModuleAccordion from "@/components/ModuleAccordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url: string | null;
  order_index: number;
  xp_reward: number;
  quizzes: Quiz[];
  completed: boolean;
}

interface Quiz {
  id: string;
  title: string;
  passing_score: number;
  xp_reward: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
}

const CourseContent = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (courseId && user) {
      fetchCourseContent();
    }
  }, [courseId, user]);

  const fetchCourseContent = async () => {
    try {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch modules with lessons and quizzes
      const { data: modulesData, error: modulesError } = await supabase
        .from("modules")
        .select(`
          id,
          title,
          description,
          order_index,
          lessons (
            id,
            title,
            content,
            video_url,
            order_index,
            xp_reward,
            quizzes (
              id,
              title,
              passing_score,
              xp_reward
            )
          )
        `)
        .eq("course_id", courseId)
        .order("order_index");

      if (modulesError) throw modulesError;

      // Fetch user's lesson progress
      const { data: progressData, error: progressError } = await supabase
        .from("user_lesson_progress")
        .select("lesson_id, completed")
        .eq("user_id", user?.id);

      if (progressError) throw progressError;

      const completedLessons = new Set(
        progressData?.filter((p) => p.completed).map((p) => p.lesson_id) || []
      );

      // Map completed status to lessons
      const modulesWithProgress = modulesData.map((module: any) => ({
        ...module,
        lessons: module.lessons
          .map((lesson: any) => ({
            ...lesson,
            completed: completedLessons.has(lesson.id),
          }))
          .sort((a: any, b: any) => a.order_index - b.order_index),
      }));

      setModules(modulesWithProgress);

      // Calculate overall progress
      const totalLessons = modulesWithProgress.reduce(
        (sum: number, m: any) => sum + m.lessons.length,
        0
      );
      const completedCount = modulesWithProgress.reduce(
        (sum: number, m: any) =>
          sum + m.lessons.filter((l: any) => l.completed).length,
        0
      );
      setOverallProgress(totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0);

      // Select first incomplete lesson or first lesson
      const firstIncompleteLesson = modulesWithProgress
        .flatMap((m: any) => m.lessons)
        .find((l: any) => !l.completed);
      
      setSelectedLesson(
        firstIncompleteLesson || modulesWithProgress[0]?.lessons[0] || null
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load course content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = () => {
    fetchCourseContent();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent shadow-neon" />
      </div>
    );
  }

  if (!course) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <p>Course not found</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
        <ParticleBackground />
        <Navbar />

        <main className="container mx-auto px-4 py-8 relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gradient">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Course Progress</span>
                  </div>
                  <span className="text-sm font-semibold">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {selectedLesson ? (
                <LessonViewer
                  lesson={selectedLesson}
                  onComplete={handleLessonComplete}
                />
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      Select a lesson to begin learning
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Course Modules</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  <ModuleAccordion
                    modules={modules}
                    selectedLessonId={selectedLesson?.id}
                    onLessonSelect={setSelectedLesson}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default CourseContent;
