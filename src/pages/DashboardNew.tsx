import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import XPProgress from "@/components/XPProgress";
import AchievementBadge from "@/components/AchievementBadge";
import ParticleBackground from "@/components/ParticleBackground";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Profile {
  username: string;
  level: number;
  total_xp: number;
  avatar_url: string | null;
}

interface CourseProgress {
  id: string;
  progress: number;
  courses: {
    id: string;
    title: string;
    description: string;
    xp_reward: number;
  };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface UserAchievement {
  achievement_id: string;
  achievements: Achievement;
}

const DashboardNew = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<CourseProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchEnrolledCourses();
      fetchAchievements();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } else {
      setProfile(data);
    }
  };

  const fetchEnrolledCourses = async () => {
    const { data, error } = await supabase
      .from("user_progress")
      .select(`
        id,
        progress,
        courses (
          id,
          title,
          description,
          xp_reward
        )
      `)
      .eq("user_id", user?.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
    } else {
      setEnrolledCourses(data as unknown as CourseProgress[]);
    }
  };

  const fetchAchievements = async () => {
    // Fetch all achievements
    const { data: allAchievements, error: achievementsError } = await supabase
      .from("achievements")
      .select("*");

    if (achievementsError) {
      toast({
        title: "Error",
        description: "Failed to load achievements",
        variant: "destructive",
      });
      return;
    }

    // Fetch user's unlocked achievements
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from("user_achievements")
      .select(`
        achievement_id,
        achievements (
          id,
          name,
          description,
          icon
        )
      `)
      .eq("user_id", user?.id);

    if (userAchievementsError) {
      toast({
        title: "Error",
        description: "Failed to load user achievements",
        variant: "destructive",
      });
      return;
    }

    setAchievements(allAchievements || []);
    setUnlockedAchievements(new Set((userAchievements as UserAchievement[])?.map((ua) => ua.achievement_id) || []));
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent shadow-neon" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
        <ParticleBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div
            ref={headerRef}
            className={`mb-12 transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl font-bold mb-4 text-gradient animate-fade-in text-center">
              Your Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <Card className="shadow-professional border-2 border-primary/20 animate-fade-in">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-primary shadow-neon">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                      {profile.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{profile.username}</h2>
                    <p className="text-muted-foreground">Student</p>
                  </div>
                </div>

                <XPProgress currentXP={profile.total_xp} level={profile.level} />
              </CardContent>
            </Card>

            {/* Achievements Card */}
            <Card className="lg:col-span-2 shadow-professional border-2 border-primary/20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {achievements.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      unlocked={unlockedAchievements.has(achievement.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enrolled Courses */}
          <Card className="mt-8 shadow-professional border-2 border-primary/20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {enrolledCourses.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  You haven't enrolled in any courses yet. Visit the{" "}
                  <a href="/courses" className="text-primary hover:underline">
                    course catalog
                  </a>{" "}
                  to get started!
                </p>
              ) : (
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-neon transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold">{course.courses.title}</h3>
                            <p className="text-sm text-muted-foreground">{course.courses.description}</p>
                          </div>
                          <span className="text-primary font-semibold">+{course.courses.xp_reward} XP</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <Button className="w-full mt-4 shadow-neon">Continue Quest</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardNew;
