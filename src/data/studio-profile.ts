import { FaDribbble, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { PortfolioBlockContent } from "@/components/ui/glassmorphism-portfolio-block-shadcnui";

/**
 * Content for the "Figma Animations" hero badge card, based on website-knowledge.ts.
 *
 * TODO: replace the "#" hrefs and handles below with the real social links.
 */
export const STUDIO_PROFILE: PortfolioBlockContent = {
  badge: "Agency",
  title: "DAVSparsh",
  description:
    "A powerhouse alliance pairing purpose-built IT engineering with sensory, high-end product and brand craft. Systems built from first principles with tactile, human-centered digital interfaces.",
  highlights: [
    {
      title: "Engineering · DAVLabs",
      description:
        "Web development, app development and AI automation on resilient cloud infrastructure.",
    },
    {
      title: "Craft · Sparsh Design",
      description:
        "UI/UX, logo design, branding, social media marketing and packaging.",
    },
    {
      title: "Our approach",
      description:
        "Architectural foundation, engineering precision, tactile product craft and iterative delivery.",
    },
  ],
  cta: { label: "Explore case studies", href: "/contact" },
  profile: {
    name: "DAVSparsh",
    role: "Engineering Precision × Editorial Craft",
    bio: "Engineering and design under one roof, from first principles to the final pixel.",
    initials: "D×S",
  },
  links: [
    { label: "Twitter", handle: "@davlabs_sparsh", href: "#", icon: FaXTwitter },
    { label: "LinkedIn", handle: "DAVSparsh", href: "#", icon: FaLinkedinIn },
    { label: "Dribbble", handle: "sparshdesign", href: "#", icon: FaDribbble },
    { label: "GitHub", handle: "davlabs", href: "#", icon: FaGithub },
  ],
};
