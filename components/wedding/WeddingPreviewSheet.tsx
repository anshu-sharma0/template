"use client";

import type { WeddingInvitationData } from "@/lib/wedding-types";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";
import { PhonePreview } from "@/components/marketing/PhonePreview";

type WeddingPreviewSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingInvitationData;
};

export function WeddingPreviewSheet({
  isOpen,
  onClose,
  data,
}: WeddingPreviewSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-charcoal/90 backdrop-blur-md animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-text/90 px-5 py-3.5 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
          <span>Wedding Invitation Preview ({data.template})</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
        >
          ← Back to Editing
        </button>
      </div>

      {/* Preview Area */}
      <div className="flex flex-1 items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-88">
          <PhonePreview size="lg" className="mx-auto shadow-phone">
            <WeddingRenderer data={data} autoOpen />
          </PhonePreview>
        </div>
      </div>
    </div>
  );
}
