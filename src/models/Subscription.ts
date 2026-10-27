import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscription extends Document {
  brokerName: string;
  whatsapp: string;
  email: string;
  territory: string;
  planTier: "silver" | "gold" | "platinum";
  dailyQuota: number;
  monthlyQuota: number;
  leadsDeliveredToday: number;
  totalLeadsDelivered: number;
  status: "active" | "paused" | "canceled";
  priceMonthly: number;
  startedAt: Date;
  nextRenewalDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    brokerName: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    territory: { type: String, required: true },
    planTier: {
      type: String,
      enum: ["silver", "gold", "platinum"],
      required: true,
      default: "silver",
    },
    dailyQuota: { type: Number, required: true, default: 2 },
    monthlyQuota: { type: Number, required: true, default: 60 },
    leadsDeliveredToday: { type: Number, default: 0 },
    totalLeadsDelivered: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "paused", "canceled"],
      default: "active",
    },
    priceMonthly: { type: Number, required: true },
    startedAt: { type: Date, default: Date.now },
    nextRenewalDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

export const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;
