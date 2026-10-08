"use client";

import { useState } from "react";
import type { SpecialReasonItem } from "@/lib/birthday-types";

interface BirthdaySpecialReasonsProps {
  reasons?: SpecialReasonItem[];
  recipientName: string;
}

export function BirthdaySpecialReasons({
  reasons,
  recipientName,
}: BirthdaySpecialReasonsProps) {
  const defaultReasons: SpecialReasonItem[] = [
    {
      emoji: "🌹",
      title: "Your Gentle Heart",
      description:
        "The way you care about the smallest things and make everyone feel completely safe, understood, and deeply valued.",
    },
    {
      emoji: "✨",
      title: "Your Radiant Smile",
      description:
        "The one thing that can turn any stressful, exhausting day into pure comfort, warmth, and effortless happiness.",
    },
    {
      emoji: "💫",
      title: "Your Inspiring Spirit",
      description:
        "The quiet determination, grace, and fierce passion you pour into every single dream you chase.",
    },
    {
      emoji: "💖",
      title: "Your Unconditional Love",
      description:
        "The sweet, calming reassurance of knowing that no matter what happens in the world, with you I am always home.",
    },
  ];

  const items = reasons && reasons.length > 0 ? reasons : defaultReasons;
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section className="relative my-8 px-4">
      <div className="mx-auto max-w-sm text-center mb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--love-border)] bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--love-crimson)] shadow-2xs mb-2">
          <span>💫</span>
          <span>What Makes You So Rare</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[var(--love-text-heading)]">
          Why you mean the world.
        </h2>
        <p className="text-xs text-[var(--love-text-body)] mt-1 leading-relaxed">
          Four of the countless reasons why having you in my life is the greatest blessing.
        </p>
      </div>

      <div className="mx-auto max-w-sm grid grid-cols-1 gap-3">
        {items.map((item, idx) => {
          const isSelected = activeIdx === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveIdx(isSelected ? null : idx)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 text-left ${isSelected
                  ? "bg-gradient-to-r from-white to-[var(--love-surface-blush)] border-[var(--love-border)] shadow-love-card scale-[1.01]"
                  : "bg-white/90 border-pink-100 hover:border-pink-200 shadow-xs"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-pink-50 text-xl border border-pink-100">
                    {item.emoji}
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[var(--love-text-heading)]">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-[var(--love-crimson)] font-bold">
                      {isSelected ? "Tap to collapse" : "Tap to read reason ↓"}
                    </span>
                  </div>
                </div>

                <span
                  className={`size-6 rounded-full text-xs font-bold grid place-items-center transition-transform duration-300 ${isSelected
                      ? "rotate-180 bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white"
                      : "bg-pink-50 text-[var(--love-crimson)]"
                    }`}
                >
                  ▼
                </span>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-pink-100 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-[var(--love-text-body)] leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
