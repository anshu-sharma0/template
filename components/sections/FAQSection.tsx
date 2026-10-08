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
    <section className={cn("py-16 sm:py-24 bg-[var(--love-canvas-ivory)] relative overflow-hidden", className)}>
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
            <span className="absolute inset-y-0 left-3.5 flex items-center text-[var(--love-text-muted)]">🔍</span>
            <input
              type="text"
              placeholder="Search questions (e.g., RSVP, music, photos)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[var(--love-border)] bg-white pl-10 pr-4 py-2.5 text-xs text-[var(--love-text-heading)] focus:border-[var(--love-crimson)] focus:outline-none shadow-2xs"
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
                className="overflow-hidden rounded-2xl bg-white border border-[var(--love-border)] shadow-love-card transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-[var(--love-text-heading)] hover:text-[var(--love-crimson)] transition-colors cursor-pointer"
                >
                  <span className="font-serif text-base font-bold">{item.question}</span>
                  <span className={cn("grid size-7 place-items-center rounded-full bg-[var(--love-surface-blush)] text-xs font-bold text-[var(--love-crimson)] transition-transform duration-200", isOpen && "rotate-180 bg-[var(--love-crimson)] text-white")}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[var(--love-text-body)] leading-relaxed border-t border-[var(--love-border-subtle)] pt-4 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need Help Prompt */}
        <div className="mt-12 text-center rounded-3xl bg-[var(--love-surface-blush)] p-6 border border-[var(--love-border)] max-w-md mx-auto shadow-2xs">
          <p className="text-xs font-semibold text-[var(--love-text-heading)]">Still have questions?</p>
          <p className="mt-1 text-[11px] text-[var(--love-text-muted)]">We&apos;re here to help make your surprise perfect.</p>
          <a
            href="mailto:support@digitalmoments.com"
            className="mt-3 inline-block rounded-full bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] px-5 py-2 text-xs font-bold text-white shadow-love-lift hover:opacity-95 cursor-pointer"
          >
            Contact Support 💌
          </a>
        </div>
      </div>
    </section>
  );
}
