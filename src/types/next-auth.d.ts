import { UserRole } from "./auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole | string;
      image?: string | null;
      hasPassword?: boolean;
      isSubscribed?: boolean;
      territories?: string[];
      status?: string;
    };
  }

  interface User {
    id?: string;
    email?: string | null;
    name?: string | null;
    role?: UserRole | string;
    image?: string | null;
    hasPassword?: boolean;
    isSubscribed?: boolean;
    territories?: string[];
    status?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    name?: string | null;
    role?: UserRole | string;
    hasPassword?: boolean;
    isSubscribed?: boolean;
    territories?: string[];
    status?: string;
    lastChecked?: number;
  }
}

