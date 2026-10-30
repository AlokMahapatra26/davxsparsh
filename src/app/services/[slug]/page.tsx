import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import BackgroundPaths from '@/components/kokonutui/background-paths';
import { StudioNavbar } from '@/components/ui/StudioNavbar';
import { Button } from '@/components/ui/button';
import { ReturnToStudio } from '@/components/ui/return-to-studio';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'web-development' },
    { slug: 'app-development' },
    { slug: 'ai-automation' },
    { slug: 'ui-ux-design' },
    { slug: 'creative-logo-design' },
    { slug: 'logo-design' },
    { slug: 'graphics-design' },
    { slug: 'social-media-marketing' },
    { slug: 'brand-identity' },
  ];
}

interface ServiceData {
  title: string;
  lead: string;
  division: string;
  email: string;
  description: string;
  capabilities: { num: string; title: string; detail: string }[];
}

const SERVICE_REGISTRY: Record<string, ServiceData> = {
  'creative-logo-design': {
    title: 'Creative Logo Design',
    lead: 'Unique, custom brand marks that declare your presence and start your business on the right foot.',
    division: 'Sparsh Design Studio',
    email: 'contact@sparshdesign.com',
    description:
      'We provide creative, unique, and custom logo designs. The icon that declares your presence to the world. Logo is your first impression, so start the life of your business on the right foot with a distinct visual signature.',
    capabilities: [
      {
        num: '01',
        title: 'Bespoke Concept Exploration',
        detail: 'Multiple distinctive creative logo directions rooted in competitive research and brand essence.',
      },
      {
        num: '02',
        title: 'Optical Grid Balancing',
        detail: 'Engineered on mathematical geometric grids for immaculate sharpness from app favicons to billboard signage.',
      },
      {
        num: '03',
        title: 'Complete Vector Identity Suite',
        detail: 'Full handoff containing AI, EPS, SVG, and high-resolution PNG lockups for print, embroidery, and web.',
      },
      {
        num: '04',
        title: 'Trademark Ready & Copyright Proof',
        detail: '100% original crafted marks ready for formal intellectual property and trademark filing.',
      },
    ],
  },
  'logo-design': {
    title: 'Creative Logo Design',
    lead: 'Unique, custom brand marks that declare your presence and start your business on the right foot.',
    division: 'Sparsh Design Studio',
    email: 'contact@sparshdesign.com',
    description:
      'We provide creative, unique, and custom logo designs. The icon that declares your presence to the world. Logo is your first impression, so start the life of your business on the right foot with a distinct visual signature.',
    capabilities: [
      {
        num: '01',
        title: 'Bespoke Concept Exploration',
        detail: 'Multiple distinctive creative logo directions rooted in competitive research and brand essence.',
      },
      {
        num: '02',
        title: 'Optical Grid Balancing',
        detail: 'Engineered on mathematical geometric grids for immaculate sharpness from app favicons to billboard signage.',
      },
      {
        num: '03',
        title: 'Complete Vector Identity Suite',
        detail: 'Full handoff containing AI, EPS, SVG, and high-resolution PNG lockups for print, embroidery, and web.',
      },
      {
        num: '04',
        title: 'Trademark Ready & Copyright Proof',
        detail: '100% original crafted marks ready for formal intellectual property and trademark filing.',
      },
    ],
  },
  'graphics-design': {
    title: 'Graphics Design & Branding',
    lead: 'High-impact visual creatives, outdoor branding, corporate stationery, and packaging design.',
    division: 'Sparsh Design Studio',
    email: 'contact@sparshdesign.com',
    description:
      'Pixel-perfect graphic design services crafting everything your brand needs to communicate with power. From large-format outdoor hoardings and exhibition booths to daily social creatives, corporate stationery, video creation, and packaging.',
    capabilities: [
      {
        num: '01',
        title: 'Outdoor & Large Format Branding',
        detail: 'High-visibility hoardings, banners, exhibition kiosks, and environmental vehicular graphics.',
      },
      {
        num: '02',
        title: 'Daily Marketing Creatives',
        detail: 'Fast-turnaround promo banners, social media posts, and visual campaign assets crafted for high engagement.',
      },
      {
        num: '03',
        title: 'Corporate Stationery Suites',
        detail: 'Cohesive business cards, letterheads, presentation folders, envelopes, and proposal decks.',
      },
      {
        num: '04',
        title: 'Packaging & Video Creation',
        detail: 'Tactile product packaging, retail label architecture, and animated promotional video creatives.',
      },
    ],
  },
  'social-media-marketing': {
    title: 'Social Media Marketing',
    lead: 'Gaining targeted website traffic, qualified leads, and brand authority across digital channels.',
    division: 'Sparsh Design Digital Marketing',
    email: 'contact@sparshdesign.com',
    description:
      'Great marketing on social media can bring remarkable success to your business by driving high volumes of leads and sales. We create and execute high-converting content and paid campaigns across Instagram, Facebook, LinkedIn, and YouTube to attain your branding and revenue goals.',
    capabilities: [
      {
        num: '01',
        title: 'High-Conversion Lead Generation',
        detail: 'Precision demographic targeting, retargeting funnels, and optimized ad spend maximizing customer acquisition.',
      },
      {
        num: '02',
        title: 'Strategic Content Production',
        detail: 'Engaging daily reels, carousels, and stories engineered to capture viewer attention and boost algorithmic reach.',
      },
      {
        num: '03',
        title: 'Organic Reach & Community Growth',
        detail: 'Active customer interaction, comment management, and influencer partnership coordination.',
      },
      {
        num: '04',
        title: 'Data Analytics & Performance Dashboards',
        detail: 'Transparent weekly reporting tracking impressions, click-through rates, ROAS, and conversion cost.',
      },
    ],
  },
  'ui-ux-design': {
    title: 'UI/UX & Web Design',
    lead: 'Building responsive, pixel-perfect digital experiences, portfolio sites, and e-commerce platforms.',
    division: 'Sparsh Design Studio',
    email: 'contact@sparshdesign.com',
    description:
      'We design digital products that articulate clarity, dignity, and technological distinction. From exploratory conceptualization to production-ready design systems with multi-brand token workflows, every detail is mathematically anchored to create calm focus and elevate product authority.',
    capabilities: [
      {
        num: '01',
        title: 'Spatial Systems & Rhythm',
        detail: 'Mathematical whitespace scales and typography pairings honoring editorial publishing traditions.',
      },
      {
        num: '02',
        title: 'Design Systems & Tokens',
        detail: 'Production-ready Figma libraries synchronized with atomic code tokens for frictionless engineering parity.',
      },
      {
        num: '03',
        title: 'Physics-Based Motion',
        detail: 'Spring-damped micro-interactions calibrated to mimic physical mass and delight the human eye.',
      },
      {
        num: '04',
        title: 'End-to-End Usability Testing',
        detail: 'Rigorous interactive prototyping and cognitive walkthroughs verifying intuitive ease before engineering.',
      },
    ],
  },
  'web-development': {
    title: 'Web Development',
    lead: 'Engineered web architectures delivering sub-second edge speeds and resilient global scalability.',
    division: 'DAVLabs Systems Engineering',
    email: 'web@davlabs.design',
    description:
      'High-performance full-stack web platforms engineered with strict type safety, edge caching, and atomic component architecture. Built for mission-critical digital products that demand uncompromising speed and architectural cleanliness.',
    capabilities: [
      {
        num: '01',
        title: 'Edge Compute & Next.js',
        detail: 'Partial Prerendering and hybrid edge streaming ensuring microscopic time-to-first-byte globally.',
      },
      {
        num: '02',
        title: 'Resilient Cloud Systems',
        detail: 'Elastic multi-region infrastructure with automated self-healing and zero-downtime rollouts.',
      },
      {
        num: '03',
        title: 'Full-Stack Type Safety',
        detail: 'Strict end-to-end typing from database schemas to client state, eradicating production runtime drift.',
      },
      {
        num: '04',
        title: 'Core Web Vitals Perfection',
        detail: 'Zero cumulative layout shift and microscopic asset footprints optimized for search authority.',
      },
    ],
  },
  'app-development': {
    title: 'App Development',
    lead: 'Native mobile software crafted for fluid 120Hz gesture response and offline certainty.',
    division: 'DAVLabs Systems Engineering',
    email: 'apps@davlabs.design',
    description:
      'Purpose-built applications for iOS and Android with native Swift and Kotlin foundations. We pair physical tactile haptics with local-first conflict resolution to ensure your application remains responsive even in subterranean connectivity.',
    capabilities: [
      {
        num: '01',
        title: 'Native Swift & Kotlin Modules',
        detail: 'Hardware-accelerated rendering pipelines delivering stutter-free 120 FPS ProMotion fluidity.',
      },
      {
        num: '02',
        title: 'CRDT Offline Synchronization',
        detail: 'Local-first data stores resolving distributed edits mathematically without data loss.',
      },
      {
        num: '03',
        title: 'Tactile Sensory Haptics',
        detail: 'Custom CoreHaptics calibration offering physical confirmation for critical user transactions.',
      },
      {
        num: '04',
        title: 'Battery-Conscious Life Cycle',
        detail: 'Intelligent background synchronization protocols preventing unexpected battery depletion.',
      },
    ],
  },
  'ai-automation': {
    title: 'AI Automation',
    lead: 'Autonomous multi-agent workflows that streamline enterprise operations with mathematical precision.',
    division: 'DAVLabs Intelligence Systems',
    email: 'ai@davlabs.design',
    description:
      'Transforming operational bottlenecks into autonomous, self-verifying execution pipelines. We integrate custom fine-tuned LLMs, hybrid semantic retrieval, and sandboxed tool-calling environments with strict deterministic validation gates.',
    capabilities: [
      {
        num: '01',
        title: 'Multi-Agent Orchestration',
        detail: 'Self-correcting agentic execution loops coordinating research, data synthesis, and API triggers.',
      },
      {
        num: '02',
        title: 'Enterprise Semantic RAG',
        detail: 'Hybrid vector and lexical retrieval engines indexing proprietary documents with verified citations.',
      },
      {
        num: '03',
        title: 'Human-in-the-Loop Gates',
        detail: 'Deterministic validation checks and escalation workflows protecting sensitive corporate actions.',
      },
      {
        num: '04',
        title: 'Private & Secure Deployments',
        detail: 'Strict VPC deployments guaranteeing proprietary organizational knowledge never leaks into training sets.',
      },
    ],
  },
  'brand-identity': {
    title: 'Brand Identity & Packaging',
    lead: 'Enduring visual languages, brand standards, and packaging designed to outlast market cycles.',
    division: 'Sparsh Design Studio',
    email: 'contact@sparshdesign.com',
    description:
      'Crafting timeless brand marks and cohesive identity systems that articulate pedigree, authority, and emotional resonance. We develop comprehensive brand books spanning typography hierarchy, color science, motion choreography, and tactile physical collateral.',
    capabilities: [
      {
        num: '01',
        title: 'Optical Logomark Grids',
        detail: 'Mathematically balanced logomarks engineered for instant optical clarity from 16px to architectural signage.',
      },
      {
        num: '02',
        title: 'Curated Color Harmonies',
        detail: 'Calibrated color formulations tested across digital sRGB displays and tactile Pantone print surfaces.',
      },
      {
        num: '03',
        title: 'Editorial Typography Rules',
        detail: 'Distinctive typography hierarchies establishing unmistakable brand cadence across all mediums.',
      },
      {
        num: '04',
        title: 'Comprehensive Brand Standards',
        detail: 'Exhaustive living guidelines covering spatial layouts, motion behavior, and voice principles.',
      },
    ],
  },
};

