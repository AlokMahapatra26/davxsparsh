"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Send,
  Maximize2,
  RotateCcw,
  ArrowUpRight,
  CheckCheck,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function BotMascotIcon({
  className = "w-8 h-8",
  eyeColor = "#fba808",
}: {
  className?: string;
  eyeColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes botEyeBlinkOnce {
          0% { transform: scaleY(1); }
          40% { transform: scaleY(0.08); }
          60% { transform: scaleY(0.08); }
          100% { transform: scaleY(1); }
        }
        .bot-eye {
          transform-box: fill-box;
          transform-origin: center;
        }
        .group:hover .bot-eye-animate {
          animation: botEyeBlinkOnce 0.32s cubic-bezier(0.4, 0, 0.2, 1) 1 forwards;
        }
      `}</style>
      {/* Solid White Speech Bubble Mascot */}
      <path
        d="M7 6C4.23858 6 2 8.23858 2 11V21C2 23.7614 4.23858 26 7 26H22.5L28 31.5V26C30.7614 26 33 23.7614 33 21V11C33 8.23858 30.7614 6 28 6H7Z"
        fill="white"
      />
      {/* Left Eye */}
      <rect
        className="bot-eye bot-eye-animate"
        x="10"
        y="13"
        width="4"
        height="8"
        rx="2"
        fill={eyeColor}
      />
      {/* Right Eye */}
      <rect
        className="bot-eye bot-eye-animate"
        x="22"
        y="13"
        width="4"
        height="8"
        rx="2"
        fill={eyeColor}
      />
    </svg>
  );
}

interface PopupChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_POPUP_GREETING: PopupChatMessage = {
  id: "popup-welcome",
  role: "assistant",
  content:
    "Hello! I am **DAVSparsh AI Assistant**.\nHow can I help you explore our engineering services, brand craft, or project inquiries today?\n\n*(You can talk in **English**, **Hindi**, or **Hinglish**!)*",
  timestamp: "Just now",
};

const POPUP_SUGGESTIONS = [
  "What services do you offer?",
  "Web & App Development",
  "Get a project quote",
  "Hindi me baat karo",
];

export function SupportChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<PopupChatMessage[]>([INITIAL_POPUP_GREETING]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Sync conversation history from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("davsparsh_chat_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
  }, []);

  // Save conversation history to sessionStorage so full screen (/chat) keeps the same conversation
  useEffect(() => {
    try {
      if (messages && messages.length > 1) {
        sessionStorage.setItem("davsparsh_chat_history", JSON.stringify(messages));
      }
    } catch (e) {
      console.error("Failed to save chat history:", e);
    }
  }, [messages]);

  // Auto-close floating chatbot popup whenever route changes (e.g. going Back to Studio from /chat)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // If already on the dedicated /chat page, do not render floating widget
  if (pathname === "/chat") {
    return null;
  }

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: PopupChatMessage = {
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

      const assistantReply: PopupChatMessage = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        content:
          data.reply ||
          "I apologize, I could not generate a response. Please reach out to our team at contact@davlabs.in or contact@sparshdesign.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantReply]);
    } catch (error) {
      console.error("Popup chat error:", error);
      const errorMessage: PopupChatMessage = {
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
    try {
      sessionStorage.removeItem("davsparsh_chat_history");
    } catch (e) {}
    setMessages([INITIAL_POPUP_GREETING]);
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
            lineIdx > 0 ? "mt-1.5" : "",
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
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence mode="wait">
        {/* Chat Popup Window */}
        {isOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="w-[92vw] sm:w-[400px] h-[560px] max-h-[82vh] rounded-3xl bg-card/95 text-card-foreground border border-border/80 shadow-[0_16px_50px_rgba(0,0,0,0.22)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-border/70 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full bg-[#fba808] flex items-center justify-center shadow-sm shrink-0">
                  <BotMascotIcon className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00d26a] border-2 border-card" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm tracking-tight text-foreground">
                      DAV<span className="font-medium opacity-75">Sparsh</span>
                    </span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold"
                      style={{
                        backgroundColor: "rgba(252, 163, 17, 0.14)",
                        color: "#fca311",
                      }}
                    >
                      AI Live
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="New chat"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/chat"
                  onClick={() => setIsOpen(false)}
                  title="Open full page"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer ml-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5 max-w-[88%]",
                    msg.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-[#fba808] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <BotMascotIcon className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs sm:text-sm",
                      msg.role === "user"
                        ? "bg-zinc-900 !text-white border border-zinc-700/80 rounded-tr-xs shadow-xs [&_*]:!text-white"
                        : "bg-muted/70 text-foreground border border-border/80 rounded-tl-xs shadow-2xs"
                    )}
                  >
                    <div>{renderFormattedText(msg.content, msg.role === "user")}</div>
                    <div
                      className={cn(
                        "text-[9px] mt-1 font-mono flex items-center gap-1",
                        msg.role === "user"
                          ? "justify-end !text-zinc-300"
                          : "justify-end text-muted-foreground"
                      )}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.role === "user" && (
                        <CheckCheck className="w-3 h-3 !text-amber-400 shrink-0" />
                      )}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-zinc-300" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2.5 max-w-[88%] mr-auto justify-start items-center">
                  <div className="w-7 h-7 rounded-full bg-[#fba808] flex items-center justify-center shrink-0 shadow-xs">
                    <BotMascotIcon className="w-4 h-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-xs px-3.5 py-2 bg-muted/70 border border-border/80 shadow-2xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                    <span className="text-[11px] text-muted-foreground ml-1">Thinking...</span>
                  </div>
                </div>
              )}

              {/* Suggestion Chips */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] font-medium text-muted-foreground mb-1.5 px-1">
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {POPUP_SUGGESTIONS.map((sugg, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(sugg)}
                        className="text-[11px] text-left px-2.5 py-1.5 rounded-xl bg-muted/60 hover:bg-muted border border-border/80 hover:border-foreground/20 text-foreground transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-muted/30 border-t border-border/70 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask DAVSparsh AI..."
                disabled={isLoading}
                className="flex-1 bg-background border border-border/80 rounded-xl px-3 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                title="Send message"
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer",
                  inputValue.trim() && !isLoading
                    ? "bg-[#fba808] hover:bg-[#f59e0b] text-black shadow-sm hover:scale-105 active:scale-95"
                    : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4 -translate-x-px" />
              </button>
            </form>
          </motion.div>
        ) : (
          /* Floating Trigger Button */
          <motion.button
            key="chat-trigger"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open support chat"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fba808] hover:bg-[#f59e0b] shadow-[0_8px_25px_rgba(251,168,8,0.4)] hover:shadow-[0_12px_32px_rgba(251,168,8,0.55)] transition-all duration-300 cursor-pointer"
          >
            {/* Mascot Icon */}
            <BotMascotIcon className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-105" />

            {/* Online Green Status Badge */}
            <span className="absolute bottom-0 right-0 flex h-4 w-4 sm:h-4.5 sm:w-4.5">
              <span className="relative inline-flex rounded-full h-full w-full bg-[#00d26a] border-[2.5px] border-white shadow-sm" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SupportChatbot;
