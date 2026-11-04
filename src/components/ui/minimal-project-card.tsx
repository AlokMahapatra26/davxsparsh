"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ProjectItem } from "@/data/projects-data";

interface MinimalProjectCardProps {
  item: ProjectItem;
  index: number;
}

export function MinimalProjectCard({ item, index }: MinimalProjectCardProps) {
  // Artistic gradient presets for projects without uploaded screenshot
  const gradientMap: Record<string, string> = {
    aurora: "from-teal-900 via-indigo-950 to-slate-950",
    glacier: "from-sky-950 via-slate-900 to-indigo-950",
    dusk: "from-purple-950 via-slate-900 to-rose-950",
    ember: "from-orange-950 via-amber-950 to-stone-950",
    verdant: "from-emerald-950 via-teal-950 to-zinc-950",
  };
  const gradient =
    gradientMap[item.artPreset || "glacier"] ||
    "from-zinc-900 via-slate-900 to-black";

  const targetUrl = item.liveUrl || "/contact";
  const isExternal = Boolean(item.liveUrl);

  return (
    <article className="group relative flex flex-col justify-between rounded-3xl border border-black/8 bg-white/90 p-5 sm:p-6 backdrop-blur-md shadow-xs transition-all duration-300 hover:shadow-2xl hover:border-black/20 hover:-translate-y-1.5 h-full">
      <div>
        {/* Visual Preview / Thumbnail */}
        <a
          href={targetUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="block relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-black/8 shadow-2xs mb-5 cursor-pointer"
        >
          {item.image ? (
            <>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-mono font-semibold text-zinc-900 shadow-md">
                  <span>{isExternal ? "Visit Live Site" : "Explore Project"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </>
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between transition-transform duration-700 group-hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                  {item.categoryLabel}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/40" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-white/50 block mb-1">
                  {item.division}
                </span>
                <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
                  {item.title}
                </h4>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-white/70">
                <span className="truncate">{item.tags[0]}</span>
                <span className="text-white/40 font-semibold">
                  {item.metrics[0]?.value}
                </span>
              </div>
            </div>
          )}

          {/* Corner Status Pill */}
          {item.liveUrl ? (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Site</span>
            </div>
          ) : (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90 shadow-xs">
              0{index + 1}
            </div>
          )}
        </a>

        {/* Minimal Meta Kicker */}
        <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] font-mono text-zinc-400">
          <span className="uppercase tracking-wider font-medium truncate">
            {item.subtitle}
          </span>
          <span className="shrink-0">{item.division.split("•")[0]}</span>
        </div>

        {/* Title */}
        <a
          href={targetUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="group/title block"
        >
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 group-hover/title:text-black transition-colors flex items-center justify-between gap-3">
            <span>{item.title}</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover/title:text-zinc-950 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all shrink-0" />
          </h3>
        </a>

        {/* Concise description */}
        <p className="text-sm text-zinc-600 leading-relaxed mt-2 line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Footer: Tags & Action */}
      <div className="mt-5 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {item.tags.slice(0, 3).map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-100 text-zinc-700 border border-zinc-200/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {item.liveUrl ? (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-zinc-900 hover:text-emerald-600 transition-colors ml-auto"
          >
            <span>Visit Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        ) : (
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-zinc-500 hover:text-zinc-950 transition-colors ml-auto"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
