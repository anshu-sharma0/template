"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Sparkle } from "@/components/decorative/Sparkle";
import type { Creation } from "@/lib/creation-types";

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
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSaveDraft = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
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

      // Redirect to private management URL
      router.push(`/manage/${result.token}`);
    } catch (err) {
      console.error("Save creation error:", err);
      setErrorMessage("Network error while saving draft.");
      setIsLoading(false);
    }
  };

  const handlePublishDirectly = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Create draft first to get management token
      const createRes = await fetch("/api/creations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: creation.type,
          templateId: creation.templateId,
          data: creation.data,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok || !createData.success) {
        setErrorMessage(createData.error || "Failed to save experience.");
        setIsLoading(false);
        return;
      }

      const token = createData.token;

      // 2. Publish creation
      const pubRes = await fetch(`/api/creations/manage/${token}/publish`, {
        method: "POST",
      });

      const pubData = await pubRes.json();
      if (!pubRes.ok || !pubData.success) {
        setErrorMessage(pubData.error || "Validation failed during publishing.");
        setIsLoading(false);
        return;
      }

      setPublishedUrl(pubData.url);
    } catch (err) {
      console.error("Publish error:", err);
      setErrorMessage("Network error during publishing.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!publishedUrl) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const fullUrl = `${origin}${publishedUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Your Creation is Ready ❤️">
      <div className="space-y-6 py-2 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong text-2xl">
          ✨
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
            {errorMessage}
          </div>
        )}

        {publishedUrl ? (
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-normal text-text">
              Your Experience is Live ❤️
            </h3>
            <p className="text-xs text-text-muted">
              Here is your official shareable public link:
            </p>

            <div className="p-4 bg-surface rounded-2xl border border-border flex flex-col gap-3">
              <input
                type="text"
                readOnly
                value={`${typeof window !== "undefined" ? window.location.origin : ""}${publishedUrl}`}
                className="w-full bg-white border border-border px-3 py-2 rounded-xl text-xs font-mono text-text"
              />
              <div className="flex gap-2">
                <Button onClick={handleCopyLink} size="sm" className="flex-1">
                  {copied ? "Link Copied ❤️" : "Copy Link"}
                </Button>
                <a
                  href={publishedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-surface border border-border text-text text-xs font-semibold hover:bg-surface-soft flex items-center"
                >
                  Open Live ↗
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="font-display text-2xl font-normal text-text">
              Save or Publish Your Experience
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Save your creation securely to receive a private management link, or publish immediately to get your public share URL.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <Button
                onClick={handlePublishDirectly}
                disabled={isLoading}
                size="lg"
                className="shadow-lift"
              >
                <span>{isLoading ? "Publishing..." : "🚀 Publish & Get Public Link"}</span>
                <Sparkle className="text-accent text-sm ml-2" />
              </Button>

              <Button
                onClick={handleSaveDraft}
                disabled={isLoading}
                variant="secondary"
                size="lg"
              >
                <span>{isLoading ? "Saving..." : "🔒 Save Private Draft"}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
