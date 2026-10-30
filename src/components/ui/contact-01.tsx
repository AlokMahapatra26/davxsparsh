"use client";

import React, { useState, useMemo } from "react";
import ContactInfo from "@/components/ui/contact-01-utils/contact-info";
import ContactForm from "@/components/ui/contact-01-utils/contact-form";
import { Globe } from "@/components/ui/cobe-globe";

const GLOBE_MARKERS = [
  { id: "delhi", location: [28.6139, 77.209] as [number, number], label: "New Delhi" },
  { id: "sf", location: [37.7595, -122.4367] as [number, number], label: "San Francisco" },
  { id: "nyc", location: [40.7128, -74.006] as [number, number], label: "New York" },
  { id: "london", location: [51.5074, -0.1278] as [number, number], label: "London" },
  { id: "tokyo", location: [35.6762, 139.6503] as [number, number], label: "Tokyo" },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "sydney", location: [-33.8688, 151.2093] as [number, number], label: "Sydney" },
  { id: "paris", location: [48.8566, 2.3522] as [number, number], label: "Paris" },
  { id: "singapore", location: [1.3521, 103.8198] as [number, number], label: "Singapore" },
];

const GLOBE_ARCS = [
  {
    id: "delhi-london",
    from: [28.6139, 77.209] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
    label: "Delhi → London",
  },
  {
    id: "delhi-sf",
    from: [28.6139, 77.209] as [number, number],
    to: [37.7595, -122.4367] as [number, number],
    label: "Delhi → SF",
  },
  {
    id: "nyc-london",
    from: [40.7128, -74.006] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
    label: "NYC → London",
  },
  {
    id: "sf-tokyo",
    from: [37.7595, -122.4367] as [number, number],
    to: [35.6762, 139.6503] as [number, number],
    label: "SF → Tokyo",
  },
  {
    id: "delhi-dubai",
    from: [28.6139, 77.209] as [number, number],
    to: [25.2048, 55.2708] as [number, number],
    label: "Delhi → Dubai",
  },
];

export type ServiceInfo = {
  email: string;
  division: string;
};

export const SERVICE_ROUTING: Record<string, ServiceInfo> = {
  "Web Development": {
    email: "contact@davlabs.in",
    division: "DAVLabs Systems Engineering",
  },
  "App Development": {
    email: "contact@davlabs.in",
    division: "DAVLabs Systems Engineering",
  },
  "AI Automation & Systems": {
    email: "contact@davlabs.in",
    division: "DAVLabs Intelligence Systems",
  },
  "UI/UX & Web Design": {
    email: "contact@sparshdesign.com",
    division: "Sparsh Design Studio",
  },
  "Creative Logo Design": {
    email: "contact@sparshdesign.com",
    division: "Sparsh Design Studio",
  },
  "Graphics Design & Branding": {
    email: "contact@sparshdesign.com",
    division: "Sparsh Design Studio",
  },
  "Social Media Marketing": {
    email: "contact@sparshdesign.com",
    division: "Sparsh Digital Marketing",
  },
  "Brand Identity & Packaging": {
    email: "contact@sparshdesign.com",
    division: "Sparsh Design Studio",
  },
};

const Contact = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const routingData = useMemo(() => {
    if (selectedServices.length === 0) {
      return {
        emails: ["contact@davlabs.in"],
        primaryEmail: "contact@davlabs.in",
        divisions: ["General Inquiries"],
        isDefault: true,
      };
    }

    const emailSet = new Set<string>();
    const divisionSet = new Set<string>();

    selectedServices.forEach((s) => {
      const match = SERVICE_ROUTING[s];
      if (match) {
        emailSet.add(match.email);
        divisionSet.add(match.division);
      }
    });

    const emails = Array.from(emailSet);
    const divisions = Array.from(divisionSet);

    return {
      emails: emails.length > 0 ? emails : ["contact@davlabs.in"],
      primaryEmail: emails[0] || "contact@davlabs.in",
      divisions,
      isDefault: false,
    };
  }, [selectedServices]);

  return (
    <section className="relative w-full min-h-screen bg-[#ebe8f9] flex items-center justify-center py-16 sm:py-20 md:py-28 px-6 sm:px-10 lg:px-16 selection:bg-[#4355ff]/10 overflow-hidden">
      {/* 3D WebGL Cobe Globe - Centered Directly Behind Content in Viewport */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="w-[620px] h-[620px] sm:w-[780px] sm:h-[780px] md:w-[880px] md:h-[880px] lg:w-[1020px] lg:h-[1020px] xl:w-[1160px] xl:h-[1160px] pointer-events-auto">
          <Globe
            markers={GLOBE_MARKERS}
            arcs={GLOBE_ARCS}
            markerColor={[0.26, 0.33, 1]}
            baseColor={[0.72, 0.7, 0.9]}
            arcColor={[0.26, 0.33, 1]}
            glowColor={[0.65, 0.6, 0.92]}
            dark={0}
            mapBrightness={12}
            diffuse={1.5}
            markerSize={0.026}
            markerElevation={0.012}
            arcWidth={0.65}
            arcHeight={0.28}
            speed={0.0035}
            scale={1.12}
            opacity={1}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1360px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left Column: Headline, Details, Trusted By */}
          <div className="w-full lg:w-[580px] xl:w-[620px] shrink-0 pt-2">
            <ContactInfo
              selectedServices={selectedServices}
              routingData={routingData}
            />
          </div>

          {/* Right Column: Project Inquiry Card */}
          <div className="w-full lg:w-[620px] xl:w-[660px] flex justify-center lg:justify-end shrink-0">
            <ContactForm
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              routingData={routingData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
