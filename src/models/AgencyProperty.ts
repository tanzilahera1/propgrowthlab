import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAgencyProperty extends Document {
  propertyId: string;
  name: string;
  ownerName: string;
  territory: string;
  engineDomain: string;
  directGmv: number;
  otaSavings: number;
  directShare: number;
  stripeStatus: "Connected" | "Verified";
  icalStatus: "Healthy (<5m)" | "Synced";
  status: "Active Engine" | "Scaling";
  createdAt: Date;
  updatedAt: Date;
}

const AgencyPropertySchema = new Schema<IAgencyProperty>(
  {
    propertyId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    territory: { type: String, required: true },
    engineDomain: { type: String, required: true, trim: true },
    directGmv: { type: Number, required: true, default: 0 },
    otaSavings: { type: Number, required: true, default: 0 },
    directShare: { type: Number, required: true, default: 75 },
    stripeStatus: {
      type: String,
      enum: ["Connected", "Verified"],
      default: "Verified",
    },
    icalStatus: {
      type: String,
      enum: ["Healthy (<5m)", "Synced"],
      default: "Healthy (<5m)",
    },
    status: {
      type: String,
      enum: ["Active Engine", "Scaling"],
      default: "Active Engine",
    },
  },
  { timestamps: true }
);

export const AgencyProperty: Model<IAgencyProperty> =
  mongoose.models.AgencyProperty ||
  mongoose.model<IAgencyProperty>("AgencyProperty", AgencyPropertySchema, "agencyproperties");

export default AgencyProperty;

