import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Circle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  order_index: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  lessons: Lesson[];
}

interface ModuleAccordionProps {
  modules: Module[];
  selectedLessonId?: string;
  onLessonSelect: (lesson: Lesson) => void;
}

const ModuleAccordion = ({
  modules,
  selectedLessonId,
  onLessonSelect,
}: ModuleAccordionProps) => {
  return (
    <Accordion type="multiple" className="space-y-2" defaultValue={modules.map((m) => m.id)}>
      {modules.map((module) => {
        const completedLessons = module.lessons.filter((l) => l.completed).length;
        const totalLessons = module.lessons.length;
        const moduleProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

        return (
          <AccordionItem
            key={module.id}
            value={module.id}
            className="border-2 border-border rounded-lg px-4"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-start gap-3 text-left flex-1">
                <BookOpen className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{module.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">
                      {completedLessons}/{totalLessons} lessons
                    </span>
                    {moduleProgress === 100 && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-1 ml-8">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all hover:bg-accent",
                      selectedLessonId === lesson.id &&
                        "bg-primary/10 border-2 border-primary"
                    )}
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span
                      className={cn(
                        "text-sm flex-1",
                        lesson.completed && "text-muted-foreground"
                      )}
                    >
                      {lesson.title}
                    </span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ModuleAccordion;
