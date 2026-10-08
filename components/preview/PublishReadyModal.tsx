"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Sparkle } from "@/components/decorative/Sparkle";
import type { Creation } from "@/lib/creation-types";
import { getTemplatePrice, formatPriceINR } from "@/lib/pricing";

type PublishReadyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  creation: Creation;
};

export function PublishReadyModal({
  isOpen,
  onClose,
  creation,
}: PublishReadyModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const pricingTier = getTemplatePrice(creation.templateId);
  const formattedPrice = formatPriceINR(pricingTier.amountInPaise);

  const handleContinueToCheckout = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Create draft to obtain secure management token
      const res = await fetch("/api/creations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: creation.type,
          templateId: creation.templateId,
          data: creation.data,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        setErrorMessage(result.error || "Failed to save creation.");
        setIsLoading(false);
        return;
      }

      // 2. Redirect to private management & checkout page
      router.push(`/manage/${result.token}`);
    } catch (err) {
      console.error("Save creation error:", err);
      setErrorMessage("Network error while preparing checkout.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Your Creation is Ready ❤️">
      <div className="space-y-6 py-2 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] text-2xl border border-[var(--love-border)]">
          ✨
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
            {errorMessage}
          </div>
        )}

        <div className="space-y-4 max-w-md mx-auto">
          <h3 className="font-serif text-2xl font-bold text-[var(--love-text-heading)]">
            Continue to Secure Checkout
          </h3>
          <p className="text-sm text-[var(--love-text-muted)] leading-relaxed">
            Your {creation.type === "birthday" ? "birthday surprise" : "wedding invitation"} is saved. Complete payment to publish your live share link.
          </p>

          {/* Pricing Banner */}
          <div className="p-4 bg-[var(--love-surface-blush)] rounded-2xl border border-[var(--love-border)] flex justify-between items-center text-xs shadow-2xs">
            <span className="font-semibold text-[var(--love-text-heading)]">{pricingTier.name}</span>
            <span className="font-serif font-bold text-[var(--love-crimson)] text-base">
              {formattedPrice}
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={handleContinueToCheckout}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-love-lift hover:opacity-95"
            >
              <span>{isLoading ? "Saving..." : `Continue to Pay (${formattedPrice})`}</span>
              <Sparkle className="text-white text-sm ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
