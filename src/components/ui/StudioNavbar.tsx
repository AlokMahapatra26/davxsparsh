'use client';

import React from 'react';
import { CardNav } from '@/components/ui/CardNav';

export function StudioNavbar() {
  const BrandLogo = (
    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-tight">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
        <circle cx="8" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="font-semibold text-zinc-950">DAVLabs</span>
      <span className="opacity-40">&times;</span>
      <span className="opacity-75 text-zinc-600">Sparsh</span>
    </div>
  );

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="w-full pointer-events-auto">
        <CardNav
          logo={BrandLogo}
          logoAlt="DAVLabs and Sparsh Design"
          logoHref="/"
          theme="light"
          surface="transparent"
          cardEffect="rise"
          maxWidth="100%"
          cta={{ label: "Contact", href: "mailto:contact@davlabs.in" }}
          items={[
            {
              label: "Services",
              description: "Engineering & sensory digital design.",
              links: [
                { label: "Web Development", href: "/services/web-development" },
                { label: "App Development", href: "/services/app-development" },
                { label: "AI Automation", href: "/services/ai-automation" },
                { label: "UI/UX & Web Design", href: "/services/ui-ux-design" },
                { label: "Creative Logo Design", href: "/services/creative-logo-design" },
                { label: "Graphics Design & Branding", href: "/services/graphics-design" },
                { label: "Social Media Marketing", href: "/services/social-media-marketing" },
                { label: "Brand Identity & Packaging", href: "/services/brand-identity" }
              ]
            },
            {
              label: "Approach",
              description: "First principles systems engineering.",
              links: [
                { label: "Systems Foundation", href: "/#approach" },
                { label: "Engineering Precision", href: "/#approach" },
                { label: "Iterative Delivery", href: "/#approach" }
              ]
            },
            {
              label: "Dialogue",
              description: "Direct inquiry for collaborations.",
              links: [
                { label: "DAVLabs (Engineering)", href: "mailto:contact@davlabs.in" },
                { label: "Sparsh Design (Craft)", href: "mailto:contact@sparshdesign.com" }
              ]
            }
          ]}
        />
      </div>
    </header>
  );
}

export default StudioNavbar;
