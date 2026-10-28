"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Code2,
  Rocket,
  ArrowRight,
  Server,
  Smartphone,
  Globe2,
  Lock,
  ArrowUpRight,
  Check,
  Crown,
  CreditCard,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TemplateItem {
  id: string;
  name: string;
  category: "hospitality" | "real-estate" | "services" | "health" | "ecommerce" | "fullstack";
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  previewUrl: string;
  stack: string[];
  features: string[];
  codePrice: number;
  codePriceBDT: number;
  turnkeyPrice: number;
  turnkeyPriceBDT: number;
  isFullstack?: boolean;
  badge?: string;
  idealFor: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "resort-booking",
    name: "Villa Atlântico Madeira | Luxury Resort Direct-Booking Engine",
    category: "fullstack",
    categoryLabel: "Full-Stack App",
    tagline: "Turnkey full-stack hospitality software with Next.js Server Actions & MongoDB.",
    description:
      "Enterprise direct booking engine featuring MongoDB Atlas reservation models, 2-way iCal sync (Airbnb & Booking.com), automated security deposit hold, Stripe Checkout, and host admin command portal.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/fullstack/resort-booking",
    stack: ["Next.js", "MongoDB Atlas", "Server Actions", "Stripe Connect", "iCal Sync"],
    features: [
      "Real-time 2-way iCal calendar sync (Zero double-bookings)",
      "MongoDB Atlas booking models & reservation database",
      "Stripe payment gateway + security deposit pre-auth hold",
      "Instant guest WhatsApp voucher & host admin command portal",
    ],
    codePrice: 69,
    codePriceBDT: 7900,
    turnkeyPrice: 199,
    turnkeyPriceBDT: 19999,
    isFullstack: true,
    badge: "Fullstack Engine",
    idealFor: "Boutique resorts, luxury villa owners & holiday stay operators worldwide",
  },
  {
    id: "property-brokerage",
    name: "Madeira Prime Estates | Real Estate Brokerage & CRM Portal",
    category: "fullstack",
    categoryLabel: "Full-Stack App",
    tagline: "Full-stack real estate leasing & nomad relocation brokerage engine with Agent CRM.",
    description:
      "The proven architecture powering multi-million dollar brokerages. Instant viewing booking drawer, live calendar date picker, automated PDF lease pass printing, multi-currency switcher, and Agent Sagar CRM Kanban pipeline.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/fullstack/property-brokerage",
    stack: ["Next.js", "MongoDB Atlas", "CRM Pipeline", "WhatsApp API", "Lucide"],
    features: [
      "Instant viewing booking drawer with live calendar picker",
      "Automated digital PDF lease pass generator with QR token",
      "Agent Sagar CRM Kanban pipeline & territory lead dispatch",
      "Multi-currency switcher (USD, EUR, BDT) & landlord portal",
    ],
    codePrice: 69,
    codePriceBDT: 7900,
    turnkeyPrice: 199,
    turnkeyPriceBDT: 19999,
    isFullstack: true,
    badge: "Fullstack CRM",
    idealFor: "Independent brokerages, commercial agencies & luxury property agents worldwide",
  },
  {
    id: "arbitrage-os",
    name: "Rental Arbitrage & Multi-Unit Tracker OS",
    category: "fullstack",
    categoryLabel: "Full-Stack SaaS",
    tagline: "Streamline multi-unit sublease management, rent margins, and landlord pitch decks.",
    description:
      "All-in-one portal designed for Airbnb arbitrage operators. Includes landlord pitch proposal generator, unit P&L tracker, automated cleaner scheduling, and lease expiration alerts.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/fullstack/arbitrage-os",
    stack: ["Next.js", "Tailwind CSS", "Tremor Charts", "Server Actions", "PostgreSQL"],
    features: [
      "Landlord presentation pitch deck generator",
      "Unit revenue, occupancy rate, and net ROI dashboard",
      "Automated cleaning crew turnover calendar",
      "Monthly owner statement export (PDF/Excel)",
    ],
    codePrice: 69,
    codePriceBDT: 7900,
    turnkeyPrice: 199,
    turnkeyPriceBDT: 19999,
    isFullstack: true,
    badge: "Fullstack SaaS",
    idealFor: "Short-term rental operators scaling 5 to 50 lease arbitrage units",
  },
  {
    id: "villa-atlantico",
    name: "Villa Atlântico Madeira | Cliffside Resort & VIP Booking Atelier",
    category: "hospitality",
    categoryLabel: "Hospitality & Stays",
    tagline: "Sub-second direct VIP booking engine with live OTA commission-savings comparison.",
    description:
      "Ultra-luxury Ponta do Sol cliffside boutique resort and oceanfront villa atelier featuring sub-second direct VIP booking engine, live OTA commission-savings comparison (-18% vs Booking.com), interactive room customizer, and instant WhatsApp concierge.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/hospitality/villa-atlantico",
    stack: ["Next.js", "Tailwind CSS", "Stripe Checkout", "WhatsApp Concierge"],
    features: [
      "Sub-second direct booking engine with 0% OTA fees",
      "Live OTA commission-savings comparison calculator",
      "Interactive room customizer & wine upsells",
      "1-Tap instant WhatsApp concierge checkout",
    ],
    codePrice: 27,
    codePriceBDT: 3240,
    turnkeyPrice: 99,
    turnkeyPriceBDT: 9999,
    badge: "Hospitality",
    idealFor: "Boutique hotels, luxury beachfront stays, cliffside villas & holiday lets",
  },
  {
    id: "aura-estate",
    name: "Aura Alpine Estate | Ultra-Luxury Glass Villas & Residencies",
    category: "real-estate",
    categoryLabel: "Real Estate & Estates",
    tagline: "Ultra-luxury biophilic estate showcase with 360° virtual tours & confidential VIP concierge.",
    description:
      "Designed for multi-million dollar architectural estates and luxury penthouses. Features bioclimatic building science telemetry, private banking wealth calculators, and confidential helicopter private viewing liaison.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/real-estate/aura-estate",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    features: [
      "High-res interactive property media slider & floorplan tour",
      "Private banking wealth & residency tax calculator",
      "Confidential VIP private viewing booking drawer",
      "Multi-currency switcher (USD, EUR, GBP, AED, CHF)",
    ],
    codePrice: 27,
    codePriceBDT: 3240,
    turnkeyPrice: 99,
    turnkeyPriceBDT: 9999,
    badge: "Real Estate",
    idealFor: "Ultra-high-net-worth real estate brokerages, architectural developers & private islands",
  },
  {
    id: "dental-surgery",
    name: "Apex Dental Surgery & Private Medical Clinic Hub",
    category: "health",
    categoryLabel: "Clinics & Healthcare",
    tagline: "High-converting clinic patient acquisition with 1-click WhatsApp emergency booking.",
    description:
      "Tailored for dentists, private doctors, and aesthetic clinics. Includes interactive treatment cost estimator, procedure FAQs, doctor credential profiles, 1-tap emergency booking, and local SEO schema.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/health/dental-clinic",
    stack: ["Next.js", "Tailwind CSS", "React Hook Form", "Local SEO Schema"],
    features: [
      "1-Click WhatsApp appointment & emergency patient intake",
      "Interactive dental & surgery treatment fee estimator",
      "Surgeon credential showcase & before/after case reviews",
      "Optimized for Google Local 3-Pack & mobile page speed",
    ],
    codePrice: 27,
    codePriceBDT: 3240,
    turnkeyPrice: 99,
    turnkeyPriceBDT: 9999,
    badge: "Healthcare",
    idealFor: "Dental clinics, cosmetic surgeons, physiotherapy centers & private practices",
  },
  {
    id: "solaris-dome",
    name: "Solaris Dome | Prefab Geodesic Sanctuaries & Luxury Atelier",
    category: "ecommerce",
    categoryLabel: "High-Ticket E-Commerce",
    tagline: "Ultra-luxury geodesic glamping pods & architectural product customizer.",
    description:
      "High-ticket luxury e-commerce template featuring a bespoke 5-step architectural pod customizer, live bioclimatic solar telemetry, 6 turnkey off-grid sanctuaries, and 2-step slide-over checkout with escrow.",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/ecommerce/solaris-dome",
    stack: ["Next.js", "Stripe Checkout", "SVG Configurator", "Tailwind v4"],
    features: [
      "Bespoke 5-step custom pod & sanctuary configurator",
      "Live bioclimatic thermal efficiency & optical clarity lab",
      "2-Step slide-over cart with multi-currency escrow checkout",
      "Heavy-freight & helicopter airlift logistics calculator",
    ],
    codePrice: 27,
    codePriceBDT: 3240,
    turnkeyPrice: 99,
    turnkeyPriceBDT: 9999,
    badge: "E-Commerce",
    idealFor: "High-ticket e-commerce, modular architecture brands & luxury outdoor manufacturers",
  },
  {
    id: "miradouro-dining",
    name: "Miradouro do Mar | Fine Dining & Wine Atelier Reservation Engine",
    category: "hospitality",
    categoryLabel: "Hospitality & Dining",
    tagline: "Zero-commission direct table booking engine with live Sommelier Wine Pairing toggle.",
    description:
      "Perched oceanfront fine dining atelier featuring interactive 7-course indigenous degustation, sommelier pairing selectors, 3 distinct dining atmosphere reservations, and instant VIP digital vouchers.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/hospitality/miradouro-do-mar",
    stack: ["Next.js", "Tailwind CSS", "Zod", "Server Actions"],
    features: [
      "Zero-commission direct table reservation engine",
      "Interactive degustation menu with wine pairing toggles",
      "VIP digital reservation voucher generated via SMS/WhatsApp",
      "Private dining & corporate buyout booking funnel",
    ],
    codePrice: 27,
    codePriceBDT: 3240,
    turnkeyPrice: 99,
    turnkeyPriceBDT: 9999,
    badge: "Fine Dining",
    idealFor: "Michelin-guide restaurants, winery estates, luxury beach clubs & private dining ateliers",
  },
  {
    id: "tradie-services",
    name: "TradiePro | High-Converting Home Services & Rapid Lead Hub",
    category: "services",
    categoryLabel: "Local Services & Tradies",
    tagline: "Turn local search traffic into high-margin paid jobs for plumbers, roofers, HVAC & contractors.",
    description:
      "Engineered specifically for Australian tradies, US contractors, and UK tradespeople. Sub-second mobile loading, instant emergency tap-to-call, upfront transparent pricing calculators, and verified review badges.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    previewUrl: "https://templates.mestschool.com/services/tradie-contractor",
    stack: ["Next.js", "Tailwind CSS", "Lucide Icons", "Instant Dispatch"],
    features: [
      "Sticky 1-Tap emergency call & WhatsApp quote trigger",
      "Interactive cost calculator by job scope & property size",
      "Verified Google Review badges & licensing verification",
      "0.8s mobile loading speed ensuring 0% ad bounce rate",
    ],
    codePrice: 19,
    codePriceBDT: 2280,
    turnkeyPrice: 99,
    turnkeyPriceBDT: 9999,
    badge: "Tradie ($19)",
    idealFor: "Plumbers, electricians, roofing contractors, HVAC specialists & home renovation firms",
  },
];

