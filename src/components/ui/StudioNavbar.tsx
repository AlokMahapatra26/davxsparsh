'use client';

import React from 'react';
import { CardNav } from '@/components/ui/CardNav';

export interface StudioNavbarProps {
  logoHref?: string;
}

export function StudioNavbar({ logoHref = '/' }: StudioNavbarProps = {}) {
  const BrandLogo = (
    <div className="flex items-center gap-2 text-sm sm:text-base font-semibold tracking-tight">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-current">
        <circle cx="8" cy="12" r="6" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="font-bold text-[var(--ink-primary,#09090b)]">DAVLabs</span>
      <span className="opacity-40">&times;</span>
      <span className="opacity-75 text-[var(--ink-secondary,#52525b)]">Sparsh</span>
    </div>
  );

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none flex justify-center">
      <div className="w-[94%] sm:w-[80%] md:w-[65%] lg:w-[50%] mx-auto pointer-events-auto">
        <CardNav
          logo={BrandLogo}
          logoAlt="DAVLabs and Sparsh Design"
          logoHref={logoHref}
          theme="light"
          surface="solid"
          cardEffect="rise"
          maxWidth="100%"
          cta={{ label: "Contact", href: "/contact" }}
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
                { label: "Contact Us", href: "/contact" },
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

