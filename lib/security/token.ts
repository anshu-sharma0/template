import crypto from "crypto";

/**
 * Generates a cryptographically random management token.
 * Output is 64 hex characters (256 bits of entropy).
 */
export function generateManagementToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Computes SHA-256 hash of a management token for database storage/querying.
 */
export function hashManagementToken(token: string): string {
  if (!token || typeof token !== "string") {
    throw new Error("Invalid token provided for hashing");
  }
  return crypto.createHash("sha256").update(token.trim()).digest("hex");
}

/**
 * Generates a clean, URL-safe, unique slug.
 * Format: {prefix}-{name-slug}-{shortHash}
 * Example: birthday-khushi-k8m2 or wedding-khushi-akshat-9p4q
 */
export function generateUniqueSlug(type: "birthday" | "wedding", nameHint?: string): string {
  const cleanHint = nameHint
    ? nameHint
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 20)
    : "";

  const randomSuffix = crypto.randomBytes(3).toString("hex"); // 6 hex chars

  if (type === "birthday") {
    const base = cleanHint ? `hbd-${cleanHint}` : "birthday";
    return `${base}-${randomSuffix}`;
  } else {
    const base = cleanHint ? `wedding-${cleanHint}` : "wedding";
    return `${base}-${randomSuffix}`;
  }
}

/**
 * Sanitizes input text against basic script injection / XSS.
 */
export function sanitizeText(input?: string | null): string {
  if (!input) return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror=/gi, "")
    .replace(/onload=/gi, "");
}

/**
 * Validates URLs to ensure they use safe http/https protocols.
 */
export function isSafeUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return true;
  const trimmed = url.trim();
  if (trimmed === "" || trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return true;
  }
  return false;
}
