import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Clock } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  difficulty: string;
  category: string;
}

interface CoursePreviewModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (courseId: string) => void;
}

const CoursePreviewModal = ({ course, isOpen, onClose, onEnroll }: CoursePreviewModalProps) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-primary">{course.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex gap-2">
            <Badge variant="secondary">{course.difficulty}</Badge>
            <Badge variant="outline">{course.category}</Badge>
          </div>

          <p className="text-muted-foreground leading-relaxed">{course.description}</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
              <Award className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">XP Reward</p>
                <p className="font-semibold">{course.xp_reward} XP</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
              <Clock className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">4 weeks</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
              <BookOpen className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Lessons</p>
                <p className="font-semibold">12 modules</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">What you'll learn:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Master the fundamentals and best practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Build real-world projects from scratch</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Earn certificates and badges</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={() => onEnroll(course.id)} 
              className="flex-1 shadow-neon"
              size="lg"
            >
              Enroll Now
            </Button>
            <Button onClick={onClose} variant="outline" size="lg">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoursePreviewModal;
