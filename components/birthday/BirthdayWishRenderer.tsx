"use client";

import { useState, useEffect, useCallback } from "react";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { playBirthdayMelody, stopBirthdayMelody } from "@/lib/romanticAudio";

import { BirthdayTopBar } from "./BirthdayTopBar";
import { BirthdayCraftingStage } from "./BirthdayCraftingStage";
import { BirthdayCupidStage } from "./BirthdayCupidStage";
import { BirthdayWishFlashStage } from "./BirthdayWishFlashStage";
import { BirthdayBloomingTreeStage } from "./BirthdayBloomingTreeStage";
import { BirthdayCakeStage } from "./BirthdayCakeStage";
import { BirthdayBalloonsStage } from "./BirthdayBalloonsStage";
import { BirthdayLetterStage } from "./BirthdayLetterStage";
import { BirthdayVideoStage } from "./BirthdayVideoStage";
import { BirthdayFinaleStage } from "./BirthdayFinaleStage";

export interface BirthdayWishRendererProps {
  data: BirthdayWishData;
  compact?: boolean;
  autoOpen?: boolean;
  onBack?: () => void;
  onShare?: () => void;
  isPreview?: boolean;
}

export function BirthdayWishRenderer({
  data,
  compact = false,
  autoOpen = false,
  onBack,
  onShare,
  isPreview = true,
}: BirthdayWishRendererProps) {
  // Stages: 0 (Crafting), 1 (Cupid), 2 (Wish Flash), 3 (Blooming Tree), 4 (Cake), 5 (Balloons), 6 (Letter), 7 (Video), 8 (Finale)
  const [stage, setStage] = useState(autoOpen ? 1 : 0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const recipient = data.recipientName || "Clarke Foley";
  const sender = data.senderName || "Mohammed Anthony";
  const age = data.age || "8";
  const cakeFlavor = data.cakeFlavor || "Strawberry Blush";

  const toggleMusic = useCallback(() => {
    setIsPlayingMusic((prev) => {
      const next = !prev;
      if (next) {
        playBirthdayMelody();
      } else {
        stopBirthdayMelody();
      }
      return next;
    });
  }, []);

  // Cleanup music when component unmounts
  useEffect(() => {
    return () => {
      stopBirthdayMelody();
    };
  }, []);

  // Keyboard navigation support (Arrow Right / Space -> next stage, Arrow Left -> prev stage)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setStage((prev) => Math.min(prev + 1, 8));
      } else if (e.key === "ArrowLeft") {
        setStage((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNextStage = () => {
    setStage((prev) => Math.min(prev + 1, 8));
  };

  const handlePrevStage = () => {
    if (stage > 0) {
      setStage((prev) => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const handleRestart = () => {
    setStage(0);
  };

  return (
    <div
      className={`relative w-full h-full min-h-full overflow-hidden select-none transition-colors duration-700 ${
        compact ? "rounded-3xl" : ""
      }`}
    >
      {/* Universal Top Nav Bar Matching Reference Video */}
      <BirthdayTopBar
        currentStage={stage}
        totalStages={9}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={toggleMusic}
        onBack={handlePrevStage}
        isPreview={isPreview}
      />

      {/* Chapter 0: Crafting Surprise Checklist Screen (00:00 - 00:04) */}
      {stage === 0 && (
        <BirthdayCraftingStage
          recipientName={recipient}
          senderName={sender}
          age={age}
          cakeFlavor={cakeFlavor}
          balloonsCount={data.specialReasons?.length || 5}
          onComplete={handleNextStage}
        />
      )}

      {/* Chapter 1: Cupid's Bow & Heart Shoot (00:05 - 00:10) */}
      {stage === 1 && (
        <BirthdayCupidStage onComplete={handleNextStage} />
      )}

      {/* Chapter 2: Make a Wish Flash Reveal (00:11 - 00:13) */}
      {stage === 2 && (
        <BirthdayWishFlashStage onComplete={handleNextStage} />
      )}

      {/* Chapter 3: The Blooming Heart Tree (00:14 - 00:20) */}
      {stage === 3 && (
        <BirthdayBloomingTreeStage
          recipientName={recipient}
          age={age}
          onComplete={handleNextStage}
        />
      )}

      {/* Chapter 4: Cake Baking & Candle Ritual (00:21 - 00:32) */}
      {stage === 4 && (
        <BirthdayCakeStage
          recipientName={recipient}
          onComplete={handleNextStage}
        />
      )}

      {/* Chapter 5: Balloon Popping Reasons (00:33 - 00:39) */}
      {stage === 5 && (
        <BirthdayBalloonsStage
          reasons={data.specialReasons}
          onComplete={handleNextStage}
        />
      )}

      {/* Chapter 6: The Golden Wax-Sealed Letter (00:40 - 00:49) */}
      {stage === 6 && (
        <BirthdayLetterStage
          recipientName={recipient}
          senderName={sender}
          message={data.message}
          onComplete={handleNextStage}
        />
      )}

      {/* Chapter 7: Surprise Memory Video Clip (00:50 - 01:03) */}
      {stage === 7 && (
        <BirthdayVideoStage
          recipientName={recipient}
          videoUrl={data.videoUrl || "/template.webm"}
          mainPhoto={data.mainPhoto}
          onComplete={handleNextStage}
        />
      )}

      {/* Chapter 8: Grand Birthday Finale Celebration (01:04 - 01:09) */}
      {stage === 8 && (
        <BirthdayFinaleStage
          recipientName={recipient}
          senderName={sender}
          onRestart={handleRestart}
          onShare={onShare}
          isPreview={isPreview}
        />
      )}
    </div>
  );
}
