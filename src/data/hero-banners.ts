import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  Users,
  TrendingUp,
  Layers,
  Building2,
  DollarSign,
  Calendar,
  Globe2,
  Sparkles,
  Code2,
  Smartphone,
  Rocket,
  MapPin,
  Lock,
} from "lucide-react";
import type { HeroSlide } from "@/components/common/HeroBannerCarousel";

/**
 * =========================================================================
 * 1. HOME ROUTE ("/") - 3 HERO SLIDES
 * Showcase 4-in-1 PropTech Ecosystem: Stays, Systems & Lead Networks
 * =========================================================================
 */
export const HOME_HERO_SLIDES: HeroSlide[] = [
  {
    id: "home-slide-1",
    image: "/imges/banner/hero-madeira-sunset-villa.webp",
    alt: "PropGrowth Lab - 360° Luxury Stays & PropTech Growth Engine",
    badge: "4-in-1 PropTech Ecosystem · 6 Global Markets",
    badgeIcon: Sparkles,
    titlePrefix: "The 360° Tech & Growth Engine for",
    titleHighlight: "Luxury Stays & Real Estate",
    hookArrowText: "Turnkey Next.js Booking Engines & Full-Funnel Direct Bookings",
    subtitle:
      "Eliminate 20% OTA fees with custom direct booking funnels, launch production platforms in 48 hours, and receive daily verified broker lead quotas with 70/30 escrow splits.",
    primaryCta: {
      label: "Explore 360° Agency",
      href: "/agency",
    },
    secondaryCta: {
      label: "Broker Daily Leads",
      href: "/leads",
    },
    trustPills: [
      { icon: Zap, label: "48h Turnkey Launch" },
      { icon: ShieldCheck, label: "Zero Airbnb Fees" },
      { icon: CheckCircle2, label: "Daily Verified Quotas" },
      { icon: Users, label: "70/30 Coordinator Split" },
    ],
  },
  {
    id: "home-slide-2",
    image: "/imges/banner/hero-proptech-growth-dashboard.webp",
    alt: "PropGrowth Lab - Enterprise PropTech Systems & Code",
    badge: "Turnkey Tech & Systems · Sub-Second Speed",
    badgeIcon: Layers,
    titlePrefix: "High-Performance Next.js Architecture &",
    titleHighlight: "Arbitrage OS Portals",
    hookArrowText: "Sub-Second Speed · Google 99+ Score · Ready Code from $19",
    subtitle:
      "Replace slow legacy sites with sub-second Next.js engines, 2-way iCal sync, live booking drawers, and automated WhatsApp lead dispatch pipelines.",
    primaryCta: {
      label: "Browse Systems & Code",
      href: "/templates",
    },
    secondaryCta: {
      label: "Calculate OTA Savings",
      href: "/agency#calculator",
    },
    trustPills: [
      { icon: Zap, label: "Sub-0.8s Next.js" },
      { icon: Calendar, label: "2-Way iCal Sync" },
      { icon: Smartphone, label: "1-Click PWA Native UX" },
      { icon: DollarSign, label: "Pay After Live Guarantee" },
    ],
  },
  {
    id: "home-slide-3",
    image: "/imges/banner/hero-nyc-waterfront-mansion.webp",
    alt: "PropGrowth Lab - Global Broker Territory Allocation",
    badge: "Tier-1 Markets · USA, UK, EU, UAE, CA, AU",
    badgeIcon: Globe2,
    titlePrefix: "Close Inbound Deals with Pre-Screened",
    titleHighlight: "High-Budget Buyers & Tenants",
    hookArrowText: "Verified $2,500/mo to $1M+ Clients Dispatched Daily to WhatsApp",
    subtitle:
      "Stop wasting hours cold calling dead numbers. Subscribe to exclusive territory quotas or join our 70/30 territory coordinator network with zero desk fees.",
    primaryCta: {
      label: "Coordinator Network (70%)",
      href: "/coordinators",
    },
    secondaryCta: {
      label: "Reserve City Quota",
      href: "/leads",
    },
    trustPills: [
      { icon: ShieldCheck, label: "Exclusive Territory Lock" },
      { icon: Users, label: "70% Deal Payout" },
      { icon: CheckCircle2, label: "No Cold Calling" },
      { icon: Lock, label: "Escrow Title Protection" },
    ],
  },
];

