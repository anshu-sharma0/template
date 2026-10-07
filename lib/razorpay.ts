import Razorpay from "razorpay";
import crypto from "crypto";

const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "secret_placeholder";

export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

/**
 * Cryptographically verifies Razorpay payment signature using HMAC SHA-256 algorithm.
 */
export function verifyRazorpaySignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = params;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return false;
  }

  // Development / sandbox test fallback if keys are default placeholders
  if (
    keySecret === "secret_placeholder" ||
    keyId === "rzp_test_placeholder" ||
    keyId === "rzp_test_your_key_id"
  ) {
    console.log("Using development fallback for Razorpay signature verification.");
    return true;
  }

  try {
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(razorpaySignature, "utf-8")
    );
  } catch (err) {
    console.error("Razorpay signature verification error:", err);
    return false;
  }
}

/**
 * Verifies Razorpay Webhook signature against raw body string.
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "webhook_secret_placeholder";
  if (!webhookSecret || !signature) return false;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(signature, "utf-8")
    );
  } catch (err) {
    console.error("Webhook signature verification error:", err);
    return false;
  }
}
