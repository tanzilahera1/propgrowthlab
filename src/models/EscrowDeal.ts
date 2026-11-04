import mongoose, { Schema, Document, Model } from "mongoose";
import { EscrowStatus } from "@/types/enums";

export interface IEscrowDeal extends Document {
  dealRef: string;
  dealTitle: string;
  location: string;
  territory: string;
  territoryCode?: string;
  dealValue: number;
  commissionTotal: number;
  brokerCommission: number;
  brokerName: string;
  brokerEmail: string;
  clientName: string;
  clientEmail: string;
  ownerName: string;
  splitRatio: string;
  stage: string;
  estClosingDate: Date;
  status: EscrowStatus | "In Escrow" | "Paid" | "Pending" | "Under Contract";
  // Plan-1 True Escrow Architecture
  depositAmount: number;
  directPaymentLink: string;
  escrowCustodyStatus:
    | "AWAITING_CLIENT_DEPOSIT"
    | "HELD_IN_ESCROW"
    | "DISBURSED"
    | "REFUNDED";
  ownerDisbursement: number;
  platformFee: number;
  depositReceivedAt?: Date;
  disbursedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EscrowDealSchema = new Schema<IEscrowDeal>(
  {
    dealRef: { type: String, required: true, unique: true },
    dealTitle: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    territory: { type: String, required: true },
    territoryCode: { type: String, uppercase: true, trim: true },
    dealValue: { type: Number, required: true },
    commissionTotal: { type: Number, required: true },
    brokerCommission: { type: Number, required: true },
    brokerName: { type: String, required: true },
    brokerEmail: { type: String, required: true, lowercase: true, trim: true },
    clientName: { type: String, default: "Client Buyer" },
    clientEmail: { type: String, default: "client@gmail.com", lowercase: true },
    ownerName: { type: String, default: "Property Host / Owner" },
    splitRatio: { type: String, default: "70/30" },
    stage: { type: String, required: true },
    estClosingDate: { type: Date, required: true },
    status: {
      type: String,
      default: "In Escrow",
    },
    depositAmount: { type: Number, default: 0 },
    directPaymentLink: { type: String, default: "" },
    escrowCustodyStatus: {
      type: String,
      enum: [
        "AWAITING_CLIENT_DEPOSIT",
        "HELD_IN_ESCROW",
        "DISBURSED",
        "REFUNDED",
      ],
      default: "HELD_IN_ESCROW",
    },
    ownerDisbursement: { type: Number, default: 0 },
    platformFee: { type: Number, default: 0 },
    depositReceivedAt: { type: Date },
    disbursedAt: { type: Date },
  },
  { timestamps: true }
);

export const EscrowDeal: Model<IEscrowDeal> =
  mongoose.models.EscrowDeal ||
  mongoose.model<IEscrowDeal>("EscrowDeal", EscrowDealSchema, "escrowdeals");

export default EscrowDeal;
