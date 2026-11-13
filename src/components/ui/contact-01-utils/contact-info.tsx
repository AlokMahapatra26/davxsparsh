"use client";

import React, { useState } from "react";
import { ArrowLeft, Palette, Code2 } from "lucide-react";
import { TrustedMarquee } from "@/components/ui/contact-01-utils/trusted-marquee";

const DEV_SERVICES = [
  "Web Development",
  "App Development",
  "AI Automation & Systems",
];

const DESIGN_SERVICES = [
  "UI/UX & Web Design",
  "Creative Logo Design",
  "Graphics Design & Branding",
  "Social Media Marketing",
  "Brand Identity & Packaging",
];

interface RoutingData {
  emails: string[];
  primaryEmail: string;
  divisions: string[];
  isDefault: boolean;
}

interface ContactInfoProps {
  selectedServices?: string[];
  setSelectedServices?: React.Dispatch<React.SetStateAction<string[]>>;
  routingData?: RoutingData;
}

export default function ContactInfo({
  selectedServices = [],
  setSelectedServices,
  routingData,
}: ContactInfoProps) {
  const [userModeOverride, setUserModeOverride] = useState<"design" | "development" | null>(null);
  const [prevService, setPrevService] = useState<string | null>(null);

  const currentService = selectedServices[0] || null;

  // Idiomatic React 19 pattern: sync state during render when prop changes (no effect cascade)
  if (currentService !== prevService) {
    setPrevService(currentService);
    setUserModeOverride(null);
  }

  const activeMode =
    userModeOverride ??
    (currentService
      ? DEV_SERVICES.includes(currentService)
        ? "development"
        : DESIGN_SERVICES.includes(currentService)
        ? "design"
        : null
      : null);

  const handleSelectMode = (mode: "design" | "development") => {
    setUserModeOverride(mode);
    if (setSelectedServices) {
      if (mode === "design") {
        if (!selectedServices.length || DEV_SERVICES.includes(selectedServices[0])) {
          setSelectedServices(["UI/UX & Web Design"]);
        }
      } else {
        if (!selectedServices.length || DESIGN_SERVICES.includes(selectedServices[0])) {
          setSelectedServices(["Web Development"]);
        }
      }
    }
  };

  const phoneNumbers =
    activeMode === "design"
      ? [{ label: "+91 81414 44282", href: "tel:+918141444282" }]
      : [
          { label: "+91 84691 59877", href: "tel:+918469159877" },
          { label: "+91 79849 67877", href: "tel:+917984967877" },
        ];

  const displayEmails =
    activeMode === "design"
      ? ["contact@sparshdesign.com"]
      : activeMode === "development"
      ? ["contact@davlabs.in"]
      : (routingData?.emails || ["contact@davlabs.in"]);

  const address =
    activeMode === "design"
      ? "UG -50, Atlanta shoppers, beside Reliance smart, Vesu, Surat, Gujarat 395007, India"
      : "H.O 111, Sadlani Plaza, Near Telephone Exchange, Opp Vimal Arced, Char Rasta, GIDC, Vapi- 396 195.";

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const lastSection = sessionStorage.getItem("home_current_section") || "services";
      sessionStorage.setItem("return_to_section", lastSection);

      if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
        window.history.back();
        return;
      }

      window.location.href = lastSection && lastSection !== "hero" ? `/#${lastSection}` : "/";
    }
  };

  return (
    <div className="w-full max-w-[580px]">
      {/* Action Navigation Buttons above 'We can help' */}
      <div className="flex flex-wrap items-center gap-2.5 mb-7">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#475569] hover:text-[#0f172a] px-4 py-2 rounded-full bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] shadow-xs transition-all duration-200 group w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#64748b] group-hover:text-[#0f172a]" />
          <span>Return to Studio</span>
        </button>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleSelectMode("design")}
            className={`inline-flex items-center gap-2 text-[14px] font-semibold px-4 py-2 rounded-full border shadow-xs transition-all duration-200 cursor-pointer ${
              activeMode === "design"
                ? "bg-[#f3e8ff] text-[#7e22ce] border-[#c084fc] shadow-sm font-bold ring-2 ring-[#c084fc]/20"
                : "text-[#475569] hover:text-[#0f172a] bg-[#f8fafc] hover:bg-[#f1f5f9] border-[#e2e8f0]"
            }`}
          >
            <Palette className={`w-4 h-4 ${activeMode === "design" ? "text-[#7e22ce]" : "text-[#8b5cf6]"}`} />
            <span>Design</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode("development")}
            className={`inline-flex items-center gap-2 text-[14px] font-semibold px-4 py-2 rounded-full border shadow-xs transition-all duration-200 cursor-pointer ${
              activeMode === "development"
                ? "bg-[#dbeafe] text-[#1d4ed8] border-[#60a5fa] shadow-sm font-bold ring-2 ring-[#60a5fa]/20"
                : "text-[#475569] hover:text-[#0f172a] bg-[#f8fafc] hover:bg-[#f1f5f9] border-[#e2e8f0]"
            }`}
          >
            <Code2 className={`w-4 h-4 ${activeMode === "development" ? "text-[#1d4ed8]" : "text-[#3b82f6]"}`} />
            <span>Development</span>
          </button>
        </div>
      </div>

      {/* Top Tagline Badge */}
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00e1c2] inline-block shrink-0 shadow-[0_0_8px_#00e1c2]" />
        <span className="text-[14px] text-[#64748b] font-medium tracking-wide">
          We can help
        </span>
      </div>

      {/* Main Headline */}
      {activeMode === "design" ? (
        <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold text-[#0f172a] leading-[1.15] tracking-[-0.025em] mb-10 transition-all">
          Let’s discuss about<br />
          your project design and<br />
          take it to the next level.
        </h1>
      ) : activeMode === "development" ? (
        <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold text-[#0f172a] leading-[1.15] tracking-[-0.025em] mb-10 transition-all">
          Let’s discuss about<br />
          your project development and<br />
          take it to the next level.
        </h1>
      ) : (
        <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold text-[#0f172a] leading-[1.15] tracking-[-0.025em] mb-10 transition-all">
          Let’s discuss about<br />
          your project and take<br />
          it to the next level.
        </h1>
      )}

      {/* Contact Details Grid */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 mb-9">
        {/* Phone */}
        <div>
          <p className="text-[13px] text-[#64748b] font-medium mb-1.5">
            Phone
          </p>
          <div className="flex flex-col gap-1.5">
            {phoneNumbers.map((phone) => (
              <a
                key={phone.label}
                href={phone.href}
                className="text-[16px] sm:text-[18px] font-semibold text-[#0f172a] hover:text-[#4355ff] transition-colors w-fit"
              >
                {phone.label}
              </a>
            ))}
          </div>
        </div>

        {/* Email */}
        <div>
          <p className="text-[13px] text-[#64748b] font-medium mb-1.5">
            Email
          </p>
          <div className="flex flex-col gap-1.5">
            {displayEmails.map((em) => (
              <a
                key={em}
                href={`mailto:${em}`}
                className="text-[16px] sm:text-[18px] font-semibold text-[#0f172a] hover:text-[#4355ff] transition-all flex items-center gap-2 w-fit"
              >
                <span>{em}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-10">
        <p className="text-[13px] text-[#64748b] font-medium mb-1.5">
          Location
        </p>
        <p className="text-[15px] sm:text-[17px] font-semibold text-[#0f172a] leading-relaxed max-w-[480px]">
          {address}
        </p>
      </div>

      {/* Horizontal Divider Line */}
      <div className="w-full h-px bg-[#e2e8f0] mb-9" />

      {/* Trusted By Infinite Marquee */}
      <TrustedMarquee />
    </div>
  );
}
