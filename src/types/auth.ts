export enum UserRole {
  OWNER = "Platform Owner",
  ADMIN = "System Administrator",
  BROKER = "Broker Partner",
  CLIENT = "Property Owner",
  USER = "User",
}

export enum AccountType {
  FREE = "Free Prospect",
  VERIFIED = "Verified Client",
  ENTERPRISE = "Enterprise Fleet",
}

export interface IUser {
  _id?: string;
  userId: string;
  fullname: string;
  email: string;
  password?: string;
  mobile?: string;
  profilePicture?: string;
  role: UserRole;
  accountType: AccountType;
  territories?: string[];
  isSubscribed?: boolean;
  subscriptionExpiry?: Date;
  status: "Active" | "Suspended" | "Pending";
  lastLogin?: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

