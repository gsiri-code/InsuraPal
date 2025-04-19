"use client";
import { useState, useRef, useEffect } from "react";
import type React from "react";
import axios from "axios";
import { Shield, Send, Bot, UserIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const hardcodedContext = `
You are an AI assistant helping a user understand and manage their insurance plan.
The user has the following information:
- Name: Alex Smith
- Insurance Provider: Kaiser Permanente Gold 1500/20
- Plan: Gold PPO
- Deductible: $1,500
- Monthly Premium: $450
- Copay: $20
- Coverage: Dental, Vision, General Medical
- Network: Kaiser Permanente Integrated Network
- Good for: [
  "integrated_care",
  "preventive_services",
  "specialist_access",
  "no_referrals_needed",
  "predictable_costs"
]
Answer clearly and helpfully based on this context, but keep it concise and short answers. Answer all in one paragraph.
`;

const suggestedQuestions = [
  "What is my deductible?",
  "How much is my copay for specialist visits?",
  "Am I covered for dental services?",
  "Do I need a referral to see a specialist?",
  "How can I find in-network providers?",
  "What happens if I need emergency care while traveling?",
];

const people = [
  {
    id: 1,
    name: "Insurance Expert",
    designation: "AI Assistant",
    image: "/placeholder.svg?key=insurance-expert",
  },
];

export default function InsuranceChat() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "👋 Hi there! I'm your personal insurance assistant. I can help you understand your Kaiser Permanente Gold 1500/20 plan. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent, customInput?: string) => {
    e.preventDefault();
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    const newMessages = [...messages, { role: "user", content: messageText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/claude", {
        messages: newMessages,
        context: hardcodedContext,
      });

      setMessages([
        ...newMessages,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err: any) {
      console.error("API Error:", err);
      setError(err.response?.data?.error || "Failed to get response");

      // Optional: Show error in chat
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <BackgroundBeams className="opacity-20" />

      {/* Header */}
      <header className="relative z-10 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold">InsuraPal</span>
          </div>
          <div className="ml-auto">
            <AnimatedTooltip items={people} />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 flex-1 flex flex-col max-w-4xl relative z-10">
        <Card className="flex-1 flex flex-col shadow-xl border-indigo-100 dark:border-indigo-900/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8" />
              <div className='py-5'>
                <CardTitle>Insurance AI Assistant</CardTitle>
                <CardDescription className="text-indigo-100">
                  Ask me anything about your Kaiser Permanente Gold 1500/20 plan
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="p-4 space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-start gap-2.5 max-w-[80%]",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        msg.role === "user"
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200"
                      )}
                    >
                      {msg.role === "user" ? (
                        <UserIcon className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "p-3 rounded-lg",
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 rounded-tl-none">
                      <div className="flex space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <CardFooter className="border-t p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 w-full">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={sendMessage} className="flex gap-2 w-full">
              <Textarea
                className="flex-grow resize-none min-h-[50px] max-h-[150px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e as any);
                  }
                }}
              />
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 h-[50px] w-[50px] p-0 flex items-center justify-center"
                disabled={loading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>

        {/* Suggested Questions */}
        <div className="mt-6 relative z-10">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <span>Suggested Questions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-3 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-900/30"
                onClick={(e) => sendMessage(e, question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
