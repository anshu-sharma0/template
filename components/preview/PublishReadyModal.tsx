"use client";

import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Sparkle } from "@/components/decorative/Sparkle";

type PublishReadyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "birthday" | "wedding";
};

export function PublishReadyModal({
  isOpen,
  onClose,
  type,
}: PublishReadyModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Your Creation is Ready ❤️">
      <div className="space-y-6 py-2 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong text-2xl">
          ✨
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="font-display text-2xl font-normal text-text">
            Publishing will be available soon!
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Your {type === "birthday" ? "birthday surprise" : "wedding invitation"} is completely structured and saved locally in your browser draft. Private share link generation and publishing will arrive in the next phase!
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Button onClick={onClose} size="lg">
            <span>Keep Editing Draft</span>
            <Sparkle className="text-accent text-sm ml-2" />
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
