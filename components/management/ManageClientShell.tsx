"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import type { DBCreationRecord } from "@/lib/db/creations-store";

interface ManageClientShellProps {
  rawToken: string;
  initialCreation: DBCreationRecord;
}

export default function ManageClientShell({
  rawToken,
  initialCreation,
}: ManageClientShellProps) {
  const [creation, setCreation] = useState<DBCreationRecord>(initialCreation);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPublished = creation.status === "published";
  const publicPath = creation.slug ? `/${creation.type}/${creation.slug}` : "";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const fullPublicUrl = `${origin}${publicPath}`;

  const handlePublish = async () => {
    setIsPublishing(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/creations/manage/${rawToken}/publish`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to publish creation.");
        setIsPublishing(false);
        return;
      }

      setCreation((prev) => ({
        ...prev,
        status: "published",
        slug: data.slug,
        publishedAt: new Date(),
      }));
    } catch (err: any) {
      console.error("Publish error:", err);
      setErrorMessage("Network error occurred during publishing.");
    } finally {
      setIsPublishing(false);
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
      {/* Header */}
      <header className="border-b border-[#e8d5cf] bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-[#b05765] tracking-tight">
              Digital Moments
            </span>
          </Link>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8e7b7e] bg-[#f8eeeb] px-3 py-1 rounded-full border border-[#eedad5]">
            Private Management
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
                {isPublished ? "Live & Published" : "Private Draft"}
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-rose-500 hover:text-rose-800 text-xs font-bold"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Published Link Section */}
          {isPublished ? (
            <div className="p-6 rounded-2xl bg-[#fffdfa] border border-[#ebdcd8] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#8e7b7e] uppercase tracking-wider">
                  Your Public Experience Link ❤️
                </h3>
                <span className="text-xs text-emerald-600 font-medium">Ready to share</span>
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
          ) : (
            <div className="p-6 rounded-2xl bg-[#fcf6f3] border border-[#eedad5] text-center space-y-3">
              <p className="text-sm text-[#6e5d60] leading-relaxed">
                Your experience is currently saved as a private draft. Once you are ready, hit{" "}
                <strong className="text-[#2c2224]">Publish</strong> below to generate your shareable link.
              </p>
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
                onClick={handlePublish}
                disabled={isPublishing}
                className="py-3.5 px-5 rounded-2xl bg-[#b05765] text-white text-sm font-medium hover:bg-[#964552] transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isPublishing ? "Publishing..." : "🚀 Publish Now"}
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="py-3.5 px-5 rounded-2xl bg-[#c6a15b] text-white text-sm font-medium hover:bg-[#b08d48] transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isPublishing ? "Updating..." : "🔄 Update Live Link"}
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