/**
 * =========================================================================
 * 2. TEMPLATES ROUTE ("/templates") - 2 HERO SLIDES
 * Focus: Sub-second Next.js web engineering, source code & 48h turnkey
 * =========================================================================
 */
export const TEMPLATES_HERO_SLIDES: HeroSlide[] = [
  {
    id: "templates-slide-1",
    image: "/imges/banner/hero-direct-booking-mockup.webp",
    alt: "Sub-Second Next.js Website Templates & Full-Stack Systems",
    badge: "Sub-Second Next.js Web Engineering",
    badgeIcon: Zap,
    titlePrefix: "Stop Losing Clients to Slow Websites.",
    titleHighlight: "Launch in 48 Hours.",
    hookArrowText: "Google 99+ PageSpeed · Buy Clean Source Code or Turnkey Launch",
    subtitle:
      "Slow websites kill conversions. Buy clean production source code from $19–$69 or get a 48-hour turnkey launch from $99–$199 with our 'Pay After Live' guarantee.",
    primaryCta: {
      label: "Browse Production Blueprints",
      href: "#catalog",
    },
    secondaryCta: {
      label: "How 48h Turnkey Works",
      href: "#how-it-works",
    },
    trustPills: [
      { icon: Zap, label: "0.8s Speed & SEO" },
      { icon: Rocket, label: "Figma → Next.js Live" },
      { icon: Smartphone, label: "1-Click PWA App" },
      { icon: ShieldCheck, label: "Pay After Live" },
    ],
  },
  {
    id: "templates-slide-2",
    image: "/imges/banner/hero-property-analytics-tablet.webp",
    alt: "Full-Stack PropTech & Agent Sagar CRM Architecture",
    badge: "Full-Stack Hospitality & Broker CRM",
    badgeIcon: Code2,
    titlePrefix: "MongoDB Atlas Reservation Models &",
    titleHighlight: "Direct Booking Engines",
    hookArrowText: "Real-Time 2-Way iCal Calendar Sync (Zero Double-Bookings)",
    subtitle:
      "Enterprise real estate leasing platforms featuring instant viewing booking drawers, automated PDF lease passes, multi-currency switchers, and Agent Sagar CRM Kanban pipelines.",
    primaryCta: {
      label: "View Fullstack Systems ($69)",
      href: "#catalog",
    },
    secondaryCta: {
      label: "Custom Turnkey Setup ($199)",
      href: "#how-it-works",
    },
    trustPills: [
      { icon: Layers, label: "MongoDB & Server Actions" },
      { icon: Calendar, label: "Airbnb & Booking iCal Sync" },
      { icon: CheckCircle2, label: "Stripe & WhatsApp Ready" },
      { icon: Building2, label: "CRM Kanban Pipeline" },
    ],
  },
];

/**
 * =========================================================================
 * 3. AGENCY ROUTE ("/agency") - 2 HERO SLIDES
 * Focus: Eliminating 25% OTA fees, direct booking funnels, $350-$697 retainers
 * =========================================================================
 */
