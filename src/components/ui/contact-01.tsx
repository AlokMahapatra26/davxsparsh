"use client";

import React, { useState, useMemo } from "react";
import ContactInfo from "@/components/ui/contact-01-utils/contact-info";
import ContactForm from "@/components/ui/contact-01-utils/contact-form";

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
    <section className="relative w-full min-h-screen bg-[#ebe8f9] flex items-center justify-center py-16 sm:py-20 md:py-28 px-6 sm:px-10 lg:px-16 selection:bg-[#4355ff]/10">
      <div className="w-full max-w-[1360px] mx-auto">
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
