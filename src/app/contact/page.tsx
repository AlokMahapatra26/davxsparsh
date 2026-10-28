import type { Metadata } from "next";
import Contact from "@/components/ui/contact-01";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us. We'd love to hear from you.",
};

export default function ContactPage() {
  return <Contact />;
}
