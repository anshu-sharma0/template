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
        <div className="inline-flex rounded-full border border-border bg-surface p-1.5 shadow-soft">
          <button
            type="button"
            onClick={() => setActiveTab("birthday")}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition duration-200 ${activeTab === "birthday"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-text"
              }`}
          >
            <span>🎂 Birthday Wish</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("wedding")}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition duration-200 ${activeTab === "wedding"
                ? "bg-text text-white shadow-sm"
                : "text-text-muted hover:text-text"
              }`}
          >
            <span>💍 Wedding Invitation</span>
          </button>
        </div>
      </div>

      {/* Interactive Demonstration Area */}
      <div className="mt-10 mx-auto max-w-5xl rounded-3xl border border-border bg-surface p-6 sm:p-10 shadow-lift">
        {activeTab === "birthday" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/40 px-3.5 py-1.5 text-xs font-semibold text-primary">
                <Heart className="text-sm" />
                <span>Interactive Recipient Flow</span>
              </div>

              <h3 className="font-display text-4xl text-text font-normal leading-tight">
                “Someone made something special for you ❤️”
              </h3>

              <p className="text-base text-text-muted leading-relaxed">
                When they tap the private link, they are greeted with an intimate cover screen inviting them to tap <span className="font-semibold text-text">&ldquo;Open Your Surprise&rdquo;</span>.
              </p>

              <ul className="grid gap-3 text-sm text-text-muted">
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary text-xs">✓</span>
                  <span>Personal birthday greeting & custom photo memory</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary text-xs">✓</span>
                  <span>Interactive message reveal card</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary text-xs">✓</span>
                  <span>Background music control button</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button href="/create?template=birthday-wish" variant="primary">
                  Try Birthday Experience
                </Button>
              </div>
            </div>

            <div className="flex justify-center bg-[linear-gradient(135deg,#fff8f3,#f6dce0)] p-8 rounded-2xl border border-border/70">
              <PhonePreview variant="birthday" size="md" className="shadow-phone" />
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft/50 px-3.5 py-1.5 text-xs font-semibold text-accent-strong">
                <Sparkle className="text-sm" />
                <span>Wedding Microsite Experience</span>
              </div>

              <h3 className="font-display text-4xl text-text font-normal leading-tight">
                Together with their families.
              </h3>

              <p className="text-base text-text-muted leading-relaxed">
                A digital invitation designed to feel like a high-end editorial keepsake with complete event information and guest convenience.
              </p>

              <ul className="grid gap-3 text-sm text-text-muted">
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong text-xs">✓</span>
                  <span>Couple names, date & ceremonial message</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong text-xs">✓</span>
                  <span>Event schedule & venue location details</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong text-xs">✓</span>
                  <span>Photo gallery & RSVP interaction</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button href="/create?template=elegant-wedding" variant="dark">
                  Try Wedding Experience
                </Button>
              </div>
            </div>

            <div className="flex justify-center bg-[linear-gradient(135deg,#2c2524,#4a3539)] p-8 rounded-2xl border border-border/70">
              <PhonePreview variant="luxuryWedding" size="md" className="shadow-phone" />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
