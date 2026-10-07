import { NextResponse } from "next/server";
import { verifyAndMarkOrderPaid } from "@/lib/services/orderService";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`verify_${ip}`, 15, 60000);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many verification requests. Please wait." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { token, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!token || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification parameters." },
        { status: 400 }
      );
    }

    const result = await verifyAndMarkOrderPaid({
      rawToken: token,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Payment verification failed." },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Order verification API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during verification." },
      { status: 500 }
    );
  }
}
