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
            ? "bg-[linear-gradient(180deg,#191514_0%,#4a3136_60%,#191514_100%)] text-white"
            : "bg-[linear-gradient(180deg,#fffdf9_0%,#f5ead7_50%,#fffdf9_100%)] text-text"
        )}
      >
        <Floral className="opacity-80 mt-2" />

        <div className="my-auto grid gap-6 max-w-xs">
          <p className={isLuxury ? "text-xs uppercase tracking-widest text-accent font-medium" : "text-xs uppercase tracking-widest text-text-muted font-medium"}>
            Together with their families
          </p>

          <div className="space-y-1">
            <p className="font-display text-4xl leading-none">{bride}</p>
            <p className={isLuxury ? "font-display text-2xl text-accent" : "font-display text-2xl text-primary"}>
              &
            </p>
            <p className="font-display text-4xl leading-none">{groom}</p>
          </div>

          <p className={isLuxury ? "text-xs font-semibold text-accent tracking-widest" : "text-xs font-semibold text-primary tracking-widest"}>
            {data.weddingDate || "24 FEBRUARY 2027"}
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={cn(
              "mt-4 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-wider shadow-lift transition-transform hover:scale-105 active:scale-95",
              isLuxury
                ? "bg-[linear-gradient(135deg,#c6a15b,#8a6934)] text-white"
                : "bg-text text-white"
            )}
          >
            <span>Open Invitation</span>
            <Sparkle className={isLuxury ? "text-white text-xs" : "text-accent text-xs"} />
          </button>
        </div>

        <p className={isLuxury ? "text-[10px] text-white/50 tracking-widest uppercase" : "text-[10px] text-text-muted tracking-widest uppercase"}>
          Wedding Microsite • Luma Vows
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
          ? "bg-[linear-gradient(180deg,#191514_0%,#3d282c_40%,#191514_100%)] text-white"
          : "bg-[linear-gradient(180deg,#fffdf9_0%,#f9f3e8_40%,#fffdf9_100%)] text-text"
      )}
    >
      <div className="relative z-10 flex flex-col justify-between gap-8 py-2">
        {/* Couple Hero Header */}
        <div className="space-y-3 pt-2">
          <p className={isLuxury ? "text-[10px] uppercase tracking-widest text-accent font-semibold" : "text-[10px] uppercase tracking-widest text-text-muted font-semibold"}>
            Together with their families
          </p>
          <Floral className="mx-auto opacity-80" />
          <div className="space-y-1">
            <h1 className="font-display text-5xl leading-none">{bride}</h1>
            <p className={isLuxury ? "font-display text-2xl text-accent font-serif" : "font-display text-2xl text-primary font-serif"}>
              &
            </p>
            <h1 className="font-display text-5xl leading-none">{groom}</h1>
          </div>
          <p className={isLuxury ? "text-xs font-semibold text-accent tracking-widest" : "text-xs font-semibold text-primary tracking-widest"}>
            {data.weddingDate || "24.02.2027"} {data.weddingTime ? `• ${data.weddingTime}` : ""}
          </p>
        </div>

        {/* Couple Photo */}
        <div className={compact ? "mx-auto w-36" : "mx-auto w-44"}>
          <div className={cn("group relative overflow-hidden rounded-2xl border-4 p-2 shadow-lift", isLuxury ? "border-accent/40 bg-surface/30" : "border-white bg-white")}>
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
        <div className={cn("mx-auto w-full max-w-[17rem] rounded-2xl p-5 text-center shadow-soft", isLuxury ? "border border-white/15 bg-white/5 text-white/90" : "border border-border/80 bg-surface/90 text-text")}>
          <p className="font-serif italic text-sm leading-relaxed whitespace-pre-line">
            &ldquo;{data.invitationMessage || "We invite you to share in the joy of our wedding celebration."}&rdquo;
          </p>

          {data.showFamily && (data.brideFamily || data.groomFamily) && (
            <div className="mt-4 pt-3 border-t border-border/50 text-xs space-y-1 text-text-muted">
              {data.brideFamily && <p className={isLuxury ? "text-white/70" : ""}>{data.brideFamily}</p>}
              {data.groomFamily && <p className={isLuxury ? "text-white/70" : ""}>{data.groomFamily}</p>}
            </div>
          )}
        </div>

        {/* Countdown */}
        {data.showCountdown && data.weddingDate && (
          <div className={cn("mx-auto w-full max-w-[17rem] rounded-2xl p-4 text-center", isLuxury ? "bg-white/5 border border-accent/30" : "bg-surface-soft/80 border border-border")}>
            <p className={isLuxury ? "text-[10px] font-semibold uppercase tracking-widest text-accent mb-3" : "text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3"}>
              Countdown to Forever
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <span className="font-display text-2xl font-semibold leading-none">{timeLeft.days}</span>
                <span className={isLuxury ? "block text-[9px] text-white/60 uppercase mt-1" : "block text-[9px] text-text-muted uppercase mt-1"}>Days</span>
              </div>
              <div>
                <span className="font-display text-2xl font-semibold leading-none">{timeLeft.hours}</span>
                <span className={isLuxury ? "block text-[9px] text-white/60 uppercase mt-1" : "block text-[9px] text-text-muted uppercase mt-1"}>Hours</span>
              </div>
              <div>
                <span className="font-display text-2xl font-semibold leading-none">{timeLeft.minutes}</span>
                <span className={isLuxury ? "block text-[9px] text-white/60 uppercase mt-1" : "block text-[9px] text-text-muted uppercase mt-1"}>Mins</span>
              </div>
              <div>
                <span className="font-display text-2xl font-semibold leading-none">{timeLeft.seconds}</span>
                <span className={isLuxury ? "block text-[9px] text-white/60 uppercase mt-1" : "block text-[9px] text-text-muted uppercase mt-1"}>Secs</span>
              </div>
            </div>
          </div>
        )}

        {/* Story Timeline */}
        {data.story && data.story.timeline && data.story.timeline.length > 0 && (
          <div className="mx-auto w-full max-w-[17rem] space-y-4 text-left">
            <div className="text-center">
              <p className={isLuxury ? "text-[10px] uppercase tracking-widest font-semibold text-accent" : "text-[10px] uppercase tracking-widest font-semibold text-primary"}>
                {data.story.title || "Our Story"}
              </p>
              {data.story.description && (
                <p className={isLuxury ? "text-xs text-white/70 italic mt-1 font-serif" : "text-xs text-text-muted italic mt-1 font-serif"}>
                  {data.story.description}
                </p>
              )}
            </div>

            <div className="relative border-l border-primary/30 pl-4 space-y-4 ml-2">
              {data.story.timeline.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute -left-[1.35rem] top-1 size-2 rounded-full bg-primary" />
                  <span className={isLuxury ? "text-[10px] font-bold text-accent" : "text-[10px] font-bold text-primary"}>
                    {item.date}
                  </span>
                  <h4 className="font-display text-base font-normal">{item.title}</h4>
                  <p className={isLuxury ? "text-xs text-white/70 mt-0.5 leading-relaxed" : "text-xs text-text-muted mt-0.5 leading-relaxed"}>
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
            <p className={isLuxury ? "text-[10px] uppercase tracking-widest font-semibold text-accent" : "text-[10px] uppercase tracking-widest font-semibold text-primary"}>
              Wedding Celebrations
            </p>

            <div className="space-y-2.5">
              {data.events.map((evt) => (
                <div
                  key={evt.id}
                  className={cn(
                    "rounded-xl p-3.5 text-left border transition",
                    isLuxury
                      ? "border-white/10 bg-white/5"
                      : "border-border/80 bg-surface shadow-xs"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-lg font-normal text-text">{evt.title}</h4>
                    {evt.time && (
                      <span className={isLuxury ? "text-[10px] text-accent font-semibold" : "text-[10px] text-primary font-semibold"}>
                        {evt.time}
                      </span>
                    )}
                  </div>

                  {evt.date && (
                    <p className={isLuxury ? "text-xs text-white/80 font-medium mt-0.5" : "text-xs text-text font-medium mt-0.5"}>
                      {evt.date}
                    </p>
                  )}

                  {evt.venue && (
                    <p className={isLuxury ? "text-[11px] text-white/60 mt-1" : "text-[11px] text-text-muted mt-1"}>
                      📍 {evt.venue}
                    </p>
                  )}

                  {evt.description && (
                    <p className={isLuxury ? "text-[11px] text-white/50 italic mt-1 font-serif" : "text-[11px] text-text-muted italic mt-1 font-serif"}>
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
          <div className={cn("mx-auto w-full max-w-[17rem] rounded-2xl p-4 text-center border", isLuxury ? "border-accent/30 bg-white/5" : "border-border bg-surface shadow-soft")}>
            <span className="text-xl">📍</span>
            <h4 className="font-display text-xl font-normal mt-1">{data.venue.name}</h4>
            {data.venue.address && (
              <p className={isLuxury ? "text-xs text-white/70 mt-1" : "text-xs text-text-muted mt-1"}>
                {data.venue.address}
              </p>
            )}
            {data.venue.mapsUrl && (
              <a
                href={data.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("mt-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold transition", isLuxury ? "bg-accent text-white hover:bg-accent-strong" : "bg-primary text-white hover:bg-primary-strong")}
              >
                View Location →
              </a>
            )}
          </div>
        )}

        {/* Gallery */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="mx-auto w-full max-w-[17rem] space-y-2">
            <p className={isLuxury ? "text-[10px] uppercase tracking-widest font-semibold text-accent" : "text-[10px] uppercase tracking-widest font-semibold text-text-muted"}>
              Pre-Wedding Gallery
            </p>
            <div className="grid grid-cols-2 gap-2">
              {data.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-xl border-2 border-white/80 bg-surface shadow-xs"
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
          <div className={cn("mx-auto w-full max-w-[17rem] rounded-2xl p-5 text-center border shadow-soft", isLuxury ? "border-accent/40 bg-[linear-gradient(135deg,rgba(198,161,91,0.2),rgba(74,49,54,0.4))]" : "border-primary/20 bg-surface-soft/80")}>
            <Heart className="mx-auto text-primary text-lg mb-2" />
            <h4 className="font-display text-xl font-normal leading-snug">
              {data.rsvp.heading || "We Would Love to Celebrate With You"}
            </h4>

            <button
              type="button"
              className={cn("mt-4 w-full rounded-full py-2.5 text-xs font-semibold tracking-wider uppercase transition shadow-sm", isLuxury ? "bg-accent text-white" : "bg-primary text-white")}
            >
              Confirm Your Presence
            </button>

            {data.rsvp.contact && (
              <p className={isLuxury ? "text-[10px] text-white/70 mt-3" : "text-[10px] text-text-muted mt-3"}>
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
            <p className="font-serif italic text-xs text-text-muted">
              We can&apos;t wait to celebrate our special day with you.
            </p>
            <p className={isLuxury ? "text-[11px] font-semibold uppercase tracking-widest text-accent" : "text-[11px] font-semibold uppercase tracking-widest text-primary"}>
              Together in celebration ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
