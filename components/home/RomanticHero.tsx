"use client";

import Link from "next/link";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

export function RomanticHero() {

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#fff0f3] via-[#fff7f9] to-[#ffffff] pt-12 pb-20 sm:pt-18 sm:pb-28 lg:pt-22 lg:pb-32">
      {/* Radiant Dreamy Love Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-175 rounded-full bg-linear-to-tr from-[#ff758f]/20 via-[#ffccd5]/35 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-32 size-112.5 rounded-full bg-[#ffccd5]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -left-28 size-100 rounded-full bg-[#ffe5ec]/40 blur-2xl"
      />

      {/* Floating Petals / Sparks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute top-16 left-[10%] text-xl opacity-60 animate-petal-drift">
          🌸
        </span>
        <span className="absolute top-40 right-[12%] text-lg opacity-50 animate-petal-drift-delayed">
          ✨
        </span>
        <span className="absolute bottom-28 left-[6%] text-base opacity-45 animate-petal-drift text-pink-400">
          ♥
        </span>
        <span className="absolute bottom-16 right-[20%] text-xl opacity-40 animate-petal-drift-delayed">
          🌷
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Left Column: Romantic Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/95 px-4 py-1.5 shadow-sm shadow-pink-500/5 backdrop-blur-sm transition-all hover:border-pink-300 mb-6">
              <span className="text-sm text-[#ff3366] animate-heart-beat">♥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
                Crafted for Moments That Matter
              </span>
            </div>

            {/* Expressive Editorial Headline with linear Love Accent */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.2rem] font-bold tracking-tight text-[#1f1a1c] leading-[1.12]">
              Because some feelings deserve{" "}
              <span className="relative inline-block bg-linear-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent italic font-normal">
                more than a text.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3.5 text-[#ff758f]/40"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 16 Q 50 2 100 16"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Poetic & Emotionally Compelling Body Copy */}
            <p className="mt-6 text-lg sm:text-xl text-[#524548] leading-relaxed max-w-2xl font-sans">
              Transform your cherished memories, heartfelt words, and favourite
              music into an intimate, interactive digital keepsake. A private
              gift crafted in minutes, treasured for a lifetime.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/templates"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                <span>Create a Love Surprise</span>
                <span className="text-base transition-transform group-hover:scale-125">
                  ♥
                </span>
              </Link>

              <a
                href="#interactive-preview"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-pink-200/80 bg-white px-7 py-4 text-sm font-bold text-[#1f1a1c] shadow-xs backdrop-blur-sm transition-all hover:bg-pink-50/60 hover:border-[#ff3366] hover:text-[#ff3366]"
              >
                <span>See How It Feels</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">
                  ↓
                </span>
              </a>
            </div>

            {/* Trust Metrics Strip */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-pink-100 pt-8 w-full max-w-lg">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#e11d48] to-[#ff3366] bg-clip-text text-transparent">
                  65,000+
                </div>
                <div className="text-xs text-[#6b5e62] mt-1 font-semibold">
                  Love Surprises Sent
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#e11d48] to-[#ff3366] bg-clip-text text-transparent flex items-center gap-1">
                  <span>4.98</span>
                  <span className="text-amber-500 text-lg">★</span>
                </div>
                <div className="text-xs text-[#6b5e62] mt-1 font-semibold">
                  Emotional Joy Score
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#e11d48] to-[#ff3366] bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-xs text-[#6b5e62] mt-1 font-semibold">
                  Free Instant Preview
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Luminous Romantic Envelope & Phone Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <PhoneMockup
              preset="romantic-letter"
              theme="pearl-silver"
              size="md"
              presetData={{
                title: "A Special Surprise",
                subtitle: "Someone who adores you made this memory just for you.",
                badgeText: "FOR SOMEONE CHERISHED",
                actionLabel: "Tap to Open Keepsake ✨",
                songTitle: "Perfect Melody",
                quote: "Every love story is special, but ours is my absolute favorite.",
                dateBadge: "October 14 • Golden Hour",
                footnoteText: "Made with love • Works on any device",
              }}
              floatingBadges={[
                {
                  text: "Emotional Audio",
                  subtext: "Custom love tracks",
                  icon: "🎵",
                  position: "-top-4 -left-8",
                },
                {
                  text: "100% Private",
                  subtext: "Private WhatsApp link",
                  icon: "♥",
                  position: "bottom-12 -right-8",
                  className: "text-[#ff3366]",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
