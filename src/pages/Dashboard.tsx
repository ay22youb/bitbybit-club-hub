import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Star, Trophy } from "lucide-react";

const user = {
  name: "CodeWizard",
  avatar: "/avatars/01.png",
  level: 12,
  xp: 9850,
  xpToNextLevel: 10000,
  enrolledCourses: [
    {
      title: "Introduction to Python",
      progress: 80,
    },
    {
      title: "Web Development Bootcamp",
      progress: 45,
    },
    {
      title: "Advanced React Patterns",
      progress: 15,
    },
  ],
  achievements: [
    { name: "Python Padawan", icon: Star },
    { name: "Web Warrior", icon: Star },
    { name: "Community Contributor", icon: Trophy },
  ],
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-muted/40">
      <Navbar />
      <main className="container mx-auto px-4 py-28">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* User Profile Section */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">{user.name}</CardTitle>
                <CardDescription>Level {user.level}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-muted-foreground">XP</span>
                      <span className="text-sm font-medium">{user.xp} / {user.xpToNextLevel}</span>
                    </div>
                    <Progress value={(user.xp / user.xpToNextLevel) * 100} />
                  </div>
                  <Button className="w-full">View Public Profile</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.achievements.map((achievement, index) => (
                    <Badge key={index} variant="premium">
                      <achievement.icon className="w-4 h-4 mr-1" />
                      {achievement.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enrolled Courses Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  My Quests
                </CardTitle>
                <CardDescription>
                  Continue your learning adventure and complete your active quests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {user.enrolledCourses.map((course, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{course.title}</h3>
                        <span className="text-sm font-medium text-muted-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                      <Button variant="outline" size="sm">
                        Continue Quest
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
