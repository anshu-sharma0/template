"use client";

import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  avatar?: string;
  quote: string;
  rating?: number;
  occasion?: string;
}

export interface TestimonialSectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  testimonials: TestimonialItem[];
  badgeTone?: "champagne" | "rose" | "gold" | "sage" | "lavender" | "emerald";
  className?: string;
}

export function TestimonialSection({
  eyebrow = "Real Stories",
  title = "Loved by creators & cherished by recipients",
  description = "Read short notes from people who made their special moments unforgettable.",
  testimonials = [
    {
      name: "Priya & Rahul",
      role: "Married in Udaipur",
      quote: "Our guests were blown away by the digital wedding invitation! The venue map and live RSVP made planning so seamless.",
      rating: 5,
      occasion: "Wedding",
    },
    {
      name: "Aarav Sharma",
      role: "Surprise for Sister",
      quote: "The virtual cake candle blowing animation brought tears to my sister's eyes on her 21st birthday. Truly magical!",
      rating: 5,
      occasion: "Birthday",
    },
    {
      name: "Sneha Kapur",
      role: "Anniversary Surprise",
      quote: "Created a photo flip card storybook in 5 minutes. The background music played automatically and made it so romantic.",
      rating: 5,
      occasion: "Anniversary",
    },
  ],
  badgeTone = "sage",
  className,
}: TestimonialSectionProps) {
  return (
    <section className={cn("py-16 sm:py-24 bg-[#fffaf5] relative overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          badgeTone={badgeTone}
          align="center"
        />

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 border border-[#e8d5cf]/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#b05765]/40 hover:-translate-y-1"
            >
              <div>
                {/* Header: Rating & Occasion */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm tracking-widest">
                    {"★".repeat(item.rating || 5)}
                  </div>
                  {item.occasion && (
                    <span className="rounded-full bg-[#fceae6] px-3 py-1 text-[10px] font-bold text-[#b05765] uppercase">
                      {item.occasion}
                    </span>
                  )}
                </div>

                {/* Quote */}
                <p className="text-sm text-[#2c2224] leading-relaxed italic font-serif">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-[#eedad5]/60 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-linear-to-tr from-[#b05765] to-[#e09f87] text-white font-bold text-sm shadow-xs">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs text-[#2c2224]">{item.name}</div>
                  <div className="text-[11px] text-[#8e7b7e]">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
