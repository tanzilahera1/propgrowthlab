"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
} from "lucide-react";

interface TemplateItem {
  id: string;
  name: string;
  category: "booking" | "brokerage" | "arbitrage" | "coliving";
  categoryLabel: string;
  tagline: string;
  description: string;
  previewUrl: string;
  stack: string[];
  features: string[];
  codePrice: number;
  turnkeyPrice: number;
  badge?: string;
  idealFor: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "villa-rental-engine",
    name: "Luxury Villa Direct-Booking Engine",
    category: "booking",
    categoryLabel: "Hospitality & Stays",
    tagline: "Cut 25% OTA fees with zero-commission direct guest checkouts.",
    description:
      "Enterprise Next.js 16 booking engine with 2-way iCal sync (Airbnb & Booking.com), automated security deposit hold, Stripe Checkout, and instant guest WhatsApp confirmation.",
    previewUrl: "https://showcase.propgrowthlab.com/villa-rental-engine",
    stack: ["Next.js 16", "Tailwind v4", "Stripe Connect", "iCal Sync", "React 19"],
    features: [
      "Real-time 2-way iCal calendar sync",
      "Stripe payment gateway + security deposit pre-auth",
      "Dynamic pricing by season and weekend rules",
      "Mobile-first guest checkout with SMS/WhatsApp alerts",
    ],
    codePrice: 27,
    turnkeyPrice: 199,
    badge: "Most Popular",
    idealFor: "Boutique resorts, luxury villa owners & holiday stay operators worldwide (USA, Europe, Caribbean & GCC)",
  },
  {
    id: "property-brokerage",
    name: "Real Estate Brokerage Multi-Listing Portal",
    category: "brokerage",
    categoryLabel: "Brokerage & Sales",
    tagline: "High-converting listing directory and instant broker WhatsApp lead router.",
    description:
      "The proven architecture powering client platforms like Easy Rental Hub. Multi-city neighborhood filters, VIP brochure downloads, mortgage calculators, and direct agent dispatch.",
    previewUrl: "https://showcase.propgrowthlab.com/property-brokerage",
    stack: ["Next.js 16", "MongoDB Atlas", "Zod", "WhatsApp API", "Lucide"],
    features: [
      "Advanced multi-attribute search (Beds, Price, Area, Status)",
      "Instant WhatsApp routing to assigned territory agents",
      "Interactive Google Maps and neighborhood landmarks",
      "Automated lead capture with Telegram & Discord webhooks",
    ],
    codePrice: 27,
    turnkeyPrice: 199,
    badge: "Client Proven",
    idealFor: "Independent brokerages, commercial agencies & luxury property agents",
  },
  {
    id: "arbitrage-os",
    name: "Rental Arbitrage & Multi-Unit Tracker OS",
    category: "arbitrage",
    categoryLabel: "arbitrage",
    tagline: "Streamline multi-unit sublease management, rent margins, and landlord pitch decks.",
    description:
      "All-in-one portal designed for Airbnb arbitrage operators. Includes landlord pitch proposal generator, unit P&L tracker, automated cleaner scheduling, and lease expiration alerts.",
    previewUrl: "https://showcase.propgrowthlab.com/arbitrage-os",
    stack: ["Next.js 16", "Tailwind v4", "Tremor Charts", "Server Actions"],
    features: [
      "Landlord presentation pitch deck generator",
      "Unit revenue, occupancy rate, and net ROI dashboard",
      "Automated cleaning crew turnover calendar",
      "Monthly owner statement export (PDF/Excel)",
    ],
    codePrice: 27,
    turnkeyPrice: 249,
    idealFor: "Short-term rental operators scaling 5 to 50 lease arbitrage units",
  },
  {
    id: "coliving-portal",
    name: "Nomad Coliving & Flexible Living Hub",
    category: "coliving",
    categoryLabel: "Coliving & Stays",
    tagline: "Medium-term 30-day+ bookings tailored for remote nomads and wintering professionals.",
    description:
      "Designed specifically for top lifestyle destinations across the USA, Europe, Canada, Australia, and GCC. Monthly flexible leases, roommate vetting questionnaires, and community event reservations.",
    previewUrl: "https://showcase.propgrowthlab.com/coliving-portal",
    stack: ["Next.js 16", "Tailwind v4", "Stripe Billing", "React Hook Form"],
    features: [
      "Monthly recurring membership & subscription billing",
      "Digital nomad identity & employment pre-vetting",
      "Shared space desk & private bedroom selection",
      "Community activities & coworking desk add-ons",
    ],
    codePrice: 27,
    turnkeyPrice: 249,
    badge: "High Growth",
    idealFor: "Coliving communities, serviced apartments & remote work villa clusters",
  },
];

