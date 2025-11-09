import { useState } from "react";
import { Bot, X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RobotChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm Neon, your learning guide! 🤖 How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const responses = [
    "Great question! Let me help you with that.",
    "I can guide you through our courses step by step!",
    "Want to check out the Arduino or MATLAB courses?",
    "The SolidWorks and CATIA courses are perfect for design!",
    "Need help navigating? I'm here for you!",
    "Your learning journey starts here! 🚀",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput("");

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-neon hover:shadow-neon-secondary transition-all animate-bounce-slow z-50 group"
          size="icon"
        >
          <Bot className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-neon border-2 border-primary/50 flex flex-col z-50 animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="gradient-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-neon animate-pulse-glow">
                <Bot className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary-foreground">Neon Guide</h3>
                <p className="text-xs text-primary-foreground/80">Online • Ready to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-card/50 backdrop-blur-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.isBot
                      ? "bg-primary/10 text-foreground border border-primary/20"
                      : "gradient-primary text-primary-foreground shadow-neon"
                  }`}
                >
                  {msg.isBot && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4" />
                      <span className="text-xs font-semibold">Neon</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-muted border-primary/30 focus:border-primary"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="shadow-neon hover:shadow-neon-secondary"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput("Show me courses");
                  handleSend();
                }}
                className="text-xs border-primary/30 hover:border-primary"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Courses
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput("How do I start?");
                  handleSend();
                }}
                className="text-xs border-primary/30 hover:border-primary"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RobotChatbot;
