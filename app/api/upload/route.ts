import { NextResponse } from "next/server";
import { mediaService } from "@/lib/mediaService";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`upload_${ip}`, 20, 60000);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many upload requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    // FormData upload
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const category = (formData.get("category") as string) || "birthday";

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No image file provided in request." },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await mediaService.uploadImage(
        buffer,
        file.name,
        file.type,
        category as "birthday" | "wedding"
      );

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "Upload failed." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        url: result.url,
        publicId: result.publicId,
      });
    }

    // JSON base64 upload
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const { base64, filename, mimeType, category } = body;

      if (!base64 || typeof base64 !== "string") {
        return NextResponse.json(
          { success: false, error: "Base64 image data missing." },
          { status: 400 }
        );
      }

      const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(cleanBase64, "base64");

      const result = await mediaService.uploadImage(
        buffer,
        filename || "upload.jpg",
        mimeType || "image/jpeg",
        (category as "birthday" | "wedding") || "birthday"
      );

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "Upload failed." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        url: result.url,
        publicId: result.publicId,
      });
    }

    return NextResponse.json(
      { success: false, error: "Unsupported Content-Type header." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during media upload." },
      { status: 500 }
    );
  }
}
