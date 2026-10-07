import { NextResponse } from "next/server";
import { createRazorpayOrderForCreation } from "@/lib/services/orderService";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`order_${ip}`, 20, 60000);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many payment requests. Please wait." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { success: false, error: "Management token is required to create order." },
        { status: 400 }
      );
    }

    const result = await createRazorpayOrderForCreation(token);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Order creation failed." },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Create order API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize order." },
      { status: 500 }
    );
  }
}
