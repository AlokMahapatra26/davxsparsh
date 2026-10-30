"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Germany",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Singapore",
  "Japan",
  "France",
];

const SERVICES = [
  "Web Development",
  "App Development",
  "AI Automation & Systems",
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

interface ContactFormProps {
  selectedServices?: string[];
  setSelectedServices?: React.Dispatch<React.SetStateAction<string[]>>;
  routingData?: RoutingData;
}

export default function ContactForm({
  selectedServices: externalServices,
  setSelectedServices: setExternalServices,
  routingData,
}: ContactFormProps) {
  const [internalServices, setInternalServices] = useState<string[]>([]);
  const selectedServices = externalServices ?? internalServices;
  const setSelectedServices = setExternalServices ?? setInternalServices;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [country, setCountry] = useState("India");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const targetEmails = routingData?.emails || ["contact@davlabs.in"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? [] : [service]
    );
    setIsServicesOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 700);
  };

  return (
    <div className="w-full max-w-[620px] bg-[#ede5f9] rounded-[26px] border-0 p-8 sm:p-10 md:p-11 shadow-none">
      {/* Card Title */}
      <h2 className="text-[24px] sm:text-[28px] font-bold text-[#0f172a] tracking-tight mb-7">
        Start the project
      </h2>

      {submitted ? (
        <div className="py-14 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#4355ff]/10 text-[#4355ff] flex items-center justify-center mb-1 shadow-sm">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h4 className="text-[20px] font-bold text-[#0f172a]">
            Inquiry Submitted Successfully
          </h4>
          <p className="text-[15px] text-[#64748b] max-w-md leading-relaxed">
            Thank you! Your inquiry has been routed directly to{" "}
            <span className="font-bold text-[#4355ff]">
              {targetEmails.join(", ")}
            </span>
            . Our specialists will review your requirements and respond shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-5">
            <div>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-[52px] px-5 text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] bg-white border border-[#e2e8f0] rounded-[12px] focus:outline-none focus:border-[#4355ff] transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-[52px] px-5 text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] bg-white border border-[#e2e8f0] rounded-[12px] focus:outline-none focus:border-[#4355ff] transition-all"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="mb-5">
            <input
              type="email"
              name="email"
              required
              placeholder="youremail@website.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[52px] px-5 text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] bg-white border border-[#e2e8f0] rounded-[12px] focus:outline-none focus:border-[#4355ff] transition-all"
            />
          </div>

          {/* Row 3: Country Select */}
          <div className="relative mb-5">
            <button
              type="button"
              onClick={() => {
                setIsCountryOpen(!isCountryOpen);
                setIsServicesOpen(false);
              }}
              className="w-full h-[52px] px-5 text-[15px] text-[#0f172a] bg-white border border-[#e2e8f0] rounded-[12px] flex items-center justify-between focus:outline-none focus:border-[#4355ff] transition-all cursor-pointer text-left"
            >
              <span className="font-medium">{country}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-[#94a3b8] transition-transform duration-200",
                  isCountryOpen && "rotate-180"
                )}
              />
            </button>

            {isCountryOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsCountryOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e2e8f0] rounded-[14px] shadow-2xl z-30 py-2.5 max-h-60 overflow-y-auto">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCountry(c);
                        setIsCountryOpen(false);
                      }}
                      className={cn(
                        "w-full px-5 py-3 text-left text-[15px] hover:bg-[#f8fafc] transition-colors cursor-pointer flex items-center justify-between",
                        country === c
                          ? "text-[#4355ff] font-semibold bg-[#4355ff]/5"
                          : "text-[#0f172a]"
                      )}
                    >
                      <span>{c}</span>
                      {country === c && <Check className="w-4 h-4 text-[#4355ff]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Row 4: Services Select Dropdown (Clean without checkboxes) */}
          <div className="relative mb-5">
            <button
              type="button"
              onClick={() => {
                setIsServicesOpen(!isServicesOpen);
                setIsCountryOpen(false);
              }}
              className="w-full h-[52px] px-5 text-[15px] bg-white border border-[#e2e8f0] rounded-[12px] flex items-center justify-between focus:outline-none focus:border-[#4355ff] transition-all cursor-pointer text-left"
            >
              <span
                className={
                  selectedServices.length === 0
                    ? "text-[#94a3b8]"
                    : "text-[#0f172a] font-medium"
                }
              >
                {selectedServices.length === 0
                  ? "Select services"
                  : selectedServices[0]}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-[#94a3b8] transition-transform duration-200",
                  isServicesOpen && "rotate-180"
                )}
              />
            </button>

            {isServicesOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsServicesOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e2e8f0] rounded-[14px] shadow-2xl z-30 py-2.5 max-h-72 overflow-y-auto">
                  {SERVICES.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleSelectService(service)}
                        className={cn(
                          "w-full px-5 py-3 text-left text-[15px] hover:bg-[#f8fafc] transition-colors cursor-pointer flex items-center justify-between",
                          isSelected
                            ? "text-[#4355ff] font-semibold bg-[#4355ff]/5"
                            : "text-[#0f172a]"
                        )}
                      >
                        <span>{service}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#4355ff]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Row 5: Message Textarea */}
          <div className="mb-5">
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Let us know about your project"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-4 text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] bg-white border border-[#e2e8f0] rounded-[12px] focus:outline-none focus:border-[#4355ff] transition-all resize-none min-h-[130px]"
            />
          </div>

          {/* Row 6: Checkbox and Terms */}
          <div
            onClick={() => setAgreed(!agreed)}
            className="flex items-center gap-3.5 mb-7 cursor-pointer select-none group"
          >
            <div
              className={cn(
                "w-[22px] h-[22px] rounded-[6px] border-2 flex items-center justify-center shrink-0 transition-all",
                agreed
                  ? "bg-[#0f172a] border-[#0f172a] text-white"
                  : "border-[#cbd5e1] bg-white group-hover:border-[#94a3b8]"
              )}
            >
              {agreed && <Check className="w-4 h-4 text-white stroke-[2.5]" />}
            </div>
            <span className="text-[14px] text-[#475569] font-normal leading-tight group-hover:text-[#0f172a] transition-colors">
              I have read and acknowledge the Terms and Conditions
            </span>
          </div>

          {/* Row 7: Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !agreed}
            className="w-full h-[54px] bg-[#4355ff] hover:bg-[#3848ea] active:scale-[0.99] text-white font-bold text-[16px] rounded-[14px] shadow-md hover:shadow-lg hover:shadow-[#4355ff]/25 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
