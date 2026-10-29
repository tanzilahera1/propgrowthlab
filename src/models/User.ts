import mongoose, { Schema, Document, Model } from "mongoose";
import { UserRole, AccountType } from "@/types/auth";

export interface IUserDocument extends Document {
  userId: string;
  fullname: string;
  email: string;
  password?: string;
  mobile?: string;
  profilePicture?: string;
  role: string;
  accountType: string;
  territories: string[];
  isSubscribed: boolean;
  subscriptionExpiry?: Date;
  status: "Active" | "Suspended" | "Pending";
  lastLogin?: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    userId: { type: String, required: true, unique: true },
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: false },
    mobile: { type: String, unique: true, sparse: true, trim: true },
    profilePicture: { type: String, default: "" },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    accountType: {
      type: String,
      enum: Object.values(AccountType),
      default: AccountType.FREE,
    },
    territories: { type: [String], default: ["Global"] },
    isSubscribed: { type: Boolean, default: false },
    subscriptionExpiry: { type: Date },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Pending"],
      default: "Active",
    },
    lastLogin: { type: Date, default: Date.now },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

export const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;

