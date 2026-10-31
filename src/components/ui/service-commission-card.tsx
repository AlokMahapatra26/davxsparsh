'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export interface ServiceCommissionCardProps {
  title: string;
  division: string;
  email: string;
}

export function ServiceCommissionCard({
  title,
  division,
  email,
}: ServiceCommissionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 sm:p-12 rounded-3xl bg-zinc-950 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-zinc-800/90 relative overflow-hidden"
    >
      {/* Left Column - Enters from LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl space-y-3"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[#9eff3e] font-bold flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-[#9eff3e]" />
          <span>Direct Engagement Brief</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight !text-white drop-shadow-sm">
          Commission {title}
        </h2>
        <p className="text-sm sm:text-base !text-zinc-300 leading-relaxed font-sans max-w-xl">
          Engage directly with our practice lead. Send your project parameters or schedule a scoping consultation.
        </p>
      </motion.div>

      {/* Right Column - Enters from RIGHT */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto"
      >
        <Button
          size="lg"
          asChild
          className="bg-[#9eff3e] hover:bg-white !text-black font-extrabold rounded-full px-7 py-6 transition-all duration-200 shadow-md border-0 cursor-pointer"
        >
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(
              `Inquiry: ${title} Engagement`
            )}`}
            className="flex items-center gap-2 !text-black font-extrabold"
          >
            <span>Email {division.split(' ')[0]}</span>
            <ArrowUpRight className="w-4 h-4 !text-black" />
          </a>
        </Button>
        <Button
          size="lg"
          asChild
          className="bg-zinc-900 hover:bg-zinc-800 !text-white border border-zinc-700 font-bold rounded-full px-7 py-6 transition-all duration-200 shadow-sm cursor-pointer"
        >
          <Link href="/contact" className="flex items-center gap-2 !text-white font-bold">
            <span>Contact Studio</span>
            <ArrowRight className="w-4 h-4 !text-white" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default ServiceCommissionCard;
