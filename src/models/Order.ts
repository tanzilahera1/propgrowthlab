import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  clientName: string;
  clientEmail: string;
  whatsapp: string;
  templateId: string;
  templateName: string;
  orderType: "code" | "turnkey" | "custom";
  amount: number;
  currency: string;
  customDomain?: string;
  status: "pending" | "in_development" | "delivered" | "refunded";
  notes?: string;
  deliveryDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    clientName: { type: String, required: true, trim: true },
    clientEmail: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    templateId: { type: String, required: true },
    templateName: { type: String, required: true },
    orderType: {
      type: String,
      enum: ["code", "turnkey", "custom"],
      required: true,
      default: "turnkey",
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "EUR" },
    customDomain: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "in_development", "delivered", "refunded"],
      default: "pending",
    },
    notes: { type: String },
    deliveryDeadline: {
      type: Date,
      default: () => new Date(Date.now() + 48 * 60 * 60 * 1000), // 48-Hour SLA default
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
