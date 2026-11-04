import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  title: string;
  detail: string;
  tag: string;
  color: string;
  actorEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    title: { type: String, required: true, trim: true },
    detail: { type: String, required: true, trim: true },
    tag: { type: String, required: true, default: "SYSTEM" },
    color: { type: String, default: "blue" },
    actorEmail: { type: String, default: "system@propgrowthlab.com" },
  },
  { timestamps: true }
);

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema, "auditlogs");

export default AuditLog;

