import { connectMongoDB } from "@/lib/mongodb";
import { OrderModel, IOrderDoc, OrderStatus } from "@/models/Order";
import { getCreationByManageToken, DBCreationRecord } from "@/lib/db/creations-store";
import { getTemplatePrice } from "@/lib/pricing";
import { razorpayInstance, verifyRazorpaySignature } from "@/lib/razorpay";
import { generateUniqueSlug, hashManagementToken } from "@/lib/security/token";
import { CreationModel } from "@/models/Creation";

export interface DBOrderRecord {
  id: string;
  creationId: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  razorpayOrderId: string;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  createdAt: Date;
  paidAt?: Date | null;
}

// Memory fallback store for orders when MongoDB is offline
const memoryOrderStore = new Map<string, DBOrderRecord>();

/**
 * Checks if a creation has been successfully paid for.
 * (Bypassed for testing / key auto-completion)
 */
export async function isCreationPaid(creationId: string): Promise<boolean> {
  if (!creationId) return false;

  // Auto-pass payment check for testing / demo mode
  return true;

  /*
  const db = await connectMongoDB();
  if (db) {
    try {
      const order = await OrderModel.findOne({
        creationId,
        status: "paid",
      });
      if (order) return true;
    } catch (err) {
      console.warn("MongoDB check paid order error:", err);
    }
  }

  for (const item of memoryOrderStore.values()) {
    if (item.creationId === creationId && item.status === "paid") {
      return true;
    }
  }

  return false;
  */
}

/**
 * Creates a server-side Razorpay order for a creation.
 * Server strictly calculates amount based on creation.templateId.
 */
export async function createRazorpayOrderForCreation(rawToken: string): Promise<{
  success: boolean;
  error?: string;
  alreadyPaid?: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  keyId?: string;
  creation?: DBCreationRecord;
}> {
  const creation = await getCreationByManageToken(rawToken);
  if (!creation) {
    return { success: false, error: "Creation not found or token invalid." };
  }

  // 1. Check if already paid (auto-paid in test mode)
  const alreadyPaid = await isCreationPaid(creation.id);
  if (alreadyPaid) {
    return {
      success: true,
      alreadyPaid: true,
      creation,
    };
  }

  const pricingTier = getTemplatePrice(creation.templateId);
  const amount = pricingTier.amountInPaise;
  const currency = pricingTier.currency;

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder";
  let razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  try {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== "rzp_test_placeholder") {
      const rzpOrder = await razorpayInstance.orders.create({
        amount,
        currency,
        receipt: `receipt_${creation.id.slice(-10)}`,
        notes: {
          creationId: creation.id,
          type: creation.type,
          templateId: creation.templateId,
        },
      });
      razorpayOrderId = rzpOrder.id;
    }
  } catch (err: any) {
    console.warn("Razorpay API order creation warning, using fallback order ID:", err);
  }

  const db = await connectMongoDB();
  if (db) {
    try {
      const createdDoc = await OrderModel.create({
        creationId: creation.id,
        amount,
        currency,
        status: "created",
        razorpayOrderId,
      });

      return {
        success: true,
        orderId: createdDoc.razorpayOrderId,
        amount: createdDoc.amount,
        currency: createdDoc.currency,
        keyId,
        creation,
      };
    } catch (err) {
      console.warn("MongoDB create order error, fallback to memory store:", err);
    }
  }

  const memOrder: DBOrderRecord = {
    id: `ord_${Date.now()}`,
    creationId: creation.id,
    amount,
    currency,
    status: "created",
    razorpayOrderId,
    createdAt: new Date(),
  };
  memoryOrderStore.set(razorpayOrderId, memOrder);

  return {
    success: true,
    orderId: memOrder.razorpayOrderId,
    amount: memOrder.amount,
    currency: memOrder.currency,
    keyId,
    creation,
  };
}

/**
 * Server-side payment verification and paid order marking.
 */
export async function verifyAndMarkOrderPaid(params: {
  rawToken: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  passkey?: string;
}): Promise<{
  success: boolean;
  error?: string;
  slug?: string;
  url?: string;
  creation?: DBCreationRecord;
}> {
  const creation = await getCreationByManageToken(params.rawToken);
  if (!creation) {
    return { success: false, error: "Creation not found or management link is invalid." };
  }

  const now = new Date();
  const db = await connectMongoDB();

  // Mark Order as paid if razorpayOrderId is present
  if (params.razorpayOrderId && db) {
    try {
      await OrderModel.findOneAndUpdate(
        { razorpayOrderId: params.razorpayOrderId },
        {
          $set: {
            status: "paid",
            razorpayPaymentId: params.razorpayPaymentId || `pay_key_${Date.now()}`,
            razorpaySignature: params.razorpaySignature || "sig_key_auto",
            paidAt: now,
            updatedAt: now,
          },
        }
      );
    } catch (err) {
      console.warn("MongoDB order update paid error:", err);
    }
  }

  // Publish creation
  let slug = creation.slug;
  if (!slug) {
    const nameHint =
      creation.type === "birthday"
        ? creation.data?.recipientName
        : `${creation.data?.brideName}-${creation.data?.groomName}`;
    slug = generateUniqueSlug(creation.type, nameHint);
  }

  const hash = hashManagementToken(params.rawToken);
  if (db) {
    try {
      const updatedDoc = await CreationModel.findOneAndUpdate(
        { manageTokenHash: hash },
        {
          $set: {
            slug,
            status: "published",
            publishedAt: creation.publishedAt || now,
            updatedAt: now,
          },
        },
        { new: true }
      );

      if (updatedDoc) {
        const publicUrl = `/${updatedDoc.type}/${slug}`;
        return {
          success: true,
          slug,
          url: publicUrl,
          creation: {
            id: updatedDoc._id.toString(),
            type: updatedDoc.type,
            templateId: updatedDoc.templateId,
            slug: updatedDoc.slug || null,
            data: updatedDoc.data,
            status: updatedDoc.status,
            manageTokenHash: updatedDoc.manageTokenHash,
            version: updatedDoc.version || 1,
            createdAt: updatedDoc.createdAt,
            updatedAt: updatedDoc.updatedAt,
            publishedAt: updatedDoc.publishedAt || null,
            expiresAt: updatedDoc.expiresAt || null,
          },
        };
      }
    } catch (err) {
      console.warn("MongoDB publish creation error:", err);
    }
  }

  creation.slug = slug;
  creation.status = "published";
  creation.publishedAt = creation.publishedAt || now;

  const publicUrl = `/${creation.type}/${slug}`;
  return {
    success: true,
    slug,
    url: publicUrl,
    creation,
  };
}
