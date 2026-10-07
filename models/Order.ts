import mongoose, { Schema, Document, Model } from "mongoose";

export type OrderStatus =
  | "created"
  | "pending"
  | "paid"
  | "failed"
  | "cancelled"
  | "refunded";

export interface IOrderDoc extends Document {
  creationId: string;
  amount: number; // In paise
  currency: string;
  status: OrderStatus;
  razorpayOrderId: string;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date | null;
}

const OrderSchema = new Schema<IOrderDoc>(
  {
    creationId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    status: {
      type: String,
      required: true,
      enum: ["created", "pending", "paid", "failed", "cancelled", "refunded"],
      default: "created",
      index: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    razorpaySignature: {
      type: String,
      default: null,
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ creationId: 1, status: 1 });
OrderSchema.index({ createdAt: -1 });

export const OrderModel: Model<IOrderDoc> =
  mongoose.models.Order || mongoose.model<IOrderDoc>("Order", OrderSchema);
