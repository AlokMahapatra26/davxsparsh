"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaDribbble, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export type PortfolioHighlight = {
  title: string;
  description: string;
};

export type PortfolioLink = {
  label: string;
  handle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Open in a new tab (default true for http(s) links) */
  external?: boolean;
};

export type PortfolioBlockContent = {
  badge: string;
  title: string;
  description: string;
  highlights: PortfolioHighlight[];
  cta: { label: string; href: string };
  profile: {
    name: string;
    role: string;
    bio: string;
    /** Photo URL. If omitted, `initials` are shown in a circle instead */
    image?: string;
    initials?: string;
  };
  links: PortfolioLink[];
};

const listVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

const defaultContent: PortfolioBlockContent = {
  badge: "Portfolio Insight",
  title: "Casper Lightman, Product Designer & Motion Director",
  description:
    "Principal product designer pairing narrative motion with premium SaaS brands. Casper leads founders and product teams through expressive design systems that convert curiosity into momentum.",
  highlights: [
    {
      title: "Collaborations",
      description:
        "Linear, Framer, Gamma, Clearbit, and early-stage founders crafting premium launches.",
    },
    {
      title: "Latest drop",
      description:
        "Aurora OS motion system · 47 reusable blueprints, adaptive tokens, and launch storyboard.",
    },
    {
      title: "Availability",
      description:
        "2 advisory spots for Q1 · Remote friendly across EU & US time zones.",
    },
  ],
  cta: { label: "View case studies", href: "https://casper.studio/case-studies" },
  profile: {
    name: "Casper Lightman",
    role: "Product Designer · Motion Director",
    bio: "Partnering with future-facing teams to choreograph interfaces that feel cinematic yet effortless.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
  },
  links: [
    { label: "Twitter", handle: "@caspermotions", href: "https://x.com/caspermotions", icon: FaXTwitter },
    { label: "LinkedIn", handle: "Casper Lightman", href: "https://linkedin.com/in/casperlightman", icon: FaLinkedinIn },
    { label: "Dribbble", handle: "caspermotion", href: "https://dribbble.com/caspermotion", icon: FaDribbble },
    { label: "GitHub", handle: "casper-studio", href: "https://github.com/casper-studio", icon: FaGithub },
  ],
};

interface GlassmorphismPortfolioBlockProps {
  content?: PortfolioBlockContent;
  /** Drop the full-screen section sizing so the block can live inside a card or modal */
  embedded?: boolean;
  className?: string;
}

export function GlassmorphismPortfolioBlock({
  content = defaultContent,
  embedded = false,
  className,
}: GlassmorphismPortfolioBlockProps) {
  const { badge, title, description, highlights, cta, profile, links } = content;
  const ctaExternal = /^https?:\/\//.test(cta.href);
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        embedded ? "" : "min-h-screen px-6 py-24 lg:py-32",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "relative overflow-hidden rounded-3xl",
            embedded
              ? "p-0"
              : "border border-border/50 bg-background/45 p-8 backdrop-blur-2xl md:p-12"
          )}
        >
          {/* Glass gradient overlay */}
          {!embedded && (
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.05] via-transparent to-transparent pointer-events-none" />
          )}

          <div className="relative grid gap-12 lg:grid-cols-2">
            {/* Left column - Main content */}
            <div className={embedded ? "space-y-6" : "space-y-8"}>
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/55 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-foreground/70 backdrop-blur transition-colors hover:bg-background/70"
              >
                {badge}
              </Badge>

              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                >
                  {title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-xl text-base leading-relaxed text-foreground/70"
                >
                  {description}
                </motion.p>
              </div>

              {/* Highlights grid */}
              <div className="grid gap-4 sm:grid-cols-1">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-5 backdrop-blur transition-all hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />
                    <div className="relative space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/40">
                        {item.title}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/70">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 gap-4"
              >
                <Button
                  size="lg"
                  asChild
                  className="h-12 w-full gap-2 rounded-full px-8 text-sm uppercase tracking-[0.25em] transition-all hover:shadow-lg sm:w-auto"
                >
                  <a
                    href={cta.href}
                    {...(ctaExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {cta.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Right column - Profile card */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-primary/15 via-transparent to-transparent blur-3xl" />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-border/50 bg-background/60 p-8 backdrop-blur-xl">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar with glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                  >
                    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl" />
                    {profile.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="relative h-32 w-32 rounded-full border border-border/40 object-cover shadow-[0_25px_60px_rgba(15,23,42,0.3)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                      />
                    ) : (
                      <div
                        aria-label={profile.name}
                        className="relative flex h-32 w-32 items-center justify-center rounded-full border border-border/40 bg-foreground text-3xl font-semibold tracking-tight text-background shadow-[0_25px_60px_rgba(15,23,42,0.3)]"
                      >
                        {profile.initials}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1"
                  >
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {profile.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/45">
                      {profile.role}
                    </p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70"
                  >
                    {profile.bio}
                  </motion.p>
                </div>

                {/* Social links */}
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="mt-8 flex flex-col gap-3"
                >
                  {links.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        variants={itemVariants}
                        href={social.href}
                        {...(social.external ?? /^https?:\/\//.test(social.href)
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center justify-between rounded-2xl border border-border/40 bg-background/70 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-border/60 hover:bg-background/80 hover:shadow-md"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/70 text-foreground/80 shadow-[0_10px_30px_rgba(15,23,42,0.2)] transition-all group-hover:shadow-[0_10px_30px_rgba(15,23,42,0.3)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] dark:group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {social.label}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {social.handle}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground/70" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
