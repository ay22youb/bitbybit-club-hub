import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
  {
    title: "Introduction to Python",
    description: "Learn the fundamentals of Python programming, from variables and data types to loops and functions.",
    xp: 100,
  },
  {
    title: "Web Development Bootcamp",
    description: "Master the art of web development with this comprehensive bootcamp, covering HTML, CSS, JavaScript, and React.",
    xp: 500,
  },
  {
    title: "Game Design with Unity",
    description: "Unleash your creativity and learn to build stunning 2D and 3D games with the Unity engine.",
    xp: 750,
  },
  {
    title: "Data Science with R",
    description: "Dive into the world of data science and learn to analyze and visualize data with the R programming language.",
    xp: 600,
  },
  {
    title: "Introduction to UI/UX Design",
    description: "Learn the principles of user-centered design and create intuitive and engaging user interfaces.",
    xp: 300,
  },
  {
    title: "Advanced React Patterns",
    description: "Take your React skills to the next level with this course on advanced patterns and techniques.",
    xp: 800,
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-28">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Course Catalog
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Embark on a new quest and level up your skills.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Rewards</span>
                  <span className="font-semibold text-primary">{course.xp} XP</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Start Quest
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
