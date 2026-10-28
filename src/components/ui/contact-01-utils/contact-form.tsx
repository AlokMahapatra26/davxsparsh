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

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [country, setCountry] = useState("India");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }, 800);
  };

  return (
    <div className="w-full max-w-[407px] bg-white rounded-[20px] border border-[#e8e8e8] p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Card Title */}
      <h2 className="text-[19px] font-bold text-[#0f172a] tracking-tight mb-4">
        Start the project
      </h2>

      {submitted ? (
        <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-11 h-11 rounded-full bg-[#4355ff]/10 text-[#4355ff] flex items-center justify-center mb-1">
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h4 className="text-sm font-semibold text-[#0f172a]">
            Inquiry Submitted Successfully
          </h4>
          <p className="text-xs text-[#64748b] max-w-xs leading-relaxed">
            Thank you! We will get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-[38px] px-3 text-[13px] text-[#0f172a] placeholder:text-[#9ca3af] bg-white border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:border-[#4355ff] focus:ring-1 focus:ring-[#4355ff] transition-all"
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
                className="w-full h-[38px] px-3 text-[13px] text-[#0f172a] placeholder:text-[#9ca3af] bg-white border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:border-[#4355ff] focus:ring-1 focus:ring-[#4355ff] transition-all"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              required
              placeholder="youremail@website.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[38px] px-3 text-[13px] text-[#0f172a] placeholder:text-[#9ca3af] bg-white border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:border-[#4355ff] focus:ring-1 focus:ring-[#4355ff] transition-all"
            />
          </div>

          {/* Row 3: Country Select */}
          <div className="relative mb-3">
            <button
              type="button"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="w-full h-[38px] px-3 text-[13px] text-[#0f172a] bg-white border border-[#e8e8e8] rounded-[8px] flex items-center justify-between focus:outline-none focus:border-[#4355ff] focus:ring-1 focus:ring-[#4355ff] transition-all cursor-pointer text-left"
            >
              <span>{country}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[#9ca3af] transition-transform duration-200",
                  isCountryOpen && "rotate-180"
                )}
              />
            </button>

            {isCountryOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsCountryOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e8e8e8] rounded-[8px] shadow-lg z-20 py-1 max-h-48 overflow-y-auto">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCountry(c);
                        setIsCountryOpen(false);
                      }}
                      className={cn(
                        "w-full px-3 py-1.5 text-left text-[13px] hover:bg-[#f8fafc] transition-colors cursor-pointer",
                        country === c
                          ? "text-[#4355ff] font-medium bg-[#f0f4ff]"
                          : "text-[#0f172a]"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Row 4: Message Textarea */}
          <div className="mb-3.5">
            <textarea
              name="message"
              required
              rows={3}
              placeholder="Let us know about your project"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 text-[13px] text-[#0f172a] placeholder:text-[#9ca3af] bg-white border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:border-[#4355ff] focus:ring-1 focus:ring-[#4355ff] transition-all resize-none min-h-[86px]"
            />
          </div>

          {/* Row 5: Checkbox and Terms */}
          <div
            onClick={() => setAgreed(!agreed)}
            className="flex items-center gap-2.5 mb-4 cursor-pointer select-none group"
          >
            <div
              className={cn(
                "w-[17px] h-[17px] rounded-[4px] flex items-center justify-center shrink-0 transition-all",
                agreed
                  ? "bg-[#0f172a] text-white"
                  : "border border-[#cbd5e1] bg-white"
              )}
            >
              {agreed && <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
            </div>
            <span className="text-[12px] text-[#374151] font-normal leading-tight group-hover:text-[#0f172a] transition-colors">
              I have read and acknowledge the Terms and Conditions
            </span>
          </div>

          {/* Row 6: Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !agreed}
            className="w-full h-10 bg-[#4355ff] hover:bg-[#3848ea] active:scale-[0.99] text-white font-medium text-[13px] rounded-[10px] shadow-xs transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
