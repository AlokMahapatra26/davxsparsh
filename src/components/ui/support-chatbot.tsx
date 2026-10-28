"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function SupportChatbot() {
  const pathname = usePathname();

  // If already on the dedicated /chat page or /contact page, do not render floating button
  if (pathname === "/chat" || pathname === "/contact") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <Link
        href="/chat"
        aria-label="Open support chat"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fba808] hover:bg-[#f59e0b] shadow-[0_8px_25px_rgba(251,168,8,0.4)] hover:shadow-[0_12px_32px_rgba(251,168,8,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Mascot Icon */}
        <BotMascotIcon className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-105" />

        {/* Online Green Status Badge with Crisp White Border */}
        <span className="absolute bottom-0 right-0 flex h-4 w-4 sm:h-4.5 sm:w-4.5">
          <span className="relative inline-flex rounded-full h-full w-full bg-[#00d26a] border-[2.5px] border-white shadow-sm" />
        </span>
      </Link>
    </div>
  );
}

export default SupportChatbot;
