export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "websites" | "saas-products" | "designs";
  categoryLabel: string;
  division: string;
  description: string;
  impact: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor?: string;
  artPreset?: "aurora" | "glacier" | "dusk" | "ember" | "verdant";
  image?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ProjectCategory {
  slug: "websites" | "saas-products" | "designs";
  title: string;
  headline: string;
  description: string;
  badge: string;
  division: string;
  email: string;
}

export const PROJECT_CATEGORIES: Record<string, ProjectCategory> = {
  websites: {
    slug: "websites",
    title: "Websites",
    headline: "High-Performance Websites & Web Platforms",
    description:
      "Engineered from first principles with Next.js, sub-second edge speeds, and tactile editorial design that converts visitors into loyal brand advocates.",
    badge: "Web Engineering",
    division: "DAVLabs × Sparsh Design",
    email: "contact@davlabs.in",
  },
  "saas-products": {
    slug: "saas-products",
    title: "SaaS Products",
    headline: "Scalable SaaS Applications & Cloud Software",
    description:
      "Enterprise-grade multi-tenant software, real-time analytics engines, and autonomous AI automation pipelines built for high reliability and scale.",
    badge: "SaaS & Cloud Systems",
    division: "DAVLabs Systems Engineering",
    email: "contact@davlabs.in",
  },
  designs: {
    slug: "designs",
    title: "Designs",
    headline: "Tactile Design Systems & Brand Identities",
    description:
      "Sensory digital surfaces, multi-brand Figma token architectures, spatial micro-interactions, and iconic brand systems that command market authority.",
    badge: "Brand & UI/UX Craft",
    division: "Sparsh Design Studio",
    email: "contact@sparshdesign.com",
  },
};

