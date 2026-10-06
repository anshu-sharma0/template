"use client";

import { useEffect, useState } from "react";
import { DEFAULT_BIRTHDAY_DATA, loadSavedBirthdayWish } from "@/lib/birthday-data";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { BirthdayWishRenderer } from "@/components/birthday/BirthdayWishRenderer";
import { PhonePreview } from "@/components/marketing/PhonePreview";

export default function BirthdayPreviewStandalonePage() {
  const [data, setData] = useState<BirthdayWishData>(DEFAULT_BIRTHDAY_DATA);

  useEffect(() => {
    const saved = loadSavedBirthdayWish();
    if (saved) {
      setData(saved);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-charcoal text-white">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-charcoal/90 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-accent">
          <span className="size-2 rounded-full bg-accent animate-pulse" />
          <span>Full Recipient Experience Preview</span>
        </div>

        <a
          href="/birthday/create"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
        >
          <span>← Back to Editing</span>
        </a>
      </header>

      {/* Main Fullscreen Preview Stage */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="relative w-full max-w-88">
          <PhonePreview size="lg" className="mx-auto shadow-phone">
            <BirthdayWishRenderer data={data} autoOpen={false} />
          </PhonePreview>
        </div>
      </main>
    </div>
  );
}
