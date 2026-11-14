import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILeadLocation {
  countryCode: string;
  divisionOrState: string;
  districtOrCity: string;
  upazilaOrThana: string;
  microZone?: string;
}

export interface IMovingDetails {
  currentArea?: string;
  preferredDate?: string;
  assignedMover?: string;
  moverCommission?: number;
}

export interface ILead extends Document {
  ticketId?: string;
  fullName: string;
  whatsapp: string;
  email?: string;
  territory: string;
  territoryCode?: string;
  locationDetails?: ILeadLocation;
  propertyType: string;
  leadCategory?: "luxury_stay" | "room_rental";
  budget: string;
  moveInTimeframe: string;
  needsMovingService?: boolean;
  movingDetails?: IMovingDetails;
  status: "new" | "dispatched" | "viewing_scheduled" | "closed" | "archived";
  assignedBroker?: string;
  feedbackStatus?: "pending" | "viewing_arranged" | "deal_closed" | "rejected";
  brokerCommissionShare?: number;
  notes?: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    ticketId: { type: String, uppercase: true, trim: true, index: true },
    fullName: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    territory: { type: String, required: true, default: "Global / Worldwide" },
    territoryCode: { type: String, uppercase: true, trim: true },
    locationDetails: {
      countryCode: { type: String },
      divisionOrState: { type: String },
      districtOrCity: { type: String },
      upazilaOrThana: { type: String },
      microZone: { type: String },
    },
    propertyType: { type: String, required: true, default: "Room Rental" },
    leadCategory: {
      type: String,
      enum: ["luxury_stay", "room_rental"],
      default: "room_rental",
    },
    budget: { type: String, required: true },
    moveInTimeframe: { type: String, required: true, default: "Within 30 days" },
    needsMovingService: { type: Boolean, default: false },
    movingDetails: {
      currentArea: { type: String },
      preferredDate: { type: String },
      assignedMover: { type: String },
      moverCommission: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["new", "dispatched", "viewing_scheduled", "closed", "archived"],
      default: "new",
    },
    assignedBroker: { type: String },
    feedbackStatus: {
      type: String,
      enum: ["pending", "viewing_arranged", "deal_closed", "rejected"],
      default: "pending",
    },
    brokerCommissionShare: { type: Number, default: 0 },
    notes: { type: String },
    source: { type: String, default: "Platform Portal" },
  },
  { timestamps: true }
);

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
