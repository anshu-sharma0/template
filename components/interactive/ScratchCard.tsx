"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ScratchCardProps {
  children: ReactNode;
  coverText?: string;
  coverColor?: string;
  finishPercent?: number;
  onScratchedComplete?: () => void;
  className?: string;
}

export function ScratchCard({
  children,
  coverText = "✨ Scratch here to reveal secret message! 🎁",
  coverColor = "#e11d48",
  finishPercent = 50,
  onScratchedComplete,
  className,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Fill cover background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, coverColor);
    gradient.addColorStop(1, "#964552");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw cover pattern & text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(coverText, width / 2, height / 2);
  }, [coverText, coverColor]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    const percent = (transparentCount / (pixels.length / 4)) * 100;
    if (percent >= finishPercent) {
      setIsRevealed(true);
      if (onScratchedComplete) onScratchedComplete();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching || isRevealed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    scratch(x, y);
  };

  return (
    <div className={cn("relative overflow-hidden rounded-3xl border-2 border-[var(--love-border)] bg-white shadow-love-card", className)}>
      {/* Underlying Content */}
      <div className="p-6">{children}</div>

      {/* Scratch Canvas Overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onPointerDown={() => setIsScratching(true)}
          onPointerUp={() => setIsScratching(false)}
          onPointerMove={handlePointerMove}
          className="absolute inset-0 size-full cursor-pointer touch-none z-10 animate-pulse"
        />
      )}
    </div>
  );
}
