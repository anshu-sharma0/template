"use client";

import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Sparkle } from "@/components/decorative/Sparkle";

type DraftRestoreDialogProps = {
  isOpen: boolean;
  type: "birthday" | "wedding";
  onRestore: () => void;
  onStartFresh: () => void;
};

export function DraftRestoreDialog({
  isOpen,
  type,
  onRestore,
  onStartFresh,
}: DraftRestoreDialogProps) {
  if (!isOpen) return null;

  const title = type === "birthday" ? "Welcome Back ❤️" : "Your Invitation is Waiting ✨";
  const desc =
    type === "birthday"
      ? "You have an unfinished birthday surprise draft saved locally. Would you like to continue editing where you left off?"
      : "You have an unfinished wedding invitation draft saved locally. Would you like to continue editing your story?";

  return (
    <Dialog isOpen={isOpen} onClose={onRestore} title={title}>
      <div className="space-y-6 py-2 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary text-2xl">
          {type === "birthday" ? "🎂" : "💍"}
        </div>

        <p className="text-base text-text-muted leading-relaxed max-w-md mx-auto">
          {desc}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Button onClick={onRestore} size="lg" className="shadow-lift">
            <span>Continue Editing</span>
            <Sparkle className="text-accent text-sm ml-2" />
          </Button>
          <Button onClick={onStartFresh} variant="outline" size="lg">
            Start Fresh
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
