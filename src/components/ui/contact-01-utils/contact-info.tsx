"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface RoutingData {
  emails: string[];
  primaryEmail: string;
  divisions: string[];
  isDefault: boolean;
}

interface ContactInfoProps {
  selectedServices?: string[];
  routingData?: RoutingData;
}

export default function ContactInfo({
  selectedServices = [],
  routingData,
}: ContactInfoProps) {
  const emails = routingData?.emails || ["contact@davlabs.in"];

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
      {/* Back Button above 'We can help' - Smart history navigation */}
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[#475569] hover:text-[#0f172a] mb-7 px-4 py-2 rounded-full bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] shadow-xs transition-all duration-200 group w-fit cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#64748b] group-hover:text-[#0f172a]" />
        <span>Back to Home</span>
      </button>

      {/* Top Tagline Badge */}
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00e1c2] inline-block shrink-0 shadow-[0_0_8px_#00e1c2]" />
        <span className="text-[14px] text-[#64748b] font-medium tracking-wide">
          We can help
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold text-[#0f172a] leading-[1.15] tracking-[-0.025em] mb-10">
        Let’s discuss about<br />
        your project and take<br />
        it to the next level.
      </h1>

      {/* Contact Details Grid */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 mb-9">
        {/* Phone */}
        <div>
          <p className="text-[13px] text-[#64748b] font-medium mb-1.5">
            Phone
          </p>
          <a
            href="tel:+323258964"
            className="text-[16px] sm:text-[18px] font-semibold text-[#0f172a] hover:text-[#4355ff] transition-colors"
          >
            +323-25-8964
          </a>
        </div>

        {/* Email - Dynamically updates based on selected service without badges */}
        <div>
          <p className="text-[13px] text-[#64748b] font-medium mb-1.5">
            Email
          </p>
          <div className="flex flex-col gap-1.5">
            {emails.map((em) => (
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
        <p className="text-[16px] sm:text-[18px] font-semibold text-[#0f172a]">
          Mark Avenue, Dalls Road, New York
        </p>
      </div>

      {/* Horizontal Divider Line */}
      <div className="w-full h-px bg-[#e2e8f0] mb-9" />

      {/* Trusted By Section */}
      <div>
        <p className="text-[13px] text-[#64748b] font-medium mb-4">
          Trusted by
        </p>
        <div className="flex items-center gap-10">
          <Image
            src="/images/logoipsum-1.png"
            alt="Logoipsum"
            width={130}
            height={28}
            className="h-[22px] w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/images/logoipsum-2.png"
            alt="Logoipsum"
            width={120}
            height={28}
            className="h-[22px] w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
}
