"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_BIRTHDAY_DATA } from "@/lib/birthday-data";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { useCreationState } from "@/lib/hooks/useCreationState";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { PreviewToolbar } from "@/components/preview/PreviewToolbar";
import { PublishReadyModal } from "@/components/preview/PublishReadyModal";

function BirthdayPreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldAutoOpen = searchParams.get("open") === "1";

  const { creation, setTemplate } = useCreationState<BirthdayWishData>(
    "birthday",
    "birthday-wish",
    DEFAULT_BIRTHDAY_DATA
  );

  const [restartKey, setRestartKey] = useState(0);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"fullscreen" | "phone">("fullscreen");

  return (
    <div className="flex min-h-screen flex-col bg-[#130b24] text-white">
      {/* Reusable Preview Toolbar */}
      <PreviewToolbar
        creation={creation}
        onBackToEdit={() => router.push("/birthday/create")}
        onTemplateChange={setTemplate}
        onRestartExperience={() => setRestartKey((prev) => prev + 1)}
        onPublishClick={() => setIsPublishModalOpen(true)}
        theme="dark"
      />

      {/* View Mode Toggle Pill Bar */}
      <div className="flex items-center justify-center gap-2 py-2 px-4 bg-white/5 border-b border-white/10 text-xs">
        <span className="text-white/60 font-medium">Display Mode:</span>
        <button
          type="button"
          onClick={() => setViewMode("fullscreen")}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            viewMode === "fullscreen"
              ? "bg-amber-400 text-amber-950 shadow-xs"
              : "bg-white/10 text-white/80 hover:bg-white/20"
          }`}
        >
          🖥️ Fullscreen (Reference Style)
        </button>
        <button
          type="button"
          onClick={() => setViewMode("phone")}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            viewMode === "phone"
              ? "bg-amber-400 text-amber-950 shadow-xs"
              : "bg-white/10 text-white/80 hover:bg-white/20"
          }`}
        >
          📱 Phone Bezel Mockup
        </button>
      </div>

      {/* Main Preview Stage */}
      <main className="flex flex-1 items-center justify-center overflow-hidden">
        {viewMode === "fullscreen" ? (
          <div className="w-full h-full min-h-[calc(100vh-6.5rem)] flex items-center justify-center">
            <CreationRenderer
              key={restartKey}
              creation={creation}
              autoOpen={shouldAutoOpen}
            />
          </div>
        ) : (
          <div className="p-4 sm:p-8">
            <div className="relative w-full max-w-88">
              <PhonePreview size="lg" className="mx-auto shadow-phone">
                <CreationRenderer
                  key={restartKey}
                  creation={creation}
                  autoOpen={shouldAutoOpen}
                  compact
                />
              </PhonePreview>
            </div>
          </div>
        )}
      </main>

      {/* Publish Ready Modal */}
      <PublishReadyModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        creation={creation}
      />
    </div>
  );
}

export default function BirthdayPreviewStandalonePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fffbf8]" />}>
      <BirthdayPreviewContent />
    </Suspense>
  );
}
