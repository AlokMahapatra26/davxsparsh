"use client";

import { CountingNumber } from "@/components/ui/counting-number";

const stats = [
  { target: 83, suffix: "+", label: "Components shipped" },
  { target: 2, suffix: "K", label: "GitHub stars" },
  { target: 49, suffix: "K", label: "Monthly downloads" },
  { target: 19, suffix: "", label: "Contributors" },
];

export default function CountingNumberDemo() {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center bg-background p-8">
      <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <CountingNumber target={stat.target} />
              {stat.suffix}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
