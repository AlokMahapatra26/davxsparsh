import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowRight, Layers, Globe, Code2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROJECT_CATEGORIES, PROJECTS_DATA } from "@/data/projects-data";
import { MinimalProjectCard } from "@/components/ui/minimal-project-card";

interface ProjectCategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: "websites" },
    { category: "saas-products" },
    { category: "designs" },
  ];
}

export default async function ProjectCategoryPage({ params }: ProjectCategoryPageProps) {
  const { category } = await params;
  const currentCategory = PROJECT_CATEGORIES[category];

  if (!currentCategory) {
    notFound();
  }

  const projects = PROJECTS_DATA.filter((p) => p.category === category);

  const categoryIcons: Record<string, React.ReactNode> = {
    websites: <Globe className="w-4 h-4 text-emerald-600" />,
    "saas-products": <Code2 className="w-4 h-4 text-blue-600" />,
    designs: <Palette className="w-4 h-4 text-purple-600" />,
  };

  return (
    <main className="relative min-h-screen bg-[#f8f7fd] text-zinc-900 pb-32 overflow-hidden">
      {/* Architectural Dot Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.06] text-black"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Floating Bar */}
      <header className="sticky top-0 z-40 bg-[#f8f7fd]/80 backdrop-blur-md border-b border-black/5 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="push-outline" size="sm" asChild className="gap-2 cursor-pointer shadow-xs">
            <Link href="/#archives">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Studio</span>
            </Link>
          </Button>
          <span className="hidden sm:inline text-xs font-mono text-zinc-400">/</span>
          <span className="hidden sm:inline text-xs font-mono text-zinc-600 uppercase tracking-wider">
            {currentCategory.title}
          </span>
        </div>

        {/* Quick Category Switcher Tabs */}
        <nav className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 border border-black/10 shadow-xs text-xs font-mono">
          {Object.values(PROJECT_CATEGORIES).map((cat) => {
            const isActive = cat.slug === category;
            return (
              <Link
                key={cat.slug}
                href={`/projects/${cat.slug}`}
                className={`px-3 py-1 rounded-full transition-all ${
                  isActive
                    ? "bg-zinc-950 text-white font-semibold shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-black/5"
                }`}
              >
                {cat.title}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Hero Category Introduction */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-xs text-xs font-mono uppercase tracking-wider text-zinc-800 mb-6 select-none">
          {categoryIcons[category] || <Layers className="w-4 h-4 text-zinc-600" />}
          <span>{currentCategory.badge} • Portfolio Showcase</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] mb-6">
          {currentCategory.headline}
        </h1>

        <p className="text-base sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8">
          {currentCategory.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-500">
          <span className="px-3 py-1 rounded-md bg-white border border-black/5 shadow-2xs">
            {projects.length} Verified Production Deliverables
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="px-3 py-1 rounded-md bg-white border border-black/5 shadow-2xs">
            Division: {currentCategory.division}
          </span>
        </div>
      </div>

      {/* Projects Showcase Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((item, index) => (
            <MinimalProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>

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