async function ServiceDetailContent({ params }: ServicePageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z-]/g, '');
  const service = SERVICE_REGISTRY[normalizedSlug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    lead: 'Purpose-built software and thoughtful digital aesthetics crafted for modern ambitious brands.',
    division: 'DAVLabs × Sparsh Design',
    email: 'inquiries@davlabs.design',
    description:
      'Our collaborative studio unites deep technical architecture with elevated editorial craft to build digital products that endure.',
    capabilities: [
      {
        num: '01',
        title: 'Engineering Rigor',
        detail: 'Zero-compromise performance, resilience, and architectural craftsmanship.',
      },
      {
        num: '02',
        title: 'Editorial Polish',
        detail: 'Refined typography, spatial rhythm, and aesthetic restraint in every interaction.',
      },
    ],
  };

  return (
    <BackgroundPaths
      className="min-h-screen w-full bg-[#ebe8f9] !bg-[#ebe8f9] text-zinc-300/80 flex flex-col justify-start selection:bg-zinc-900 selection:text-white font-sans antialiased"
      count={40}
      spread={1.1}
      angle={-7}
      speed={0.75}
      interactive={true}
    >
      {/* Studio Floating CardNav */}
      <StudioNavbar />

      {/* Main Editorial Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 sm:pt-40 pb-32 text-zinc-900">
        {/* Subtle breadcrumb */}
        <div className="mb-10">
          <ReturnToStudio />
        </div>

        {/* Title & Lead */}
        <div className="space-y-4 mb-16 sm:mb-20">
          <h1 className="font-bold text-5xl sm:text-7xl lg:text-8xl text-zinc-950 tracking-[-0.035em] capitalize leading-[1.05]">
            {service.title}
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-600 max-w-3xl leading-snug font-normal tracking-[-0.012em]">
            {service.lead}
          </p>
        </div>

        {/* Hairline Divider */}
        <div className="border-t border-zinc-200/80 mb-16 sm:mb-20" />

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Philosophy & Direct Inquiries */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Discipline Overview
              </span>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
                {service.description}
              </p>
            </div>

            {/* Direct Inquiry Contact Card */}
            <div className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                  Direct Inquiries
                </span>
                <p className="font-bold text-lg text-zinc-900 tracking-tight">
                  Commission this discipline
                </p>
              </div>

              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                Send your brief or project scope directly to our dedicated practice lead.
              </p>

              <div className="pt-2">
                <Button variant="push" size="lg" asChild className="gap-2.5">
                  <a
                    href={`mailto:${service.email}?subject=${encodeURIComponent(
                      `Inquiry: ${service.title} Engagement`
                    )}`}
                  >
                    <span>{service.email}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Key Capabilities / Standards */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Core Capabilities
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {service.division}
              </span>
            </div>

            <div className="divide-y divide-zinc-200/70">
              {service.capabilities.map((item) => (
                <div key={item.num} className="py-6 first:pt-0 last:pb-0 space-y-2 group">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-zinc-400 font-normal">
                      {item.num}
                    </span>
                    <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="pl-8 text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Editorial Footnote */}
        <div className="mt-24 pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <span>DAVLabs &times; Sparsh Design Collaborative Studio</span>
          <span>Available for select commissions</span>
        </div>
      </main>
    </BackgroundPaths>
  );
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#ebe8f9] text-zinc-400 flex items-center justify-center font-mono text-xs">
          Loading service...
        </div>
      }
    >
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}
