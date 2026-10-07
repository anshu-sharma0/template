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
        "relative rounded-3xl p-6 sm:p-8 text-center border shadow-lg overflow-hidden",
        variant === "glass"
          ? "bg-white/80 backdrop-blur-md border-[#e8d5cf]"
          : "bg-gradient-to-br from-white via-[#fffaf5] to-[#fff0ea] border-[#e8d5cf]",
        className
      )}
    >
      {title && <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2c2224]">{title}</h3>}
      {subtitle && <p className="mt-1 text-xs text-[#6e5d60]">{subtitle}</p>}

      {timeLeft.isExpired ? (
        <div className="my-6 rounded-2xl bg-[#fceae6] p-4 font-serif text-lg font-bold text-[#b05765]">
          🎉 The Celebration Has Begun! 🎉
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
          {units.map((unit, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl bg-white p-3 sm:p-4 border border-[#e8d5cf] shadow-xs"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b05765]">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-bold text-[#8e7b7e] uppercase tracking-wider mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
