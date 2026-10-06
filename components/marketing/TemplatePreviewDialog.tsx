"use client";

import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PhonePreview } from "./PhonePreview";
import type { InvitationPreviewVariant } from "@/components/invitation/InvitationPreview";

type Template = {
  id: string;
  name: string;
  category: string;
  description: string;
  detail?: string;
  preview: InvitationPreviewVariant;
};

type TemplatePreviewDialogProps = {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
};

export function TemplatePreviewDialog({
  template,
  isOpen,
  onClose,
  onSelect,
}: TemplatePreviewDialogProps) {
  if (!template) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={template.name}>
      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        {/* Device Preview */}
        <div className="flex justify-center bg-surface-soft/80 p-6 rounded-2xl border border-border/60">
          <PhonePreview variant={template.preview} size="sm" className="shadow-lift" />
        </div>

        {/* Template Information & Actions */}
        <div className="flex flex-col justify-between space-y-5">
          <div>
            <Badge tone={template.preview === "luxuryWedding" ? "champagne" : "rose"}>
              {template.category}
            </Badge>

            <h3 className="mt-3 font-display text-3xl text-text leading-tight">
              {template.name}
            </h3>

            <p className="mt-2 text-base text-text-muted leading-relaxed">
              {template.description}
            </p>

            {template.detail && (
              <div className="mt-4 rounded-xl border border-border/80 bg-surface p-4 text-xs text-text-muted leading-relaxed">
                <p className="font-semibold text-text mb-1">What&apos;s included in this design:</p>
                <p>{template.detail}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={() => onSelect(template.id)}
              className="flex-1"
              size="md"
            >
              Create With This Design
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="md"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
