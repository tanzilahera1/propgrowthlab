"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TerritoryData, TERRITORIES_DATA } from "@/data/territories";
import { StandalonePillTabBar } from "@/components/common/StandalonePillTabBar";
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
  Users,
  ChevronLeft,
  DollarSign,
  Briefcase,
  Lock,
} from "lucide-react";

interface Props {
  territory: TerritoryData;
}

export function TerritoryLeadClient({ territory }: Props) {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("gold");

  const territoryTabs = TERRITORIES_DATA.map((t) => ({
    id: t.id,
    label: t.shortName,
  }));

  const plans = [
    {
      id: "silver",
      name: "Starter Broker Quota",
      quotaDaily: "1–2",
      monthlyQuota: "30–50",
      price: territory.starterPrice,
      costPerLead: `${territory.currency}${(territory.starterPrice / 40).toFixed(2)} / lead`,
      features: [
        `30–50 Pre-screened tenant & buyer leads monthly in ${territory.shortName}`,
        "Instant WhatsApp alert within 90 seconds of client inquiry",
        "100% verified mobile numbers and active WhatsApp accounts",
        "Exact budget bracket and move-in timeframe pre-validated",
        "Daily rollover quota protection (30-day carry-forward)",
        "Zero long-term lock-in · Pause or upgrade anytime",
      ],
    },
    {
      id: "gold",
      name: "Gold Power Broker",
      quotaDaily: "2–4",
      monthlyQuota: "60–120",
      price: territory.goldPrice,
      costPerLead: `${territory.currency}${(territory.goldPrice / 90).toFixed(2)} / lead`,
      badge: "Most Popular",
      popular: true,
      features: [
        `60–120 Pre-qualified high-intent leads monthly in ${territory.shortName}`,
        "VIP instant WhatsApp ping with complete client profile",
        `Strict budget qualification (min. ${territory.avgDealSize})`,
        "Priority routing for urgent move-ins (under 30 days)",
        `Multi-district coverage across ${territory.cities.slice(0, 3).join(", ")}`,
        "100% instant credit replacement on unreachable numbers",
      ],
    },
    {
      id: "platinum",
      name: "Platinum Exclusive Lock",
      quotaDaily: "5+",
      monthlyQuota: "150+",
      price: territory.platinumPrice,
      costPerLead: `<${territory.currency}${(territory.platinumPrice / 150).toFixed(2)} / lead`,
      badge: "Exclusive Lock",
      features: [
        `150+ Ultra-luxury tier leads dispatched monthly in ${territory.shortName}`,
        `Territory Lock: Capped at maximum ${territory.slotsRemaining} brokers in your hub`,
        "High-ticket filtering for prime penthouses, villas & luxury sales",
        "Dedicated account manager & CRM direct webhook sync",
        "Complimentary high-converting broker landing page setup",
        "Priority client matchmaking before general pool dispatch",
      ],
    },
  ];

  const getWhatsAppSubscribeUrl = (planName: string, price: number) => {
    const text = `Hi PropGrowth Lab team, I want to lock in the ${planName} (${territory.currency}${price}/mo) for ${territory.name}. Please confirm current slot availability and onboarding steps.`;
    return `https://wa.me/8801540505122?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* Top Breadcrumb & Responsive Rule 10 Pill TabBar - Seamless Canvas, Zero Border Clutter */}
      <section className="w-full pt-18 sm:pt-20 pb-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          {/* Left: Breadcrumb Trail (Zero squishing or wrapping on middle devices) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 shrink-0">
            <Link
              href="/leads"
              className="inline-flex items-center gap-1.5 font-medium hover:text-stone-950 transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-stone-400" />
              <span>Global Leads Console</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="font-semibold text-stone-900 truncate">{territory.shortName} Quota</span>
          </div>

          {/* Right: Universal Standalone Pill TabBar (Fluid on mobile/tablet, snug on desktop) */}
          <div className="w-full lg:w-auto flex justify-start lg:justify-end">
            <StandalonePillTabBar
              categories={territoryTabs}
              activeTab={territory.id}
              onTabChange={(id) => router.push(`/leads/${id}`)}
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full pt-3 sm:pt-4 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto">
          {/* Status Tag Group - Balanced Crisp Spacing & Uniform Height */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[4px] border border-emerald-500/30 bg-emerald-500/10 text-emerald-900 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs whitespace-nowrap shrink-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="sm:hidden">Live Allocation · {territory.slotsRemaining} Open Slots</span>
              <span className="hidden sm:inline">Live Allocation · {territory.slotsRemaining} Slots Remaining in {territory.country}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[4px] border border-amber-500/30 bg-amber-500/10 text-amber-900 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs whitespace-nowrap shrink-0">
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700 shrink-0" />
              <span className="sm:hidden">Max {territory.totalBrokers} Brokers / Market</span>
              <span className="hidden sm:inline">Max {territory.totalBrokers} Licensed Brokers / Market</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight leading-[1.15]">
                {territory.name} Lead Quota
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                {territory.description} Connect with pre-qualified renters and buyers directly through real-time WhatsApp dispatches with verified budgets.
              </p>

              {/* Territory Tags / Covered Cities */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Active Cities:</span>
                {territory.cities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] bg-white border border-stone-200 text-stone-700 text-xs font-medium shadow-xs"
                  >
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-medium text-stone-500">Market Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active Allocation
                </span>
              </div>
              <div className="space-y-3 py-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-stone-500">Average Deal Value</span>
                  <span className="font-bold text-stone-900">{territory.avgDealSize}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-stone-500">Avg Sale Commission</span>
                  <span className="font-bold text-stone-900">{territory.avgSaleCommission}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-stone-500">Monthly Lead Queue</span>
                  <span className="font-bold text-stone-900">{territory.activeLeadsMonthly} leads</span>
                </div>
              </div>
              <div className="pt-3 border-t border-stone-100">
                <a
                  href={getWhatsAppSubscribeUrl("Gold Power Broker", territory.goldPrice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Reserve Territory Slot</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Statistics & Real Lead Snapshot */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-stone-100/50 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto space-y-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
              {territory.shortName} Market Demand & Verification SLAs
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Every dispatched inquiry is pre-screened with double mobile verification and strict budget criteria.
            </p>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-1">
              <span className="text-xs font-mono font-medium text-stone-500 uppercase tracking-wider">Tenant Inquiries</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-950">
                {territory.leadVolumeBreakdown.tenantsPct}
              </div>
              <p className="text-xs text-stone-500">Pre-screened executive rentals & luxury leases</p>
            </div>
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-1">
              <span className="text-xs font-mono font-medium text-stone-500 uppercase tracking-wider">High-Ticket Buyers</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-950">
                {territory.leadVolumeBreakdown.buyersPct}
              </div>
              <p className="text-xs text-stone-500">Qualified capital for off-plan & turnkey property sales</p>
            </div>
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-1">
              <span className="text-xs font-mono font-medium text-stone-500 uppercase tracking-wider">Corporate & Expat</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-950">
                {territory.leadVolumeBreakdown.corporatePct}
              </div>
              <p className="text-xs text-stone-500">Company sponsored relocations & international founders</p>
            </div>
          </div>

          {/* Sample Dispatches Stream */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <h3 className="text-sm font-bold text-stone-950">Sample Verified Dispatches ({territory.shortName})</h3>
              </div>
              <span className="text-xs font-mono text-stone-500">Simulated 90-sec WhatsApp feed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {territory.sampleRecentLeads.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/60 hover:bg-stone-50 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900">{item.role}</span>
                    <span className="text-stone-400 font-mono text-[11px]">{item.verifiedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-stone-500 font-medium">{item.location}</span>
                    <span className="px-2 py-0.5 rounded-[4px] bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px]">
                      {item.budget}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1 border-t border-stone-200/50">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp phone pre-verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Localized Subscription Tiers */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[4px] bg-stone-100 border border-stone-200 text-stone-800 text-xs font-mono font-medium">
              CURRENCY · {territory.currencyCode} ({territory.currency})
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Select Your {territory.shortName} Quota Plan
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Transparent monthly plans with zero setup fees. Cancel or upgrade anytime with 30-day rollover quota.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {plans.map((plan, idx) => {
              const isSelected = selectedPlanId === plan.id;
              const isLastCard = idx === 2;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative flex flex-col justify-between rounded-2xl border transition-all cursor-pointer p-6 sm:p-7 ${
                    isLastCard ? "md:col-span-2 lg:col-span-1" : "md:col-span-1"
                  } ${
                    plan.popular
                      ? "bg-white border-stone-900 shadow-xl ring-2 ring-stone-950"
                      : "bg-white border-stone-200/90 hover:border-stone-400 shadow-xs"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-6">
                      <span className="px-3 py-1 rounded-[4px] bg-stone-950 text-white text-[11px] font-mono font-semibold tracking-wider uppercase shadow-xs">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {isLastCard ? (
                    /* Last Card (Platinum Exclusive Lock): 2-Column Executive Suite on Tablet, Vertical on Mobile & Desktop */
                    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-1 gap-6 items-start h-full">
                      <div className="md:col-span-5 lg:col-span-1 space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-stone-950">{plan.name}</h3>
                          <p className="text-xs text-stone-500 font-mono mt-0.5">
                            {plan.quotaDaily} leads / day · {plan.monthlyQuota} / mo
                          </p>
                        </div>

                        <div className="pt-2 pb-2 border-b border-stone-100 flex flex-wrap items-baseline justify-between gap-1.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                              {territory.currency}{plan.price}
                            </span>
                            <span className="text-stone-500 text-xs sm:text-sm font-medium">/ month</span>
                          </div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-stone-100 text-stone-700 text-xs font-mono font-medium border border-stone-200/60">
                            {plan.costPerLead}
                          </span>
                        </div>

                        <div className="hidden md:block lg:hidden pt-2">
                          <a
                            href={getWhatsAppSubscribeUrl(plan.name, plan.price)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs text-center whitespace-normal leading-tight bg-stone-100 hover:bg-stone-200 text-stone-900"
                          >
                            <span>Subscribe for {territory.id === "europe" ? "EU" : territory.shortName}</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </a>
                        </div>
                      </div>

                      <div className="md:col-span-7 lg:col-span-1 space-y-2.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                          Included SLA & Features
                        </span>
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 leading-snug">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="md:hidden lg:block pt-6 border-t border-stone-100 w-full mt-auto">
                        <a
                          href={getWhatsAppSubscribeUrl(plan.name, plan.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs text-center whitespace-normal leading-tight bg-stone-100 hover:bg-stone-200 text-stone-900"
                        >
                          <span>Subscribe for {territory.id === "europe" ? "EU" : territory.shortName}</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Cards 1 & 2: Clean, Spacious Vertical Layout */
                    <>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-stone-950">{plan.name}</h3>
                          <p className="text-xs text-stone-500 font-mono mt-0.5">
                            {plan.quotaDaily} leads / day · {plan.monthlyQuota} / mo
                          </p>
                        </div>

                        <div className="pt-2 pb-2 border-b border-stone-100 flex flex-wrap items-baseline justify-between gap-1.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                              {territory.currency}{plan.price}
                            </span>
                            <span className="text-stone-500 text-xs sm:text-sm font-medium">/ month</span>
                          </div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-stone-100 text-stone-700 text-xs font-mono font-medium border border-stone-200/60">
                            {plan.costPerLead}
                          </span>
                        </div>

                        <div className="space-y-2.5 pt-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                            Included SLA & Features
                          </span>
                          {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-stone-100">
                        <a
                          href={getWhatsAppSubscribeUrl(plan.name, plan.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs text-center whitespace-normal leading-tight ${
                            plan.popular
                              ? "bg-stone-950 hover:bg-stone-800 text-white"
                              : "bg-stone-100 hover:bg-stone-200 text-stone-900"
                          }`}
                        >
                          <span>Subscribe for {territory.id === "europe" ? "EU" : territory.shortName}</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SLA & Guarantee Box */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-200/80 bg-white">
        <div className="max-w-5xl mx-auto rounded-2xl border border-stone-200/90 p-6 sm:p-8 bg-stone-50/60 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-100/70 text-emerald-800 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-950">90-Second WhatsApp Dispatch</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Fast response times win deals. Inquiries trigger instant WhatsApp notifications before rivals can react.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-amber-100/70 text-amber-800 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-950">Replacement Guarantee</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  If any contact number is invalid or unreachable, it is replaced with an immediate credit back to your quota.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-stone-200/70 text-stone-800 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-950">Strict Territory Lock</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  We cap broker intake per hub so leads are never oversold or circulated to multiple competing agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

