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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className={cn("relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-[#e8d5cf]", className)}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-[#f8eeeb] text-xs font-bold text-[#6e5d60] hover:text-[#2c2224]"
        >
          ✕
        </button>

        <div className="text-center">
          <span className="text-3xl">🚀</span>
          <h3 className="mt-2 font-serif text-xl font-bold text-[#2c2224]">{title}</h3>
          <p className="mt-1 text-xs text-[#6e5d60]">Send this link to recipient or guests</p>
        </div>

        {/* Copy Link Input */}
        <div className="mt-6 space-y-2">
          <label className="block text-[11px] font-bold text-[#2c2224] uppercase tracking-wider">
            Shareable URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 rounded-xl border border-[#e8d5cf] bg-[#fffaf5] px-3.5 py-2 text-xs font-mono text-[#2c2224] select-all focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer",
                copied ? "bg-emerald-600 text-white" : "bg-[#b05765] text-white hover:bg-[#964552]"
              )}
            >
              {copied ? "Copied! ✓" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-[#eedad5]">
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
            className="flex items-center justify-center gap-2 rounded-xl bg-[#2c2224] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#3a2c30] transition-colors"
          >
            <span>✉️</span>
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
