"use client";

import React, { useState, useMemo } from "react";
import ContactInfo from "@/components/ui/contact-01-utils/contact-info";
import ContactForm from "@/components/ui/contact-01-utils/contact-form";
import { ImageUploader } from "@/components/ui/image-uploader";

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
  const [uploaderFiles, setUploaderFiles] = useState<File[]>([]);

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
    <section className="relative w-full min-h-screen bg-[#ede5f9] flex items-center justify-center py-16 sm:py-20 md:py-28 px-6 sm:px-10 lg:px-16 selection:bg-[#4355ff]/10">
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
              attachments={uploaderFiles}
              setAttachments={setUploaderFiles}
            />
          </div>
        </div>

        {/* Center Bottom: Project Brief & File Uploader */}
        <div id="project-attachments" className="mt-20 sm:mt-24 pt-14 border-t border-zinc-300/60 max-w-2xl mx-auto w-full">
          <div className="space-y-2 mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
              Upload Project Details &amp; Attachments
            </h2>
            <p className="text-[15px] text-[#64748b]">
              Attach project briefs, wireframes, RFP, PDF documents or reference images to help us understand your vision.
            </p>
          </div>

          <ImageUploader
            files={uploaderFiles}
            onChange={setUploaderFiles}
            maxFiles={5}
            maxSize={10}
            accept="image/*,application/pdf,.pdf,.doc,.docx"
          />

          {uploaderFiles.length > 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-white/70 border border-zinc-200/80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-[#0f172a]">
                  Attached Documents ({uploaderFiles.length}):
                </h3>
                <span className="text-xs text-[#4355ff] font-medium">
                  Included with your inquiry
                </span>
              </div>
              <ul className="list-disc list-inside mt-2 text-xs text-[#64748b] space-y-1">
                {uploaderFiles.map((file, index) => (
                  <li key={index} className="truncate">
                    {file.name}{" "}
                    <span className="text-zinc-400">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
