export type StatVisual =
  | { kind: "trend"; values: number[] }
  | { kind: "uptime"; days: number[] }
  | { kind: "distribution"; bins: number[]; max: number; marker: number; inverted?: boolean }
  | { kind: "map"; points: [number, number][] }
  | { kind: "devices" }
  | { kind: "stars"; rating?: number }
  | { kind: "craft" }
  | { kind: "network" };

export interface Stat {
  /** The final number. The band counts up to it. */
  value: number;
  /** Text before the number, such as "$". */
  prefix?: string;
  /** Text after the number, such as "%", "ms", or "+". */
  suffix?: string;
  /** Digits after the decimal point. Defaults to 0. */
  decimals?: number;
  /** `compact` shortens large numbers to 2.3M or 12K. The unit renders like a suffix. Defaults to `standard`. */
  notation?: "standard" | "compact";
  label: string;
  /** One short supporting line under the number. */
  detail?: string;
  /** One line of context that replaces the detail while the stat is hovered or focused, such as "Up from 41% last year". */
  context?: string;
  /** A tiny chart that draws in after the number lands. */
  visual?: StatVisual;
}

/** 35 global hub locations as [longitude, latitude] across 6 continents. */
const regions: [number, number][] = [
  [-122.4, 37.8], [-118.2, 34], [-96.8, 32.8], [-87.6, 41.9], [-77.5, 39], [-74, 40.7], [-79.4, 43.7], [-99.1, 19.4],
  [-74.1, 4.7], [-77, -12], [-46.6, -23.5], [-70.7, -33.4], [-58.4, -34.6],
  [-0.1, 51.5], [-6.3, 53.3], [2.35, 48.9], [4.9, 52.4], [8.7, 50.1], [18, 59.3], [-3.7, 40.4], [9.2, 45.5], [21, 52.2],
  [3.4, 6.5], [28, -26.2], [36.8, -1.3], [55.3, 25.3], [34.8, 32.1],
  [72.9, 19.1], [103.8, 1.35], [114.2, 22.3], [139.7, 35.7], [127, 37.6], [106.8, -6.2], [151.2, -33.9], [174.8, -36.8],
];

export const stats: Stat[] = [
  {
    value: 250,
    suffix: "+",
    label: "Web & Mobile Apps Built",
    detail: "Custom platforms, iOS, Android & SaaS",
    context: "Powering over 12M+ active users worldwide",
    visual: { kind: "devices" },
  },
  {
    value: 99,
    suffix: "%",
    label: "Client satisfaction rate",
    detail: "Across 140+ funded startups & brands",
    context: "94% repeat client engagement rate",
    visual: { kind: "stars", rating: 5 },
  },
  {
    value: 4.9,
    decimals: 1,
    suffix: "★",
    label: "Average user & store rating",
    detail: "Top 1% ranking on App Store & Play Store",
    context: "Over 85,000+ verified 5-star user reviews",
    visual: { kind: "craft" },
  },
  {
    value: 32,
    suffix: "+",
    label: "Global client markets",
    detail: "Spanning US, Europe, Asia & Middle East",
    context: "Distributed delivery across 14 global time zones",
    visual: { kind: "network" },
  },
];
