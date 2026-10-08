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

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-[#fffbf8] via-[#fff5f7] to-[#fff0f3] text-[#1f1a1c]">
      {/* Reusable Preview Toolbar */}
      <PreviewToolbar
        creation={creation}
        onBackToEdit={() => router.push("/birthday/create")}
        onTemplateChange={setTemplate}
        onRestartExperience={() => setRestartKey((prev) => prev + 1)}
        onPublishClick={() => setIsPublishModalOpen(true)}
        theme="light"
      />

      {/* Main Fullscreen Preview Stage */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="relative w-full max-w-88">
          <PhonePreview size="lg" className="mx-auto shadow-phone">
            <CreationRenderer
              key={restartKey}
              creation={creation}
              autoOpen={shouldAutoOpen}
            />
          </PhonePreview>
        </div>
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
