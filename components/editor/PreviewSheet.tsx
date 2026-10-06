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
    <div className="fixed inset-0 z-50 flex flex-col bg-charcoal/80 backdrop-blur-md animate-fade-in">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-text/90 px-5 py-3.5 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
          <span>Recipient Preview Mode</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
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