export function TemplatesClient() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderType, setOrderType] = useState<"code" | "turnkey">("turnkey");

  const tabsListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkTabsScroll = useCallback(() => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  }, []);

  useEffect(() => {
    // Initial check after paint
    const timer = setTimeout(checkTabsScroll, 60);
    window.addEventListener("resize", checkTabsScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkTabsScroll);
    };
  }, [checkTabsScroll]);

  const handleScrollTabs = (direction: "left" | "right") => {
    if (tabsListRef.current) {
      const offset = direction === "left" ? -240 : 240;
      tabsListRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setTimeout(checkTabsScroll, 320);
    }
  };

  const filteredTemplates =
    activeTab === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeTab);

  const handleOpenOrder = (template: TemplateItem, type: "code" | "turnkey") => {
    setSelectedTemplate(template);
    setOrderType(type);
    setOrderModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* ================= HERO HEADER ================= */}
      <section className="relative overflow-x-clip w-full max-w-full pt-18 pb-14 sm:pt-22 sm:pb-18 lg:pt-26 lg:pb-22 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-b border-stone-200/90 text-stone-900">
        {/* Background ambient warm gold glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-900 text-[11px] sm:text-xs font-mono font-bold tracking-wide uppercase mb-6 mx-auto">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Sub-Second Next.js Web Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.14] text-stone-900">
            Stop Losing Clients to Slow Websites.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Launch a Sub-Second Next.js Platform in 48 Hours.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Slow websites kill conversions. We build sub-second Next.js platforms with <strong className="text-stone-900 font-bold">99+ PageSpeed</strong>. Buy clean source code from <strong className="text-stone-900 font-bold">$19–$69</strong> or get a 48-hour turnkey launch from <strong className="text-amber-700 font-bold">$99–$199</strong> with our &quot;Pay After Live&quot; guarantee.
          </p>

          {/* Quick Value Metrics (Problem -> Gain) */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[92px]">
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">0.8s Speed</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Google 99+ Score & SEO</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[92px]">
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">Figma → Next.js</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Turnkey live in 48 hours</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[92px]">
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">1-Click PWA</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Native app UX on mobile</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[92px]">
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">Instant Checkout</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Smart cart & WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTER & CATALOG ================= */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Category Header & Tabs */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-stone-200/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              Browse Production-Tested Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
              Standard designs from <span className="font-bold text-stone-800">$27 code / $99 launch</span>. Full-Stack systems with MongoDB & CRM at <span className="font-bold text-amber-700">$69 code / $199 launch</span>.
            </p>
            {/* Mobile & Middle Device Category Indication */}
            <div className="flex items-center gap-1.5 text-[11px] text-amber-800/90 font-medium mt-2 lg:hidden">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{TEMPLATES.length} Blueprint systems across 6 categories · Scroll or use arrows to view all</span>
            </div>
          </div>

          <div className="relative w-full lg:w-auto max-w-full">
            {/* Left Scroll Cue & Arrow Button */}
            <div
              className={`absolute left-0 top-0 bottom-0 z-20 flex items-center pl-1 pr-6 bg-gradient-to-r from-[#fbfbfa] via-[#fbfbfa]/95 to-transparent transition-opacity duration-200 pointer-events-none rounded-l-full ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={() => handleScrollTabs("left")}
                className="pointer-events-auto w-7 h-7 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Scroll categories left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
              <TabsList
                ref={tabsListRef}
                onScroll={checkTabsScroll}
                className="bg-stone-100/90 p-1.5 rounded-full w-full lg:w-auto flex flex-nowrap overflow-x-auto gap-1 border border-stone-200/90 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth !justify-start items-center !h-auto min-h-[48px]"
              >
                <TabsTrigger
                  value="all"
                  className="shrink-0 whitespace-nowrap h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full transition-all cursor-pointer hover:text-stone-900"
                >
                  All Systems ({TEMPLATES.length})
                </TabsTrigger>
                <TabsTrigger
                  value="fullstack"
                  className="shrink-0 whitespace-nowrap h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full transition-all cursor-pointer hover:text-stone-900"
                >
                  Full-Stack Apps
                </TabsTrigger>
                <TabsTrigger
                  value="hospitality"
                  className="shrink-0 whitespace-nowrap h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full transition-all cursor-pointer hover:text-stone-900"
                >
                  Hospitality
                </TabsTrigger>
                <TabsTrigger
                  value="real-estate"
                  className="shrink-0 whitespace-nowrap h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full transition-all cursor-pointer hover:text-stone-900"
                >
                  Real Estate
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="shrink-0 whitespace-nowrap h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full transition-all cursor-pointer hover:text-stone-900"
                >
                  Tradies & Services
                </TabsTrigger>
                <TabsTrigger
                  value="health"
                  className="shrink-0 whitespace-nowrap h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full transition-all cursor-pointer hover:text-stone-900"
                >
                  Clinics & Health
                </TabsTrigger>
                <TabsTrigger
                  value="ecommerce"
                  className="shrink-0 whitespace-nowrap h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full transition-all cursor-pointer hover:text-stone-900"
                >
                  E-Commerce
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Right Scroll Cue & Arrow Button */}
            <div
              className={`absolute right-0 top-0 bottom-0 z-20 flex items-center pr-1 pl-6 bg-gradient-to-l from-[#fbfbfa] via-[#fbfbfa]/95 to-transparent transition-opacity duration-200 pointer-events-none rounded-r-full ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={() => handleScrollTabs("right")}
                className="pointer-events-auto w-7 h-7 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Scroll categories right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-5.5 lg:gap-7">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`border shadow-xs hover:border-amber-400 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col justify-between group bg-white ${
                template.isFullstack ? "border-amber-400/80 ring-1 ring-amber-400/30" : "border-stone-200/90"
              }`}
            >
              <div>
                {/* Visual Thumbnail Banner */}
                <div className="relative w-full h-48 bg-stone-100 overflow-hidden border-b border-stone-100">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono uppercase backdrop-blur-xs font-bold ${
                        template.isFullstack
                          ? "bg-amber-500 text-stone-950 border-amber-400 font-extrabold"
                          : "bg-white/95 text-stone-800 border-white/80"
                      }`}
                    >
                      {template.categoryLabel}
                    </Badge>
                    {template.badge && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
                        template.isFullstack
                          ? "bg-gradient-to-r from-amber-600 to-amber-700"
                          : "bg-stone-900/90 border border-stone-700"
                      }`}>
                        {template.badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Preview Pill */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <a
                      href={template.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-stone-900/90 text-stone-200 backdrop-blur-md border border-stone-700/60 hover:bg-stone-800 hover:text-white transition-colors"
                    >
                      Live Demo <ExternalLink className="w-3 h-3 text-amber-400" />
                    </a>
                  </div>
                </div>

                <CardHeader className="pb-3 pt-5 px-5">
                  <CardTitle className="text-lg font-bold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-stone-600 font-medium mt-1 line-clamp-2 leading-relaxed">
                    {template.tagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-2 pb-5 px-5 space-y-4">
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                    {template.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 pt-1 border-t border-stone-100">
                    <p className="text-[10.5px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                      Key Highlights
                    </p>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {template.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For Target */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-950 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      <strong className="font-semibold text-amber-900">Best For: </strong>
                      {template.idealFor}
                    </span>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    {template.stack.slice(0, 3).map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10.5px] font-mono bg-stone-100 text-stone-600 border border-stone-200/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Pricing & CTA Card Footer */}
              <CardFooter className="pt-3.5 pb-4 px-3.5 sm:px-4.5 border-t border-stone-100 bg-stone-50/80 flex flex-col items-stretch gap-2.5">
                {/* Balanced Dual Pricing Box */}
                <div className="grid grid-cols-2 items-center bg-white p-2.5 rounded-xl border border-stone-200/70 shadow-xs">
                  <div className="flex flex-col pr-1.5 sm:pr-2 border-r border-stone-200/70">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-black text-stone-900">${template.codePrice}</span>
                      <span className="text-[9.5px] text-stone-400 font-semibold uppercase tracking-wider">Source</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-mono font-medium">Tk {template.codePriceBDT.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col pl-2 sm:pl-2.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-black text-emerald-600">${template.turnkeyPrice}</span>
                      <span className="text-[9.5px] text-emerald-700/80 font-bold uppercase tracking-wider">48h Live</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono font-medium">Tk {template.turnkeyPriceBDT.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] sm:text-xs font-semibold h-9 rounded-xl border-blue-600/30 bg-blue-50/50 text-blue-800 hover:bg-blue-600 hover:text-white transition-all px-1.5 sm:px-2.5 whitespace-nowrap overflow-hidden justify-center"
                    onClick={() => handleOpenOrder(template, "code")}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span className="hidden 2xl:inline">Buy </span>Code (${template.codePrice})
                  </Button>

                  <Button
                    size="sm"
                    className="text-[11px] sm:text-xs font-bold h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all px-1.5 sm:px-2.5 whitespace-nowrap overflow-hidden justify-center"
                    onClick={() => handleOpenOrder(template, "turnkey")}
                  >
                    <Rocket className="w-3.5 h-3.5 mr-1 shrink-0" />
                    Launch <span className="hidden 2xl:inline">for Me </span>(${template.turnkeyPrice})
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* ================= 105+ SHOWCASE EXPLORER BANNER ================= */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-950 via-[#181206] to-stone-950 border border-stone-800 text-white shadow-xl relative overflow-hidden">
          {/* Ambient Amber Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 py-0.5 px-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>The Master MEST Showcase Portfolio (105+ Demos)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Looking for a Specific Niche or Industry?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Beyond hospitality and real estate, we maintain an active master portfolio of <strong>105+ live production websites</strong> across 10 distinct industries. Want full lifetime access to all codebases? Get the <strong>All 105+ Master Pass for only $149 / Tk 16,000</strong>!
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Card (Stripe)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" /> bKash / Nagad
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="https://templates.mestschool.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl h-12 px-6 shadow-lg shadow-amber-500/20">
                  <Crown className="w-4 h-4 mr-1.5 text-amber-200" />
                  All 105+ Pass ($149 / Tk 16,000)
                </Button>
              </a>

              <a
                href="https://wa.me/8801540505122?text=Hi%20PropGrowth%20Lab%2C%20I%20want%20to%20order%20the%20All%20105%2B%20Pass%20(%24149%20%2F%20Tk%2016%2C000)%20or%20request%20a%20turnkey%20launch."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto font-bold rounded-xl h-12 px-6 border-stone-700 bg-stone-900/90 text-stone-100 hover:bg-stone-800 hover:!text-white hover:border-emerald-500/80 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Instant Order</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TURNKEY 48-HOUR SLA PROCESS ================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-stone-950 via-[#14120f] to-stone-950 text-white relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-4">
              Zero-Friction Deployment
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              How Our 48-Hour Turnkey Launch Works
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
              Standard templates launched for <strong>$99 (Tk 9,999)</strong>. Full-Stack systems with MongoDB database & CRM launched for <strong>$199 (Tk 19,999)</strong>. You don&apos;t have to touch a single line of code.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3.5 hover:border-amber-500/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                    01
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-[10.5px] font-semibold">
                    Stage 1 · Assets & Scope
                  </div>
                </div>
                <h3 className="text-base font-bold text-white">Choose & Brief</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Pick your preferred template from our catalog, share your branding assets (logo, colors, copy), and provide your target domain.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                <span className="font-mono text-stone-500">Timeline:</span>
                <span className="font-semibold text-amber-400">Hour 0 – 6</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3.5 hover:border-amber-500/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                    02
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-[10.5px] font-semibold">
                    Stage 2 · Stripe & iCal
                  </div>
                </div>
                <h3 className="text-base font-bold text-white">Integration Setup</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  We integrate your Stripe payment account, configure WhatsApp inquiry routing, connect iCal calendars, and configure local SEO.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                <span className="font-mono text-stone-500">Timeline:</span>
                <span className="font-semibold text-amber-400">Hour 6 – 24</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3.5 hover:border-amber-500/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                    03
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-[10.5px] font-semibold">
                    Stage 3 · Edge & SSL
                  </div>
                </div>
                <h3 className="text-base font-bold text-white">Edge Deployment</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Production deployment on high-speed global edge networks with automatic SSL certificates, asset optimization, and sub-second caching.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                <span className="font-mono text-stone-500">Timeline:</span>
                <span className="font-semibold text-amber-400">Hour 24 – 36</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3.5 hover:border-amber-500/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                    04
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-[10.5px] font-semibold">
                    Stage 4 · 48h Handover
                  </div>
                </div>
                <h3 className="text-base font-bold text-white">Live Handover</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Full repository and administrative credentials delivered to your inbox with video documentation. You are live within 48 hours!
                </p>
              </div>
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                <span className="font-mono text-stone-500">Guarantee:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live in 48 Hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORDER MODAL ================= */}
      <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-3xl border border-stone-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-stone-900">
              {orderType === "code" ? "Download Clean Source Code" : "Order 48-Hour Turnkey Launch"}
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-500">
              {selectedTemplate?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">
                  {orderType === "code" ? "Direct GitHub Repository Access" : "Turnkey 48-Hour Production SLA"}
                </p>
                <p className="text-[11px] text-stone-500">
                  {orderType === "code"
                    ? "Full TypeScript codebase + documentation"
                    : "Deployed live on your domain within 48h"}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-amber-600">
                  ${orderType === "code" ? selectedTemplate?.codePrice : selectedTemplate?.turnkeyPrice}
                </span>
                <p className="text-[11px] text-stone-500 font-mono">
                  Tk {orderType === "code" ? selectedTemplate?.codePriceBDT.toLocaleString() : selectedTemplate?.turnkeyPriceBDT.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-600">
              <p className="font-semibold text-stone-800">Included in this tier:</p>
              <ul className="space-y-1.5 pl-1">
                {orderType === "code" ? (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Commercial multi-client license</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Next.js & Tailwind CSS production codebase</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>README deployment guide & documentation</span>
                    </li>
                    {selectedTemplate?.isFullstack && (
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-semibold text-stone-800">MongoDB Atlas schemas & Server Actions included</span>
                      </li>
                    )}
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Full source code ownership included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Custom domain & SSL configuration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Stripe & WhatsApp routing integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>48-Hour delivery guarantee SLA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>&quot;Pay After Live&quot; risk-free guarantee</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-100/70 border border-stone-200/80 text-[11px] text-stone-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-stone-500" /> Stripe · Apple Pay · Cards
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-pink-600" /> bKash / Nagad
              </span>
              <span>•</span>
              <span className="text-stone-500">Instant Receipt</span>
            </div>

            <div className="pt-1">
              <a
                href={`https://wa.me/8801540505122?text=${encodeURIComponent(
                  `Hi PropGrowth Lab team, I want to ${
                    orderType === "code"
                      ? `buy source code ($${selectedTemplate?.codePrice} / Tk ${selectedTemplate?.codePriceBDT.toLocaleString()})`
                      : `order 48h launch for me ($${selectedTemplate?.turnkeyPrice} / Tk ${selectedTemplate?.turnkeyPriceBDT.toLocaleString()})`
                  } for: ${selectedTemplate?.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl h-11 shadow-md shadow-amber-500/20">
                  Proceed to Order via WhatsApp
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
              <p className="text-[10px] text-center text-stone-400 mt-2">
                Secure payment via Stripe Card invoice or bKash/Nagad. Instant handover.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TemplatesClient;
