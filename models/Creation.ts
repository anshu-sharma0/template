import mongoose, { Schema, Document, Model } from "mongoose";

export type CreationType = "birthday" | "wedding";
export type CreationStatus = "draft" | "published" | "archived";

export interface ICreationDoc extends Document {
  type: CreationType;
  templateId: string;
  slug?: string | null;
  data: Record<string, any>;
  status: CreationStatus;
  manageTokenHash: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  expiresAt?: Date | null;
}

const CreationSchema = new Schema<ICreationDoc>(
  {
    type: {
      type: String,
      required: true,
      enum: ["birthday", "wedding"],
      index: true,
    },
    templateId: {
      type: String,
      required: true,
      enum: ["birthday-wish", "elegant-wedding", "luxury-wedding"],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      index: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    manageTokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for optimal query performance
CreationSchema.index({ slug: 1, status: 1 });
CreationSchema.index({ createdAt: -1 });

export const CreationModel: Model<ICreationDoc> =
  mongoose.models.Creation || mongoose.model<ICreationDoc>("Creation", CreationSchema);
