"use client";

import { useState, useEffect } from "react";
import type { WeddingInvitationData } from "@/lib/wedding-types";
import { Floral } from "@/components/decorative/Floral";
import { Sparkle } from "@/components/decorative/Sparkle";
import { Heart } from "@/components/decorative/Heart";
import { MusicButton } from "@/components/invitation/MusicButton";
import { cn } from "@/lib/cn";

type WeddingRendererProps = {
  data: WeddingInvitationData;
  compact?: boolean;
  autoOpen?: boolean;
};

export function WeddingRenderer({
  data,
  compact = false,
  autoOpen = false,
}: WeddingRendererProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!data.weddingDate) return;
    const targetDate = new Date(data.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.weddingDate]);

  const bride = data.brideName || "Isha";
  const groom = data.groomName || "Rahul";
  const isLuxury = data.template === "luxury";

  // Opening Screen
  if (!isOpen) {
    return (
      <div
        className={cn(
          "relative flex min-h-full flex-col items-center justify-between overflow-hidden p-6 text-center select-none",
          isLuxury
            ? "bg-[linear-gradient(180deg,#ffffff_0%,#faf5ee_50%,#f5ebe0_100%)] text-[var(--love-text-heading)]"
            : "bg-[linear-gradient(180deg,#fffdf9_0%,#fdf5f7_50%,#fff0f3_100%)] text-[var(--love-text-heading)]"
        )}
      >
        <Floral className="opacity-80 mt-2" />

        <div className="my-auto grid gap-6 max-w-xs">
          <p className={isLuxury ? "text-xs uppercase tracking-widest text-amber-700 font-semibold" : "text-xs uppercase tracking-widest text-[var(--love-crimson)] font-semibold"}>
            Together with their families
          </p>

          <div className="space-y-1">
            <p className="font-display text-4xl leading-none text-[var(--love-text-heading)]">{bride}</p>
            <p className={isLuxury ? "font-display text-2xl text-amber-600 font-serif" : "font-display text-2xl text-[var(--love-crimson)] font-serif"}>
              &
            </p>
            <p className="font-display text-4xl leading-none text-[var(--love-text-heading)]">{groom}</p>
          </div>

          <p className={isLuxury ? "text-xs font-semibold text-amber-800 tracking-widest" : "text-xs font-semibold text-[var(--love-crimson)] tracking-widest"}>
            {data.weddingDate || "24 FEBRUARY 2027"}
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={cn(
              "mt-4 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer",
              isLuxury
                ? "bg-[linear-gradient(135deg,#d97706,#b45309)] text-white shadow-amber-500/20"
                : "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-pink-500/20"
            )}
          >
            <span>Open Invitation</span>
            <Sparkle className="text-white text-xs" />
          </button>
        </div>

        <p className={isLuxury ? "text-[10px] text-amber-800/70 tracking-widest uppercase font-semibold" : "text-[10px] text-[var(--love-text-muted)] tracking-widest uppercase font-semibold"}>
          Wedding Microsite • Made With Love ♥
        </p>
      </div>
    );
  }

  // Revealed Invitation Experience
  return (
    <div
      className={cn(
        "relative grid min-h-full overflow-y-auto p-5 text-center transition-all duration-700 animate-fade-in",
        isLuxury
          ? "bg-[linear-gradient(180deg,#ffffff_0%,#fbf6ee_40%,#f6ede0_100%)] text-[var(--love-text-heading)]"
          : "bg-[linear-gradient(180deg,#fffdf9_0%,#fdf5f7_40%,#fff0f3_100%)] text-[var(--love-text-heading)]"
      )}
    >
      <div className="relative z-10 flex flex-col justify-between gap-8 py-2">
        {/* Couple Hero Header */}
        <div className="space-y-3 pt-2">
          <p className={isLuxury ? "text-[10px] uppercase tracking-widest text-amber-700 font-bold" : "text-[10px] uppercase tracking-widest text-[var(--love-crimson)] font-bold"}>
            Together with their families
          </p>
          <Floral className="mx-auto opacity-80" />
          <div className="space-y-1">
            <h1 className="font-display text-5xl leading-none text-[var(--love-text-heading)]">{bride}</h1>
            <p className={isLuxury ? "font-display text-2xl text-amber-600 font-serif" : "font-display text-2xl text-[var(--love-crimson)] font-serif"}>
              &
            </p>
            <h1 className="font-display text-5xl leading-none text-[var(--love-text-heading)]">{groom}</h1>
          </div>
          <p className={isLuxury ? "text-xs font-semibold text-amber-800 tracking-widest" : "text-xs font-semibold text-[var(--love-crimson)] tracking-widest"}>
            {data.weddingDate || "24.02.2027"} {data.weddingTime ? `• ${data.weddingTime}` : ""}
          </p>
        </div>

        {/* Couple Photo */}
        <div className={compact ? "mx-auto w-36" : "mx-auto w-44"}>
          <div className={cn("group relative overflow-hidden rounded-2xl border-4 p-2 shadow-md", isLuxury ? "border-amber-200 bg-white" : "border-pink-100 bg-white")}>
            {data.couplePhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.couplePhoto}
                alt={`${bride} and ${groom}`}
                className="aspect-[4/5] w-full rounded-xl object-cover"
              />
            ) : (
              <div className={cn("flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl p-4 text-center", isLuxury ? "bg-white/10" : "bg-[linear-gradient(135deg,#f3e8d8,#e0ceb5)]")}>
                <Floral className="opacity-70 mb-1" />
                <p className="font-display text-2xl leading-tight">{bride} & {groom}</p>
                <p className={isLuxury ? "text-[10px] text-accent uppercase tracking-wider mt-1" : "text-[10px] text-primary uppercase tracking-wider mt-1"}>
                  Save The Date
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Invitation Message & Blessings */}
        <div className={cn("mx-auto w-full max-w-[17rem] rounded-2xl p-5 text-center shadow-soft", isLuxury ? "border border-amber-200/80 bg-white/95 text-[var(--love-text-heading)]" : "border border-[var(--love-border)] bg-white/95 text-[var(--love-text-heading)]")}>
          <p className="font-serif italic text-sm leading-relaxed whitespace-pre-line font-medium text-[var(--love-text-heading)]">
            &ldquo;{data.invitationMessage || "We invite you to share in the joy of our wedding celebration."}&rdquo;
          </p>

          {data.showFamily && (data.brideFamily || data.groomFamily) && (
            <div className="mt-4 pt-3 border-t border-[var(--love-border)]/60 text-xs space-y-1 text-[var(--love-text-muted)]">
              {data.brideFamily && <p className={isLuxury ? "text-amber-900/80 font-medium" : "text-[var(--love-text-body)] font-medium"}>{data.brideFamily}</p>}
              {data.groomFamily && <p className={isLuxury ? "text-amber-900/80 font-medium" : "text-[var(--love-text-body)] font-medium"}>{data.groomFamily}</p>}
            </div>
          )}
        </div>

        {/* Countdown */}
        {data.showCountdown && data.weddingDate && (
          <div className={cn("mx-auto w-full max-w-[17rem] rounded-2xl p-4 text-center shadow-2xs", isLuxury ? "bg-amber-50/70 border border-amber-200/90 text-amber-950" : "bg-[var(--love-surface-blush)] border border-[var(--love-border)] text-[var(--love-text-heading)]")}>
            <p className={isLuxury ? "text-[10px] font-bold uppercase tracking-widest text-amber-800 mb-3" : "text-[10px] font-bold uppercase tracking-widest text-[var(--love-crimson)] mb-3"}>
              Countdown to Forever
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="rounded-xl bg-white p-2 border border-amber-100 shadow-2xs">
                <span className="font-display text-2xl font-bold leading-none text-amber-800">{timeLeft.days}</span>
                <span className="block text-[9px] text-amber-900/70 uppercase mt-1 font-semibold">Days</span>
              </div>
              <div className="rounded-xl bg-white p-2 border border-amber-100 shadow-2xs">
                <span className="font-display text-2xl font-bold leading-none text-amber-800">{timeLeft.hours}</span>
                <span className="block text-[9px] text-amber-900/70 uppercase mt-1 font-semibold">Hours</span>
              </div>
              <div className="rounded-xl bg-white p-2 border border-amber-100 shadow-2xs">
                <span className="font-display text-2xl font-bold leading-none text-amber-800">{timeLeft.minutes}</span>
                <span className="block text-[9px] text-amber-900/70 uppercase mt-1 font-semibold">Mins</span>
              </div>
              <div className="rounded-xl bg-white p-2 border border-amber-100 shadow-2xs">
                <span className="font-display text-2xl font-bold leading-none text-amber-800">{timeLeft.seconds}</span>
                <span className="block text-[9px] text-amber-900/70 uppercase mt-1 font-semibold">Secs</span>
              </div>
            </div>
          </div>
        )}

        {/* Story Timeline */}
        {data.story && data.story.timeline && data.story.timeline.length > 0 && (
          <div className="mx-auto w-full max-w-[17rem] space-y-4 text-left">
            <div className="text-center">
              <p className={isLuxury ? "text-[10px] uppercase tracking-widest font-bold text-amber-800" : "text-[10px] uppercase tracking-widest font-bold text-[var(--love-crimson)]"}>
                {data.story.title || "Our Story"}
              </p>
              {data.story.description && (
                <p className="text-xs text-[var(--love-text-muted)] italic mt-1 font-serif">
                  {data.story.description}
                </p>
              )}
            </div>

            <div className="relative border-l border-amber-300/60 pl-4 space-y-4 ml-2">
              {data.story.timeline.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute -left-[1.35rem] top-1 size-2 rounded-full bg-amber-600" />
                  <span className={isLuxury ? "text-[10px] font-bold text-amber-800" : "text-[10px] font-bold text-[var(--love-crimson)]"}>
                    {item.date}
                  </span>
                  <h4 className="font-display text-base font-bold text-[var(--love-text-heading)]">{item.title}</h4>
                  <p className="text-xs text-[var(--love-text-body)] mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wedding Events Schedule */}
        {data.events && data.events.length > 0 && (
          <div className="mx-auto w-full max-w-[17rem] space-y-3 text-center">
            <p className={isLuxury ? "text-[10px] uppercase tracking-widest font-bold text-amber-800" : "text-[10px] uppercase tracking-widest font-bold text-[var(--love-crimson)]"}>
              Wedding Celebrations
            </p>

            <div className="space-y-2.5">
              {data.events.map((evt) => (
                <div
                  key={evt.id}
                  className={cn(
                    "rounded-xl p-3.5 text-left border transition shadow-2xs",
                    isLuxury
                      ? "border-amber-200/80 bg-white/95"
                      : "border-[var(--love-border)] bg-white/95"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-lg font-bold text-[var(--love-text-heading)]">{evt.title}</h4>
                    {evt.time && (
                      <span className={isLuxury ? "text-[10px] text-amber-700 font-bold" : "text-[10px] text-[var(--love-crimson)] font-bold"}>
                        {evt.time}
                      </span>
                    )}
                  </div>

                  {evt.date && (
                    <p className="text-xs text-[var(--love-text-heading)] font-semibold mt-0.5">
                      {evt.date}
                    </p>
                  )}

                  {evt.venue && (
                    <p className="text-[11px] text-[var(--love-text-body)] mt-1 flex items-center gap-1 font-medium">
                      <span>📍</span>
                      <span>{evt.venue}</span>
                    </p>
                  )}

                  {evt.description && (
                    <p className="text-[11px] text-[var(--love-text-muted)] italic mt-1 font-serif">
                      {evt.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Venue Information */}
        {data.venue && data.venue.name && (
          <div className={cn("mx-auto w-full max-w-[17rem] rounded-2xl p-4 text-center border shadow-soft", isLuxury ? "border-amber-200/80 bg-white/95" : "border-[var(--love-border)] bg-white/95")}>
            <span className="text-xl">📍</span>
            <h4 className="font-display text-xl font-bold mt-1 text-[var(--love-text-heading)]">{data.venue.name}</h4>
            {data.venue.address && (
              <p className="text-xs text-[var(--love-text-body)] mt-1">
                {data.venue.address}
              </p>
            )}
            {data.venue.mapsUrl && (
              <a
                href={data.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("mt-3 inline-block rounded-full px-5 py-2 text-xs font-bold transition shadow-sm", isLuxury ? "bg-[linear-gradient(135deg,#d97706,#b45309)] text-white hover:opacity-90" : "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white hover:opacity-90")}
              >
                View Location →
              </a>
            )}
          </div>
        )}

        {/* Gallery */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="mx-auto w-full max-w-[17rem] space-y-2">
            <p className={isLuxury ? "text-[10px] uppercase tracking-widest font-bold text-amber-800" : "text-[10px] uppercase tracking-widest font-bold text-[var(--love-crimson)]"}>
              Pre-Wedding Gallery
            </p>
            <div className="grid grid-cols-2 gap-2">
              {data.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-xl border-2 border-white bg-white shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`Pre-wedding photo ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RSVP Section */}
        {data.showRSVP && data.rsvp && (
          <div className={cn("mx-auto w-full max-w-[17rem] rounded-2xl p-5 text-center border shadow-soft", isLuxury ? "border-amber-200/90 bg-gradient-to-br from-white via-amber-50/50 to-[#faf3e8]" : "border-[var(--love-border)] bg-gradient-to-br from-white via-[#fff5f7] to-[#ffeef2]")}>
            <Heart className={isLuxury ? "mx-auto text-amber-700 text-lg mb-2" : "mx-auto text-[var(--love-crimson)] text-lg mb-2"} />
            <h4 className="font-display text-xl font-bold leading-snug text-[var(--love-text-heading)]">
              {data.rsvp.heading || "We Would Love to Celebrate With You"}
            </h4>

            <button
              type="button"
              className={cn("mt-4 w-full rounded-full py-3 text-xs font-bold tracking-wider uppercase transition shadow-md", isLuxury ? "bg-[linear-gradient(135deg,#d97706,#b45309)] text-white shadow-amber-500/20" : "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-pink-500/20")}
            >
              Confirm Your Presence
            </button>

            {data.rsvp.contact && (
              <p className="text-[10px] text-[var(--love-text-muted)] mt-3">
                {data.rsvp.contact}
              </p>
            )}
          </div>
        )}

        {/* Music Player & Closing */}
        <div className="space-y-3 pt-2">
          {data.music && data.music !== "none" && (
            <div className="flex justify-center">
              <MusicButton
                isPlaying={isPlayingMusic}
                onToggle={() => setIsPlayingMusic(!isPlayingMusic)}
              />
            </div>
          )}

          <div className="space-y-1">
            <p className="font-serif italic text-xs text-[var(--love-text-muted)]">
              We can&apos;t wait to celebrate our special day with you.
            </p>
            <p className={isLuxury ? "text-[11px] font-bold uppercase tracking-widest text-amber-800" : "text-[11px] font-bold uppercase tracking-widest text-[var(--love-crimson)]"}>
              Together in celebration ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
