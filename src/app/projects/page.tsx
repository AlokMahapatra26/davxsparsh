import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight, Globe, Code2, Palette, Layers, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROJECT_CATEGORIES, PROJECTS_DATA } from "@/data/projects-data";
import { MinimalProjectCard } from "@/components/ui/minimal-project-card";

export const metadata = {
  title: "Projects & Portfolio | DAVSparsh",
  description:
    "Explore our delivered websites, SaaS platforms, and sensory design systems built with engineering precision and editorial craft.",
};

export default function ProjectsIndexPage() {
  const categoryIcons: Record<string, React.ReactNode> = {
    websites: <Globe className="w-4 h-4 text-emerald-600" />,
    "saas-products": <Code2 className="w-4 h-4 text-blue-600" />,
    designs: <Palette className="w-4 h-4 text-purple-600" />,
  };

  return (
    <main className="relative min-h-screen bg-[#f8f7fd] text-zinc-900 pb-32 overflow-x-clip">
      {/* Architectural Dot Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.06] text-black"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Sticky Bar */}
      <header className="sticky top-0 z-40 bg-[#f8f7fd]/90 backdrop-blur-md border-b border-black/10 px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 shrink-0">
          <Link
            href="/#archives"
            className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-[13px] sm:text-[15px] border border-black/10 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95 group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-600 group-hover:text-zinc-950 transition-transform group-hover:-translate-x-0.5 shrink-0" />
            <span>Return to Studio</span>
          </Link>
          <span className="hidden sm:inline text-sm font-mono text-zinc-400">/</span>
          <span className="hidden md:inline text-xs sm:text-sm font-mono text-zinc-700 uppercase tracking-wider font-semibold truncate">
            All Projects &amp; Deliverables
          </span>
        </div>

        {/* Quick Category Switcher Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/90 border border-black/10 shadow-xs text-[12px] sm:text-[14px] font-medium shrink-0 overflow-x-auto">
          <span className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-zinc-950 text-white font-semibold shadow-xs whitespace-nowrap">
            All ({PROJECTS_DATA.length})
          </span>
          {Object.values(PROJECT_CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/projects/${cat.slug}`}
              className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-black/5 whitespace-nowrap transition-all duration-150"
            >
              {cat.title}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero Category Introduction */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-xs text-xs font-mono uppercase tracking-wider text-zinc-800 mb-6 select-none">
          <Layers className="w-4 h-4 text-zinc-600" />
          <span>Interactive Archives &amp; Deliverables</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] mb-6">
          Selected Projects &amp; Builds
        </h1>

        <p className="text-base sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Where IT architecture harmonizes with digital craft. Browse our delivered high-performance websites, enterprise SaaS applications, and sensory design systems.
        </p>

        {/* Category Shortcut Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Object.values(PROJECT_CATEGORIES).map((cat) => (
            <Button key={cat.slug} variant="outline" size="sm" asChild className="gap-2 bg-white hover:bg-zinc-50 border-black/10 shadow-xs">
              <Link href={`/projects/${cat.slug}`}>
                {categoryIcons[cat.slug]}
                <span>{cat.title}</span>
                <span className="text-xs font-mono text-zinc-400">({PROJECTS_DATA.filter(p => p.category === cat.slug).length})</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Projects Showcase Cards grouped by Category */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {Object.values(PROJECT_CATEGORIES).map((cat) => {
          const categoryProjects = PROJECTS_DATA.filter((p) => p.category === cat.slug);
          return (
            <section key={cat.slug} className="space-y-6">
              <div className="flex items-end justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-black/10 shadow-xs">
                    {categoryIcons[cat.slug]}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                      {cat.headline}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 font-mono mt-0.5">
                      {cat.division}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="gap-1.5 text-zinc-700 hover:text-black">
                  <Link href={`/projects/${cat.slug}`}>
                    <span>View Section</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryProjects.map((item, index) => (
                  <MinimalProjectCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Global Commission CTA Banner */}
        <div className="relative mt-20 p-8 sm:p-12 rounded-3xl bg-zinc-950 text-white overflow-hidden shadow-xl border border-white/10">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3" style={{ color: "#a1a1aa" }}>
              Ready to Ship Your Vision?
            </span>
            <h3
              className="text-3xl sm:text-4xl font-extrabold tracking-tight !text-white mb-4"
              style={{ color: "#ffffff" }}
            >
              Have an ambitious web, SaaS, or design project?
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8" style={{ color: "#d4d4d8" }}>
              We pair purpose-built IT engineering with sensory, editorial product craft. Schedule a consultation or reach out directly to initiate your build.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                size="lg"
                asChild
                className="bg-[#9eff3e] hover:bg-white !text-black font-bold shadow-md cursor-pointer transition-colors"
                style={{ backgroundColor: "#9eff3e", color: "#000000" }}
              >
                <Link href="/contact" className="gap-2">
                  <span className="!text-black font-bold" style={{ color: "#000000" }}>Start a Project</span>
                  <ArrowRight className="w-4 h-4 !text-black" style={{ color: "#000000" }} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="border border-white/25 bg-white/5 hover:bg-white/15 !text-white font-semibold cursor-pointer shadow-xs transition-colors"
                style={{ color: "#ffffff" }}
              >
                <Link href="/services">
                  <span className="!text-white font-semibold" style={{ color: "#ffffff" }}>Explore All Services</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

