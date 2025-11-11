import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ParticleBackground from "@/components/ParticleBackground";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface LeaderboardEntry {
  id: string;
  username: string;
  total_xp: number;
  level: number;
  avatar_url: string | null;
}

const LeaderboardNew = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, total_xp, level, avatar_url")
      .order("total_xp", { ascending: false })
      .limit(50);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load leaderboard",
        variant: "destructive",
      });
    } else {
      setLeaderboard(data || []);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

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
              Hall of Fame
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Top learners on the platform
            </p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-professional border-2 border-primary/20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                Top 50 Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboard.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No leaderboard data yet. Be the first to start learning!
                </p>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    const isTopThree = rank <= 3;

                    return (
                      <div
                        key={entry.id}
                        className={`
                          flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]
                          ${isTopThree 
                            ? 'bg-gradient-primary/10 border-2 border-primary shadow-neon' 
                            : 'bg-card border border-border hover:border-primary/30'
                          }
                        `}
                      >
                        {/* Rank */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted font-bold text-lg">
                          {isTopThree ? getRankIcon(rank) : `#${rank}`}
                        </div>

                        {/* Avatar */}
                        <Avatar className={`w-12 h-12 ${isTopThree ? 'border-2 border-primary shadow-neon' : ''}`}>
                          <AvatarImage src={entry.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {entry.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-lg">{entry.username}</p>
                            {isTopThree && (
                              <Badge variant="secondary" className="shadow-neon">
                                Top {rank}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">Level {entry.level}</p>
                        </div>

                        {/* XP */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gradient">{entry.total_xp.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">XP</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default LeaderboardNew;
