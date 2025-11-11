import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

interface XPProgressProps {
  currentXP: number;
  level: number;
}

const XPProgress = ({ currentXP, level }: XPProgressProps) => {
  const xpForNextLevel = level * 100;
  const progress = (currentXP % xpForNextLevel) / xpForNextLevel * 100;
  const xpNeeded = xpForNextLevel - (currentXP % xpForNextLevel);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-neon">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold">Level {level}</p>
            <p className="text-sm text-muted-foreground">{currentXP} XP</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{xpNeeded} XP to next level</p>
        </div>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-3" />
        <div className="absolute inset-0 bg-gradient-primary opacity-50 rounded-full blur-sm pointer-events-none" />
      </div>
    </div>
  );
};

export default XPProgress;
