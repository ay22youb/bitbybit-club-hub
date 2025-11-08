import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-tight">
                Bit By Bit Club
              </span>
              <span className="text-xs text-muted-foreground">E-Learning Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/leaderboard" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>
            <Link to="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/sign-in">
              <Button variant="ghost" size="default">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="default" size="default">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 space-y-6 animate-fade-in border-t border-border">
            <Link to="/courses" className="block text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/leaderboard" className="block text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>
            <Link to="/dashboard" className="block text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <div className="flex flex-col gap-3 pt-4">
              <Link to="/sign-in">
                <Button variant="ghost" size="default" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="default" size="default" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
