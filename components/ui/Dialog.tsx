"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Dialog({ isOpen, onClose, title, children, className }: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        className={cn(
          "relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--love-border)] bg-white p-6 sm:p-8 shadow-love-lift transition-all",
          className,
        )}
      >
        {/* Header bar if title exists */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--love-border-subtle)]">
          {title ? (
            <h2 id="dialog-title" className="font-serif text-2xl font-bold text-[var(--love-text-heading)]">
              {title}
            </h2>
          ) : <div />}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex size-8 items-center justify-center rounded-full border border-border bg-surface-soft text-sm text-text-muted transition hover:bg-border hover:text-text"
          >
            ✕
          </button>
        </div>

        {/* Dialog Content */}
        {children}
      </div>
    </div>
  );
}

