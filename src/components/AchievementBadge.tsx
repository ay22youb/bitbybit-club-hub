import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked?: boolean;
}

const AchievementBadge = ({ achievement, unlocked = true }: AchievementBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`
              w-16 h-16 rounded-full flex items-center justify-center text-2xl
              transition-all duration-300 hover:scale-110
              ${unlocked 
                ? 'bg-gradient-primary shadow-neon animate-pulse-glow cursor-pointer' 
                : 'bg-muted opacity-40 cursor-not-allowed'
              }
            `}
          >
            {achievement.icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">{achievement.name}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
