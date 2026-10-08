"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DeviceFramePreviewProps {
  children: ReactNode;
  title?: string;
  defaultDevice?: "mobile" | "tablet" | "desktop";
  showDeviceToggle?: boolean;
  className?: string;
}

export function DeviceFramePreview({
  children,
  title = "Live Preview",
  defaultDevice = "mobile",
  showDeviceToggle = true,
  className,
}: DeviceFramePreviewProps) {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">(defaultDevice);
  const [zoom, setZoom] = useState(100);

  const deviceDimensions = {
    mobile: "w-[320px] sm:w-[360px] min-h-[640px] rounded-[40px] border-[10px] border-[#4a353c] shadow-love-phone",
    tablet: "w-[600px] sm:w-[680px] min-h-[500px] rounded-[32px] border-[12px] border-[#4a353c] shadow-love-card",
    desktop: "w-full max-w-4xl min-h-[520px] rounded-[20px] border-[8px] border-[#4a353c] shadow-love-card",
  };

  return (
    <div className={cn("flex flex-col items-center w-full my-6", className)}>
      {/* Control Bar */}
      {showDeviceToggle && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-full bg-white p-2 border border-[var(--love-border)] shadow-love-card w-full max-w-xl">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDevice("mobile")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                device === "mobile"
                  ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-love-lift"
                  : "text-[var(--love-text-muted)] hover:text-[var(--love-text-heading)]"
              )}
            >
              <span>📱</span>
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                device === "tablet"
                  ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-love-lift"
                  : "text-[var(--love-text-muted)] hover:text-[var(--love-text-heading)]"
              )}
            >
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDevice("desktop")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                device === "desktop"
                  ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-love-lift"
                  : "text-[var(--love-text-muted)] hover:text-[var(--love-text-heading)]"
              )}
            >
              <span>💻</span>
              <span>Desktop</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pr-2 text-xs text-[var(--love-text-muted)] font-medium">
            <button onClick={() => setZoom((z) => Math.max(75, z - 10))} className="hover:text-[var(--love-text-heading)] px-1 cursor-pointer">
              -
            </button>
            <span>{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(125, z + 10))} className="hover:text-[var(--love-text-heading)] px-1 cursor-pointer">
              +
            </button>
          </div>
        </div>
      )}

      {/* Frame Container */}
      <div className="relative flex justify-center w-full overflow-x-auto py-4">
        <div
          className={cn(
            "relative bg-white shadow-2xl transition-all duration-300 overflow-hidden flex flex-col",
            deviceDimensions[device]
          )}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          {/* Top Notch for Mobile */}
          {device === "mobile" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-36 rounded-b-xl bg-[#4a353c] z-30 flex items-center justify-center">
              <div className="size-2 rounded-full bg-white/20" />
            </div>
          )}

          {/* Top Camera bar for Tablet */}
          {device === "tablet" && (
            <div className="h-6 bg-[#4a353c] w-full flex items-center justify-center shrink-0">
              <div className="size-2 rounded-full bg-white/30" />
            </div>
          )}

          {/* Top Header bar for Desktop */}
          {device === "desktop" && (
            <div className="h-8 bg-[#4a353c] w-full flex items-center px-4 gap-2 shrink-0">
              <div className="size-2.5 rounded-full bg-rose-400" />
              <div className="size-2.5 rounded-full bg-amber-400" />
              <div className="size-2.5 rounded-full bg-emerald-400" />
              <div className="mx-auto rounded-md bg-white/10 px-6 py-0.5 text-[10px] text-white/70 font-mono">
                {title}
              </div>
            </div>
          )}

          {/* Rendered Viewport Content */}
          <div className="relative flex-1 overflow-y-auto bg-[var(--love-canvas)]">{children}</div>
        </div>
      </div>
    </div>
  );
}
