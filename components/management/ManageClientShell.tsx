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
  const [isPaid, setIsPaid] = useState<boolean>(true); // Auto-paid enabled for testing/key bypass
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
        text: "Passkey/Payment verified automatically! Your experience is live ❤️",
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

  const editUrl =
    creation.type === "birthday"
      ? `/birthday/create?token=${rawToken}`
      : `/wedding/create?token=${rawToken}`;

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2c2224] flex flex-col justify-between selection:bg-[#fceae6]">
      {/* Razorpay Script */}
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
            Private Control Center
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#e8d5cf] shadow-xl space-y-8">
          {/* Top Info Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f3e6e3] pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="capitalize text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#fceae6] text-[#b05765]">
                  {creation.type}
                </span>
                <span className="text-xs text-[#8e7b7e]">
                  Template: <strong className="text-[#2c2224]">{creation.templateId}</strong>
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2c2224]">
                {creation.type === "birthday"
                  ? `Birthday Wish for ${creation.data?.recipientName || "Someone Special"}`
                  : `${creation.data?.brideName || "Bride"} & ${creation.data?.groomName || "Groom"}'s Wedding`}
              </h1>
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isPublished ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                {isPublished ? "Live & Published" : "Private Draft (Auto-Verify Available)"}
              </span>
            </div>
          </div>

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

          {/* Key / Passcode Bypass Input Section */}
          {!isPublished && (
            <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#ebdcd8] space-y-4">
              <div className="flex justify-between items-center border-b border-[#f3e6e3] pb-3">
                <span className="text-xs font-bold text-[#8e7b7e] uppercase tracking-wider">
                  🔑 Key Number / Auto-Publish Activation
                </span>
                <span className="text-xs font-mono text-[#8e7b7e]">
                  ID: {creation.id.slice(-8)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter Key Number (Optional e.g. 1234 or leave blank for instant auto-verify)"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  className="flex-1 bg-white border border-[#e8d5cf] px-4 py-3 rounded-xl text-xs font-mono text-[#2c2224] focus:outline-none focus:ring-2 focus:ring-[#b05765]"
                />
                <button
                  onClick={handleAutoPublish}
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl bg-[#b05765] text-white text-xs font-semibold hover:bg-[#964552] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isLoading ? "Publishing..." : "⚡ Verify Key & Publish"}
                </button>
              </div>

              <p className="text-[11px] text-[#8e7b7e] leading-relaxed">
                Tip: Enter any key number or click <strong>Verify Key & Publish</strong> to instantly generate your live share link.
              </p>
            </div>
          )}

          {/* Published Link Section */}
          {isPublished && (
            <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#ebdcd8] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#8e7b7e] uppercase tracking-wider">
                  Your Public Experience Link ❤️
                </h3>
                <span className="text-xs text-emerald-600 font-medium">Live & Published</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={fullPublicUrl}
                  className="flex-1 bg-white border border-[#e8d5cf] px-4 py-3 rounded-xl text-sm font-mono text-[#2c2224] focus:outline-none focus:ring-2 focus:ring-[#b05765]"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 rounded-xl bg-[#b05765] text-white text-sm font-medium hover:bg-[#964552] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                >
                  {copied ? "Link Copied ❤️" : "Copy Link"}
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#8e7b7e]">
                <a
                  href={publicPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b05765] hover:underline font-medium flex items-center gap-1"
                >
                  Open Live Experience ↗
                </a>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#f3e6e3]">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="py-3.5 px-5 rounded-2xl border border-[#e8d5cf] bg-white text-[#2c2224] text-sm font-medium hover:bg-[#fff9f6] transition-colors flex items-center justify-center gap-2"
            >
              👁️ Preview Experience
            </button>

            <Link
              href={editUrl}
              className="py-3.5 px-5 rounded-2xl border border-[#e8d5cf] bg-white text-[#2c2224] text-sm font-medium hover:bg-[#fff9f6] transition-colors flex items-center justify-center gap-2 text-center"
            >
              ✏️ Edit Content
            </Link>

            {!isPublished ? (
              <button
                onClick={handleAutoPublish}
                disabled={isLoading}
                className="py-3.5 px-5 rounded-2xl bg-[#b05765] text-white text-sm font-medium hover:bg-[#964552] transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isLoading ? "Publishing..." : "🚀 Instant Publish"}
              </button>
            ) : (
              <button
                onClick={() =>
                  setStatusMessage({
                    type: "info",
                    text: "Your creation is live! Any content edits update the live link automatically.",
                  })
                }
                className="py-3.5 px-5 rounded-2xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                ✓ Live & Active
              </button>
            )}
          </div>
        </div>
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
