"use client";

import { useState } from "react";
import type { MemoryItem } from "@/lib/birthday-types";

interface BirthdayMemoriesFilmstripProps {
  memories?: MemoryItem[];
  fallbackPhotos?: string[];
  recipientName: string;
}

export function BirthdayMemoriesFilmstrip({
  memories = [],
  fallbackPhotos = [],
  recipientName,
}: BirthdayMemoriesFilmstripProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    caption: string;
    tag?: string;
  } | null>(null);

  // Normalize items from either `memories` or `fallbackPhotos`
  const items: MemoryItem[] =
    memories.length > 0
      ? memories
      : fallbackPhotos.length > 0
        ? fallbackPhotos.map((url, i) => ({
          photoUrl: url,
          caption: `Cherished memory #${i + 1} with ${recipientName}.`,
          dateOrLocation: `Moment #${i + 1}`,
        }))
        : [
          {
            photoUrl: "",
            caption: "The golden hour afternoon where we couldn't stop laughing.",
            dateOrLocation: "October 14 • Golden Hour",
          },
          {
            photoUrl: "",
            caption: "Getting caught in the unexpected rain and dancing anyway.",
            dateOrLocation: "Monsoon Magic • City Lights",
          },
          {
            photoUrl: "",
            caption: "That quiet evening under the stars talking about our future.",
            dateOrLocation: "December • The Rooftop",
          },
        ];

  return (
    <section className="relative my-8 px-4">
      <div className="mx-auto max-w-sm text-center mb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--love-border)] bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--love-crimson)] shadow-2xs mb-2">
          <span>📸</span>
          <span>Our Cherished Memories</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[var(--love-text-heading)]">
          Moments we hold forever.
        </h2>
        <p className="text-xs text-[var(--love-text-body)] mt-1 leading-relaxed">
          Swipe through a few of the sweet chapters that make our journey so unforgettable.
        </p>
      </div>

      {/* Horizontal Swipeable Filmstrip Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className="snap-center shrink-0 w-64 sm:w-72 cursor-pointer group"
            onClick={() =>
              setSelectedPhoto({
                url: item.photoUrl,
                caption: item.caption,
                tag: item.dateOrLocation,
              })
            }
          >
            <div className="relative rounded-3xl border-4 border-white bg-white p-3 shadow-lg shadow-pink-500/10 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
              {/* Photo Box */}
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gradient-to-tr from-[var(--love-surface-rose)] via-[var(--love-surface-cream)] to-[var(--love-surface-blush)] flex items-center justify-center">
                {item.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.photoUrl}
                    alt={item.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="p-4 text-center">
                    <span className="text-3xl mb-1 block">💑</span>
                    <span className="font-serif italic text-xs text-[var(--love-crimson)] font-semibold">
                      Chapter {index + 1}
                    </span>
                  </div>
                )}

                {/* Floating Heart Pin */}
                <div className="absolute top-2.5 right-2.5 size-7 rounded-full bg-white/90 text-[var(--love-crimson)] text-xs font-bold grid place-items-center shadow-xs">
                  ♥
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className="mt-3 text-left px-1">
                {item.dateOrLocation && (
                  <div className="text-[10px] font-bold text-[var(--love-crimson)] uppercase tracking-wider mb-1">
                    📍 {item.dateOrLocation}
                  </div>
                )}
                <p className="font-serif italic text-xs text-[var(--love-text-heading)] leading-relaxed line-clamp-2">
                  &ldquo;{item.caption}&rdquo;
                </p>
                <div className="mt-2 text-[9px] text-[var(--love-text-muted)] font-semibold">
                  Tap to view photo 🔍
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe Hint */}
      <div className="text-center mt-1">
        <span className="text-[10px] text-[var(--love-text-muted)] font-semibold">
          ← Swipe to explore memories →
        </span>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl bg-white p-4 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 size-8 rounded-full bg-pink-100 text-[var(--love-text-heading)] font-bold text-sm grid place-items-center hover:bg-pink-200"
            >
              ✕
            </button>

            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--love-surface-rose)] to-[var(--love-surface-blush)] flex items-center justify-center">
              {selectedPhoto.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <span className="text-5xl block mb-2">📸 ✨</span>
                  <p className="font-serif italic text-base text-[var(--love-text-heading)]">
                    {selectedPhoto.caption}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              {selectedPhoto.tag && (
                <span className="text-[10px] font-bold text-[var(--love-crimson)] uppercase tracking-wider block mb-1">
                  {selectedPhoto.tag}
                </span>
              )}
              <p className="font-serif italic text-sm text-[var(--love-text-heading)]">
                &ldquo;{selectedPhoto.caption}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
