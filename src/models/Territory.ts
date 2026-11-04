import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITerritory extends Document {
  code: string; // e.g. "BD-DHA-GUL-02", "US-FL-MIA-01"
  countryCode: string; // "BD", "US", "AE", "UK"
  countryName: string; // "Bangladesh", "United States", "United Arab Emirates", "United Kingdom"
  divisionOrState: string; // "Dhaka Division", "Florida", "Dubai", "Greater London"
  districtOrCity: string; // "Dhaka", "Miami-Dade", "Dubai", "Westminster"
  upazilaOrThana: string; // "Gulshan", "Brickell", "Palm Jumeirah", "Mayfair"
  microZone: string; // "Gulshan-2 / Block C", "Brickell Financial District", "Palm Crescent", "Mount Street"
  postalCode?: string; // "1212", "33131", "W1K"
  tier: "Tier-1" | "Tier-2" | "Tier-3";
  exclusiveBrokerId?: string;
  exclusiveBrokerName?: string;
  activeBrokersCount: number;
  monthlyQuotaAllocation: number;
  avgPropertyValue: number;
  status: "active" | "restricted" | "coming_soon";
  createdAt: Date;
  updatedAt: Date;
}

const TerritorySchema = new Schema<ITerritory>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    countryCode: { type: String, required: true, uppercase: true, trim: true },
    countryName: { type: String, required: true, trim: true },
    divisionOrState: { type: String, required: true, trim: true },
    districtOrCity: { type: String, required: true, trim: true },
    upazilaOrThana: { type: String, required: true, trim: true },
    microZone: { type: String, required: true, trim: true },
    postalCode: { type: String, trim: true },
    tier: {
      type: String,
      enum: ["Tier-1", "Tier-2", "Tier-3"],
      default: "Tier-1",
    },
    exclusiveBrokerId: { type: String },
    exclusiveBrokerName: { type: String },
    activeBrokersCount: { type: Number, default: 0 },
    monthlyQuotaAllocation: { type: Number, default: 50 },
    avgPropertyValue: { type: Number, default: 1000000 },
    status: {
      type: String,
      enum: ["active", "restricted", "coming_soon"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Indexes for fast multi-level hierarchical drill-down
TerritorySchema.index({ countryCode: 1, divisionOrState: 1, districtOrCity: 1, upazilaOrThana: 1 });
TerritorySchema.index({ code: 1 }, { unique: true });

export const Territory: Model<ITerritory> =
  mongoose.models.Territory ||
  mongoose.model<ITerritory>("Territory", TerritorySchema, "territories");

export default Territory;

