"use client";

import React from "react";
import { type GsapFlipCardItem } from "@/components/ui/gsap-card-flip";
import { ArtCanvas, type ArtPreset } from "@/components/ui/glass-folder-cards";
import { FileText, CheckCircle2, ShieldCheck, Cpu, Layers, Sparkles, Activity, Terminal } from "lucide-react";

export function DossierCardFace({
  item,
  isHero,
}: {
  item: GsapFlipCardItem;
  isHero: boolean;
}) {
  const isDoc = item.isDocument || (!item.art && !item.image);
  const name = item.title || String(item.id || "Dossier");
  const meta = item.meta || "DAVLabs × Sparsh";
  const isPdf = name.toLowerCase().endsWith(".pdf");
  const isYml = name.toLowerCase().endsWith(".yml") || name.toLowerCase().endsWith(".yaml");

  // Thumbnail rendering (shows exact miniature card matching the folder)
  if (!isHero) {
    if (isDoc) {
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-white to-[#f0f0ee] text-zinc-900 p-2.5 flex flex-col justify-between select-none overflow-hidden rounded-[inherit] border border-black/10 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0 flex-1">
              <span className="block font-semibold text-[11px] leading-tight text-zinc-900 truncate">
                {name}
              </span>
              <span className="block text-[9px] text-zinc-500 font-mono mt-0.5 truncate">
                {meta}
              </span>
            </div>
            <span
              className={`text-[8px] font-mono px-1 py-0.5 rounded uppercase shrink-0 font-bold ${
                isPdf
                  ? "bg-rose-500/15 text-rose-600"
                  : isYml
                  ? "bg-purple-500/15 text-purple-600"
                  : "bg-amber-500/15 text-amber-700"
              }`}
            >
              {isPdf ? "PDF" : isYml ? "YML" : "DOC"}
            </span>
          </div>

          {/* Document Skeleton Lines matching folder */}
          <div className="space-y-1.5 my-auto py-1">
            <div className="h-1 rounded-full bg-zinc-300/80 w-[86%]" />
            <div className="h-1 rounded-full bg-zinc-300/60 w-[92%]" />
            <div className="h-1 rounded-full bg-zinc-300/70 w-[64%]" />
            <div className="h-1 rounded-full bg-zinc-300/50 w-[78%]" />
            <div className="h-1 rounded-full bg-zinc-300/60 w-[42%]" />
          </div>

          {/* Footer stamp */}
          <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono pt-1 border-t border-zinc-200/80">
            <span>Dossier</span>
            <span className="text-emerald-600 flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
              Verified
            </span>
          </div>
        </div>
      );
    }

    // Art Card in thumbnail mode
    return (
      <div className="relative w-full h-full bg-[#18181b] text-white select-none overflow-hidden rounded-[inherit]">
        {item.art ? (
          <ArtCanvas
            art={item.art as ArtPreset}
            seed={name.length * 37}
            w={140}
            h={180}
            density={1}
            priority={0}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : item.image ? (
          <img
            src={item.image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-indigo-900" />
        )}

        {/* Ambient Dark Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />

        {/* Card Header Content */}
        <div className="absolute inset-0 p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
              {item.art || "Art"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm" />
          </div>

          <div>
            <span className="block font-semibold text-[11px] leading-tight text-white drop-shadow-sm truncate">
              {name}
            </span>
            <span className="block text-[9px] text-zinc-300/90 font-mono mt-0.5 truncate drop-shadow-xs">
              {meta}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Hero Card rendering (530px × 670px luxury expanded view)
  if (isDoc) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#fafaf9] to-[#ecece9] text-zinc-900 p-6 sm:p-8 flex flex-col justify-between select-none overflow-hidden rounded-[inherit] border border-black/10 shadow-2xl">
        {/* Top Paper Header with Document Badge */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-zinc-300/80">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded-md uppercase font-bold tracking-wider ${
                  isPdf
                    ? "bg-rose-600 text-white"
                    : isYml
                    ? "bg-purple-600 text-white"
                    : "bg-amber-600 text-white"
                }`}
              >
                {isPdf ? "PDF Document" : isYml ? "YAML Spec" : "Official Dossier"}
              </span>
              <span className="text-xs font-mono text-zinc-500">{meta}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Signed &amp; Audited</span>
            </div>
          </div>

          {/* Document Title Header */}
          <div className="mt-5">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              {name}
            </h3>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              DAVLabs &times; Sparsh Studio &bull; Archive Reference Record
            </p>
          </div>
        </div>

        {/* Dynamic Document Body Content */}
        <div className="my-auto py-5 space-y-4">
          {name.includes("Brand") ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white/90 border border-zinc-200 shadow-2xs">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                  1. Official Color Identity Matrix
                </span>
                <div className="grid grid-cols-5 gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-8 rounded-md bg-[#111111] border border-black/20" />
                    <span className="text-[9px] font-mono mt-1 text-zinc-600">#111111</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full h-8 rounded-md bg-[#fba808] border border-amber-600/20" />
                    <span className="text-[9px] font-mono mt-1 text-zinc-600">#FBA808</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full h-8 rounded-md bg-[#ffffff] border border-zinc-300" />
                    <span className="text-[9px] font-mono mt-1 text-zinc-600">#FFFFFF</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full h-8 rounded-md bg-[#4f46e5] border border-indigo-600/20" />
                    <span className="text-[9px] font-mono mt-1 text-zinc-600">#4F46E5</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full h-8 rounded-md bg-[#00d26a] border border-emerald-600/20" />
                    <span className="text-[9px] font-mono mt-1 text-zinc-600">#00D26A</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/90 border border-zinc-200 shadow-2xs space-y-1.5">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
                  2. Editorial Typography Scales
                </span>
                <p className="text-sm font-serif italic text-zinc-800">
                  &ldquo;Design is sensory craft meet tactile precision.&rdquo;
                </p>
                <p className="text-xs font-mono text-zinc-500">
                  Headline: Serif Display &bull; Body: Inter / Geist &bull; Code: Mono 13px
                </p>
              </div>
            </div>
          ) : name.includes("Telemetry") ? (
            <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-800 font-mono text-xs space-y-2">
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800 pb-1.5">
                <span>Prometheus Stream</span>
                <span className="text-emerald-400">STATUS: HEALTHY</span>
              </div>
              <div className="space-y-1 text-zinc-300">
                <p className="text-emerald-400">&gt; http_requests_total [200 OK]: 42,910 rps</p>
                <p>&gt; p99_latency_ms: 3.42ms (Target: &lt; 10ms)</p>
                <p>&gt; cluster_cpu_utilization: 38.4% [8 Nodes]</p>
                <p>&gt; memory_allocation_rss: 14.2 GB / 64 GB</p>
              </div>
            </div>
          ) : name.includes("CI/CD") ? (
            <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-800 font-mono text-xs space-y-2">
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800 pb-1.5">
                <span>GitHub Actions Runner</span>
                <span className="text-emerald-400">&#10003; 4/4 PASSED</span>
              </div>
              <div className="space-y-1 text-zinc-300">
                <p className="text-emerald-400">&#10003; Stage 1: TypeScript typecheck &bull; 4.1s</p>
                <p className="text-emerald-400">&#10003; Stage 2: Hermetic container build &bull; 12.8s</p>
                <p className="text-emerald-400">&#10003; Stage 3: Vulnerability scanning &bull; 2.2s</p>
                <p className="text-emerald-400">&#10003; Stage 4: Zero-downtime K8s rollout &bull; 6.4s</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white/90 border border-zinc-200 shadow-2xs space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
                Document Body Record
              </span>
              <div className="space-y-2 py-1">
                <div className="h-2 rounded-full bg-zinc-300/80 w-[94%]" />
                <div className="h-2 rounded-full bg-zinc-300/60 w-[88%]" />
                <div className="h-2 rounded-full bg-zinc-300/70 w-[72%]" />
                <div className="h-2 rounded-full bg-zinc-300/50 w-[82%]" />
                <div className="h-2 rounded-full bg-zinc-300/60 w-[55%]" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Seal & Authenticity Block */}
        <div className="pt-4 border-t border-zinc-300/80 flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital Certificate Hash: 0x9f4a...e8b1</span>
          </div>
          <span className="text-zinc-400">Page 1 of 1</span>
        </div>
      </div>
    );
  }

  // Hero Card rendering for Art cards (530px × 670px luxury visual shader preview)
  return (
    <div className="relative w-full h-full bg-[#0a0a0c] text-white select-none overflow-hidden rounded-[inherit] border border-white/10 shadow-2xl">
      {/* Liquid Generative Art Canvas */}
      {item.art ? (
        <ArtCanvas
          art={item.art as ArtPreset}
          seed={name.length * 37}
          w={530}
          h={670}
          density={1.5}
          priority={1}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : item.image ? (
        <img
          src={item.image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-rose-600 to-indigo-950" />
      )}

      {/* Soft Ambient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 backdrop-blur-[1px]" />

      {/* Hero Content HUD */}
      <div className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-sm uppercase font-bold tracking-wider">
              {item.art ? `Shader &bull; ${item.art}` : "Tactile Media"}
            </span>
            <span className="text-xs font-mono text-zinc-300/90">{meta}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 backdrop-blur-md border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Node</span>
          </div>
        </div>

        {/* Center Architectural Spec HUD */}
        <div className="my-auto py-6 space-y-3">
          {name.includes("Hierarchy") ? (
            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 space-y-3">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
                Figma 48 Component Architecture
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="block text-lg font-bold text-white">16</span>
                  <span className="text-zinc-400 text-[10px]">Atoms</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="block text-lg font-bold text-white">20</span>
                  <span className="text-zinc-400 text-[10px]">Molecules</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="block text-lg font-bold text-white">12</span>
                  <span className="text-zinc-400 text-[10px]">Organisms</span>
                </div>
              </div>
            </div>
          ) : name.includes("Tokens") ? (
            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 space-y-2 text-xs font-mono">
              <span className="text-[11px] text-zinc-400 uppercase tracking-widest block">
                Storybook v2.4 Live Tokens
              </span>
              <p className="text-zinc-200">&bull; --color-primary: oklch(0.78 0.16 65)</p>
              <p className="text-zinc-200">&bull; --font-display: serif, Newsreader (48px)</p>
              <p className="text-zinc-200">&bull; --radius-card: 20px &bull; --blur: 24px</p>
            </div>
          ) : name.includes("Zero-Trust") ? (
            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 space-y-2 text-xs font-mono">
              <span className="text-[11px] text-zinc-400 uppercase tracking-widest block">
                K8s Zero-Trust Topologies
              </span>
              <p className="text-emerald-400">&#10003; Mutual TLS (mTLS) Enabled</p>
              <p className="text-emerald-400">&#10003; Automated IAM Boundary Scopes</p>
              <p className="text-emerald-400">&#10003; Terraform Infrastructure as Code</p>
            </div>
          ) : name.includes("Microservices") ? (
            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 space-y-2 text-xs font-mono">
              <span className="text-[11px] text-zinc-400 uppercase tracking-widest block">
                Go &amp; gRPC Distributed Routes
              </span>
              <p className="text-indigo-300">&bull; /rpc.auth.Authenticate &bull; 1.2ms</p>
              <p className="text-indigo-300">&bull; /rpc.event.StreamPipeline &bull; 2.4ms</p>
              <p className="text-indigo-300">&bull; /rpc.telemetry.Collect &bull; 0.9ms</p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
                Liquid Shader Specifications
              </span>
              <p className="text-xs text-zinc-300 font-mono">
                Domain-warped noise field shaded as a continuous liquid surface with 60fps dynamics.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Title Bar */}
        <div className="pt-4 border-t border-white/15">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md">
            {name}
          </h3>
          <p className="text-xs font-mono text-zinc-300 mt-1">
            Studio Dossier &bull; {meta}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DossierCardFace;