export const AGENCY_HERO_SLIDES: HeroSlide[] = [
  {
    id: "agency-slide-1",
    image: "/imges/banner/hero-sunset-luxury-resort.webp",
    alt: "360° Hospitality Growth Agency - Eliminate 25% OTA Fees",
    badge: "Why Hand Over $30K–$60K in Fees Every Year?",
    badgeIcon: TrendingUp,
    titlePrefix: "Stop Losing 25% Revenue to OTAs.",
    titleHighlight: "Keep 100% of Guest Income.",
    hookArrowText: "High-Converting Direct Booking Funnels & Targeted Meta/Google Ads",
    subtitle:
      "Third-party booking platforms take up to 25% on every reservation and withhold guest data. We engineer your direct booking engine and run targeted guest acquisition funnels on flat $350–$697/month retainers.",
    primaryCta: {
      label: "Calculate Your OTA Savings",
      href: "#calculator",
    },
    secondaryCta: {
      label: "Book Free Growth Audit",
      href: "#audit-form",
    },
    trustPills: [
      { icon: ShieldCheck, label: "Keep 100% Guest Income" },
      { icon: Zap, label: "Sub-Second Direct Engine" },
      { icon: Calendar, label: "2-Way Real-Time iCal" },
      { icon: DollarSign, label: "$350–$697 Retainers" },
    ],
  },
  {
    id: "agency-slide-2",
    image: "/imges/banner/hero-modern-hillside-estate.webp",
    alt: "Full-Funnel Performance Marketing for Boutique Resorts and Luxury Stays",
    badge: "Full-Funnel Guest Acquisition & Branding",
    badgeIcon: Sparkles,
    titlePrefix: "We Are Your Performance",
    titleHighlight: "Hospitality Growth Partner",
    hookArrowText: "Are You Ready to Scale Your High-Value Direct Bookings?",
    subtitle:
      "From sub-second Next.js direct engines to high-converting paid search ads and 1-tap WhatsApp concierge integration—turn one-time guests into direct repeat bookers.",
    primaryCta: {
      label: "Explore Live ROI Model",
      href: "#calculator",
    },
    secondaryCta: {
      label: "Claim Your Territory Audit",
      href: "#audit-form",
    },
    trustPills: [
      { icon: TrendingUp, label: "Strategic Paid Acquisition" },
      { icon: Users, label: "100% Direct Guest Retention" },
      { icon: CheckCircle2, label: "Instant WhatsApp Concierge" },
      { icon: Rocket, label: "Guaranteed Turnkey Growth" },
    ],
  },
];

/**
 * =========================================================================
 * 4. LEADS ROUTE ("/leads") - 2 HERO SLIDES
 * Focus: Broker daily lead quotas, 90-sec WhatsApp routing, verified budgets
 * =========================================================================
 */
export const LEADS_HERO_SLIDES: HeroSlide[] = [
  {
    id: "leads-slide-1",
    image: "/imges/banner/hero-nyc-waterfront-mansion.webp",
    alt: "Broker Daily Lead Quota Subscriptions - USA, UK, Global",
    badge: "Tired of Cold Calling Dead Numbers?",
    badgeIcon: Building2,
    titlePrefix: "Never Chase Cold Leads Again.",
    titleHighlight: "Inbound Deals Sent to WhatsApp.",
    hookArrowText: "Verified $2,500/mo to $1M+ Inquiries Dispatched Daily",
    subtitle:
      "Stop wasting hours cold-prospecting dead numbers. We deliver verified high-budget tenant and buyer inquiries directly to your WhatsApp with move-in dates under 30 days—so you focus on closing.",
    primaryCta: {
      label: "Choose Monthly Quota",
      href: "#quotas",
    },
    secondaryCta: {
      label: "Check Territory Availability",
      href: "#territories",
    },
    trustPills: [
      { icon: CheckCircle2, label: "Zero Cold Calls (Inbound)" },
      { icon: DollarSign, label: "Vetted $2,500/mo+ Budgets" },
      { icon: ShieldCheck, label: "Exclusive Territory Lock" },
      { icon: Zap, label: "Sub-90s WhatsApp Ping" },
    ],
  },
  {
    id: "leads-slide-2",
    image: "/imges/banner/hero-toronto-waterfront.webp",
    alt: "Exclusive Territory Lead Allocation for Licensed Real Estate Brokers",
    badge: "Strict Territory Quality Gate · Max 2-3 Brokers/City",
    badgeIcon: MapPin,
    titlePrefix: "Lock Your Metropolitan Market",
    titleHighlight: "Before Your Competitor Does.",
    hookArrowText: "Capped Slots in Miami, London, Madeira, Dubai, Sydney & Toronto",
    subtitle:
      "Predictable deal flow with Silver (2 leads/day) and Gold (5 leads/day) subscriptions. Each inquiry is pre-screened with verified WhatsApp numbers, budget validation, and relocation timelines.",
    primaryCta: {
      label: "Reserve City Lead Quota",
      href: "#quotas",
    },
    secondaryCta: {
      label: "See How Leads Are Verified",
      href: "#verification",
    },
    trustPills: [
      { icon: ShieldCheck, label: "Exclusivity Guaranteed" },
      { icon: Building2, label: "Direct Inbound Buyers" },
      { icon: Calendar, label: "Daily Morning Dispatch" },
      { icon: Users, label: "Full Replacement Guarantee" },
    ],
  },
];

