import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "CodeWizard", xp: 9850, avatar: "/avatars/01.png" },
  { rank: 2, name: "PixelPioneer", xp: 8700, avatar: "/avatars/02.png" },
  { rank: 3, name: "DataDynamo", xp: 8650, avatar: "/avatars/03.png" },
  { rank: 4, name: "SyntaxSorcerer", xp: 7500, avatar: "/avatars/04.png" },
  { rank: 5, name: "LogicLion", xp: 6800, avatar: "/avatars/05.png" },
  { rank: 6, name: "ByteBard", xp: 6200, avatar: "/avatars/06.png" },
  { rank: 7, name: "ScriptSavvy", xp: 5500, avatar: "/avatars/07.png" },
  { rank: 8, name: "LoopLegend", xp: 4800, avatar: "/avatars/08.png" },
  { rank: 9, name: "ArrayAce", xp: 4200, avatar: "/avatars/09.png" },
  { rank: 10, name: "BitBender", xp: 3500, avatar: "/avatars/10.png" },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-28">
        <div className="text-center mb-12">
          <Trophy className="mx-auto h-16 w-16 text-primary" />
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl mt-4">
            Hall of Fame
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            See who's at the top of their game in the Bit by Bit community.
          </p>
        </div>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Top 10 Adventurers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg transition-colors ${
                    index < 3 ? 'bg-primary/10' : 'bg-card'
                  }`}
                >
                  <div className="w-12 text-2xl font-bold text-center">
                    {user.rank}
                  </div>
                  <div className="flex items-center flex-grow ml-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="ml-4 font-semibold text-lg">{user.name}</span>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {user.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;
