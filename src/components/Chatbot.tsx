"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, PawPrint, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adoptionChatbot } from "@/ai/flows/adoption-chatbot";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  text: string;
  role: "user" | "bot";
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { response } = await adoptionChatbot({ query: input });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        role: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      toast({
        title: "Error",
        description: "Sorry, the chatbot is not available right now.",
        variant: "destructive",
      });
      const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I'm having trouble connecting. Please try again later.",
          role: 'bot',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground"
          size="icon"
        >
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2 font-headline">
            <PawPrint className="h-6 w-6 text-primary" />
            Adoption Assistant
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground"><PawPrint/></AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">Hello! How can I help you with your pet adoption journey today?</p>
                      </div>
                    </div>
                    {messages.map((m) => (
                        <div key={m.id} className={cn("flex items-start gap-3", m.role === 'user' && 'justify-end')}>
                            {m.role === 'bot' && (
                                <Avatar>
                                    <AvatarFallback className="bg-primary text-primary-foreground"><PawPrint/></AvatarFallback>
                                </Avatar>
                            )}
                             <div className={cn("p-3 rounded-lg max-w-[80%]", m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                <p className="text-sm">{m.text}</p>
                            </div>
                             {m.role === 'user' && (
                                <Avatar>
                                    <AvatarFallback><User/></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground animate-pulse"><PawPrint/></AvatarFallback>
                          </Avatar>
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm">Thinking...</p>
                          </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="pr-12"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
