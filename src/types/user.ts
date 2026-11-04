// src/types/user.ts
import { UserRole, AccountType, AccountStatus } from "./enums";

export interface IUser {
  _id?: string;
  userId: string;
  fullname: string;
  email: string;
  password?: string;
  mobile?: string;
  profilePicture?: string;
  role: UserRole | string;
  accountType: AccountType | string;
  territories?: string[];
  isSubscribed?: boolean;
  subscriptionExpiry?: Date;
  status: AccountStatus | "Active" | "Suspended" | "Pending";
  lastLogin?: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

