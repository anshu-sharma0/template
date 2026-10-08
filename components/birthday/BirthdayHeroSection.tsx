"use client";

import { Heart } from "@/components/decorative/Heart";
import { Sparkle } from "@/components/decorative/Sparkle";

interface BirthdayHeroSectionProps {
  recipientName: string;
  relationship?: string;
  age?: string;
  birthDate?: string;
  mainPhoto?: string;
}

export function BirthdayHeroSection({
  recipientName,
  relationship,
  age,
  birthDate,
  mainPhoto,
}: BirthdayHeroSectionProps) {
  return (
    <section className="relative text-center pt-6 pb-8 px-4">
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/90 bg-white/95 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#e11d48] shadow-xs backdrop-blur-xs mb-3">
        <span className="text-xs text-[#ff3366] animate-heart-beat">♥</span>
        <span>
          {relationship ? `For My Special ${relationship}` : "Celebrating Someone Irreplaceable"}
        </span>
      </div>

      {/* Main Emotional Headline */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1f1a1c] leading-tight">
          Happy Birthday,
        </h1>
        <div className="font-serif text-4xl sm:text-5xl font-extrabold italic bg-linear-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent leading-none py-1">
          {recipientName}
        </div>
      </div>

      <p className="mt-2.5 text-xs sm:text-sm text-[#524548] leading-relaxed max-w-xs mx-auto font-sans">
        Today is all about you — your laughter, your gentle heart, and the magic you bring into every single day.
      </p>

      {/* Age & Date Ribbon Badges */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-[11px]">
        {age && (
          <span className="rounded-full bg-linear-to-r from-[#fff0f3] to-[#ffe5ec] px-3 py-1 font-bold text-[#e11d48] border border-pink-200 shadow-2xs">
            🎂 {age} Years of Being Amazing
          </span>
        )}
        {birthDate && (
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-[#6b5e62] border border-pink-100 shadow-2xs">
            📅 {birthDate}
          </span>
        )}
      </div>

      {/* Hero Photo Frame (Polaroid / Portrait) */}
      <div className="mt-6 mx-auto w-48 sm:w-56">
        <div className="group relative rounded-3xl border-4 border-white bg-white p-2.5 shadow-xl shadow-pink-500/15 transition-all duration-300 hover:rotate-1 hover:scale-[1.02]">
          {/* Subtle Pink Glow Aura behind photo */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-tr from-[#ff3366]/20 via-[#ff758f]/20 to-transparent blur-xl" />

          {mainPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainPhoto}
              alt={`Birthday celebration for ${recipientName}`}
              className="aspect-4/5 w-full rounded-2xl object-cover shadow-sm"
            />
          ) : (
            <div className="aspect-4/5 w-full rounded-2xl bg-linear-to-br from-[#ffe4ea] via-[#fff0f3] to-[#ffd1dc] p-5 flex flex-col items-center justify-center text-center border border-pink-200/50">
              <span className="text-4xl mb-2 animate-heart-beat">💖</span>
              <p className="font-serif text-xl font-bold text-[#1f1a1c] leading-tight">
                {recipientName}
              </p>
              <p className="text-[10px] uppercase font-bold text-[#e11d48] tracking-widest mt-1">
                The Brightest Star
              </p>
            </div>
          )}

          {/* Polaroid Bottom Caption */}
          <div className="mt-2.5 pt-1 text-center border-t border-pink-50">
            <span className="font-serif italic text-[11px] text-[#6b5e62] flex items-center justify-center gap-1">
              <span>Today the world pauses for you</span>
              <span className="text-[#ff3366]">✨</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
