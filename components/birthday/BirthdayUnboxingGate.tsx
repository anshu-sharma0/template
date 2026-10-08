"use client";

import { Heart } from "@/components/decorative/Heart";
import { Sparkle } from "@/components/decorative/Sparkle";
import { Petal } from "@/components/decorative/Petal";

interface BirthdayUnboxingGateProps {
  recipientName: string;
  senderName?: string;
  onOpen: () => void;
}

export function BirthdayUnboxingGate({
  recipientName,
  senderName,
  onOpen,
}: BirthdayUnboxingGateProps) {
  const initial = recipientName ? recipientName.charAt(0).toUpperCase() : "♥";

  return (
    <div className="relative flex min-h-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[var(--love-canvas-ivory)] via-[var(--love-surface-blush)] to-[var(--love-surface-peach)] p-6 text-center select-none">
      {/* Dreamy Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-72 rounded-full bg-linear-to-tr from-[#ff758f]/20 via-[#ffccd5]/30 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-0 size-60 rounded-full bg-[#ffe5ec]/50 blur-2xl"
      />

      {/* Floating Petals / Sparkles */}
      <Petal className="absolute left-6 top-10 rotate-12 opacity-70 pointer-events-none animate-bounce duration-1000" />
      <Petal className="absolute right-8 top-16 -rotate-45 opacity-60 pointer-events-none" />
      <Sparkle className="absolute right-10 bottom-24 text-[var(--love-crimson)] text-xl opacity-80 pointer-events-none" />
      <Sparkle className="absolute left-8 bottom-28 text-amber-500 text-base opacity-70 pointer-events-none" />

      {/* Top Header Tag */}
      <div className="pt-4 animate-in fade-in duration-500">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--love-border)] bg-white/95 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--love-crimson)] shadow-xs">
          <span>💌</span>
          <span>A Private Moment Just For You</span>
        </div>
      </div>

      {/* Center Gift / Envelope Emblem */}
      <div className="my-auto grid gap-6 max-w-xs animate-in fade-in zoom-in-95 duration-500 py-6">
        {/* Wax Seal / Gift Box Icon */}
        <div className="relative mx-auto size-28 rounded-3xl bg-linear-to-br from-white via-[var(--love-surface-blush)] to-[var(--love-surface-rose)] border border-[var(--love-border)] shadow-love-lift flex items-center justify-center p-3">
          <div className="size-18 rounded-2xl bg-white shadow-inner flex flex-col items-center justify-center border border-pink-100">
            <span className="text-3xl animate-heart-beat">🎁</span>
          </div>

          {/* Stamped Wax Seal */}
          <div className="absolute -bottom-2 -right-2 size-10 rounded-full bg-gradient-to-tr from-[var(--love-crimson)] via-[var(--love-rose)] to-[var(--love-pink)] text-white flex items-center justify-center font-serif font-bold text-sm shadow-md border-2 border-white ring-2 ring-pink-100">
            {initial}
          </div>
        </div>

        {/* Emotionally Compelling Headings */}
        <div className="space-y-2">
          <p className="font-serif italic text-lg sm:text-xl text-[var(--love-crimson)]">
            A little surprise for you, {recipientName}… ❤️
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-[var(--love-text-heading)]">
            Today is all about celebrating you.
          </h2>
          <p className="text-xs text-[var(--love-text-body)] leading-relaxed max-w-xs mx-auto">
            {senderName
              ? `Handcrafted with so much love by ${senderName}.`
              : "Someone who cherishes you made something truly special."}
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="button"
            onClick={onOpen}
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--love-crimson)] via-[var(--love-rose)] to-[var(--love-pink)] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-love-lift transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            <span>Open Your Birthday Surprise ✨</span>
            <span className="transition-transform group-hover:scale-125">♥</span>
          </button>
          <p className="mt-2 text-[10px] text-[var(--love-text-muted)]">
            Tap to untie ribbon &amp; play melody
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pb-3 text-[11px] font-semibold text-[var(--love-text-muted)] tracking-wide">
        Digital Moments • Made With Love ♥
      </div>
    </div>
  );
}
