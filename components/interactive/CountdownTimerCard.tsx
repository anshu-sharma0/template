"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface CountdownTimerCardProps {
  targetDate: string | Date;
  title?: string;
  subtitle?: string;
  variant?: "card" | "glass" | "compact";
  className?: string;
}

export function CountdownTimerCard({
  targetDate,
  title = "Counting Down To The Big Moment",
  subtitle = "Save the Date & Get Ready!",
  variant = "card",
  className,
}: CountdownTimerCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 sm:p-8 text-center border shadow-love-card overflow-hidden",
        variant === "glass"
          ? "bg-white/80 backdrop-blur-md border-[var(--love-border)]"
          : "bg-gradient-to-br from-white via-[var(--love-surface-blush)] to-[var(--love-surface-rose)] border-[var(--love-border)]",
        className
      )}
    >
      {title && <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--love-text-heading)]">{title}</h3>}
      {subtitle && <p className="mt-1 text-xs text-[var(--love-text-muted)]">{subtitle}</p>}

      {timeLeft.isExpired ? (
        <div className="my-6 rounded-2xl bg-[var(--love-surface-blush)] border border-[var(--love-border)] p-4 font-serif text-lg font-bold text-[var(--love-crimson)]">
          🎉 The Celebration Has Begun! 🎉
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
          {units.map((unit, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl bg-white p-3 sm:p-4 border border-[var(--love-border)] shadow-xs"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[var(--love-crimson)]">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-bold text-[var(--love-text-muted)] uppercase tracking-wider mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