export const PROJECTS_DATA: ProjectItem[] = [
  // --- WEBSITES ---
  {
    id: "square-world-logistics",
    title: "Square World Logistics",
    subtitle: "Freight & Supply Chain Portal",
    category: "websites",
    categoryLabel: "Websites",
    division: "DAVLabs Systems × Sparsh Design",
    image: "/images/square-world-thumbnail.jpg",
    description:
      "End-to-end digital web presence, shipment tracking interface, and corporate brand portal engineered for an international freight forwarding powerhouse.",
    impact:
      "Automated shipment tracking inquiries and cut dispatch customer service response times by 40%.",
    tags: ["Next.js", "React", "Shipment Tracking", "Edge Caching"],
    metrics: [
      { label: "Inbound Inquiries", value: "+140%" },
      { label: "Page Load Speed", value: "0.45s" },
      { label: "Global Reach", value: "30+ Ports" },
    ],
    accentColor: "#38bdf8",
    artPreset: "aurora",
    liveUrl: "https://www.squareworldlogistics.in/",
    featured: true,
  },
  {
    id: "essana-health",
    title: "Essana Health",
    subtitle: "Telehealth Clinic & Longevity Medicine",
    category: "websites",
    categoryLabel: "Websites",
    division: "DAVLabs Systems × Sparsh Design",
    image: "/images/essana-thumbnail.jpg",
    description:
      "Modern Australian telehealth and longevity medicine platform featuring specialized clinical pathways, patient intake pipelines, and seamless clinician booking.",
    impact:
      "Modernized patient booking workflows and increased patient consultation inquiries by 210%.",
    tags: ["Telehealth Platform", "Next.js", "Patient Intake", "Australia"],
    metrics: [
      { label: "Patient Inquiries", value: "+210%" },
      { label: "Booking Completion", value: "98.2%" },
      { label: "Service Region", value: "Australia" },
    ],
    accentColor: "#a855f7",
    artPreset: "dusk",
    liveUrl: "https://essana.com.au/",
    featured: true,
  },
  {
    id: "anshuukam-textile",
    title: "Anshuukam Textile",
    subtitle: "Garment Manufacturer & Export Portal",
    category: "websites",
    categoryLabel: "Websites",
    division: "DAVLabs Systems × Sparsh Design",
    image: "/images/anshuukam-thumbnail.jpg",
    description:
      "Modern industrial web experience, digital product catalog, and global export inquiry pipeline engineered for a premier Indian garment manufacturer.",
    impact:
      "Boosted international bulk buyer inquiry volume and streamlined factory-direct order requests.",
    tags: ["Industrial Catalog", "Next.js", "B2B Export", "React"],
    metrics: [
      { label: "B2B Inquiries", value: "+175%" },
      { label: "Catalog Engagement", value: "3.8x" },
      { label: "Export Markets", value: "14+ Countries" },
    ],
    accentColor: "#f59e0b",
    artPreset: "ember",
    liveUrl: "https://www.anshuukamtextile.com/",
    featured: true,
  },
  {
    id: "aarav-enterprises",
    title: "Aarav Enterprises",
    subtitle: "Industrial Workforce & Manpower Contracting",
    category: "websites",
    categoryLabel: "Websites",
    division: "DAVLabs Systems × Sparsh Design",
    image: "/images/aarav-thumbnail.jpg",
    description:
      "Specialized industrial workforce contracting portal and client deployment interface for pharmaceutical cleanrooms, plastic moulding, and medical instrument plants.",
    impact:
      "Automated corporate client placement inquiries and streamlined contract staffing requests across multi-state industrial corridors.",
    tags: ["Workforce Portal", "Next.js", "Industrial B2B", "React"],
    metrics: [
      { label: "Deployment Inquiries", value: "+160%" },
      { label: "Client Conversion", value: "32%" },
      { label: "Industries Served", value: "Pharma & Medical" },
    ],
    accentColor: "#3b82f6",
    artPreset: "glacier",
    liveUrl: "https://aaravent.in/",
    featured: true,
  },
  {
    id: "salasar-polysacks",
    title: "Salasar Polysacks",
    subtitle: "HDPE Tarpaulin & Polymer Packaging Manufacturer",
    category: "websites",
    categoryLabel: "Websites",
    division: "DAVLabs Systems × Sparsh Design",
    image: "/images/salasar-thumbnail.jpg",
    description:
      "Leading industrial polymer packaging web platform, interactive product specifier, and direct B2B supply portal for heavy-duty HDPE tarpaulins and woven sacks.",
    impact:
      "Modernized digital catalog distribution and unlocked direct international buyer RFQ submissions.",
    tags: ["Polymer Manufacturing", "B2B Export", "Catalog Specifier", "Next.js"],
    metrics: [
      { label: "RFQ Submissions", value: "+190%" },
      { label: "Catalog Downloads", value: "4.2k" },
      { label: "Production Scale", value: "Since 2005" },
    ],
    accentColor: "#10b981",
    artPreset: "verdant",
    liveUrl: "https://www.salasarpolysacks.com/",
    featured: true,
  },
  {
    id: "aqua-shakti-industries",
    title: "Aqua Shakti Industries",
    subtitle: "Industrial Water Treatment & RO Plants",
    category: "websites",
    categoryLabel: "Websites",
    division: "DAVLabs Systems × Sparsh Design",
    image: "/images/aquashakti-thumbnail.jpg",
    description:
      "Complete industrial engineering showcase, technical product catalog, and plant inquiry portal for industrial RO, STP, ETP, and chemical treatment plants.",
    impact:
      "Automated plant specification requests and increased inbound industrial project inquiries across 500+ manufacturing clients.",
    tags: ["Water Treatment", "Industrial RO/ETP", "B2B Catalog", "Next.js"],
    metrics: [
      { label: "Plant Inquiries", value: "+185%" },
      { label: "Enterprise Clients", value: "500+" },
      { label: "Operational Record", value: "Since 2007" },
    ],
    accentColor: "#0284c7",
    artPreset: "glacier",
    liveUrl: "https://www.aquashaktiipl.com/",
    featured: true,
  },
  {
    id: "jiya-sales-services",
    title: "JIYA Sales & Services",
    subtitle: "Material Handling Equipment & Spares",
    category: "websites",
    categoryLabel: "Websites",
    division: "DAVLabs Systems × Sparsh Design",
    image: "/images/jiya-thumbnail.jpg",
    description:
      "Premier material handling machinery catalog and OEM industrial spares supply portal for hydraulic stackers, pallet trucks, and polyurethane caster wheels.",
    impact:
      "Streamlined warehouse equipment ordering and automated OEM spare parts quote generation.",
    tags: ["Material Handling", "Heavy Machinery", "Parts Catalog", "Next.js"],
    metrics: [
      { label: "Quote Inquiries", value: "+170%" },
      { label: "Active SKU Catalog", value: "240+ Spares" },
      { label: "Delivery Footprint", value: "Pan India" },
    ],
    accentColor: "#f97316",
    artPreset: "ember",
    liveUrl: "https://jiyasalesandservices.com/",
    featured: true,
  },

  // --- SAAS PRODUCTS ---
  {
    id: "ai-automation-pipeline",
    title: "AI Automation Pipeline",
    subtitle: "Autonomous Multi-Agent Workflow Engine",
    category: "saas-products",
    categoryLabel: "SaaS Products",
    division: "DAVLabs Intelligence Systems",
    description:
      "Autonomous enterprise workflow engine that ingests unstructured business documents, orchestrates multi-agent tasks, and executes automated business pipelines with human-in-the-loop verification.",
    impact:
      "Cut repetitive manual processing time by 82% while boosting document processing throughput tenfold.",
    tags: ["Custom LLMs", "Python", "FastAPI", "LangGraph", "Qdrant Vector DB"],
    metrics: [
      { label: "Manual Effort Reduction", value: "82%" },
      { label: "Throughput Multiplier", value: "10x" },
      { label: "Accuracy Rate", value: "99.4%" },
    ],
    accentColor: "#ef4444",
    artPreset: "ember",
    featured: true,
  },
  {
    id: "collaborative-analytics-engine",
    title: "Collaborative Analytics Engine",
    subtitle: "Sub-Second Event Telemetry & Query Platform",
    category: "saas-products",
    categoryLabel: "SaaS Products",
    division: "DAVLabs Systems Engineering",
    description:
      "High-throughput real-time product telemetry and event streaming platform capable of querying billions of rows in milliseconds with intuitive charting surfaces.",
    impact:
      "Processes 250M+ raw events daily with p99 analytical query latency remaining comfortably under 50ms.",
    tags: ["PostgreSQL", "ClickHouse", "Apache Kafka", "Go", "Kubernetes"],
    metrics: [
      { label: "Query Latency (p99)", value: "<50ms" },
      { label: "Daily Event Stream", value: "250M+" },
      { label: "Pipeline SLA", value: "99.99%" },
    ],
    accentColor: "#0ea5e9",
    artPreset: "glacier",
  },
  {
    id: "multi-tenant-crm-suite",
    title: "Multi-Tenant CRM Suite",
    subtitle: "Modular Customer Pipeline & Operations Hub",
    category: "saas-products",
    categoryLabel: "SaaS Products",
    division: "DAVLabs Engineering",
    description:
      "Modular enterprise customer relationship platform featuring custom pipeline builders, automated email sequences, and role-based permissions for 500+ seat organizations.",
    impact:
      "Powers over 12,000 active seats daily with zero latency degradation and automated zero-downtime database migrations.",
    tags: ["Node.js", "Redis", "Distributed Microservices", "WebSockets", "Docker"],
    metrics: [
      { label: "Active Enterprise Seats", value: "12,000+" },
      { label: "API Response Time", value: "28ms" },
      { label: "Feature Adoption", value: "94%" },
    ],
    accentColor: "#10b981",
    artPreset: "aurora",
  },
  {
    id: "billing-subscription-gateway",
    title: "Billing & Subscription Gateway",
    subtitle: "Enterprise Revenue Infrastructure & Dunning Management",
    category: "saas-products",
    categoryLabel: "SaaS Products",
    division: "DAVLabs Systems",
    description:
      "Robust self-serve subscription and invoicing architecture with automatic proration, multi-jurisdiction tax handling, smart dunning recovery, and multi-currency payouts.",
    impact:
      "Processed over $40M+ in annual recurring client transactions with a 99.8% payment reconciliation accuracy rate.",
    tags: ["Stripe Billing API", "Webhooks Security", "Serverless Workers", "TypeScript"],
    metrics: [
      { label: "Annual Volume Processed", value: "$40M+" },
      { label: "Reconciliation Accuracy", value: "99.8%" },
      { label: "Failed Payment Recovery", value: "+38%" },
    ],
    accentColor: "#8b5cf6",
    artPreset: "dusk",
  },

  // --- DESIGNS ---
  {
    id: "tokens-typography-system",
    title: "Tokens & Typography System",
    subtitle: "Multi-Brand Design Infrastructure & Component Library",
    category: "designs",
    categoryLabel: "Designs",
    division: "Sparsh Design Studio",
    description:
      "Comprehensive design token infrastructure containing 120+ atomic components, semantic color modes, fluid typography scales, and automated token export directly into front-end engineering repos.",
    impact:
      "Accelerated team feature delivery cycles by 65% while guaranteeing 100% design-to-code visual parity.",
    tags: ["Figma Tokens", "Storybook", "React Components", "WCAG AAA", "Design Tokens"],
    metrics: [
      { label: "Components & Variants", value: "120+" },
      { label: "Sprint Speedup", value: "+65%" },
      { label: "Accessibility Level", value: "WCAG AAA" },
    ],
    accentColor: "#ec4899",
    artPreset: "dusk",
    featured: true,
  },
  {
    id: "sensory-brand-identity-logo",
    title: "Sensory Brand Identity & Logo",
    subtitle: "Iconic Typography Marks, Vector Assets & Brand Voice",
    category: "designs",
    categoryLabel: "Designs",
    division: "Sparsh Design Studio",
    description:
      "Complete bespoke brand identity redesign creating timeless logo symbols, custom geometric typography, motion guidelines, and spatial visual grammar that outlasts market trends.",
    impact:
      "Recognized in international design publications and helped the brand successfully close a $14M Series A funding round.",
    tags: ["Brand Identity", "Logo Craft", "Vector Marks", "Editorial Guidelines", "Type Design"],
    metrics: [
      { label: "Series A Raised", value: "$14M" },
      { label: "Brand Recall Lift", value: "+88%" },
      { label: "Design Award", value: "Red Dot Winner" },
    ],
    accentColor: "#f97316",
    artPreset: "aurora",
  },
  {
    id: "mobile-app-tactile-ui-kit",
    title: "Mobile App Tactile UI Kit",
    subtitle: "Native iOS & Android Spatial Micro-Interactions",
    category: "designs",
    categoryLabel: "Designs",
    division: "Sparsh Design Studio",
    description:
      "End-to-end tactile design system for native mobile apps featuring spring physics, subtle haptic cues, liquid navigation shaders, and human-centered ergonomics.",
    impact:
      "Helped 4 client applications achieve App Store 'App of the Day' features with a 4.9★ cumulative user rating.",
    tags: ["iOS Human Interface", "Material 3", "SwiftUI Prototypes", "Haptic Interactions"],
    metrics: [
      { label: "App Store Rating", value: "4.9★" },
      { label: "Featured Status", value: "App of the Day" },
      { label: "D30 Retention", value: "62%" },
    ],
    accentColor: "#14b8a6",
    artPreset: "verdant",
  },
  {
    id: "brand-guidelines-packaging",
    title: "Brand Guidelines & Packaging",
    subtitle: "Sensory Materials, 3D Mockups & Print Specs",
    category: "designs",
    categoryLabel: "Designs",
    division: "Sparsh Design Studio",
    description:
      "Sensory luxury physical packaging architecture, unboxing choreography, bespoke material selections, debossing dies, and comprehensive print-ready production dossiers.",
    impact:
      "Zero manufacturing waste drift, featured at international luxury packaging expos across Europe.",
    tags: ["3D Packaging CAD", "Foil Stamping", "Sustainable Paper", "Print Production"],
    metrics: [
      { label: "Production Parity", value: "100%" },
      { label: "Sustainable Sourcing", value: "FSC Certified" },
      { label: "Manufacturing Error", value: "0%" },
    ],
    accentColor: "#e11d48",
    artPreset: "ember",
  },
];

