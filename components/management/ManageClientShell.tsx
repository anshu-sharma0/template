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
  const [isPaid, setIsPaid] = useState<boolean>(true); // Testing / instant activation enabled
  const [passkeyInput, setPasskeyInput] = useState<string>("");
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
    <div className="min-h-screen bg-[#fffaf5] text-[#2c2224] flex flex-col justify-between selection:bg-[#fceae6]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Header */}
      <header className="border-b border-[#e8d5cf] bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-[#b05765] tracking-tight">
              Digital Moments
            </span>
          </Link>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8e7b7e] bg-[#f8eeeb] px-3 py-1 rounded-full border border-[#eedad5]">
            Review & Control
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
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#e8d5cf] shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
              ❤️
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2c2224]">
                Your digital card is ready ❤️
              </h1>
              <p className="text-sm text-[#6e5d60]">
                Your personalized {creation.type === "birthday" ? "birthday surprise" : "wedding invitation"} has been published successfully. Anyone with the link can open it instantly!
              </p>
            </div>

            {/* Public Link Share Box */}
            <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#ebdcd8] max-w-2xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={fullPublicUrl}
                  className="flex-1 bg-white border border-[#e8d5cf] px-4 py-3 rounded-xl text-sm font-mono text-[#2c2224] focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 rounded-xl bg-[#b05765] text-white text-sm font-semibold hover:bg-[#964552] transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {copied ? "Link Copied ❤️" : "Copy Link"}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <span>💬 Share on WhatsApp</span>
                </button>

                <a
                  href={publicPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-[#e8d5cf] bg-white text-xs font-semibold text-[#2c2224] hover:bg-[#fff9f6] transition-colors flex items-center gap-1"
                >
                  <span>👁️ View Live Card ↗</span>
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#f3e6e3]">
              <button
                onClick={() => setShowPreviewModal(true)}
                className="px-5 py-2.5 rounded-xl border border-[#e8d5cf] bg-white text-xs font-semibold text-[#2c2224] hover:bg-[#fff9f6]"
              >
                Preview Experience
              </button>

              <Link
                href={editUrl}
                className="px-5 py-2.5 rounded-xl border border-[#e8d5cf] bg-white text-xs font-semibold text-[#2c2224] hover:bg-[#fff9f6]"
              >
                ✏️ Edit Content
              </Link>

              <Link
                href={creation.type === "birthday" ? "/birthday/create" : "/wedding/create"}
                className="px-5 py-2.5 rounded-xl bg-[#c6a15b] text-white text-xs font-semibold hover:bg-[#b08d48]"
              >
                ✨ Create Another
              </Link>
            </div>
          </div>
        ) : (
          /* REVIEW & CHECKOUT PREPARATION STATE */
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#e8d5cf] shadow-xl space-y-8">
            <div className="text-center space-y-2 border-b border-[#f3e6e3] pb-6">
              <span className="text-xs font-semibold text-[#b05765] uppercase tracking-widest bg-[#fceae6] px-3 py-1 rounded-full border border-[#eedad5]">
                Final Review
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2c2224]">
                Everything looks perfect?
              </h1>
              <p className="text-sm text-[#6e5d60]">
                Review your personalized details before publishing your live digital card.
              </p>
            </div>

            {/* Personalized Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#ebdcd8] space-y-4">
                <h3 className="text-xs font-bold text-[#8e7b7e] uppercase tracking-wider">
                  Personalization Summary
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8e7b7e]">Type:</span>
                    <span className="font-semibold capitalize text-[#2c2224]">
                      {creation.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8e7b7e]">Template:</span>
                    <span className="font-semibold text-[#2c2224]">
                      {pricingTier.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8e7b7e]">Recipient / Couple:</span>
                    <span className="font-semibold text-[#2c2224]">
                      {creation.type === "birthday"
                        ? creation.data?.recipientName || "Someone Special"
                        : `${creation.data?.brideName || "Bride"} & ${creation.data?.groomName || "Groom"}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8e7b7e]">Background Music:</span>
                    <span className="font-semibold capitalize text-[#2c2224]">
                      {creation.data?.music || "Romantic Track"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & What's Included Card */}
              <div className="p-6 rounded-2xl bg-[#fcf6f3] border border-[#eedad5] space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-[#b05765] uppercase tracking-wider">
                    Price Summary
                  </h3>
                  <span className="font-serif font-bold text-[#b05765] text-2xl">
                    {formattedPrice}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#f3e6e3]">
                  <p className="text-xs font-semibold text-[#2c2224] mb-2">
                    What&apos;s Included:
                  </p>
                  {pricingTier.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#6e5d60]">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#f3e6e3]">
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowPreviewModal(true)}
                  className="flex-1 sm:flex-none py-3.5 px-5 rounded-2xl border border-[#e8d5cf] bg-white text-[#2c2224] text-xs font-semibold hover:bg-[#fff9f6]"
                >
                  👁️ Full Preview
                </button>

                <Link
                  href={editUrl}
                  className="flex-1 sm:flex-none py-3.5 px-5 rounded-2xl border border-[#e8d5cf] bg-white text-[#2c2224] text-xs font-semibold hover:bg-[#fff9f6] text-center"
                >
                  ✏️ Edit Card
                </Link>
              </div>

              <button
                onClick={handleAutoPublish}
                disabled={isLoading}
                className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-[#b05765] text-white text-sm font-semibold hover:bg-[#964552] transition-colors shadow-md disabled:opacity-50"
              >
                {isLoading ? "Publishing Card..." : `🚀 Publish Digital Card (${formattedPrice})`}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e8d5cf] bg-white/60 py-6 text-center text-xs text-[#8e7b7e]">
        Digital Moments Platform • Built with Love
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
