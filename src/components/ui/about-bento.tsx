"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AboutBentoProps {
  className?: string;
}

export function AboutBento({ className }: AboutBentoProps = {}) {
  return (
    <section className={cn("bg-slate-50/80 py-20 px-6 font-sans border-t border-zinc-200/60", className)}>
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Large Card */}
          <Card className="md:col-span-2 md:row-span-2 bg-white rounded-2xl p-8 sm:p-12 flex flex-col justify-between border border-slate-200/80 shadow-sm relative overflow-hidden group">
            <svg
              width="377"
              height="368"
              className="w-[340px] sm:w-[380px] fill-neutral-100 absolute -bottom-16 group-hover:rotate-180 transition-transform duration-[2000ms] ease-in-out -right-16 pointer-events-none select-none"
              viewBox="0 0 377 368"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M179.692 5.79814C182.635 -1.93287 193.572 -1.93285 196.515 5.79816L229.505 92.466C231.206 96.9342 236.103 99.2928 240.657 97.8366L328.986 69.5929C336.865 67.0735 343.684 75.6242 339.474 82.7452L292.284 162.574C289.851 166.69 291.061 171.99 295.038 174.642L372.192 226.091C379.075 230.68 376.641 241.343 368.449 242.491L276.613 255.369C271.878 256.033 268.489 260.283 268.895 265.047L276.776 357.445C277.479 365.688 267.625 370.433 261.619 364.744L194.293 300.973C190.821 297.686 185.386 297.686 181.914 300.973L114.588 364.744C108.582 370.433 98.7281 365.688 99.4311 357.445L107.312 265.047C107.718 260.283 104.329 256.033 99.5941 255.369L7.7582 242.491C-0.433812 241.343 -2.86746 230.68 4.01488 226.091L81.1687 174.642C85.1465 171.99 86.3561 166.69 83.9231 162.574L36.7325 82.7452C32.523 75.6242 39.342 67.0735 47.2212 69.5929L135.55 97.8366C140.104 99.2928 145.001 96.9342 146.702 92.4659L179.692 5.79814Z" />
            </svg>
            <div className="space-y-6 relative z-10">
              <div className="inline-flex px-4 py-2 rounded-full bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xs">
                Global Reach
              </div>
              <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                IMPACT WITHOUT
                <br />
                BOUNDARIES.
              </h3>
            </div>
            <div className="mt-12 relative z-10">
              <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-sm">
                We've helped 500+ creators build an audience of millions across
                every major social platform.
              </p>
            </div>
          </Card>

          {/* Metric Card */}
          <Card className="bg-emerald-500 rounded-2xl p-8 sm:p-10 text-white flex flex-col border-none justify-between shadow-sm min-h-[220px]">
            <span className="text-xs font-black uppercase tracking-widest opacity-80">
              Avg Growth
            </span>
            <div className="space-y-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tighter">450%</span>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
          </Card>

          {/* System Card */}
          <Card className="bg-gray-900 rounded-2xl p-8 sm:p-10 !text-white flex flex-col justify-center gap-4 border border-gray-800 shadow-sm min-h-[220px]">
            <div className="size-10 rounded-lg bg-violet-500 flex items-center justify-center">
              <div className="size-4 bg-white rounded-full" />
            </div>
            <div>
              <h4 className="text-xl font-bold leading-tight !text-white">Atomic Habits</h4>
              <p className="text-xs !text-gray-400 font-mono mt-1">System Stable V4</p>
            </div>
          </Card>

          {/* Join Community Card */}
          <Link href="/contact" className="md:col-span-2 block group">
            <Card className="rounded-2xl p-6 sm:p-8 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 cursor-pointer bg-violet-600 hover:bg-violet-700 transition-all duration-300 overflow-hidden shadow-sm">
              <div className="space-y-2 relative z-10 transition-colors">
                <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter !text-white">
                  Join the community
                </h4>
                <p className="!text-white/80 text-sm sm:text-base">
                  Connect with 12,000+ like-minded entrepreneurs.
                </p>
              </div>
              <div className="size-16 sm:size-20 rounded-full shrink-0 flex items-center justify-center bg-white text-violet-600 group-hover:scale-105 transition-transform duration-300 relative z-10 shadow-md">
                <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutBento;
