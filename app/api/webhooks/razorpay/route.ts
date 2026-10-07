import { NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import { connectMongoDB } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";
import { CreationModel } from "@/models/Creation";
import { generateUniqueSlug } from "@/lib/security/token";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-razorpay-signature") || "";
    const rawBody = await req.text();

    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;

    if (eventType === "payment.captured" || eventType === "order.paid") {
      const payload = event.payload.payment?.entity || event.payload.order?.entity;
      const razorpayOrderId = payload?.order_id || payload?.id;
      const razorpayPaymentId = payload?.id;

      if (razorpayOrderId) {
        const db = await connectMongoDB();
        if (db) {
          const order = await OrderModel.findOneAndUpdate(
            { razorpayOrderId },
            {
              $set: {
                status: "paid",
                razorpayPaymentId: razorpayPaymentId || undefined,
                paidAt: new Date(),
                updatedAt: new Date(),
              },
            },
            { new: true }
          );

          if (order && order.creationId) {
            const creation = await CreationModel.findById(order.creationId);
            if (creation && creation.status !== "published") {
              const nameHint =
                creation.type === "birthday"
                  ? creation.data?.recipientName
                  : `${creation.data?.brideName}-${creation.data?.groomName}`;
              const slug = creation.slug || generateUniqueSlug(creation.type, nameHint);

              await CreationModel.findByIdAndUpdate(order.creationId, {
                $set: {
                  slug,
                  status: "published",
                  publishedAt: creation.publishedAt || new Date(),
                  updatedAt: new Date(),
                },
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Razorpay webhook error:", err);
    return NextResponse.json(
      { success: false, error: "Webhook processing error" },
      { status: 500 }
    );
  }
}
