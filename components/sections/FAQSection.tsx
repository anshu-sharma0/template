"use client";

import { useState, type ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  items: FAQItem[];
  badgeTone?: "champagne" | "rose" | "gold" | "sage" | "lavender" | "emerald";
  className?: string;
}

export function FAQSection({
  eyebrow = "Got Questions?",
  title = "Frequently Asked Questions",
  description = "Everything you need to know about creating, customising, and sharing your digital memories.",
  items,
  badgeTone = "lavender",
  className,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className={cn("py-16 sm:py-24 bg-[#fffaf5] relative overflow-hidden", className)}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          badgeTone={badgeTone}
          align="center"
        />

        {/* Search Bar */}
        <div className="mb-8 mx-auto max-w-md">
          <div className="relative">
            <span className="absolute inset-y-0 left-3.5 flex items-center text-[#8e7b7e]">🔍</span>
            <input
              type="text"
              placeholder="Search questions (e.g., RSVP, music, photos)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#e8d5cf] bg-white pl-10 pr-4 py-2.5 text-xs text-[#2c2224] focus:border-[#b05765] focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl bg-white border border-[#e8d5cf]/80 shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-[#2c2224] hover:text-[#b05765] transition-colors"
                >
                  <span className="font-serif text-base font-bold">{item.question}</span>
                  <span className={cn("grid size-7 place-items-center rounded-full bg-[#f8eeeb] text-xs font-bold text-[#b05765] transition-transform duration-200", isOpen && "rotate-180 bg-[#b05765] text-white")}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#6e5d60] leading-relaxed border-t border-[#f5e7e3] pt-4 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need Help Prompt */}
        <div className="mt-12 text-center rounded-3xl bg-[#fceae6]/50 p-6 border border-[#eedad5] max-w-md mx-auto">
          <p className="text-xs font-semibold text-[#2c2224]">Still have questions?</p>
          <p className="mt-1 text-[11px] text-[#8e7b7e]">We&apos;re here to help make your surprise perfect.</p>
          <a
            href="mailto:support@digitalmoments.com"
            className="mt-3 inline-block rounded-full bg-[#b05765] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#964552]"
          >
            Contact Support 💌
          </a>
        </div>
      </div>
    </section>
  );
}
