"use client";

import { useState, useEffect, useRef } from "react";
import type { Creation, CreationType } from "@/lib/creation-types";
import { getTemplate } from "@/lib/template-registry";
import { normalizeBirthdayWish, normalizeWeddingInvitation } from "@/lib/creation-normalizer";
import { validateBirthdayWish, validateWeddingInvitation } from "@/lib/creation-validator";

const STORAGE_PREFIX = "lumavows_creation_v1_";

export function useCreationState<TData>(
  type: CreationType,
  defaultTemplateId: string,
  initialData: TData
) {
  const [templateId, setTemplateId] = useState(defaultTemplateId);
  const [data, setData] = useState<TData>(initialData);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSavedLocally, setIsSavedLocally] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const storageKey = `${STORAGE_PREFIX}${type}`;
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Safe client hydration
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.data) {
          setHasSavedDraft(true);
        }
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, [storageKey]);

  // Restore Draft Action
  const restoreDraft = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.templateId) setTemplateId(parsed.templateId);
        if (parsed.data) {
          const normalized =
            type === "birthday"
              ? (normalizeBirthdayWish(parsed.data) as unknown as TData)
              : (normalizeWeddingInvitation(parsed.data) as unknown as TData);
          setData(normalized);
        }
      }
    } catch {
      // ignore
    }
    setHasSavedDraft(false);
    showToast("Draft restored ❤️");
  };

  // Start Fresh Action
  const startFresh = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setTemplateId(defaultTemplateId);
    setData(initialData);
    setHasSavedDraft(false);
    setHasUnsavedChanges(false);
    showToast("Started fresh ✨");
  };

  // Toast Notification Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Update Data & Debounced Local Storage Persistence
  const updateData = (updates: Partial<TData>) => {
    setIsSavedLocally(false);
    setHasUnsavedChanges(true);

    const nextData = { ...data, ...updates };
    const normalized =
      type === "birthday"
        ? (normalizeBirthdayWish(nextData as any) as unknown as TData)
        : (normalizeWeddingInvitation(nextData as any) as unknown as TData);

    setData(normalized);

    // Debounce save to localStorage (500ms)
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        const wrapper = {
          type,
          templateId,
          data: normalized,
          version: 1,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(storageKey, JSON.stringify(wrapper));
        setIsSavedLocally(true);
      } catch {
        // quota limit
      }
    }, 500);
  };

  // Template Switching without data loss
  const changeTemplate = (newTemplateId: string) => {
    const config = getTemplate(newTemplateId);
    if (!config) return;

    setTemplateId(newTemplateId);

    // If wedding, also sync template property inside data object
    if (type === "wedding" && data && typeof data === "object") {
      const variant = newTemplateId === "luxury-wedding" ? "luxury" : "elegant";
      updateData({ template: variant } as any);
    }

    showToast(`Template changed to ${config.name} ✨`);
  };

  // Build creation object for renderer
  const creation: Creation =
    type === "birthday"
      ? {
        type: "birthday",
        templateId,
        data: data as any,
      }
      : {
        type: "wedding",
        templateId,
        data: data as any,
      };

  // Validation state
  const validation =
    type === "birthday"
      ? validateBirthdayWish(data as any)
      : validateWeddingInvitation(data as any);

  return {
    creation,
    templateId,
    data,
    isHydrated,
    hasSavedDraft,
    hasUnsavedChanges,
    isSavedLocally,
    toastMessage,
    updateData,
    changeTemplate,
    setTemplate: changeTemplate,
    restoreDraft,
    startFresh,
    validation,
  };
}