export function TemplatesClient() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderType, setOrderType] = useState<"code" | "turnkey">("turnkey");

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
        {/* Background ambient warm gold glow (exact property-brokerage style) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase mb-6 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <Code2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Skip 6 Months of Dev Headaches</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.14] text-stone-900">
            Stop Wasting $15,000+ on Slow Custom Dev.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Launch Your Direct Booking Portal in 48 Hours.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Generic WordPress plugins crash, and traditional software agencies charge upwards of $15,000 for slow, buggy websites. Skip the dev nightmare: download production-tested Next.js 16 source code for <strong className="text-stone-900 font-bold">$27</strong>, or let our engineers deploy a turnkey setup live on your domain in <strong className="text-amber-700 font-bold">48 hours for $199</strong>.
          </p>

          {/* Quick Value Metrics (Problem -> Gain) */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center">
              <p className="text-xl sm:text-2xl font-black text-amber-600">$12,000+ Saved</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">Vs hiring custom dev agencies</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center">
              <p className="text-xl sm:text-2xl font-black text-amber-600">48-Hour SLA</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">Live on your domain this week</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center">
              <p className="text-xl sm:text-2xl font-black text-amber-600">0% Commission</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">Stripe checkout keeps 100%</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center">
              <p className="text-xl sm:text-2xl font-black text-amber-600">0.8s Speed</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">Zero guest bounces from lag</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTER & CATALOG ================= */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-stone-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">Available PropTech Blueprints</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Select a system to inspect technical specs, live preview, or initiate turnkey deployment.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="bg-stone-100 p-1 rounded-xl w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-row gap-1 border border-stone-200">
              <TabsTrigger value="all" className="text-xs font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                All Systems ({TEMPLATES.length})
              </TabsTrigger>
              <TabsTrigger value="booking" className="text-xs font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                Villa Stays
              </TabsTrigger>
              <TabsTrigger value="brokerage" className="text-xs font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                Brokerage
              </TabsTrigger>
              <TabsTrigger value="arbitrage" className="text-xs font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white">
                Arbitrage OS
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Templates Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden flex flex-col justify-between group bg-white"
            >
              <div>
                <CardHeader className="pb-4 border-b border-stone-100 bg-stone-50/70">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-[11px] font-mono uppercase bg-white text-stone-700 border-stone-200">
                      {template.categoryLabel}
                    </Badge>
                    {template.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-2xs">
                        {template.badge}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                    {template.tagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                      Architecture & Capabilities
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      {template.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-amber-900">Target Environment: </strong>
                      {template.idealFor}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {template.stack.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-stone-100 text-stone-700 border border-stone-200/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Pricing & CTA Card Footer */}
              <CardFooter className="pt-6 pb-6 px-6 border-t border-stone-100 bg-stone-50/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-stone-900">${template.codePrice}</span>
                    <span className="text-xs text-stone-500 font-medium">Source Code</span>
                    <span className="text-stone-300">|</span>
                    <span className="text-lg font-bold text-amber-600">${template.turnkeyPrice}</span>
                    <span className="text-xs text-amber-700 font-medium">Turnkey 48h</span>
                  </div>
                  <p className="text-[11px] text-stone-400">Lifetime access · Free git updates</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none text-xs font-semibold h-9 rounded-xl border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-amber-400"
                    onClick={() => handleOpenOrder(template, "code")}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1 text-stone-500" />
                    Buy Code (${template.codePrice})
                  </Button>

                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none text-xs font-bold h-9 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-xs"
                    onClick={() => handleOpenOrder(template, "turnkey")}
                  >
                    <Rocket className="w-3.5 h-3.5 mr-1" />
                    Order Turnkey (${template.turnkeyPrice})
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
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
              How the 48-Hour Turnkey Launch Works
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
              You don&apos;t have to touch a single line of code or deal with DNS records. We take care of everything from cloud hosting to payment gateway activation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                01
              </div>
              <h3 className="text-base font-bold text-white">Order & Brief</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Select your template, submit your branding assets (logo, colors), and specify your custom domain name.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                02
              </div>
              <h3 className="text-base font-bold text-white">Integration Setup</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                We connect your Stripe Connect account, configure Airbnb/Booking.com iCal calendars, and set up WhatsApp notification bots.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                03
              </div>
              <h3 className="text-base font-bold text-white">Cloud Deployment</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Production deployment on enterprise edge servers with free SSL certificates and sub-second global caching.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                04
              </div>
              <h3 className="text-base font-bold text-white">Handover & Live</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Full administrative access delivered to your inbox with video walkthrough documentation. You are live in under 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORDER MODAL ================= */}
      <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-3xl border border-stone-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-stone-900">
              {orderType === "code" ? "Download Source Code" : "Order 48-Hour Turnkey Deployment"}
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-500">
              {selectedTemplate?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">
                  {orderType === "code" ? "Direct GitHub Repository Access" : "Turnkey Production SLA"}
                </p>
                <p className="text-[11px] text-stone-500">
                  {orderType === "code"
                    ? "Full TypeScript code + documentation"
                    : "Deployed on your domain within 48h"}
                </p>
              </div>
              <span className="text-xl font-black text-amber-600">
                ${orderType === "code" ? selectedTemplate?.codePrice : selectedTemplate?.turnkeyPrice}
              </span>
            </div>

            <div className="space-y-2 text-xs text-stone-600">
              <p className="font-semibold text-stone-800">Included in this tier:</p>
              <ul className="space-y-1.5 pl-1">
                {orderType === "code" ? (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Commercial multi-client license</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Next.js 16 + Tailwind CSS v4 codebase</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>README deployment guide</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Full source code ownership included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Custom domain & SSL configuration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Stripe & WhatsApp routing setup</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>48-Hour delivery guarantee SLA</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/8801540505122?text=${encodeURIComponent(
                  `Hi PropGrowth Lab team, I want to ${
                    orderType === "code" ? "buy source code ($" + selectedTemplate?.codePrice + ")" : "order 48h turnkey launch ($" + selectedTemplate?.turnkeyPrice + ")"
                  } for: ${selectedTemplate?.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl h-11 shadow-md shadow-amber-500/20">
                  Proceed to Instant Checkout via WhatsApp
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
              <p className="text-[10px] text-center text-stone-400 mt-2">
                Secure payment via Stripe Invoice or Escrow. Instant receipt provided.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TemplatesClient;
