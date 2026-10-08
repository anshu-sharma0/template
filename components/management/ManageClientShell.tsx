"use client";

import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import type { DBCreationRecord } from "@/lib/db/creations-store";
import { getTemplatePrice, formatPriceINR } from "@/lib/pricing";

interface ManageClientShellProps {
  rawToken: string;
  initialCreation: DBCreationRecord;
  initialIsPaid: boolean;
}

export default function ManageClientShell({
  rawToken,
  initialCreation,
  initialIsPaid,
}: ManageClientShellProps) {
  const [creation, setCreation] = useState<DBCreationRecord>(initialCreation);
  const [, setIsPaid] = useState<boolean>(initialIsPaid);
  const [passkeyInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "info" | "success";
    text: string;
  } | null>(null);

  const isPublished = creation.status === "published";
  const publicPath = creation.slug ? `/${creation.type}/${creation.slug}` : "";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const fullPublicUrl = `${origin}${publicPath}`;

  const pricingTier = getTemplatePrice(creation.templateId);
  const formattedPrice = formatPriceINR(pricingTier.amountInPaise);

  const handleAutoPublish = async () => {
    setIsLoading(true);
    setStatusMessage(null);

    try {
      const verifyRes = await fetch("/api/orders/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: rawToken,
          passkey: passkeyInput || "AUTO_KEY_SUCCESS",
          razorpayOrderId: `auto_ord_${Date.now()}`,
          razorpayPaymentId: `auto_pay_${Date.now()}`,
          razorpaySignature: `auto_sig_${Date.now()}`,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        setStatusMessage({
          type: "error",
          text: verifyData.error || "Publishing failed. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      setIsPaid(true);
      setCreation((prev) => ({
        ...prev,
        status: "published",
        slug: verifyData.slug,
        publishedAt: new Date(),
      }));

      setStatusMessage({
        type: "success",
        text: "Your digital card is ready ❤️ Experience published successfully!",
      });
    } catch (err) {
      console.error("Auto publish error:", err);
      setStatusMessage({
        type: "error",
        text: "Network error during publishing.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!fullPublicUrl) return;
    navigator.clipboard.writeText(fullPublicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    if (!fullPublicUrl) return;
    const title =
      creation.type === "birthday"
        ? `See the special birthday surprise created for ${creation.data?.recipientName || "you"} ❤️`
        : `You are cordially invited to ${creation.data?.brideName || "Bride"} & ${creation.data?.groomName || "Groom"}'s Wedding 💍`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${title}\n${fullPublicUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const editUrl =
    creation.type === "birthday"
      ? `/birthday/create?token=${rawToken}`
      : `/wedding/create?token=${rawToken}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbf8] via-[#fff5f7] to-[#ffffff] text-[var(--love-text-heading)] flex flex-col justify-between selection:bg-[#ffe4ea]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Header */}
      <header className="border-b border-[var(--love-border)] bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-[var(--love-crimson)] tracking-tight flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-[var(--love-crimson)] to-[var(--love-pink)] text-white text-xs">
                ♥
              </span>
              <span>Digital Moments</span>
            </span>
          </Link>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--love-crimson)] bg-[var(--love-surface-blush)] px-3.5 py-1 rounded-full border border-[var(--love-border)] shadow-2xs">
            Review &amp; Control
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 space-y-8">
        {/* Status Message Banner */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl text-sm flex items-center justify-between border ${
              statusMessage.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-700"
                : statusMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-blue-50 border-blue-200 text-blue-700"
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs font-bold ml-4 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* SUCCESS STATE */}
        {isPublished ? (
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[var(--love-border)] shadow-love-lift text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
              ❤️
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--love-text-heading)]">
                Your digital card is ready ❤️
              </h1>
              <p className="text-sm text-[var(--love-text-body)]">
                Your personalized {creation.type === "birthday" ? "birthday surprise" : "wedding invitation"} has been published successfully. Anyone with the link can open it instantly!
              </p>
            </div>

            {/* Public Link Share Box */}
            <div className="p-6 rounded-2xl bg-white border border-[var(--love-border)] max-w-2xl mx-auto space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={fullPublicUrl}
                  className="flex-1 bg-[var(--love-surface-blush)] border border-[var(--love-border)] px-4 py-3 rounded-xl text-sm font-mono text-[var(--love-text-heading)] focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white text-sm font-bold hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs cursor-pointer"
                >
                  {copied ? "Link Copied ❤️" : "Copy Link"}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>💬 Share on WhatsApp</span>
                </button>

                <a
                  href={publicPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-[var(--love-border)] bg-white text-xs font-bold text-[var(--love-text-heading)] hover:bg-[var(--love-surface-blush)] hover:text-[var(--love-crimson)] transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>👁️ View Live Card ↗</span>
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[var(--love-border)]">
              <button
                onClick={() => setShowPreviewModal(true)}
                className="px-5 py-2.5 rounded-xl border border-[var(--love-border)] bg-white text-xs font-bold text-[var(--love-text-heading)] hover:bg-[var(--love-surface-blush)] hover:text-[var(--love-crimson)] shadow-2xs cursor-pointer"
              >
                Preview Experience
              </button>

              <Link
                href={editUrl}
                className="px-5 py-2.5 rounded-xl border border-[var(--love-border)] bg-white text-xs font-bold text-[var(--love-text-heading)] hover:bg-[var(--love-surface-blush)] hover:text-[var(--love-crimson)] shadow-2xs"
              >
                ✏️ Edit Content
              </Link>

              <Link
                href={creation.type === "birthday" ? "/birthday/create" : "/wedding/create"}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] text-white text-xs font-bold hover:opacity-90 shadow-2xs"
              >
                ✨ Create Another
              </Link>
            </div>
          </div>
        ) : (
          /* REVIEW & CHECKOUT PREPARATION STATE */
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[var(--love-border)] shadow-love-lift space-y-8">
            <div className="text-center space-y-2 border-b border-[var(--love-border-subtle)] pb-6">
              <span className="text-xs font-bold text-[var(--love-crimson)] uppercase tracking-widest bg-[var(--love-surface-blush)] px-3 py-1 rounded-full border border-[var(--love-border)]">
                Final Review
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--love-text-heading)]">
                Everything looks perfect?
              </h1>
              <p className="text-sm text-[var(--love-text-body)]">
                Review your personalized details before publishing your live digital card.
              </p>
            </div>

            {/* Personalized Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[var(--love-border)] space-y-4 shadow-2xs">
                <h3 className="text-xs font-bold text-[var(--love-text-muted)] uppercase tracking-wider">
                  Personalization Summary
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--love-text-muted)]">Type:</span>
                    <span className="font-semibold capitalize text-[var(--love-text-heading)]">
                      {creation.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--love-text-muted)]">Template:</span>
                    <span className="font-semibold text-[var(--love-text-heading)]">
                      {pricingTier.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--love-text-muted)]">Recipient / Couple:</span>
                    <span className="font-semibold text-[var(--love-text-heading)]">
                      {creation.type === "birthday"
                        ? creation.data?.recipientName || "Someone Special"
                        : `${creation.data?.brideName || "Bride"} & ${creation.data?.groomName || "Groom"}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--love-text-muted)]">Background Music:</span>
                    <span className="font-semibold capitalize text-[var(--love-text-heading)]">
                      {creation.data?.music || "Romantic Track"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & What's Included Card */}
              <div className="p-6 rounded-2xl bg-[var(--love-surface-blush)] border border-[var(--love-border)] space-y-4 shadow-2xs">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-[var(--love-crimson)] uppercase tracking-wider">
                    Price Summary
                  </h3>
                  <span className="font-serif font-bold text-[var(--love-crimson)] text-2xl">
                    {formattedPrice}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[var(--love-border-subtle)]">
                  <p className="text-xs font-bold text-[var(--love-text-heading)] mb-2">
                    What&apos;s Included:
                  </p>
                  {pricingTier.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--love-text-body)]">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--love-border-subtle)]">
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowPreviewModal(true)}
                  className="flex-1 sm:flex-none py-3.5 px-5 rounded-2xl border border-[var(--love-border)] bg-white text-[var(--love-text-heading)] text-xs font-bold hover:bg-[var(--love-surface-blush)] hover:text-[var(--love-crimson)] shadow-2xs cursor-pointer"
                >
                  👁️ Full Preview
                </button>

                <Link
                  href={editUrl}
                  className="flex-1 sm:flex-none py-3.5 px-5 rounded-2xl border border-[var(--love-border)] bg-white text-[var(--love-text-heading)] text-xs font-bold hover:bg-[var(--love-surface-blush)] hover:text-[var(--love-crimson)] text-center shadow-2xs"
                >
                  ✏️ Edit Card
                </Link>
              </div>

              <button
                onClick={handleAutoPublish}
                disabled={isLoading}
                className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white text-sm font-bold hover:shadow-lg transition-all shadow-md disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {isLoading ? "Publishing Card..." : `🚀 Publish Digital Card (${formattedPrice})`}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--love-border)] bg-white/70 py-6 text-center text-xs text-[var(--love-text-muted)] font-medium">
        Digital Moments Platform • Handcrafted with Love ♥
      </footer>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/20">
            {/* Modal Header */}
            <div className="h-14 px-6 bg-white border-b border-neutral-200 flex items-center justify-between">
              <span className="text-sm font-serif font-bold text-[#b05765]">
                Experience Preview
              </span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 transition-colors"
              >
                Close Preview ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto">
              <CreationRenderer
                creation={{
                  type: creation.type,
                  templateId: creation.templateId,
                  data: creation.data,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
