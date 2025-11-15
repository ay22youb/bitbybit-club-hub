import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Quiz from "@/components/Quiz";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, PlayCircle, Zap } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url: string | null;
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

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: () => void;
}

const LessonViewer = ({ lesson, onComplete }: LessonViewerProps) => {
  const { user } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(lesson.completed);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    setShowQuiz(false);
    setLessonCompleted(lesson.completed);
  }, [lesson.id, lesson.completed]);

  const markLessonComplete = async () => {
    if (!user || lessonCompleted) return;

    setMarking(true);
    try {
      // Check if progress record exists
      const { data: existing } = await supabase
        .from("user_lesson_progress")
        .select("id")
        .eq("user_id", user.id)
        .eq("lesson_id", lesson.id)
        .maybeSingle();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from("user_lesson_progress")
          .update({
            completed: true,
            completed_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from("user_lesson_progress")
          .insert({
            user_id: user.id,
            lesson_id: lesson.id,
            completed: true,
            completed_at: new Date().toISOString(),
          });

        if (error) throw error;
      }

      // Update user XP
      const { data: profile } = await supabase
        .from("profiles")
        .select("total_xp, level")
        .eq("id", user.id)
        .single();

      if (profile) {
        const newXP = profile.total_xp + lesson.xp_reward;
        const newLevel = Math.floor(newXP / 100) + 1;

        await supabase
          .from("profiles")
          .update({
            total_xp: newXP,
            level: newLevel,
          })
          .eq("id", user.id);
      }

      setLessonCompleted(true);
      toast({
        title: "Lesson Complete!",
        description: `You earned ${lesson.xp_reward} XP!`,
      });
      onComplete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to mark lesson complete",
        variant: "destructive",
      });
    } finally {
      setMarking(false);
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    onComplete();
  };

  if (showQuiz && lesson.quizzes.length > 0) {
    return (
      <Quiz
        quizId={lesson.quizzes[0].id}
        onComplete={handleQuizComplete}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <Card className="shadow-professional border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{lesson.title}</CardTitle>
            {lessonCompleted && (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold">Completed</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Zap className="w-5 h-5" />
            <span className="font-bold">+{lesson.xp_reward} XP</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {lesson.video_url && (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-border">
            <div className="text-center">
              <PlayCircle className="w-16 h-16 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Video Player</p>
              <p className="text-xs text-muted-foreground mt-1">{lesson.video_url}</p>
            </div>
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {lesson.content}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          {!lessonCompleted && (
            <Button
              onClick={markLessonComplete}
              disabled={marking}
              className="shadow-neon"
            >
              {marking ? "Marking..." : "Mark as Complete"}
            </Button>
          )}

          {lesson.quizzes.length > 0 && (
            <Button
              onClick={() => setShowQuiz(true)}
              variant="outline"
              className="shadow-neon"
            >
              Take Quiz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonViewer;
