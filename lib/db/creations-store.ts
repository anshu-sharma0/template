import { connectMongoDB } from "@/lib/mongodb";
import { CreationModel, ICreationDoc } from "@/models/Creation";
import {
  generateManagementToken,
  hashManagementToken,
  generateUniqueSlug,
} from "@/lib/security/token";
import { normalizeBirthdayWish, normalizeWeddingInvitation } from "@/lib/creation-normalizer";
import { validateBirthdayWish, validateWeddingInvitation } from "@/lib/creation-validator";
import { TEMPLATE_REGISTRY } from "@/lib/template-registry";
import { isCreationPaid } from "@/lib/services/orderService";

export type DBStatus = "draft" | "published" | "archived";

export interface DBCreationRecord {
  id: string;
  type: "birthday" | "wedding";
  templateId: string;
  slug: string | null;
  data: any;
  status: DBStatus;
  manageTokenHash: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  expiresAt: Date | null;
}

// In-memory fallback store for offline/local development without MongoDB active
const memoryStore = new Map<string, DBCreationRecord>();

function getMemoryByHash(hash: string): DBCreationRecord | undefined {
  for (const item of memoryStore.values()) {
    if (item.manageTokenHash === hash) return item;
  }
  return undefined;
}

function getMemoryBySlug(slug: string): DBCreationRecord | undefined {
  for (const item of memoryStore.values()) {
    if (item.slug === slug && item.status === "published") return item;
  }
  return undefined;
}

/**
 * Creates a new draft creation document in MongoDB.
 * Returns raw management token to be shown ONLY once to the client.
 */
export async function createDraftCreation(params: {
  type: "birthday" | "wedding";
  templateId: string;
  data: any;
}): Promise<{
  id: string;
  type: "birthday" | "wedding";
  templateId: string;
  rawToken: string;
  status: DBStatus;
  createdAt: string;
  data: any;
}> {
  // Validate template ID belongs to template registry
  const templateConfig = TEMPLATE_REGISTRY[params.templateId];
  if (!templateConfig || templateConfig.type !== params.type) {
    throw new Error(`Invalid templateId '${params.templateId}' for creation type '${params.type}'`);
  }

  const rawToken = generateManagementToken();
  const manageTokenHash = hashManagementToken(rawToken);

  let normalizedData: any = { version: 1 };
  if (params.type === "birthday") {
    normalizedData = { ...normalizeBirthdayWish(params.data), version: 1 };
  } else {
    normalizedData = { ...normalizeWeddingInvitation(params.data), version: 1 };
  }

  const db = await connectMongoDB();
  if (db) {
    try {
      const createdDoc = await CreationModel.create({
        type: params.type,
        templateId: params.templateId,
        data: normalizedData,
        status: "draft",
        manageTokenHash,
        version: 1,
      });

      return {
        id: createdDoc._id.toString(),
        type: createdDoc.type,
        templateId: createdDoc.templateId,
        rawToken,
        status: createdDoc.status,
        createdAt: createdDoc.createdAt.toISOString(),
        data: createdDoc.data,
      };
    } catch (err) {
      console.warn("MongoDB create document error, fallback to memory store:", err);
    }
  }

  // Memory fallback
  const fallbackId = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: DBCreationRecord = {
    id: fallbackId,
    type: params.type,
    templateId: params.templateId,
    slug: null,
    data: normalizedData,
    status: "draft",
    manageTokenHash,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: null,
    expiresAt: null,
  };
  memoryStore.set(fallbackId, record);

  return {
    id: record.id,
    type: record.type,
    templateId: record.templateId,
    rawToken,
    status: record.status,
    createdAt: record.createdAt.toISOString(),
    data: record.data,
  };
}

/**
 * Retrieves a creation by raw management token.
 */
export async function getCreationByManageToken(rawToken: string): Promise<DBCreationRecord | null> {
  if (!rawToken || typeof rawToken !== "string") return null;
  const hash = hashManagementToken(rawToken);

  const db = await connectMongoDB();
  if (db) {
    try {
      const doc = await CreationModel.findOne({ manageTokenHash: hash });
      if (doc) {
        return {
          id: doc._id.toString(),
          type: doc.type,
          templateId: doc.templateId,
          slug: doc.slug || null,
          data: doc.data,
          status: doc.status,
          manageTokenHash: doc.manageTokenHash,
          version: doc.version || 1,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
          publishedAt: doc.publishedAt || null,
          expiresAt: doc.expiresAt || null,
        };
      }
    } catch (err) {
      console.warn("MongoDB findOne error:", err);
    }
  }

  const memRecord = getMemoryByHash(hash);
  return memRecord || null;
}

/**
 * Updates a creation by management token.
 */
