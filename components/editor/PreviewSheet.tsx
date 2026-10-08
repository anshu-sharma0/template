"use client";

import type { BirthdayWishData } from "@/lib/birthday-types";
import { BirthdayWishRenderer } from "@/components/birthday/BirthdayWishRenderer";
import { PhonePreview } from "@/components/marketing/PhonePreview";

type PreviewSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  data: BirthdayWishData;
};

export function PreviewSheet({ isOpen, onClose, data }: PreviewSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/80 backdrop-blur-md animate-fade-in">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[var(--love-border)] bg-white/95 px-5 py-3.5 text-[var(--love-text-heading)] shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--love-crimson)]">
          <span className="size-2 rounded-full bg-[var(--love-crimson)] animate-pulse" />
          <span>Recipient Preview Mode</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[var(--love-border)] bg-white px-4 py-1.5 text-xs font-semibold text-[var(--love-text-heading)] hover:bg-[var(--love-surface-blush)] shadow-xs transition"
        >
          ← Back to Editing
        </button>
      </div>

      {/* Main Fullscreen Preview Canvas */}
      <div className="flex flex-1 items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-84">
          <PhonePreview size="lg" className="mx-auto shadow-phone">
            <BirthdayWishRenderer data={data} autoOpen />
          </PhonePreview>
        </div>
      </div>
    </div>
  );
}
