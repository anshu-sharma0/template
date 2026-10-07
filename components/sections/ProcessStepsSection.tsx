"use client";

import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

export interface ProcessStep {
  number?: string | number;
  icon: ReactNode;
  title: string;
  description: string;
  tag?: string;
}

export interface ProcessStepsSectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  steps?: ProcessStep[];
  badgeTone?: "champagne" | "rose" | "gold" | "sage" | "lavender" | "emerald";
  className?: string;
}

export function ProcessStepsSection({
  eyebrow = "Simple Process",
  title = "Four simple steps to create magic",
  description = "No coding or design skills needed. Create & share in under 3 minutes.",
  steps = [
    { number: "01", icon: "🎨", title: "Choose a Template", description: "Select from dozens of crafted birthday, wedding, & anniversary themes.", tag: "30+ Themes" },
    { number: "02", icon: "✍️", title: "Personalise Memories", description: "Add secret messages, photo galleries, background music, & RSVP details.", tag: "Custom Photo & Music" },
    { number: "03", icon: "👀", title: "Live Device Preview", description: "Preview real-time interactive blowing candles, scratch cards & countdowns.", tag: "Mobile Friendly" },
    { number: "04", icon: "🚀", title: "Share & Track RSVPs", description: "Send via WhatsApp, QR code or link. Track guest RSVPs and views live.", tag: "Instant Share" },
  ],
  badgeTone = "champagne",
  className,
}: ProcessStepsSectionProps) {
  return (
    <section className={cn("py-16 sm:py-24 bg-[#fff5ee]/60 relative overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          badgeTone={badgeTone}
          align="center"
        />

        <div className="relative mt-8">
          {/* Connecting Line (Desktop) */}
          <div aria-hidden="true" className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 -translate-y-6 bg-linear-to-r from-[#e8d5cf] via-[#b05765]/30 to-[#e8d5cf] z-0" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 border border-[#e8d5cf]/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#b05765]/40 hover:-translate-y-1.5"
              >
                <div>
                  {/* Step Badge & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="grid size-12 place-items-center rounded-2xl bg-[#fceae6] text-2xl text-[#b05765] shadow-xs transition-transform group-hover:scale-110">
                      {step.icon}
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#b05765]/25 group-hover:text-[#b05765]/50 transition-colors">
                      {step.number || `0${idx + 1}`}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg font-bold text-[#2c2224] transition-colors group-hover:text-[#b05765]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#6e5d60] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {step.tag && (
                  <div className="mt-6 pt-4 border-t border-[#eedad5]/60">
                    <span className="inline-block rounded-full bg-[#f8eeeb] px-3 py-1 text-[11px] font-bold text-[#b05765]">
                      {step.tag}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
