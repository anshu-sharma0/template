"use client";

import type { Creation } from "@/lib/creation-types";
import { getTemplatesByType } from "@/lib/template-registry";
import { Sparkle } from "@/components/decorative/Sparkle";
import { Button } from "@/components/ui/Button";

type PreviewToolbarProps = {
  creation: Creation;
  onBackToEdit: () => void;
  onTemplateChange?: (templateId: string) => void;
  onRestartExperience?: () => void;
  onPublishClick?: () => void;
  theme?: "dark" | "light";
};

export function PreviewToolbar({
  creation,
  onBackToEdit,
  onTemplateChange,
  onRestartExperience,
  onPublishClick,
  theme = "light",
}: PreviewToolbarProps) {
  const templates = getTemplatesByType(creation.type);

  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 backdrop-blur-md gap-4 border-b border-[var(--love-border)] bg-white/95 text-[var(--love-text-heading)] shadow-love-card">
      {/* Back & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBackToEdit}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition border border-[var(--love-border)] bg-[var(--love-surface-blush)] text-[var(--love-crimson)] hover:bg-[var(--love-surface-rose)] cursor-pointer"
        >
          <span>← Back to Editing</span>
        </button>

        <span className="hidden sm:inline text-xs text-pink-300">|</span>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[var(--love-crimson)]">
          <Sparkle className="text-xs" />
          <span>Recipient Preview Mode</span>
        </div>
      </div>

      {/* Controls: Template Switcher & Actions */}
      <div className="flex items-center gap-3">
        {/* Template Switcher if multiple templates exist */}
        {templates.length > 1 && onTemplateChange && (
          <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs border border-[var(--love-border)] bg-[var(--love-surface-blush)] text-[var(--love-text-heading)]">
            <span className="hidden sm:inline text-[var(--love-text-muted)]">Design:</span>
            <select
              value={creation.templateId}
              onChange={(e) => onTemplateChange(e.target.value)}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer text-[var(--love-text-heading)]"
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id} className="bg-white text-[var(--love-text-heading)]">
                  {tpl.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Restart Experience Action */}
        {onRestartExperience && (
          <button
            type="button"
            onClick={onRestartExperience}
            title="Replay opening envelope reveal"
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition border border-[var(--love-border)] bg-white text-[var(--love-crimson)] hover:bg-[var(--love-surface-blush)] shadow-2xs cursor-pointer"
          >
            Restart Experience ↺
          </button>
        )}

        {/* Continue Action */}
        <Button onClick={onPublishClick} size="sm" className="bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-love-lift hover:opacity-95">
          <span>Continue</span>
        </Button>
      </div>
    </header>
  );
}
