import React from "react";
import Image from "next/image";

export default function ContactInfo() {
  return (
    <div className="w-full max-w-[500px]">
      {/* Top Tagline Badge */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2 h-2 rounded-full bg-[#00e1c2] inline-block shrink-0" />
        <span className="text-[13px] text-[#6b7280] font-normal">
          We can help
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-[28px] sm:text-[32px] font-bold text-[#0f172a] leading-[1.2] tracking-[-0.02em] mb-9">
        Let’s discuss about your project<br />and take it the next level.
      </h1>

      {/* Contact Details Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-7">
        {/* Phone */}
        <div>
          <p className="text-xs text-[#6b7280] font-normal mb-1">
            Phone
          </p>
          <a
            href="tel:+323258964"
            className="text-[14px] sm:text-[15px] font-semibold text-[#0f172a] hover:text-[#4355ff] transition-colors"
          >
            +323-25-8964
          </a>
        </div>

        {/* Email */}
        <div>
          <p className="text-xs text-[#6b7280] font-normal mb-1">
            Email
          </p>
          <a
            href="mailto:me@shadcnspace.com"
            className="text-[14px] sm:text-[15px] font-semibold text-[#0f172a] hover:text-[#4355ff] transition-colors"
          >
            me@shadcnspace.com
          </a>
        </div>
      </div>

      {/* Location */}
      <div className="mb-9">
        <p className="text-xs text-[#6b7280] font-normal mb-1">
          Location
        </p>
        <p className="text-[14px] sm:text-[15px] font-semibold text-[#0f172a]">
          Mark Avenue, Dalls Road, New York
        </p>
      </div>

      {/* Horizontal Divider Line */}
      <div className="w-full h-px bg-[#efefef] mb-8" />

      {/* Trusted By Section */}
      <div>
        <p className="text-xs text-[#6b7280] font-normal mb-3.5">
          Trusted by
        </p>
        <div className="flex items-center gap-10">
          <Image
            src="/images/logoipsum-1.png"
            alt="Logoipsum"
            width={123}
            height={25}
            className="h-[19px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/images/logoipsum-2.png"
            alt="Logoipsum"
            width={113}
            height={25}
            className="h-[19px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
}
