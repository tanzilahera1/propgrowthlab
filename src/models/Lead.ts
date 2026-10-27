import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  fullName: string;
  whatsapp: string;
  email?: string;
  territory: string;
  propertyType: string;
  budget: string;
  moveInTimeframe: string;
  status: "new" | "dispatched" | "viewing_scheduled" | "closed" | "archived";
  assignedBroker?: string;
  notes?: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    territory: { type: String, required: true, default: "Global / Worldwide" },
    propertyType: { type: String, required: true, default: "Luxury Villa" },
    budget: { type: String, required: true },
    moveInTimeframe: { type: String, required: true, default: "Within 30 days" },
    status: {
      type: String,
      enum: ["new", "dispatched", "viewing_scheduled", "closed", "archived"],
      default: "new",
    },
    assignedBroker: { type: String },
    notes: { type: String },
    source: { type: String, default: "Platform Portal" },
  },
  { timestamps: true }
);

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
