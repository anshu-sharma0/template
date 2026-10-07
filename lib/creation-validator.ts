import type { BirthdayWishData } from "./birthday-types";
import type { WeddingInvitationData } from "./wedding-types";

export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

export function validateBirthdayWish(data: BirthdayWishData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.recipientName || !data.recipientName.trim()) {
    errors.recipientName = "Tell us their name first ❤️";
  }

  if (!data.message || !data.message.trim()) {
    errors.message = "Write a short note from the heart ❤️";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateWeddingInvitation(data: WeddingInvitationData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.brideName || !data.brideName.trim()) {
    errors.brideName = "Add the bride's name to continue ❤️";
  }

  if (!data.groomName || !data.groomName.trim()) {
    errors.groomName = "Add the groom's name to continue ❤️";
  }

  if (!data.weddingDate || !data.weddingDate.trim()) {
    errors.weddingDate = "Select your wedding date to continue ❤️";
  }

  if (!data.events || data.events.length === 0) {
    errors.events = "Please add at least one wedding function event ❤️";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
