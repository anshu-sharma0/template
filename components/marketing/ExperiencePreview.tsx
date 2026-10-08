"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { PhonePreview } from "./PhonePreview";
import { Button } from "@/components/ui/Button";
import { Heart } from "@/components/decorative/Heart";
import { Sparkle } from "@/components/decorative/Sparkle";

export function ExperiencePreview() {
  const [activeTab, setActiveTab] = useState<"birthday" | "wedding">("birthday");

  return (
    <Section background="default" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Recipient Experience"
        title="It's not just a link. It's a little experience."
        description="From the first tap to the final message, every detail is designed to feel personal."
      />

      {/* Interactive Tab Switcher */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full border border-[var(--love-border)] bg-white p-1.5 shadow-soft">
          <button
            type="button"
            onClick={() => setActiveTab("birthday")}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition duration-200 ${activeTab === "birthday"
                ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-sm"
                : "text-[var(--love-text-muted)] hover:text-[var(--love-text-heading)]"
              }`}
          >
            <span>🎂 Birthday Wish</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("wedding")}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition duration-200 ${activeTab === "wedding"
                ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-sm"
                : "text-[var(--love-text-muted)] hover:text-[var(--love-text-heading)]"
              }`}
          >
            <span>💍 Wedding Invitation</span>
          </button>
        </div>
      </div>

      {/* Interactive Demonstration Area */}
      <div className="mt-10 mx-auto max-w-5xl rounded-3xl border border-[var(--love-border)] bg-white p-6 sm:p-10 shadow-love-lift">
        {activeTab === "birthday" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--love-border)] bg-[var(--love-surface-blush)] px-3.5 py-1.5 text-xs font-semibold text-[var(--love-crimson)]">
                <Heart className="text-sm" />
                <span>Interactive Recipient Flow</span>
              </div>

              <h3 className="font-display text-4xl text-[var(--love-text-heading)] font-normal leading-tight">
                “Someone made something special for you ❤️”
              </h3>

              <p className="text-base text-[var(--love-text-body)] leading-relaxed">
                When they tap the private link, they are greeted with an intimate cover screen inviting them to tap <span className="font-semibold text-[var(--love-text-heading)]">&ldquo;Open Your Surprise&rdquo;</span>.
              </p>

              <ul className="grid gap-3 text-sm text-[var(--love-text-body)]">
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--love-surface-rose)] text-[var(--love-crimson)] text-xs font-bold">✓</span>
                  <span>Personal birthday greeting & custom photo memory</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--love-surface-rose)] text-[var(--love-crimson)] text-xs font-bold">✓</span>
                  <span>Interactive message reveal card</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--love-surface-rose)] text-[var(--love-crimson)] text-xs font-bold">✓</span>
                  <span>Background music control button</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button href="/birthday/create" variant="primary">
                  Try Birthday Experience
                </Button>
              </div>
            </div>

            <div className="flex justify-center bg-gradient-to-br from-white via-[var(--love-surface-blush)] to-[var(--love-surface-peach)] p-8 rounded-2xl border border-[var(--love-border)]">
              <PhonePreview variant="birthday" size="md" className="shadow-love-phone" />
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-amber-50/60 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
                <Sparkle className="text-sm text-amber-600" />
                <span>Wedding Microsite Experience</span>
              </div>

              <h3 className="font-display text-4xl text-[var(--love-text-heading)] font-normal leading-tight">
                Together with their families.
              </h3>

              <p className="text-base text-[var(--love-text-body)] leading-relaxed">
                A digital invitation designed to feel like a high-end editorial keepsake with complete event information and guest convenience.
              </p>

              <ul className="grid gap-3 text-sm text-[var(--love-text-body)]">
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-bold">✓</span>
                  <span>Couple names, date & ceremonial message</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-bold">✓</span>
                  <span>Event schedule & venue location details</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-bold">✓</span>
                  <span>Photo gallery & RSVP interaction</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button href="/wedding/create?template=elegant" variant="primary">
                  Try Wedding Experience
                </Button>
              </div>
            </div>

            <div className="flex justify-center bg-gradient-to-br from-white via-amber-50/40 to-[#fcf6ee] p-8 rounded-2xl border border-amber-200/80">
              <PhonePreview variant="luxuryWedding" size="md" className="shadow-love-phone" />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