export async function updateCreationByManageToken(
  rawToken: string,
  updates: {
    templateId?: string;
    data?: any;
  }
): Promise<DBCreationRecord | null> {
  const existing = await getCreationByManageToken(rawToken);
  if (!existing) return null;

  let nextTemplateId = existing.templateId;
  if (updates.templateId) {
    const templateConfig = TEMPLATE_REGISTRY[updates.templateId];
    if (templateConfig && templateConfig.type === existing.type) {
      nextTemplateId = updates.templateId;
    }
  }

  let nextData = existing.data;
  if (updates.data) {
    if (existing.type === "birthday") {
      nextData = { ...normalizeBirthdayWish(updates.data), version: existing.data?.version || 1 };
    } else {
      nextData = { ...normalizeWeddingInvitation(updates.data), version: existing.data?.version || 1 };
    }
  }

  const hash = hashManagementToken(rawToken);
  const db = await connectMongoDB();

  if (db) {
    try {
      const updatedDoc = await CreationModel.findOneAndUpdate(
        { manageTokenHash: hash },
        {
          $set: {
            templateId: nextTemplateId,
            data: nextData,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );

      if (updatedDoc) {
        return {
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
        };
      }
    } catch (err) {
      console.warn("MongoDB findOneAndUpdate error:", err);
    }
  }

  existing.templateId = nextTemplateId;
  existing.data = nextData;
  existing.updatedAt = new Date();
  return existing;
}

/**
 * Publishes a creation. Generates unique public slug if not already published.
 */
export async function publishCreationByManageToken(
  rawToken: string
): Promise<{
  success: boolean;
  error?: string;
  slug?: string;
  url?: string;
  creation?: DBCreationRecord;
}> {
  const existing = await getCreationByManageToken(rawToken);
  if (!existing) {
    return { success: false, error: "Creation not found or management link is invalid." };
  }

  // Perform strict server-side validation before publishing
  if (existing.type === "birthday") {
    const val = validateBirthdayWish(existing.data);
    if (!val.valid) {
      const firstErr = Object.values(val.errors)[0] || "Invalid birthday data";
      return { success: false, error: firstErr };
    }
  } else {
    const val = validateWeddingInvitation(existing.data);
    if (!val.valid) {
      const firstErr = Object.values(val.errors)[0] || "Invalid wedding data";
      return { success: false, error: firstErr };
    }
  }

  // Preserve existing slug if already published
  let slug = existing.slug;
  if (!slug) {
    const nameHint =
      existing.type === "birthday"
        ? existing.data.recipientName
        : `${existing.data.brideName}-${existing.data.groomName}`;
    slug = generateUniqueSlug(existing.type, nameHint);
  }

  const now = new Date();
  const hash = hashManagementToken(rawToken);
  const db = await connectMongoDB();

  if (db) {
    try {
      const updatedDoc = await CreationModel.findOneAndUpdate(
        { manageTokenHash: hash },
        {
          $set: {
            slug,
            status: "published",
            publishedAt: existing.publishedAt || now,
            updatedAt: now,
          },
        },
        { new: true }
      );

      if (updatedDoc) {
        const publicUrl = `/${updatedDoc.type}/${slug}`;
        return {
          success: true,
          slug: slug || undefined,
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
      console.warn("MongoDB publish error:", err);
    }
  }

  existing.slug = slug;
  existing.status = "published";
  existing.publishedAt = existing.publishedAt || now;
  existing.updatedAt = now;

  const publicUrl = `/${existing.type}/${slug}`;
  return {
    success: true,
    slug: slug || undefined,
    url: publicUrl,
    creation: existing,
  };
}

/**
 * Retrieves a published creation document by public slug.
 * ONLY returns creation if status === "published".
 */
export async function getPublishedCreationBySlug(
  slug: string
): Promise<DBCreationRecord | null> {
  if (!slug || typeof slug !== "string") return null;
  const cleanSlug = slug.trim();

  const db = await connectMongoDB();
  if (db) {
    try {
      const doc = await CreationModel.findOne({
        slug: cleanSlug,
        status: "published",
      });

      if (doc) {
        return {
          id: doc._id.toString(),
          type: doc.type,
          templateId: doc.templateId,
          slug: doc.slug || null,
          data: doc.data,
          status: doc.status,
          manageTokenHash: doc.manageTokenHash,
          version: doc.version || 1,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
          publishedAt: doc.publishedAt || null,
          expiresAt: doc.expiresAt || null,
        };
      }
    } catch (err) {
      console.warn("MongoDB findOne by slug error:", err);
    }
  }

  const memRecord = getMemoryBySlug(cleanSlug);
  return memRecord || null;
}
