import React, { Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Plus,
  ArrowRight,
  CheckCircle2,
  Mail
} from 'lucide-react';
import BackgroundPaths from '@/components/kokonutui/background-paths';
import { StudioNavbar } from '@/components/ui/StudioNavbar';
import { Button } from '@/components/ui/button';
import { ReturnToStudio } from '@/components/ui/return-to-studio';
import { BentoGridShowcase } from '@/components/ui/bento-grid';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

interface BentoMetadata {
  mainImage: string;
  secondaryImage: string;
  stack: string[];
  tags: string[];
  stat: {
    value: string;
    label: string;
    description: string;
  };
  delivery: {
    cadence: string;
    description: string;
  };
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
    email: 'contact@davlabs.in',
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
    email: 'contact@davlabs.in',
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
    email: 'contact@davlabs.in',
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

const SERVICE_BENTO_METADATA: Record<string, BentoMetadata> = {
  'web-development': {
    mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
    stack: ['Next.js 16', 'TypeScript', 'React 19', 'Tailwind v4', 'Docker', 'Turbopack'],
    tags: ['Sub-Second TTFB', '100/100 Vitals', 'Zero Downtime', 'Type-Safe APIs'],
    stat: {
      value: '99.99%',
      label: 'Edge Availability SLA',
      description: 'Hybrid edge streaming ensuring microscopic time-to-first-byte globally with zero layout drift.'
    },
    delivery: {
      cadence: '2-3 Wk Sprints',
      description: 'Continuous integration pipelines with automated preview deployments on every pull request.'
    }
  },
  'app-development': {
    mainImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
    stack: ['SwiftUI', 'Kotlin', 'React Native', 'CoreHaptics', 'CRDTs', 'SQLite'],
    tags: ['120 FPS Fluid', 'Offline First', 'Tactile Haptics', 'Zero Battery Leak'],
    stat: {
      value: '120 FPS',
      label: 'ProMotion Frame Fluidity',
      description: 'Hardware-accelerated rendering pipelines delivering stutter-free gesture response and offline certainty.'
    },
    delivery: {
      cadence: '3-4 Wk Sprints',
      description: 'TestFlight and Google Play Internal testing tracks with weekly interactive release builds.'
    }
  },
  'ai-automation': {
    mainImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80&auto=format&fit=crop',
    stack: ['LangChain', 'OpenAI / Claude', 'Python 3.12', 'Vector RAG', 'FastAPI', 'Temporal'],
    tags: ['Autonomous Loops', 'Semantic RAG', 'Deterministic Gates', 'Zero Data Leak'],
    stat: {
      value: '10x',
      label: 'Workflow Throughput',
      description: 'Self-correcting agentic execution loops coordinating research, data synthesis, and API triggers.'
    },
    delivery: {
      cadence: '2-3 Wk Sprints',
      description: 'Staged human-in-the-loop pilot evaluations followed by hardened VPC enterprise integration.'
    }
  },
  'ui-ux-design': {
    mainImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80&auto=format&fit=crop',
    stack: ['Figma Master Lib', 'Design Tokens', 'Framer Motion', 'Storybook', 'Principle', 'UserTesting'],
    tags: ['Spatial Rhythm', 'Token Parity', 'Spring Physics', 'WCAG 2.2 AA'],
    stat: {
      value: '100%',
      label: 'Design-to-Code Parity',
      description: 'Mathematical whitespace scales and typography pairings synchronized with atomic code tokens.'
    },
    delivery: {
      cadence: '1-2 Wk Sprints',
      description: 'Figma design reviews twice weekly with live interactive prototype clickable walkthroughs.'
    }
  },
  'creative-logo-design': {
    mainImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80&auto=format&fit=crop',
    stack: ['Adobe Illustrator', 'Geometric Grids', 'SVG Vector', 'Pantone Matching', 'Glyphs 3', 'PDF/X-1a'],
    tags: ['Optical Balance', '100% Vector', 'Trademark Ready', 'Multi-Lockup Suite'],
    stat: {
      value: '100%',
      label: 'Vector Grid Precision',
      description: 'Engineered on mathematical geometric grids for immaculate sharpness from favicons to billboards.'
    },
    delivery: {
      cadence: '1-2 Wk Sprints',
      description: 'Initial exploratory concept boards within 5 days, followed by optical balancing and vector handoff.'
    }
  },
  'logo-design': {
    mainImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80&auto=format&fit=crop',
    stack: ['Adobe Illustrator', 'Geometric Grids', 'SVG Vector', 'Pantone Matching', 'Glyphs 3', 'PDF/X-1a'],
    tags: ['Optical Balance', '100% Vector', 'Trademark Ready', 'Multi-Lockup Suite'],
    stat: {
      value: '100%',
      label: 'Vector Grid Precision',
      description: 'Engineered on mathematical geometric grids for immaculate sharpness from favicons to billboards.'
    },
    delivery: {
      cadence: '1-2 Wk Sprints',
      description: 'Initial exploratory concept boards within 5 days, followed by optical balancing and vector handoff.'
    }
  },
  'graphics-design': {
    mainImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80&auto=format&fit=crop',
    stack: ['Adobe InDesign', 'Photoshop', 'Illustrator', 'CMYK 300 DPI', 'After Effects', 'Cinema 4D'],
    tags: ['Large Format Ready', 'Packaging Craft', 'Stationery Suites', 'Animated Creatives'],
    stat: {
      value: '300 DPI',
      label: 'Print Production Standard',
      description: 'High-visibility outdoor hoardings, retail packaging mockups, and corporate stationery suites.'
    },
    delivery: {
      cadence: '1-2 Wk Sprints',
      description: 'High-resolution print-ready preflight checks with printer-certified PDF proofing.'
    }
  },
  'social-media-marketing': {
    mainImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80&auto=format&fit=crop',
    stack: ['Meta Ads Manager', 'Google Analytics 4', 'CapCut Pro', 'LinkedIn Campaign', 'Looker Studio'],
    tags: ['Lead Funnels', 'High ROAS', 'Daily Content', 'A/B Creative Tests'],
    stat: {
      value: '3.8x',
      label: 'Average Campaign ROAS',
      description: 'Precision demographic targeting, retargeting funnels, and optimized ad spend maximizing ROI.'
    },
    delivery: {
      cadence: 'Weekly Dashboards',
      description: 'Transparent live reporting tracking impressions, click-through rates, ROAS, and conversion cost.'
    }
  },
  'brand-identity': {
    mainImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&auto=format&fit=crop',
    stack: ['Brand Standards', 'Pantone Solid', 'Font Hierarchy', 'Packaging Dielines', 'Motion Tokens'],
    tags: ['Living Guidelines', 'Optical Marks', 'Color Science', 'Editorial Rules'],
    stat: {
      value: '100%',
      label: 'Brand Identity Cohesion',
      description: 'Exhaustive living guidelines covering spatial layouts, motion behavior, and voice principles.'
    },
    delivery: {
      cadence: '3-4 Wk Sprints',
      description: 'Comprehensive brand book handoff spanning typography, color science, and tactile print guidelines.'
    }
  }
};

const DEFAULT_METADATA: BentoMetadata = {
  mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop',
  secondaryImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
  stack: ['Architecture', 'Engineering', 'Editorial Polish', 'Design Systems'],
  tags: ['High Precision', 'Resilient Speed', 'Production Ready', 'Tailored Craft'],
  stat: {
    value: '99.99%',
    label: 'Reliability Guarantee',
    description: 'Bespoke solutions architected to outlast standard market and product lifecycles.'
  },
  delivery: {
    cadence: '2-3 Wk Sprints',
    description: 'Structured sprint delivery with dedicated lead oversight and transparent reviews.'
  }
};

async function ServiceDetailContent({ params }: ServicePageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z-]/g, '');
  const service = SERVICE_REGISTRY[normalizedSlug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    lead: 'Purpose-built software and thoughtful digital aesthetics crafted for modern ambitious brands.',
    division: 'DAVLabs × Sparsh Design',
    email: 'contact@davlabs.in',
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

  const meta = SERVICE_BENTO_METADATA[normalizedSlug] || DEFAULT_METADATA;

  // Bento Grid Slot 1: Stack & Standards
  const IntegrationsSlot = (
    <Card className="h-full bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-sm flex flex-col justify-between rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg font-bold text-zinc-950">
          Stack & Standards
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-zinc-500">
          Production-grade tooling & modern engineering ecosystem.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-2 pt-0 pb-6">
        {meta.stack.map((tool) => (
          <div
            key={tool}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100/90 text-xs font-semibold text-zinc-800 border border-zinc-200/70 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7900]" />
            <span>{tool}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  // Bento Grid Slot 2: Main Tall Centerpiece (Spans 3 Rows)
  const MainFeatureSlot = (
    <Card className="relative h-full w-full min-h-[440px] md:min-h-full overflow-hidden rounded-2xl border border-zinc-200/80 shadow-md group">
      <img
        src={meta.mainImage}
        alt={service.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-6 sm:p-8 z-10">
        <span className="text-[#9eff3e] text-xs font-mono uppercase tracking-widest font-bold mb-2">
          Discipline Focus
        </span>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-200/90 leading-relaxed max-w-md line-clamp-3">
          {service.lead}
        </p>
      </div>
    </Card>
  );

  // Bento Grid Slot 3: Feature Tags
  const FeatureTagsSlot = (
    <Card className="h-full bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-sm flex flex-col justify-center p-6 gap-3 rounded-2xl hover:shadow-md transition-shadow">
      <div className="mb-1">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
          Core Tenets
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {meta.tags.map((tag, idx) => (
          <Badge
            key={tag}
            variant={idx % 2 === 0 ? 'outline' : 'secondary'}
            className="w-fit items-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-full border-zinc-300 text-zinc-800 bg-white/80"
          >
            {tag} <Plus className="h-3 w-3 text-zinc-400" />
          </Badge>
        ))}
      </div>
    </Card>
  );

  // Bento Grid Slot 4: Secondary Feature Quote & Visual
  const SecondaryFeatureSlot = (
    <Card className="relative h-full w-full min-h-[220px] overflow-hidden rounded-2xl border border-zinc-200/80 shadow-sm group">
      <img
        src={meta.secondaryImage}
        alt="Core capability visual"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 z-10">
        <span className="text-[#9eff3e] text-[10px] font-mono uppercase tracking-widest block mb-1 font-semibold">
          Pillar • {service.capabilities[0]?.title || 'Architecture'}
        </span>
        <p className="text-sm font-bold text-white leading-snug drop-shadow-sm">
          {service.capabilities[0]?.detail || service.description.slice(0, 100) + '...'}
        </p>
      </div>
    </Card>
  );

  // Bento Grid Slot 5: Statistics & Verified Metric (Spans 2 Rows)
  const StatisticSlot = (
    <Card className="flex h-full flex-col justify-between bg-gradient-to-br from-[#9eff3e]/20 via-[#9eff3e]/10 to-white/95 p-6 sm:p-8 rounded-2xl border border-[#9eff3e]/40 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-end">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-700 font-bold bg-white/90 px-3 py-1 rounded-full border border-zinc-200/80 shadow-xs">
          Verified Metric
        </span>
      </div>
      <div className="my-6">
        <p className="text-5xl sm:text-6xl font-black text-zinc-950 tracking-tight">
          {meta.stat.value}
        </p>
        <p className="text-sm sm:text-base font-bold text-zinc-900 mt-2">
          {meta.stat.label}
        </p>
      </div>
      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-black/10 pt-4 font-sans">
        {meta.stat.description}
      </p>
    </Card>
  );

  // Bento Grid Slot 6: Delivery Cadence & Team
  const JourneySlot = (
    <Card className="relative h-full w-full overflow-hidden p-6 bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-sm flex flex-col justify-between rounded-2xl hover:shadow-md transition-shadow">
      <div>
        <CardTitle className="text-base font-bold text-zinc-950 mb-1">Delivery Cadence</CardTitle>
        <CardDescription className="text-xs text-zinc-500 leading-relaxed">
          {meta.delivery.description}
        </CardDescription>
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
        <div className="flex -space-x-2">
          <Avatar className="w-8 h-8 border-2 border-white shadow-xs">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            <AvatarFallback>DL</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white shadow-xs">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-[11px] font-mono text-zinc-700 font-semibold bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200">
          {meta.delivery.cadence}
        </span>
      </div>
    </Card>
  );

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

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-32 text-zinc-900">
        {/* Breadcrumb Return Navigation */}
        <div className="mb-8">
          <ReturnToStudio />
        </div>

        {/* Page Hero Header */}
        <div className="space-y-4 mb-12 sm:mb-16">
          <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl text-zinc-950 tracking-[-0.035em] capitalize leading-[1.05]">
            {service.title}
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-zinc-600 max-w-3xl leading-relaxed font-normal tracking-[-0.012em]">
            {service.lead}
          </p>
        </div>

        {/* Hairline Divider */}
        <div className="border-t border-zinc-200/80 mb-12 sm:mb-16" />

        {/* Bento Grid Showcase Integration */}
        <div className="mb-20 sm:mb-24">
          <BentoGridShowcase
            integrations={IntegrationsSlot}
            featureTags={FeatureTagsSlot}
            mainFeature={MainFeatureSlot}
            secondaryFeature={SecondaryFeatureSlot}
            statistic={StatisticSlot}
            journey={JourneySlot}
          />
        </div>

        {/* Core Capabilities Deep-Dive */}
        <div className="mb-20 sm:mb-24 space-y-8">
          <div className="pb-3 border-b border-zinc-200/80">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
              Core Capabilities & Deliverables
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-zinc-200/80 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {item.num}
                  </span>
                  <h3 className="font-bold text-lg text-zinc-950 tracking-tight group-hover:text-zinc-700 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Commission CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-zinc-800">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9eff3e] font-semibold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Direct Engagement Brief
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Commission {service.title}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Engage directly with our practice lead. Send your project parameters or schedule a scoping consultation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <Button
              variant="default"
              size="lg"
              asChild
              className="bg-[#9eff3e] text-black hover:bg-white hover:text-black font-bold rounded-full px-6 py-6 transition-all duration-200 shadow-md"
            >
              <a
                href={`mailto:${service.email}?subject=${encodeURIComponent(
                  `Inquiry: ${service.title} Engagement`
                )}`}
                className="flex items-center gap-2"
              >
                <span>Email {service.division.split(' ')[0]}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-zinc-700 text-white hover:bg-zinc-800 font-bold rounded-full px-6 py-6 transition-all duration-200"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <span>Contact Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Editorial Footnote */}
        <div className="mt-20 pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <span>DAVLabs &times; Sparsh Design Collaborative Studio</span>
          <span>Available for select enterprise and product commissions</span>
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
