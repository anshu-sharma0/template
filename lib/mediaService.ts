import { cloudinary } from "./cloudinary";
import path from "path";
import crypto from "crypto";
import fs from "fs";

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

export interface MediaUploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

export const mediaService = {
  /**
   * Uploads an image to Cloudinary (or local fallback if Cloudinary credentials are mock).
   */
  async uploadImage(
    buffer: Buffer,
    originalFilename: string,
    mimeType: string,
    category: "birthday" | "wedding" = "birthday"
  ): Promise<MediaUploadResult> {
    // 1. File size check
    if (buffer.length > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: "Image file size exceeds maximum limit of 10MB.",
      };
    }

    // 2. MIME type check
    const normalizedMime = mimeType.toLowerCase();
    if (!ALLOWED_MIME_TYPES.includes(normalizedMime)) {
      return {
        success: false,
        error: "Invalid file format. Only JPG, PNG, and WebP images are allowed.",
      };
    }

    // 3. Extension check
    const ext = path.extname(originalFilename).toLowerCase();
    if (ext && !ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        success: false,
        error: "Invalid file extension.",
      };
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    // Use Cloudinary if credentials are properly configured
    if (cloudName && cloudName !== "your_cloud_name" && apiKey && apiKey !== "your_api_key") {
      try {
        const folder = `digital-moments/${category}`;
        const base64Data = `data:${normalizedMime};base64,${buffer.toString("base64")}`;

        const uploadRes = await cloudinary.uploader.upload(base64Data, {
          folder,
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        });

        return {
          success: true,
          url: uploadRes.secure_url,
          publicId: uploadRes.public_id,
        };
      } catch (err: any) {
        console.error("Cloudinary upload error:", err);
        return {
          success: false,
          error: "Cloudinary image upload failed. Please try again.",
        };
      }
    }

    // Fallback: Local disk storage or base64 data URL for local dev without Cloudinary keys
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const randomName = `${crypto.randomBytes(16).toString("hex")}${ext || ".jpg"}`;
      const destinationPath = path.join(uploadsDir, randomName);

      await fs.promises.writeFile(destinationPath, buffer);

      return {
        success: true,
        url: `/uploads/${randomName}`,
        publicId: `local_${randomName}`,
      };
    } catch (err) {
      console.error("Local upload fallback error:", err);
      // Base64 inline URL fallback
      const base64Url = `data:${normalizedMime};base64,${buffer.toString("base64")}`;
      return {
        success: true,
        url: base64Url,
        publicId: `inline_${Date.now()}`,
      };
    }
  },

  /**
   * Deletes an image from Cloudinary by public ID.
   */
  async deleteImage(publicId: string): Promise<boolean> {
    if (!publicId || publicId.startsWith("local_") || publicId.startsWith("inline_")) {
      return true;
    }

    try {
      const res = await cloudinary.uploader.destroy(publicId);
      return res.result === "ok";
    } catch (err) {
      console.error("Cloudinary delete error:", err);
      return false;
    }
  },
};