/**
 * =========================================================================
 * 5. COORDINATORS ROUTE ("/coordinators") - 2 HERO SLIDES
 * Focus: Coordinator network, 70/30 commission splits, zero desk fees, escrow
 * =========================================================================
 */
export const COORDINATORS_HERO_SLIDES: HeroSlide[] = [
  {
    id: "coordinators-slide-1",
    image: "/imges/banner/hero-dubai-skyline-retreat.webp",
    alt: "The Coordinator Network - 70/30 Commission Splits",
    badge: "Why Give 50% of Your Commission Away?",
    badgeIcon: Users,
    titlePrefix: "Stop Giving Half Your Commission Away.",
    titleHighlight: "Close Inbound Deals & Keep 70%.",
    hookArrowText: "We Provide Qualified High-Budget Leads · You Handle Viewings",
    subtitle:
      "Stop giving 50% of your commission away while doing all the prospecting. We deliver verified luxury buyers and tenants directly to your phone—you handle local viewings and keep a guaranteed 70% commission with zero desk fees.",
    primaryCta: {
      label: "Apply as Coordinator",
      href: "#coordinator-form",
    },
    secondaryCta: {
      label: "How 70/30 Coordination Works",
      href: "#how-it-works",
    },
    trustPills: [
      { icon: DollarSign, label: "70% Deal Payout" },
      { icon: ShieldCheck, label: "Zero Desk Fees" },
      { icon: CheckCircle2, label: "Pre-Vetted Luxury Clients" },
      { icon: Users, label: "Max 2 Coordinators Per Market" },
    ],
  },
  {
    id: "coordinators-slide-2",
    image: "/imges/banner/hero-european-investment-suite.webp",
    alt: "Global Real Estate Coordinator and Escrow Settlement Network",
    badge: "Cross-Border Luxury Mandates & Escrow Title SLA",
    badgeIcon: Globe2,
    titlePrefix: "Scale High-Ticket Transactions in",
    titleHighlight: "Key Global Territories.",
    hookArrowText: "Direct Title Company Escrow Settlements Wired on Closing",
    subtitle:
      "For licensed principal brokers and high-producing local agents in USA, UK, Europe, UAE, Australia, and Canada. Join our high-ticket coordinator network with full legal escrow protection.",
    primaryCta: {
      label: "Claim Territory Allocation",
      href: "#territories",
    },
    secondaryCta: {
      label: "Compare Commission Economics",
      href: "#how-it-works",
    },
    trustPills: [
      { icon: Lock, label: "Prompt Title Escrow Wires" },
      { icon: Building2, label: "High-Ticket Luxury Mandates" },
      { icon: Globe2, label: "Cross-Border Buyer Flow" },
      { icon: ShieldCheck, label: "Exclusive Geographic Lock" },
    ],
  },
];

export const PARTNERS_HERO_SLIDES: HeroSlide[] = COORDINATORS_HERO_SLIDES;

