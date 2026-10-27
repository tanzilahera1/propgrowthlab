import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPartnerApplication extends Document {
  fullName: string;
  whatsapp: string;
  email: string;
  territory: string;
  experience: string;
  agencyAffiliation?: string;
  agreedSplit: string; // "70/30" or "80/20"
  status: "pending_review" | "approved" | "active" | "rejected";
  notes?: string;
  dealsClosed: number;
  totalCommissionPaid: number;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerApplicationSchema = new Schema<IPartnerApplication>(
  {
    fullName: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    territory: { type: String, required: true },
    experience: { type: String, required: true },
    agencyAffiliation: { type: String, trim: true },
    agreedSplit: { type: String, default: "75/25" },
    status: {
      type: String,
      enum: ["pending_review", "approved", "active", "rejected"],
      default: "pending_review",
    },
    notes: { type: String },
    dealsClosed: { type: Number, default: 0 },
    totalCommissionPaid: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PartnerApplication: Model<IPartnerApplication> =
  mongoose.models.PartnerApplication ||
  mongoose.model<IPartnerApplication>(
    "PartnerApplication",
    PartnerApplicationSchema
  );

export default PartnerApplication;
