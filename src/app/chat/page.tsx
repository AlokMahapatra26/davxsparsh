"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ArrowUpRight, User, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PromptComposer, AiBlobWarpAvatar } from "@/components/ui/prompt-composer";
import { BotMascotIcon } from "@/components/ui/support-chatbot";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_GREETING: ChatMessage = {
  id: "msg-welcome",
  role: "assistant",
  content:
    "Hello! I am the official AI support assistant for **DAVLabs × Sparsh Design**. How can I help you explore our engineering services, brand craft, or project inquiries today?\n\n*(Feel free to converse in **English**, **Hindi**, or **Hinglish**!)*",
  timestamp: "Just now",
};

const SUGGESTIONS = [
  "What services do DAVLabs & Sparsh offer?",
  "Tell me about web and mobile app development",
  "How can I contact the team for a project quote?",
  "Hindi me baat karo",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      const assistantReply: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        content:
          data.reply ||
          "I apologize, I could not generate a response. Please reach out to our team at contact@davlabs.in or contact@sparshdesign.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantReply]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Network issue encountered. Please try again shortly or email contact@davlabs.in directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setInputValue("");
  };

  const renderFormattedText = (text: string, isUser = false) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const parts = text.split("\n").map((line, lineIdx) => {
      const boldParts = line.split(/(\*\*.*?\*\*)/g).map((chunk, chunkIdx) => {
        if (chunk.startsWith("**") && chunk.endsWith("**")) {
          return (
            <strong
              key={chunkIdx}
              className={cn(
                "font-semibold",
                isUser ? "!text-white font-semibold" : "text-foreground font-semibold"
              )}
            >
              {chunk.slice(2, -2)}
            </strong>
          );
        }
        const subParts = chunk.split(emailRegex);
        return (
          <React.Fragment key={chunkIdx}>
            {subParts.map((sub, subIdx) => {
              if (sub.match(emailRegex)) {
                return (
                  <a
                    key={subIdx}
                    href={`mailto:${sub}`}
                    className={cn(
                      "underline font-medium break-all inline-flex items-center gap-0.5",
                      isUser
                        ? "!text-amber-300 hover:!text-amber-200 decoration-amber-400/60"
                        : "text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    )}
                  >
                    {sub}
                    <ArrowUpRight className="w-3 h-3 inline-block" />
                  </a>
                );
              }
              return sub;
            })}
          </React.Fragment>
        );
      });

      return (
        <p
          key={lineIdx}
          className={cn(
            lineIdx > 0 ? "mt-2" : "",
            isUser ? "!text-white font-normal" : "text-foreground/90 font-normal",
            "leading-relaxed"
          )}
        >
          {boldParts}
        </p>
      );
    });

    return <>{parts}</>;
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-amber-500/20">
      {/* Subtle Dot Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted border border-border/60 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Studio</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border/70">
              <span className="font-semibold text-sm tracking-tight text-foreground">
                DAVLabs <span className="opacity-40">&times;</span> Sparsh
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Support
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetChat}
              title="New Conversation"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted border border-border/60 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Chat</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Conversation Stream */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4 flex flex-col">
        {/* Welcome Hero (Shown when only greeting exists) */}
        {messages.length === 1 && (
          <div className="my-auto py-8 sm:py-12 flex flex-col items-center text-center">
            <div className="relative mb-5 flex items-center justify-center">
              <AiBlobWarpAvatar className="w-16 h-16 sm:w-20 sm:h-20 ring-2 ring-primary/20 shadow-lg" />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00d26a] border-2 border-background shadow-sm" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              How can we assist you today?
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              Official assistant for DAVLabs (Engineering &amp; Cloud) and Sparsh Design (Brand Craft &amp; UI/UX).
            </p>

            {/* Suggestion Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-xl">
              {SUGGESTIONS.map((sugg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(sugg)}
                  className="text-xs px-3.5 py-2 rounded-xl bg-muted/60 border border-border/80 hover:bg-muted hover:border-foreground/20 text-foreground transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
                >
                  {sugg}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Thread (When conversation has multiple messages) */}
        {messages.length > 1 && (
          <div className="space-y-6 pb-6">
            <AnimatePresence initial={false} mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout="position"
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.94,
                    x: msg.role === "user" ? 16 : -16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    x: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 28,
                    mass: 0.75,
                  }}
                  className={cn(
                    "flex gap-3 max-w-2xl items-end",
                    msg.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-[#fba808] flex items-center justify-center shrink-0 mb-0.5 shadow-sm">
                      <BotMascotIcon className="w-5 h-5" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 leading-relaxed text-sm sm:text-base max-w-[85%] sm:max-w-[78%] transition-shadow",
                      msg.role === "user"
                        ? "bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 !text-white border border-zinc-700/70 rounded-tr-xs shadow-[0_4px_20px_rgba(0,0,0,0.25)] [&_*]:!text-white"
                        : "bg-card/90 text-foreground border border-border/80 rounded-tl-xs shadow-xs"
                    )}
                  >
                    <div className={cn(msg.role === "user" ? "!text-white [&_*]:!text-white" : "")}>
                      {renderFormattedText(msg.content, msg.role === "user")}
                    </div>
                    <div
                      className={cn(
                        "text-[10px] mt-2 font-mono flex items-center gap-1.5",
                        msg.role === "user" ? "justify-end !text-zinc-300" : "justify-end text-muted-foreground"
                      )}
                    >
                      <span className={cn(msg.role === "user" ? "!text-zinc-300 font-medium" : "text-muted-foreground")}>
                        {msg.timestamp}
                      </span>
                      {msg.role === "user" && (
                        <CheckCheck className="w-3.5 h-3.5 !text-amber-400 shrink-0" />
                      )}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-100 shrink-0 mb-0.5 shadow-sm">
                      <User className="w-4 h-4 text-zinc-200" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  key="typing-indicator"
                  layout="position"
                  initial={{ opacity: 0, y: 14, scale: 0.94, x: -12 }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                  exit={{ opacity: 0, y: -6, scale: 0.92, transition: { duration: 0.2 } }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    mass: 0.8,
                  }}
                  className="flex gap-3 max-w-2xl mr-auto justify-start items-end"
                >
                  <div className="w-8 h-8 rounded-full bg-[#fba808] flex items-center justify-center shrink-0 mb-0.5 shadow-sm">
                    <BotMascotIcon className="w-5 h-5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-xs px-4 py-3 bg-muted/80 text-foreground border border-border/80 shadow-xs flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 py-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#fba808] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-[#fba808] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-[#fba808] animate-bounce" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      Generating reply...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Bottom Sticky Composer Area featuring PromptComposer */}
      <footer className="sticky bottom-0 z-30 w-full bg-background/90 backdrop-blur-xl border-t border-border/60 py-4 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <PromptComposer
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSend={() => handleSendMessage()}
            isLoading={isLoading}
            placeholder="Ask about DAVLabs & Sparsh Design (or say 'Hindi me baat karo')..."
            loadingText="Generating response with Gemini..."
            blobTranslucent
            className="w-full"
          />
        </div>
      </footer>
    </div>
  );
}
