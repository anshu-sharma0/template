"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";
import { DEFAULT_BIRTHDAY_DATA } from "@/lib/birthday-data";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { useCreationState } from "@/lib/hooks/useCreationState";
import { Button } from "@/components/ui/Button";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import { BirthdayStepIndicator } from "./BirthdayStepIndicator";
import { RecipientForm } from "@/components/forms/RecipientForm";
import { MessageForm } from "@/components/forms/MessageForm";
import { PhotoForm } from "@/components/forms/PhotoForm";
import { MusicForm } from "@/components/forms/MusicForm";
import { PreviewSheet } from "./PreviewSheet";
import { DraftRestoreDialog } from "./DraftRestoreDialog";
import { Sparkle } from "@/components/decorative/Sparkle";

export function EditorShell() {
  const {
    creation,
    data,
    isHydrated,
    hasSavedDraft,
    isSavedLocally,
    toastMessage,
    updateData,
    restoreDraft,
    startFresh,
    validation,
  } = useCreationState<BirthdayWishData>("birthday", "birthday-wish", DEFAULT_BIRTHDAY_DATA);

  const [currentStep, setCurrentStep] = useState(1);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(true);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-text">
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span>Loading birthday editor...</span>
        </div>
      </div>
    );
  }

  const handleNextStep = () => {
    if (currentStep === 1 && !validation.errors.recipientName) {
      setCurrentStep(2);
      setShowErrors(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2 && !validation.errors.message) {
      setCurrentStep(3);
      setShowErrors(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep >= 3 && currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowErrors(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setShowErrors(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const activeErrors = showErrors ? validation.errors : {};

  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      {/* Top Toast Banner */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-rose)] text-white px-5 py-2 text-xs font-bold shadow-love-lift animate-fade-in border border-pink-200/50">
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--love-border)] bg-white/95 py-3.5 backdrop-blur-md shadow-2xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/birthday" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-tr from-[var(--love-crimson)] to-[var(--love-pink)] font-display text-sm font-bold text-white shadow-xs">
              {brand.logo}
            </span>
            <span className="font-display text-xl tracking-tight text-[var(--love-text-heading)] hidden xs:inline">
              {brand.name}
            </span>
            <span className="text-xs text-[var(--love-text-muted)]">/ Birthday Wish</span>
          </a>

          <div className="flex items-center gap-4">
            {/* Auto-save Status */}
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted">
              <span className={`size-2 rounded-full ${isSavedLocally ? "bg-success" : "bg-accent animate-pulse"}`} />
              <span>{isSavedLocally ? "Saved locally" : "Saving..."}</span>
            </span>

            {/* Mobile Preview Trigger */}
            <button
              type="button"
              onClick={() => setIsMobilePreviewOpen(true)}
              className="lg:hidden flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-text shadow-soft hover:bg-surface-soft"
            >
              <span>Preview</span>
              <Sparkle className="text-primary text-xs" />
            </button>

            <Button href="/birthday/preview" variant="outline" size="sm" className="hidden lg:inline-flex">
              Full Preview
            </Button>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left Column: Form & Controls */}
          <div className="flex flex-col justify-between min-h-[calc(100vh-12rem)] space-y-8">
            <div className="space-y-8">
              <BirthdayStepIndicator currentStep={currentStep} onStepClick={setCurrentStep} />

              <div className="rounded-3xl border border-[var(--love-border)] bg-white p-6 sm:p-8 shadow-love-card">
                {currentStep === 1 && (
                  <RecipientForm data={data} onChange={updateData} errors={activeErrors} />
                )}

                {currentStep === 2 && (
                  <MessageForm data={data} onChange={updateData} errors={activeErrors} />
                )}

                {currentStep === 3 && <PhotoForm data={data} onChange={updateData} />}

                {currentStep === 4 && <MusicForm data={data} onChange={updateData} />}

                {currentStep === 5 && (
                  <div className="space-y-6 animate-fade-in text-center py-4">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary text-2xl">
                      💌
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h2 className="font-display text-3xl font-normal text-text">
                        Your surprise is ready!
                      </h2>
                      <p className="text-sm text-text-muted">
                        Here&apos;s the exact experience {data.recipientName || "they"} will see when opening their link.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                      <Button href="/birthday/preview" size="lg" className="shadow-lift">
                        <span>See Fullscreen Surprise</span>
                        <Sparkle className="text-accent text-sm ml-2" />
                      </Button>
                      <Button onClick={() => setCurrentStep(1)} variant="secondary" size="lg">
                        Keep Editing
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center justify-between border-t border-border/60 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={currentStep === 1 ? "opacity-50 pointer-events-none" : ""}
              >
                ← Back
              </Button>

              {currentStep < 5 ? (
                <Button type="button" onClick={handleNextStep} size="md">
                  <span>Continue</span>
                  <span aria-hidden="true">→</span>
                </Button>
              ) : (
                <Button href="/birthday/preview" size="md">
                  <span>Preview Wish</span>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Live Sticky Device Preview (Desktop) */}
          <div className="hidden lg:block sticky top-24">
            <div className="rounded-3xl border border-[var(--love-border)] bg-gradient-to-b from-white via-[var(--love-surface-blush)] to-[var(--love-surface-peach)] p-6 shadow-love-card text-center space-y-3">
              <div className="flex items-center justify-between text-xs text-[var(--love-text-muted)]">
                <span className="font-bold uppercase tracking-widest text-[var(--love-crimson)]">
                  Live Interactive Preview
                </span>
                <span className="text-[11px] text-[var(--love-text-muted)]">Updates live</span>
              </div>

              <div className="flex justify-center py-2">
                <PhonePreview size="md" className="shadow-love-phone">
                  <CreationRenderer creation={creation} autoOpen={false} />
                </PhonePreview>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Full-Screen Mobile Preview Modal */}
      <PreviewSheet
        isOpen={isMobilePreviewOpen}
        onClose={() => setIsMobilePreviewOpen(false)}
        data={data}
      />

      {/* Draft Restore Dialog */}
      {hasSavedDraft && (
        <DraftRestoreDialog
          isOpen={showRestoreModal}
          type="birthday"
          onRestore={() => {
            restoreDraft();
            setShowRestoreModal(false);
          }}
          onStartFresh={() => {
            startFresh();
            setShowRestoreModal(false);
          }}
        />
      )}
    </div>
  );
}
