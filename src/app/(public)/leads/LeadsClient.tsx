"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  MapPin,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Filter,
  Users,
} from "lucide-react";

interface LeadPlan {
  id: string;
  name: string;
  quotaDaily: number;
  monthlyQuota: number;
  priceMonthly: number;
  costPerLead: string;
  badge?: string;
  popular?: boolean;
  features: string[];
}

const PLANS: LeadPlan[] = [
  {
    id: "silver",
    name: "Silver Broker Quota",
    quotaDaily: 2,
    monthlyQuota: 60,
    priceMonthly: 299,
    costPerLead: "$4.98 / lead",
    features: [
      "2 Pre-qualified tenant/buyer leads dispatched daily",
      "Instant WhatsApp alert within 90 seconds of submission",
      "Verified WhatsApp phone & email contact",
      "Exact budget range & move-in timeframe pre-screened",
      "Single territory selection (e.g. USA, UK, Canada, Australia, EU, UAE)",
      "Daily rollover quota protection",
    ],
  },
  {
    id: "gold",
    name: "Gold Power Broker",
    quotaDaily: 5,
    monthlyQuota: 150,
    priceMonthly: 599,
    costPerLead: "$3.99 / lead",
    badge: "Most Popular",
    popular: true,
    features: [
      "5 Pre-qualified tenant/buyer leads dispatched daily",
      "VIP instant WhatsApp ping with full client profile",
      "Budget pre-qualification (>$2,500/mo or >$500k sales)",
      "Move-in timeframe under 30 days priority routing",
      "Multi-zone coverage within chosen metropolitan hub",
      "Priority agent support & replacement guarantee for invalid numbers",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Territory Lock",
    quotaDaily: 10,
    monthlyQuota: 300,
    priceMonthly: 999,
    costPerLead: "$3.33 / lead",
    badge: "Exclusive",
    features: [
      "10 Pre-qualified high-ticket leads dispatched daily",
      "Exclusivity Lock: Max 2 brokers per sub-district",
      "Ultra-luxury tier filtering (>$5,000/mo or >$1.2M sales)",
      "Dedicated account manager & CRM webhook integration",
      "Free custom broker landing page + lead capture domain",
      "100% replacement guarantee on any unreachable lead",
    ],
  },
];

const TERRITORIES = [
  { id: "usa", name: "USA (Miami / NY / LA)", slotsRemaining: 3, totalBrokers: 8, avgDealSize: "$4,200 / mo" },
  { id: "uk", name: "UK (London & Prime Counties)", slotsRemaining: 2, totalBrokers: 6, avgDealSize: "£3,100 / mo" },
  { id: "canada", name: "Canada (Toronto & Vancouver)", slotsRemaining: 2, totalBrokers: 5, avgDealSize: "C$3,200 / mo" },
  { id: "australia", name: "Australia (Sydney & Melbourne)", slotsRemaining: 2, totalBrokers: 6, avgDealSize: "A$3,400 / mo" },
  { id: "europe", name: "EU (Portugal / Spain / France)", slotsRemaining: 3, totalBrokers: 7, avgDealSize: "€2,600 / mo" },
  { id: "uae", name: "UAE & GCC (Dubai / Doha)", slotsRemaining: 2, totalBrokers: 9, avgDealSize: "$4,800 / mo" },
];

export function LeadsClient() {
  const [selectedTerritory, setSelectedTerritory] = useState(TERRITORIES[0]);

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* ================= HERO HEADER ================= */}
      <section className="relative overflow-x-clip w-full max-w-full pt-18 pb-14 sm:pt-22 sm:pb-18 lg:pt-26 lg:pb-22 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-b border-stone-200/90 text-stone-900">
        {/* Background ambient warm gold glow (exact property-brokerage style) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase mb-6 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Tired of Cold Calling Dead Numbers?</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.14] text-stone-900">
            Never Chase Cold Leads Again.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Get High-Budget Inquiries Dispatched Daily to Your WhatsApp.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop wasting 20+ hours a week scrolling social groups or buying recycled spreadsheets that dozens of brokers already burned through. We pre-screen each inquiry for verified WhatsApp numbers, move-in dates under 30 days, and budgets starting at <strong className="text-stone-900 font-bold">$2,500/mo to $1M+ sales</strong>—delivered fresh to your phone so you focus on closing commissions.
          </p>

          {/* Quick Problem-to-Gain Cards */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center">
              <p className="text-xl sm:text-2xl font-black text-amber-600">Zero Cold Calling</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">Inbound ready-to-sign clients</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center">
              <p className="text-xl sm:text-2xl font-black text-amber-600">Pre-Vetted Budgets</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">Verified $2,500/mo+ & buyers</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center">
              <p className="text-xl sm:text-2xl font-black text-amber-600">Territory Lock</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">Never compete with other agents</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center">
              <p className="text-xl sm:text-2xl font-black text-amber-600">&lt;90s WhatsApp</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">Instant alerts while hot</p>
            </div>
          </div>

          {/* Territory Slots Counter Bar */}
          <div className="mt-8 max-w-2xl mx-auto p-3.5 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
              <span className="font-bold text-stone-900">Live Territory Availability:</span>
            </div>
            <div className="flex items-center gap-2.5">
              {TERRITORIES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTerritory(t)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedTerritory.id === t.id
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60"
                  }`}
                >
                  {t.name} ({t.slotsRemaining} slots left)
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW LEADS ARE VETTED ================= */}
      <section className="py-14 sm:py-20 bg-stone-50/70 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Verification Protocol */}
            <div className="space-y-6">
              <Badge className="bg-amber-500/10 text-amber-800 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider rounded-[4px]">
                Strict Quality Gate
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
                Every Single Lead Passes Through a 4-Point Verification Engine
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We generate inbound traffic across proprietary city rental portals and high-intent Google search ads. Inquiries must complete an interactive multi-step screening sequence before reaching your phone.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">WhatsApp & Phone Number Validation</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Country-code detection and SMS carrier check prevent burner and fake contact submissions.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Verified Budget Tier</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Leads must explicitly declare their confirmed monthly budget (minimum $1,800/mo or equivalent).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Move-in Timeframe Confirmation</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Only inquiries ready to sign a contract within 14 to 45 days are dispatched to subscribers.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Zero Agency Client Lead Resale</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Leads generated for our marketing agency clients remain 100% private. Subscription leads come exclusively from our platform&apos;s open city portals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live WhatsApp Lead Preview Card */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-sm rounded-3xl bg-stone-950 p-4 border-4 border-stone-850 shadow-2xl">
                {/* Simulated Phone Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-white text-xs px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="font-bold">PropGrowth Dispatch Bot</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">10:42 AM</span>
                </div>

                {/* WhatsApp Message Bubble */}
                <div className="mt-4 p-4 rounded-2xl bg-stone-900 border border-amber-500/30 text-white space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                    <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] font-mono">
                      🔥 NEW QUALIFIED INQUIRY
                    </span>
                    <span className="text-[10px] text-amber-300">Just Now</span>
                  </div>

                  <div className="space-y-1 font-mono text-[11px]">
                    <p className="text-stone-300">
                      <strong>Client:</strong> Marcus Weber (German Expat)
                    </p>
                    <p className="text-stone-300">
                      <strong>Location:</strong> {selectedTerritory.name}
                    </p>
                    <p className="text-stone-300">
                      <strong>Property Type:</strong> 3-Bedroom Ocean Villa
                    </p>
                    <p className="text-amber-400 font-bold">
                      <strong>Target Budget:</strong> {selectedTerritory.avgDealSize}
                    </p>
                    <p className="text-stone-300">
                      <strong>Move-in Date:</strong> Within 30 days
                    </p>
                    <p className="text-stone-300">
                      <strong>WhatsApp:</strong> +49 176 ••••••••
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-500/20 flex gap-2">
                    <div className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-center font-bold text-white text-[11px] shadow-xs">
                      Open WhatsApp Chat
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-center text-stone-400 mt-3 font-mono">
                  Delivered automatically to your registered phone number every morning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING SUBSCRIPTION TIERS ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="bg-amber-500/10 text-amber-800 border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-[4px]">
            Predictable Deal Flow
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Choose Your Monthly Lead Quota
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
            Cancel anytime. Unused quota rolls over for 30 days. Replace any unreachable lead with a single tap in your subscriber dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`rounded-3xl flex flex-col justify-between transition-all duration-300 overflow-hidden ${
                plan.popular
                  ? "border-2 border-amber-500 shadow-xl shadow-amber-500/10 relative bg-amber-50/20"
                  : "border border-stone-200/90 shadow-xs hover:border-amber-400 bg-white"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <CardHeader className="pt-8 pb-4 border-b border-stone-100">
                  <CardTitle className="text-xl font-bold text-stone-900">{plan.name}</CardTitle>
                  <CardDescription className="text-xs text-stone-500">
                    {plan.quotaDaily} verified inquiries dispatched every morning
                  </CardDescription>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-stone-900">
                      ${plan.priceMonthly}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">/ month</span>
                  </div>
                  <p className="text-[11px] font-mono text-amber-700 font-bold mt-1">
                    {plan.costPerLead} ({plan.monthlyQuota} leads/mo)
                  </p>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                    Plan Features & SLA
                  </p>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              <CardFooter className="pt-6 pb-6 border-t border-stone-100 bg-stone-50/70">
                <a
                  href={`https://wa.me/8801540505122?text=${encodeURIComponent(
                    `Hi PropGrowth Lab, I want to subscribe to the ${plan.name} ($${plan.priceMonthly}/mo) for territory: ${selectedTerritory.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    className={`w-full font-bold rounded-xl h-11 text-xs sm:text-sm cursor-pointer ${
                      plan.popular
                        ? "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20"
                        : "bg-stone-900 hover:bg-stone-800 text-white"
                    }`}
                  >
                    Subscribe for {selectedTerritory.name}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= PRE-FOOTER CTA SECTION ================= */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-stone-950 via-[#14120f] to-stone-950 text-white relative overflow-hidden border-t border-stone-800">
        {/* Ambient gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl flex flex-col items-center space-y-6 relative overflow-hidden backdrop-blur-xs">
            {/* Ambient Radiant Gold Lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-48 bg-amber-500/15 blur-3xl pointer-events-none" />

            <div className="space-y-3 max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase">
                Exclusive Territory Quota
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Lock in Your Daily High-Budget Tenant Leads?
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Connect directly with our territory dispatch team via WhatsApp. Start receiving verified Nomad & Expat rental inquiries delivered straight to your phone.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto relative z-10">
              <a
                href={`https://wa.me/8801540505122?text=${encodeURIComponent(
                  `Hi PropGrowth Lab, I want to lock in territory lead quota for: ${selectedTerritory.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto h-12 px-8 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white shadow-lg shadow-amber-500/25 transition-transform active:scale-95 cursor-pointer">
                  <span>Subscribe on WhatsApp for {selectedTerritory.name}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/partners" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-8 rounded-full text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-stone-700 backdrop-blur-xs transition-colors cursor-pointer">
                  Explore Co-Broker Partnership
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LeadsClient;
