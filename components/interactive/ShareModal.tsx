"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  shareUrl: string;
  shareText?: string;
  className?: string;
}

export function ShareModal({
  isOpen,
  onClose,
  title = "Share Your Digital Creation",
  shareUrl,
  shareText = "Check out this special digital surprise experience!",
  className,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent("Special Invitation")}&body=${encodedText}%20${encodedUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className={cn("relative w-full max-w-md rounded-3xl bg-white p-6 shadow-love-card border border-[var(--love-border)]", className)}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-[var(--love-surface-blush)] text-xs font-bold text-[var(--love-text-muted)] hover:text-[var(--love-crimson)] cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center">
          <span className="text-3xl">🚀</span>
          <h3 className="mt-2 font-serif text-xl font-bold text-[var(--love-text-heading)]">{title}</h3>
          <p className="mt-1 text-xs text-[var(--love-text-muted)]">Send this link to recipient or guests</p>
        </div>

        {/* Copy Link Input */}
        <div className="mt-6 space-y-2">
          <label className="block text-[11px] font-bold text-[var(--love-text-heading)] uppercase tracking-wider">
            Shareable URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 rounded-xl border border-[var(--love-border)] bg-[var(--love-canvas-ivory)] px-3.5 py-2 text-xs font-mono text-[var(--love-text-heading)] select-all focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer",
                copied ? "bg-emerald-600 text-white" : "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-love-lift hover:opacity-95"
              )}
            >
              {copied ? "Copied! ✓" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-[var(--love-border-subtle)]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </a>

          <a
            href={mailUrl}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--love-crimson)] to-[#b05765] py-2.5 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-all"
          >
            <span>✉️</span>
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
