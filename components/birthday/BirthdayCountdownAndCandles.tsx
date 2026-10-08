"use client";

import { useState, useEffect } from "react";
import { playCelebrationChime } from "@/lib/romanticAudio";

interface BirthdayCountdownAndCandlesProps {
  birthDate?: string;
  recipientName: string;
}

export function BirthdayCountdownAndCandles({
  birthDate,
  recipientName,
}: BirthdayCountdownAndCandlesProps) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showCelebrationConfetti, setShowCelebrationConfetti] = useState(false);

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    isToday: boolean;
  }>({ days: 0, hours: 0, minutes: 0, isToday: true });

  useEffect(() => {
    if (!birthDate) return;

    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Parse birthDate
      const parsed = new Date(birthDate);
      if (isNaN(parsed.getTime())) return;

      let target = new Date(currentYear, parsed.getMonth(), parsed.getDate());
      // If birthday already passed this year and is not today, calculate for next year
      const isToday =
        now.getDate() === parsed.getDate() && now.getMonth() === parsed.getMonth();

      if (isToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, isToday: true });
        return;
      }

      if (target.getTime() < now.getTime()) {
        target = new Date(currentYear + 1, parsed.getMonth(), parsed.getDate());
      }

      const diff = target.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      setTimeLeft({ days, hours, minutes, isToday: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [birthDate]);

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      playCelebrationChime();
      setShowCelebrationConfetti(true);
      setTimeout(() => setShowCelebrationConfetti(false), 3500);
    }
    setCandlesBlown((prev) => !prev);
  };

  return (
    <section className="relative my-6 px-4">
      {/* Floating Confetti Particle Overlay when candles are blown */}
      {showCelebrationConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute animate-in fade-in zoom-in-50 text-2xl"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animation: "spin 2s linear infinite",
              }}
            >
              {["✨", "🎉", "💖", "🎂", "⭐", "🌸"][i % 6]}
            </span>
          ))}
        </div>
      )}

      <div className="mx-auto max-w-sm rounded-3xl border border-[var(--love-border)] bg-gradient-to-b from-white to-[var(--love-surface-blush)] p-5 shadow-love-card text-center">
        {/* Countdown Header */}
        <div className="mb-4">
          {timeLeft.isToday ? (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-amber-400/20 via-pink-400/20 to-amber-400/20 px-3.5 py-1 text-xs font-bold text-[var(--love-gold)] border border-amber-200/80">
              <span>🎉</span>
              <span>Today is YOUR Special Day!</span>
            </div>
          ) : (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--love-crimson)]">
                Countdown to Your Birthday
              </span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-white p-2 border border-pink-100 shadow-2xs">
                  <div className="font-serif text-xl font-bold text-[var(--love-crimson)]">
                    {timeLeft.days}
                  </div>
                  <div className="text-[9px] font-bold text-[var(--love-text-muted)] uppercase">
                    Days
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-2 border border-pink-100 shadow-2xs">
                  <div className="font-serif text-xl font-bold text-[var(--love-crimson)]">
                    {timeLeft.hours}
                  </div>
                  <div className="text-[9px] font-bold text-[var(--love-text-muted)] uppercase">
                    Hours
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-2 border border-pink-100 shadow-2xs">
                  <div className="font-serif text-xl font-bold text-[var(--love-crimson)]">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-[9px] font-bold text-[var(--love-text-muted)] uppercase">
                    Mins
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Birthday Cake Ritual */}
        <div className="rounded-2xl bg-white/95 p-4 border border-pink-100 shadow-sm mt-3">
          <div className="relative mx-auto py-2">
            {/* Animated Candle Flames */}
            <div className="flex justify-center items-center gap-3 text-3xl transition-all duration-300">
              {candlesBlown ? (
                <div className="flex items-center gap-2 animate-in zoom-in-75 duration-300">
                  <span>💨</span>
                  <span className="text-2xl animate-spin">✨</span>
                  <span>🎂</span>
                  <span className="text-2xl animate-bounce">🎉</span>
                  <span>💨</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="animate-pulse">🕯️</span>
                  <span className="animate-bounce">🕯️</span>
                  <span>🎂</span>
                  <span className="animate-bounce">🕯️</span>
                  <span className="animate-pulse">🕯️</span>
                </div>
              )}
            </div>

            <h3 className="font-serif text-lg font-bold text-[var(--love-text-heading)] mt-3">
              {candlesBlown ? "Wish Sent to the Stars! ✨" : "Make a Birthday Wish"}
            </h3>

            <p className="text-xs text-[var(--love-text-body)] mt-1 leading-relaxed">
              {candlesBlown
                ? `May all your deepest dreams come true this year, ${recipientName}! ❤️`
                : "Close your eyes, make the biggest wish of your heart, and tap below to blow out your candles."}
            </p>

            <button
              type="button"
              onClick={handleBlowCandles}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-[var(--love-crimson)] via-[var(--love-rose)] to-[var(--love-pink)] py-3 text-xs font-bold text-white shadow-md shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition-all"
            >
              {candlesBlown ? "Relight Candles 🕯️" : "Tap to Blow the Candles! 💨✨"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
