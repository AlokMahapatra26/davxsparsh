"use client";

import React from "react";
import type { CarouselItem } from "@/components/ui/connected-carousel";
import { CalendlyCarousel } from "@/components/ui/connected-carousel";

export const SERVICES_CAROUSEL_DATA: CarouselItem[] = [
  {
    id: "web-development",
    stat: "Web Development",
    quote:
      "Sub-second edge speeds, resilient cloud architectures, and zero runtime drift across high-throughput distributed systems.",
    author: "DAVLabs Systems",
    role: "Next.js & Cloud Topologies",
    defaultImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    alt: "DAVLabs Web Development and distributed systems engineering",
    href: "/services/web-development",
  },
  {
    id: "ui-ux-design",
    stat: "UI/UX & Web Design",
    quote:
      "Artisanal digital surfaces, responsive layouts, editorial typography, and fluid micro-interactions tailored for high conversion.",
    author: "Sparsh Design Studio",
    role: "Sensory Interface & Motion",
    defaultImage:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80&auto=format&fit=crop",
    alt: "Sparsh Design UI/UX bespoke digital interfaces",
    href: "/services/ui-ux-design",
  },
  {
    id: "ai-automation",
    stat: "AI Automation",
    quote:
      "Autonomous multi-agent execution loops, high-security local RAG embeddings, and bespoke fine-tuned reasoning models.",
    author: "DAVLabs Intelligence",
    role: "Autonomous Agents & RAG",
    defaultImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop",
    alt: "DAVLabs AI Automation and multi-agent execution pipelines",
    href: "/services/ai-automation",
  },
  {
    id: "app-development",
    stat: "App Development",
    quote:
      "Native Swift, Kotlin, and cross-platform apps engineered with 120Hz gesture response and offline-first CRDT certainty.",
    author: "DAVLabs Mobile",
    role: "iOS & Android Engineering",
    defaultImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop",
    alt: "DAVLabs native iOS and Android application engineering",
    href: "/services/app-development",
  },
  {
    id: "brand-identity",
    stat: "Brand Identity & Packaging",
    quote:
      "Enduring visual systems, physical packaging mockups, luxury foil stamp accents, and comprehensive brand guidelines that outlast cycles.",
    author: "Sparsh Brand Studio",
    role: "Material Luxury & Packaging",
    defaultImage:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&auto=format&fit=crop",
    alt: "Sparsh Design Brand Identity and material packaging systems",
    href: "/services/brand-identity",
  },
  {
    id: "creative-logo-design",
    stat: "Creative Logo Design",
    quote:
      "Unique, custom logo marks and geometric emblems that declare your brand presence and establish immediate market authority.",
    author: "Sparsh Identity Lab",
    role: "Bespoke Emblems & Marks",
    defaultImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80&auto=format&fit=crop",
    alt: "Sparsh Design Creative Logo Design and typography marks",
    href: "/services/creative-logo-design",
  },
];

export const STORIES_DATA: CarouselItem[] = [
  {
    id: "studio-prism",
    stat: "140+ design sprints completed",
    quote:
      "Automating client bookings unlocked uninterrupted deep work sessions and transformed our delivery cadence.",
    author: "Elena Rostova",
    role: "Head of Product Design at Studio Prism",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/c6/c6c51783628e317008b03004640a273251c41c6373a6fc63738dc2d56df83965.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/c6/c6c51783628e317008b03004640a273251c41c6373a6fc63738dc2d56df83965.jpg",
    alt: "Elena Rostova collaborating with her design team in a creative studio",
  },
  {
    id: "veloce-ai",
    stat: "99.4% client meeting attendance",
    quote:
      "Smart qualification workflows removed manual no-shows completely and gave our sales engineering team its focus back.",
    author: "Julian Chen",
    role: "VP of Engineering at Veloce AI",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/b7/b72b0f4f4e2184862eb73dfd44a2f950ce712284c82dc52099d0c0df634e8306.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/b7/b72b0f4f4e2184862eb73dfd44a2f950ce712284c82dc52099d0c0df634e8306.jpg",
    alt: "Julian Chen in high-tech corporate office",
  },
  {
    id: "hyperion-health",
    stat: "65 hours saved monthly",
    quote:
      "Patients schedule specialty consultations in seconds, giving our clinicians more high-value care time.",
    author: "Dr. Amara Okafor",
    role: "Chief Medical Officer at Hyperion Health",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/92/926db583face6f84ed326570a2d38c0e7b1338449f444de0e6d0b920b40e552f.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/92/926db583face6f84ed326570a2d38c0e7b1338449f444de0e6d0b920b40e552f.jpg",
    alt: "Dr. Amara Okafor examining care timelines in modern medical center",
  },
  {
    id: "aura-craft",
    stat: "$48,000 saved annually",
    quote:
      "Eliminating email tennis accelerated our bespoke customer intake and noticeably elevated our brand impression.",
    author: "Maya Lindqvist",
    role: "Creative Director & Founder at Aura Craft",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/56/56efabba2e6ba75d83c0d8a93e27e695630b6ef6df1f0f92542e6f7d88e585a5.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/56/56efabba2e6ba75d83c0d8a93e27e695630b6ef6df1f0f92542e6f7d88e585a5.jpg",
    alt: "Maya Lindqvist working with artisan craft prototypes",
  },
  {
    id: "echo-labs",
    stat: "82% reduction in coordination overhead",
    quote:
      "Distributed asynchronous scheduling let our remote founders operate seamlessly across twelve timezones.",
    author: "Siddharth Rao",
    role: "Co-Founder & COO at Echo Labs",
    defaultImage:
      "https://cdn.21st.dev/assets/mirror/bf/bf5e190044b602e47fe1fd6933360d80a1503e25b1f86bb28222d49e797224f3.jpg",
    selectedImage:
      "https://cdn.21st.dev/assets/mirror/bf/bf5e190044b602e47fe1fd6933360d80a1503e25b1f86bb28222d49e797224f3.jpg",
    alt: "Siddharth Rao on a walking consultation outside an open-air tech campus",
  },
];

export default function CarouselDemo() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-indigo-100/40 via-background to-orange-100/40 dark:from-background dark:via-background dark:to-background">
      <CalendlyCarousel
        items={SERVICES_CAROUSEL_DATA}
        autoPlayInterval={6000}
        pauseOnHover={false}
      />
    </main>
  );
}
