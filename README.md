# DAVLabs &times; Sparsh Design &mdash; Next.js Collaborative Studio

An ultra-minimal, tasteful white/light single-page website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**, celebrating the strategic collaboration between:
- **DAVLabs**: Enterprise IT Solutions, Cloud Architecture, Scalable Backends, APIs & AI Engineering.
- **Sparsh Design**: Artisanal Product & Brand Design, Bespoke UI/UX, Design Systems, Typography & Tokens.

---

## Technical Stack
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling**: Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) + `@tailwindcss/postcss`.
- **UI Architecture**: Standard shadcn structure (`components.json`, `@/lib/utils`, `@/components/ui/`).
- **Smooth Animation & 3D Math**: GSAP ScrollTrigger, Lenis smooth scrolling, CSS 3D cylinder cylindrical projection.
- **Typography Optimization**: `next/font/google` with *Plus Jakarta Sans*, *Playfair Display*, and *JetBrains Mono*.

---

## Integrated Components
1. **Tilted Grid Hero (`TiltedGridHero`)**:
   - Location: `src/components/ui/tilted-grid-hero.tsx`
   - Feature: Math-driven 3D cylinder with multi-slice curvature, zero layout drift, composited CSS transforms, and endless circular tile rotation.
2. **Interactive Studio Lens / Spectrum**: Switch between *Combined Synergy*, *DAVLabs [IT Solutions]*, and *Sparsh Design [Design]*.
3. **Interactive Engagement Blueprint & Estimator**: Real-time project scope, team configuration, timeline calculation, and auto-filling contact form.
4. **Synergy Matrix**: Direct value comparison of engineering vs. design disciplines.

---

## Development & Production Commands

Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
npm run build
npm run start
```
