import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const GennyChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Genny, your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: "user", // specific session ID could be generated here
          message: userMessage.text,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        data.forEach((msg: any) => {
          setMessages((prev) => [
            ...prev,
            {
              text: msg.text || "I received your message but have no text response.",
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
        });
      } else {
        // Fallback if empty response
        setMessages((prev) => [
          ...prev,
          {
            text: "I'm thinking... but I didn't get a clear response. Try asking something else!",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Oops! I'm having trouble connecting to my server. Please make sure the Rasa server is running.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] md:w-[400px] h-[600px] bg-background/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-primary/10 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Genny AI</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-white hover:bg-white/10 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-muted/20">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10",
                      msg.sender === "user" ? "bg-primary/20" : "bg-blue-500/10"
                    )}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card border border-white/10 text-card-foreground rounded-tl-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-white/10">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-card border border-white/10 p-3 rounded-2xl rounded-tl-sm text-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-background border-t border-white/10">
            <div className="flex gap-2 relative">
              <Input
                placeholder="Ask Genny anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-muted/50 border-white/10 focus-visible:ring-primary/50 pr-12 rounded-xl"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-transform hover:scale-105 active:scale-95"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              Powered by Aigenxt AI
            </p>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/10",
          isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-gradient-to-tr from-blue-600 to-purple-600 hover:shadow-blue-500/50"
        )}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default GennyChatWidget;
