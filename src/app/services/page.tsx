import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DISCIPLINES = [
  {
    slug: 'ui-ux-design',
    title: 'UI/UX & Web Design',
    division: 'Sparsh Design Studio',
    lead: 'Responsive web designs, CMS architectures, portfolio websites, and e-commerce platforms.',
    email: 'contact@sparshdesign.com',
  },
  {
    slug: 'creative-logo-design',
    title: 'Creative Logo Design',
    division: 'Sparsh Design Studio',
    lead: 'Unique, custom logo designs that declare your presence and establish your brand authority.',
    email: 'contact@sparshdesign.com',
  },
  {
    slug: 'graphics-design',
    title: 'Graphics Design & Branding',
    division: 'Sparsh Design Studio',
    lead: 'Outdoor branding, corporate stationery, daily marketing creatives, and packaging.',
    email: 'contact@sparshdesign.com',
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    division: 'Sparsh Design Digital Marketing',
    lead: 'Gaining targeted website traffic, driving leads, and running high-conversion social campaigns.',
    email: 'contact@sparshdesign.com',
  },
  {
    slug: 'brand-identity',
    title: 'Brand Identity & Packaging',
    division: 'Sparsh Design Studio',
    lead: 'Enduring visual systems and comprehensive brand guidelines that outlast market cycles.',
    email: 'contact@sparshdesign.com',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    division: 'DAVLabs Systems Engineering',
    lead: 'Sub-second edge speeds, resilient cloud architectures, and zero runtime drift.',
    email: 'contact@davlabs.in',
  },
  {
    slug: 'app-development',
    title: 'App Development',
    division: 'DAVLabs Systems Engineering',
    lead: 'Native 120Hz gesture response with offline CRDT certainty on iOS and Android.',
    email: 'contact@davlabs.in',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    division: 'DAVLabs Intelligence Systems',
    lead: 'Autonomous multi-agent execution loops and enterprise semantic RAG workflows.',
    email: 'contact@davlabs.in',
  },
];

import MercuryBackground from '@/components/ui/mercury-background';

export default function ServicesIndexPage() {
  return (
    <MercuryBackground>
      {/* Main Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-12 sm:pt-16 pb-32 text-zinc-900">
        <div className="mb-10">
          <Button variant="push-outline" size="sm" asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Studio</span>
            </Link>
          </Button>
        </div>

        <div className="space-y-4 mb-16 sm:mb-20">
          <h1 className="font-bold text-5xl sm:text-7xl lg:text-8xl text-zinc-950 tracking-[-0.035em] leading-[1.05]">
            Studio Disciplines
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-600 max-w-3xl leading-relaxed font-normal tracking-[-0.012em]">
            Engineering precision paired with editorial craft. Dedicated practices for modern ambitious brands.
          </p>
        </div>

        <div className="border-t border-zinc-200/80 mb-12" />

        <div className="divide-y divide-zinc-200/70">
          {DISCIPLINES.map((d, idx) => (
            <div
              key={d.slug}
              className="py-8 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-baseline justify-between gap-6 group"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-zinc-400">0{idx + 1}</span>
                  <Link
                    href={`/services/${d.slug}`}
                    className="font-bold text-2xl sm:text-3xl text-zinc-900 tracking-[-0.03em] group-hover:text-zinc-600 transition-colors"
                  >
                    {d.title}
                  </Link>
                </div>
                <p className="pl-7 text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                  {d.lead}
                </p>
              </div>

              <div className="flex items-center gap-4 pl-7 md:pl-0">
                <Button variant="push" size="sm" asChild className="gap-1.5">
                  <Link href={`/services/${d.slug}`}>
                    <span>View Discipline</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <span>DAVLabs &times; Sparsh Design Collaborative Studio</span>
          <span>Available for select commissions</span>
        </div>
      </main>
    </MercuryBackground>
  );
}
