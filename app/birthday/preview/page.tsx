"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_BIRTHDAY_DATA } from "@/lib/birthday-data";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { useCreationState } from "@/lib/hooks/useCreationState";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { PreviewToolbar } from "@/components/preview/PreviewToolbar";
import { PublishReadyModal } from "@/components/preview/PublishReadyModal";

export default function BirthdayPreviewStandalonePage() {
  const router = useRouter();
  const { creation, setTemplate } = useCreationState<BirthdayWishData>(
    "birthday",
    "birthday-wish",
    DEFAULT_BIRTHDAY_DATA
  );

  const [restartKey, setRestartKey] = useState(0);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-charcoal text-white">
      {/* Reusable Preview Toolbar */}
      <PreviewToolbar
        creation={creation}
        onBackToEdit={() => router.push("/birthday/create")}
        onTemplateChange={setTemplate}
        onRestartExperience={() => setRestartKey((prev) => prev + 1)}
        onPublishClick={() => setIsPublishModalOpen(true)}
      />

      {/* Main Fullscreen Preview Stage */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="relative w-full max-w-88">
          <PhonePreview size="lg" className="mx-auto shadow-phone">
            <CreationRenderer key={restartKey} creation={creation} autoOpen />
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
