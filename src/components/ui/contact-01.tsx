import React from "react";
import ContactInfo from "@/components/ui/contact-01-utils/contact-info";
import ContactForm from "@/components/ui/contact-01-utils/contact-form";

const Contact = () => {
  return (
    <section className="relative w-full min-h-screen bg-white flex items-center justify-center py-12 sm:py-16 md:py-20 px-6 sm:px-10 lg:px-12 selection:bg-[#4355ff]/10">
      <div className="w-full max-w-[1020px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
          {/* Left Column: Headline, Details, Trusted By */}
          <div className="w-full lg:w-[530px] shrink-0 pt-1 lg:pt-2">
            <ContactInfo />
          </div>

          {/* Right Column: Project Inquiry Card */}
          <div className="w-full lg:w-[410px] flex justify-center lg:justify-end shrink-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
