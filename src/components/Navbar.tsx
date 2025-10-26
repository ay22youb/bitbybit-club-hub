import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-tight">
                Bit By Bit Club
              </span>
              <span className="text-xs text-muted-foreground">E-Learning Platform</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#courses" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </a>
            <a href="#testimonials" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Success Stories
            </a>
            <a href="#about" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="default">
              Sign In
            </Button>
            <Button variant="default" size="default">
              Get Started
            </Button>
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
            <a href="#features" className="block text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#courses" className="block text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </a>
            <a href="#testimonials" className="block text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Success Stories
            </a>
            <a href="#about" className="block text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="ghost" size="default" className="w-full">
                Sign In
              </Button>
              <Button variant="default" size="default" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
