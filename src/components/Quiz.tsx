import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, ArrowLeft, Award } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  order_index: number;
}

interface QuizData {
  id: string;
  title: string;
  passing_score: number;
  xp_reward: number;
}

interface QuizProps {
  quizId: string;
  onComplete: () => void;
  onBack: () => void;
}

const Quiz = ({ quizId, onComplete, onBack }: QuizProps) => {
  const { user } = useAuth();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("*")
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;
      setQuiz(quizData);

      const { data: questionsData, error: questionsError } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("quiz_id", quizId)
        .order("order_index");

      if (questionsError) throw questionsError;
      setQuestions(questionsData as QuizQuestion[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load quiz",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      toast({
        title: "Select an answer",
        description: "Please select an answer before continuing",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: selectedAnswer,
    };
    setAnswers(newAnswers);
    setSelectedAnswer("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = async (finalAnswers: Record<string, string>) => {
    const correctCount = questions.filter(
      (q) => finalAnswers[q.id] === q.correct_answer
    ).length;
    
    const scorePercentage = (correctCount / questions.length) * 100;
    setScore(scorePercentage);
    setShowResults(true);

    const passed = scorePercentage >= (quiz?.passing_score || 70);

    try {
      // Save quiz result
      await supabase.from("user_quiz_results").insert({
        user_id: user?.id,
        quiz_id: quizId,
        score: Math.round(scorePercentage),
        passed,
      });

      if (passed && quiz) {
        // Update user XP
        const { data: profile } = await supabase
          .from("profiles")
          .select("total_xp, level")
          .eq("id", user?.id)
          .single();

        if (profile) {
          const newXP = profile.total_xp + quiz.xp_reward;
          const newLevel = Math.floor(newXP / 100) + 1;

          await supabase
            .from("profiles")
            .update({
              total_xp: newXP,
              level: newLevel,
            })
            .eq("id", user?.id);
        }

        toast({
          title: "Quiz Passed!",
          description: `You earned ${quiz.xp_reward} XP!`,
        });
      }
    } catch (error: any) {
      console.error("Error saving quiz result:", error);
    }
  };

  if (loading || !quiz) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (showResults) {
    const passed = score >= quiz.passing_score;
    return (
      <Card className="shadow-professional border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            {passed ? (
              <CheckCircle2 className="w-20 h-20 mx-auto mb-4 text-primary" />
            ) : (
              <XCircle className="w-20 h-20 mx-auto mb-4 text-destructive" />
            )}
            <h3 className="text-3xl font-bold mb-2">
              {passed ? "Congratulations!" : "Keep Trying!"}
            </h3>
            <p className="text-xl mb-4">
              Your Score: <span className="font-bold text-primary">{Math.round(score)}%</span>
            </p>
            <p className="text-muted-foreground">
              Passing Score: {quiz.passing_score}%
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct_answer;
              
              return (
                <div
                  key={question.id}
                  className="p-4 rounded-lg border-2 border-border"
                >
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-sm">
                        Your answer: <span className={isCorrect ? "text-primary" : "text-destructive"}>{userAnswer}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-primary">
                          Correct answer: {question.correct_answer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <Button onClick={onComplete} className="shadow-neon">
              Continue Learning
            </Button>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lesson
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="shadow-professional border-2 border-primary/20">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>{quiz.title}</CardTitle>
            <Button onClick={onBack} variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedAnswer(option)}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="w-full shadow-neon"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Quiz;
