"use client";

import { useState } from "react";
import { playRomanticChime } from "@/lib/romanticAudio";

interface BirthdayFinaleCelebrationProps {
  recipientName: string;
  senderName?: string;
}

export function BirthdayFinaleCelebration({
  recipientName,
  senderName,
}: BirthdayFinaleCelebrationProps) {
  const [heartsTriggered, setHeartsTriggered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSendLoveBack = () => {
    playRomanticChime();
    setHeartsTriggered(true);
    setToastMessage("Your love was sent back! 💕");

    setTimeout(() => {
      setHeartsTriggered(false);
    }, 2500);

    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setToastMessage("Link copied! Save to your bookmarks 📌");
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <section className="relative pt-6 pb-12 px-4 text-center">
      {/* Floating Hearts Shower on Love Back */}
      {heartsTriggered && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute animate-in fade-in zoom-in-75 text-2xl"
              style={{
                bottom: "20%",
                left: `${Math.random() * 80 + 10}%`,
                animation: "floatUp 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
              }}
            >
              {["💖", "✨", "💕", "🌸", "♥", "🌷"][i % 6]}
            </span>
          ))}
        </div>
      )}

      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-white/95 px-5 py-2 text-xs font-bold text-[var(--love-crimson)] border border-[var(--love-border)] shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95">
          {toastMessage}
        </div>
      )}

      <div className="mx-auto max-w-sm rounded-3xl bg-white p-6 sm:p-8 border border-[var(--love-border)] shadow-love-card">
        <span className="text-3xl block mb-2">🥂 🎂 🌹</span>

        <h3 className="font-serif text-2xl font-bold text-[var(--love-text-heading)] leading-tight">
          Here&apos;s to another year of your beautiful journey.
        </h3>

        <p className="mt-3 text-xs sm:text-sm text-[var(--love-text-body)] leading-relaxed font-sans">
          Keep smiling. Keep dreaming. And never forget how deeply, endlessly loved you are.
        </p>

        <div className="mt-5 pt-4 border-t border-pink-100">
          <p className="font-serif text-lg font-bold text-[var(--love-crimson)]">
            Happy Birthday, {recipientName}.
          </p>
          <p className="text-xs text-[var(--love-text-muted)] mt-0.5">
            You deserve all the joy in the entire world. ❤️
          </p>
        </div>

        {/* Interactive Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleSendLoveBack}
            className="group w-full rounded-full bg-gradient-to-r from-[var(--love-crimson)] via-[var(--love-rose)] to-[var(--love-pink)] py-3.5 text-xs sm:text-sm font-bold text-white shadow-love-card hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Send Love Back to {senderName || "Them"}</span>
            <span className="text-base group-hover:scale-125 transition-transform">♥</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full rounded-full bg-[var(--love-surface-blush)] border border-[var(--love-border)] py-3 text-xs font-bold text-[var(--love-crimson)] hover:bg-[var(--love-surface-rose)] active:scale-95 transition-all"
          >
            Save Keepsake Link 🔒
          </button>
        </div>

        {/* Permanent Keepsake Reassurance */}
        <p className="mt-4 text-[10px] text-[var(--love-text-muted)] leading-relaxed">
          This keepsake link is permanent. Bookmark this page to revisit anytime you want to smile.
        </p>
      </div>

      {/* Footer Branding */}
      <div className="mt-8 text-[11px] font-semibold text-[var(--love-text-muted)]">
        Digital Moments • Made With Love ♥
      </div>
    </section>
  );
}
