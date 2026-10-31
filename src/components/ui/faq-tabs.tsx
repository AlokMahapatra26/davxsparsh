"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItemData {
  question: string;
  answer: string;
}

export interface FAQProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: Record<string, FAQItemData[]>;
  className?: string;
}

// Main reusable FAQ component
export const FAQ = ({ 
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  categories,
  faqData,
  className,
  ...props 
}: FAQProps) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0] || "");

  return (
    <section 
      className={cn(
        "relative overflow-hidden bg-background px-4 py-16 sm:py-24 text-foreground",
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs 
        categories={categories}
        selected={selectedCategory} 
        setSelected={setSelectedCategory} 
      />
      <FAQList 
        faqData={faqData}
        selected={selectedCategory} 
      />
    </section>
  );
};

interface FAQHeaderProps {
  title: string;
  subtitle: string;
}

const FAQHeader = ({ title, subtitle }: FAQHeaderProps) => (
  <div className="relative z-10 flex flex-col items-center justify-center text-center">
    <span className="mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text font-medium text-transparent text-xs sm:text-sm tracking-wider uppercase">
      {subtitle}
    </span>
    <h2 className="mb-8 text-3xl sm:text-5xl font-bold tracking-tight font-display">{title}</h2>
    <span className="pointer-events-none absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl" />
  </div>
);

interface FAQTabsProps {
  categories: Record<string, string>;
  selected: string;
  setSelected: (key: string) => void;
}

const FAQTabs = ({ categories, selected, setSelected }: FAQTabsProps) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-3xl mx-auto">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        type="button"
        onClick={() => setSelected(key)}
        className={cn(
          "relative overflow-hidden whitespace-nowrap rounded-lg border px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer",
          selected === key
            ? "border-primary text-background"
            : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card"
        )}
      >
        <span className="relative z-10">{label}</span>
        <AnimatePresence>
          {selected === key && (
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-0 bg-primary"
            />
          )}
        </AnimatePresence>
      </button>
    ))}
  </div>
);

interface FAQListProps {
  faqData: Record<string, FAQItemData[]>;
  selected: string;
}

const FAQList = ({ faqData, selected }: FAQListProps) => (
  <div className="relative z-10 mx-auto mt-10 sm:mt-14 max-w-3xl">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected === category) {
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-3 sm:space-y-4"
            >
              {questions.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </motion.div>
          );
        }
        return null;
      })}
    </AnimatePresence>
  </div>
);

const FAQItem = ({ question, answer }: FAQItemData) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-xl border transition-all duration-200",
        isOpen 
          ? "bg-white/90 border-black/15 shadow-sm" 
          : "bg-white/50 border-black/8 hover:border-black/15 hover:bg-white/70"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-base sm:text-lg font-medium transition-colors",
            isOpen ? "text-foreground font-semibold" : "text-foreground/80"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: "45deg" },
            closed: { rotate: "0deg" },
          }}
          transition={{ duration: 0.2 }}
          className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-black/5"
        >
          <Plus
            className={cn(
              "h-4 w-4 transition-colors",
              isOpen ? "text-foreground" : "text-muted-foreground"
            )}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : "0px", 
          marginBottom: isOpen ? "16px" : "0px",
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden px-4 sm:px-5"
      >
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground pt-1 pb-1">{answer}</p>
      </motion.div>
    </motion.div>
  );
};
