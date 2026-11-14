/**
 * PropGrowth Lab - Core Domain Enumerations & RBAC Definitions
 * Adheres to enterprise TypeScript standards with strict typing, JSDoc specifications,
 * and centralized role validation helpers.
 */

/**
 * Platform user roles governing Role-Based Access Control (RBAC).
 */
export enum UserRole {
  /** Platform Founder / Executive Admin with unrestricted system authority */
  SUPER_ADMIN = "SUPER_ADMIN",

  /** Operations & Territory Manager handling SLAs, routing, and compliance */
  ADMIN = "ADMIN",

  /** Inbound lead dispatcher and customer support operations specialist */
  OPERATOR = "OPERATOR",

  /** Licensed Real Estate Power Broker subscribed to territory lead quotas (/leads) */
  BROKER = "BROKER",

  /** Luxury hospitality, villa, or boutique stay operator client (/agency) */
  CLIENT = "CLIENT",

  /** Coordinator managing exclusive ground viewings and 70/30 split (/coordinators) */
  COORDINATOR = "COORDINATOR",

  /** Legacy alias for Coordinator (/partners) */
  PARTNER = "PARTNER",

  /** Default registered end-user / codebase and template licensee (/templates) */
  USER = "USER",
}

/**
 * Account verification and commercial subscription tiers.
 */
export enum AccountType {
  /** Standard registered user account with default platform access */
  FREE = "FREE",

  /** Identity & license verified account */
  VERIFIED = "VERIFIED",

  /** Professional subscriber with active quota allocations */
  PRO = "PRO",

  /** Institutional brokerage or enterprise fleet tier */
  ENTERPRISE = "ENTERPRISE",
}

/**
 * Account lifecycle and administrative status.
 */
export enum AccountStatus {
  /** Fully operational account with normal permissions */
  ACTIVE = "ACTIVE",

  /** Account temporarily restricted pending administrative or compliance review */
  SUSPENDED = "SUSPENDED",

  /** Newly registered account awaiting email, identity, or license verification */
  PENDING = "PENDING",
}

/**
 * Coordinator 70/30 commission and escrow transaction settlement status.
 */
export enum EscrowStatus {
  /** Escrow agreement initiated; awaiting title and deposit confirmation */
  PENDING = "PENDING",

  /** Funds actively locked in secure escrow under closing Title SLA */
  IN_ESCROW = "IN_ESCROW",

  /** Commission disbursements successfully wired to recipient account */
  DISBURSED = "DISBURSED",

  /** Contract terminated or escrow returned prior to disbursement */
  CANCELLED = "CANCELLED",
}

/**
 * Presentation labels mapping for badges, selectors, and executive headers.
 */
export const USER_ROLE_LABELS: Record<string, string> = {
  [UserRole.SUPER_ADMIN]: "Super Administrator",
  [UserRole.ADMIN]: "Platform Administrator",
  [UserRole.OPERATOR]: "Operations Specialist",
  [UserRole.BROKER]: "Licensed Power Broker",
  [UserRole.CLIENT]: "Hospitality Client",
  [UserRole.COORDINATOR]: "Coordinator",
  [UserRole.PARTNER]: "Coordinator",
  [UserRole.USER]: "Registered User",

  // Lowercase & Legacy normalization mappings
  superadmin: "Super Administrator",
  admin: "Platform Administrator",
  operator: "Operations Specialist",
  broker: "Licensed Power Broker",
  client: "Hospitality Client",
  coordinator: "Coordinator",
  partner: "Coordinator",
  "Territory Coordinator": "Coordinator",
  "Coordinator Partner": "Coordinator",
  user: "Registered User",
  owner: "Super Administrator",
  "Platform Owner": "Super Administrator",
  "System Administrator": "Platform Administrator",
  "Broker Partner": "Licensed Power Broker",
  "Property Owner": "Hospitality Client",
  User: "Registered User",
};

export const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  [AccountType.FREE]: "Free Prospect",
  [AccountType.VERIFIED]: "Verified Member",
  [AccountType.PRO]: "Pro Subscriber",
  [AccountType.ENTERPRISE]: "Enterprise Fleet",

  // Lowercase & Legacy normalization mappings
  free: "Free Prospect",
  verified: "Verified Member",
  pro: "Pro Subscriber",
  vip: "VIP Member",
  enterprise: "Enterprise Fleet",
  "Free Prospect": "Free Prospect",
  "Verified Client": "Verified Member",
  "Enterprise Fleet": "Enterprise Fleet",
};

/**
 * Centralized authorization helper: Checks whether a given role belongs to the internal staff.
 */
export function isStaffRole(role?: string | null): boolean {
  if (!role || typeof role !== "string") return false;
  const normalized = role.trim().toUpperCase();
  return (
    normalized === UserRole.SUPER_ADMIN ||
    normalized === UserRole.ADMIN ||
    normalized === UserRole.OPERATOR ||
    normalized === "SUPERADMIN" ||
    normalized === "OWNER" ||
    role === "Platform Owner" ||
    role === "System Administrator"
  );
}

/**
 * Returns a clean, human-readable presentation title for any user role.
 */
export function formatUserRole(role?: string | null): string {
  if (!role) return "Registered User";
  return USER_ROLE_LABELS[role] || USER_ROLE_LABELS[role.toUpperCase()] || role;
}

/**
 * Returns a clean, human-readable presentation title for an account type.
 */
export function formatAccountType(type?: string | null): string {
  if (!type) return "Free Prospect";
  return ACCOUNT_TYPE_LABELS[type] || ACCOUNT_TYPE_LABELS[type.toUpperCase()] || type;
}
