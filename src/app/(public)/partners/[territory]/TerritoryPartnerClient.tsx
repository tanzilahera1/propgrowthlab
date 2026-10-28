"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TerritoryData, TERRITORIES_DATA } from "@/data/territories";
import { StandalonePillTabBar } from "@/components/common/StandalonePillTabBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Users,
  Handshake,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Building,
  Award,
  ArrowRight,
  Briefcase,
  MapPin,
  Lock,
  Sparkles,
  ChevronLeft,
  Smartphone,
  Percent,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  territory: TerritoryData;
}

const EXPERIENCE_OPTIONS = [
  { value: "1-2 years", label: "1 - 2 years licensed experience" },
  { value: "3-5 years", label: "3 - 5 years active broker" },
  { value: "5+ years", label: "5+ years (Senior Broker / Team Lead)" },
];

export function TerritoryPartnerClient({ territory }: Props) {
  const router = useRouter();
  // Calculator state based on territory base commission
  const baseCommission = parseInt(territory.avgSaleCommission.replace(/[^0-9]/g, ""), 10) || 20000;
  const [dealCommission, setDealCommission] = useState<number>(baseCommission);
  const [dealsPerQuarter, setDealsPerQuarter] = useState<number>(3);

  const territoryTabs = TERRITORIES_DATA.map((t) => ({
    id: t.id,
    label: t.shortName,
  }));

  const brokerShare = Math.round(dealCommission * 0.7);
  const totalQuarterlyEarnings = brokerShare * dealsPerQuarter;
  const totalAnnualEarnings = totalQuarterlyEarnings * 4;

  // Form State
  const [fullName, setFullName] = useState("");
  const [brokerageName, setBrokerageName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("3-5 years");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsapp || !email) {
      toast.error("Please fill in your name, WhatsApp, and email.");
      return;
    }
    setIsSubmitting(true);

    const waMsg = `Hi PropGrowth Lab team, I want to lock in the exclusive Co-Broker Partner allocation for ${territory.name}.
Name: ${fullName}
Brokerage: ${brokerageName || "Independent Broker"}
Experience: ${experience}
WhatsApp: ${whatsapp}
Email: ${email}`;

    window.open(`https://wa.me/8801540505122?text=${encodeURIComponent(waMsg)}`, "_blank");
    toast.success("Allocation application initiated! Opening WhatsApp direct concierge.");
    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* Top Breadcrumb & Responsive Rule 10 Pill TabBar - Seamless Canvas, Zero Border Clutter */}
      <section className="w-full pt-18 sm:pt-20 pb-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          {/* Left: Breadcrumb Trail (Zero squishing or wrapping on middle devices) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 shrink-0">
            <Link
              href="/partners"
              className="inline-flex items-center gap-1.5 font-medium hover:text-stone-950 transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-stone-400" />
              <span>Partner Network</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="font-semibold text-stone-900 truncate">{territory.shortName} Allocation</span>
          </div>

          {/* Right: Universal Standalone Pill TabBar (Fluid on mobile/tablet, snug on desktop) */}
          <div className="w-full lg:w-auto flex justify-start lg:justify-end">
            <StandalonePillTabBar
              categories={territoryTabs}
              activeTab={territory.id}
              onTabChange={(id) => router.push(`/partners/${id}`)}
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full pt-3 sm:pt-4 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5">
          {/* Status Header Badge Group - Balanced Crisp Spacing & Uniform Height */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[4px] border border-amber-500/30 bg-amber-500/10 text-amber-900 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs whitespace-nowrap shrink-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <span className="sm:hidden">Exclusive · Max 2 Brokers</span>
              <span className="hidden sm:inline">Exclusive Allocation · Max 2 Brokers in {territory.country}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[4px] border border-emerald-500/30 bg-emerald-500/10 text-emerald-900 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs whitespace-nowrap shrink-0">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
              <span className="sm:hidden">70/30 Split · Zero Desk Fees</span>
              <span className="hidden sm:inline">70/30 Commission Split · Zero Desk Fees</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight leading-[1.15]">
                {territory.name} Partner Portal
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Represent pre-screened luxury buyers and high-ticket tenants across {territory.cities.join(", ")}. We supply qualified inbound inquiries; you conduct showings, negotiate, and close.
              </p>

              {/* City Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Target Districts:</span>
                {territory.keyDistricts.map((district) => (
                  <span
                    key={district}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] bg-white border border-stone-200 text-stone-700 text-xs font-medium shadow-2xs"
                  >
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {district}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Territory Metric Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
                <span className="font-medium text-stone-500">Allocation Status</span>
                <span className="font-bold text-amber-700 font-mono">
                  {territory.slotsRemaining} Slots Open
                </span>
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Avg Commission / Sale</span>
                  <span className="font-bold text-stone-900">{territory.avgSaleCommission}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Avg Monthly Lease</span>
                  <span className="font-bold text-stone-900">{territory.avgDealSize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Partner Commission</span>
                  <span className="font-bold text-emerald-700">70% to Broker</span>
                </div>
              </div>
              <div className="pt-3 border-t border-stone-100">
                <a
                  href="#application-form"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs text-center whitespace-normal min-h-[42px]"
                >
                  <Handshake className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Apply for {territory.id === "europe" ? "EU" : territory.shortName} Slot</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 70/30 Localized Commission Split Calculator */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-stone-100/50 border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <Badge className="bg-amber-500/10 text-amber-800 border-amber-500/30 font-mono text-[11px] uppercase tracking-wider rounded-[4px]">
              Earnings Projection
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              {territory.shortName} 70/30 Commission Calculator
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Calculate your retained take-home income per transaction closed through PropGrowth Lab pre-screened client dispatches.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-stone-700">Gross Commission per Deal ({territory.currencyCode}):</span>
                <span className="font-mono font-bold text-stone-950 text-base">
                  {territory.currency}{dealCommission.toLocaleString()}
                </span>
              </div>
              <Slider
                min={5000}
                max={60000}
                step={1000}
                value={[dealCommission]}
                onValueChange={(val) => {
                  const nextVal = Array.isArray(val) ? val[0] : typeof val === "number" ? val : baseCommission;
                  setDealCommission(nextVal);
                }}
                className="py-2"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-400">
                <span>{territory.currency}5,000 (Lease / Starter Sale)</span>
                <span>{territory.currency}60,000 (Penthouse / Prime Villa)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-[11px] font-mono uppercase text-stone-500 font-semibold">Your 70% Cut / Deal</span>
                <div className="text-2xl font-extrabold text-emerald-700">
                  {territory.currency}{brokerShare.toLocaleString()}
                </div>
                <p className="text-[11px] text-stone-500">Paid directly upon escrow closing</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-[11px] font-mono uppercase text-stone-500 font-semibold">PropGrowth Lab (30%)</span>
                <div className="text-2xl font-extrabold text-stone-700">
                  {territory.currency}{Math.round(dealCommission * 0.3).toLocaleString()}
                </div>
                <p className="text-[11px] text-stone-500">Covers vetting, ads & lead routing</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 text-white space-y-1">
                <span className="text-[11px] font-mono uppercase text-stone-400 font-semibold">Annualized Potential (12 Deals)</span>
                <div className="text-2xl font-extrabold text-amber-400">
                  {territory.currency}{(brokerShare * 12).toLocaleString()}
                </div>
                <p className="text-[11px] text-stone-400">Based on 1 closed deal per month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-stone-100 border border-stone-200 text-stone-800 font-mono text-xs font-semibold uppercase tracking-wider">
              Confidential Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Apply for {territory.shortName} Exclusivity
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Partner onboarding is limited to a maximum of {territory.slotsRemaining} licensed brokers in this territory. Applications are reviewed within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-stone-50/70 rounded-2xl border border-stone-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Legal Name *
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. Alexander Vance"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-white border-stone-200 text-xs h-10 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Brokerage / Agency Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Sotheby's, Knight Frank or Independent"
                  value={brokerageName}
                  onChange={(e) => setBrokerageName(e.target.value)}
                  className="bg-white border-stone-200 text-xs h-10 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Years Licensed Experience *
                </label>
                <Select
                  items={EXPERIENCE_OPTIONS}
                  value={experience}
                  onValueChange={(val) => {
                    if (val) setExperience(val);
                  }}
                >
                  <SelectTrigger className="w-full bg-white border-stone-200 text-xs h-10 rounded-xl px-3">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-stone-200 text-xs">
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-xs py-2">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Contact Number *
                </label>
                <Input
                  type="tel"
                  required
                  placeholder="+1 (305) 555-0199"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="bg-white border-stone-200 text-xs h-10 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Professional Email Address *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="alexander@luxuryrealty.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-stone-200 text-xs h-10 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[46px] h-auto py-3 px-4 rounded-xl font-bold bg-stone-950 hover:bg-stone-800 text-white shadow-md text-xs sm:text-sm cursor-pointer whitespace-normal flex items-center justify-center gap-2 text-center leading-tight"
              >
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="sm:hidden">
                  Submit {territory.id === "europe" ? "EU" : territory.country} Application via WhatsApp
                </span>
                <span className="hidden sm:inline">
                  Submit {territory.shortName} Application via WhatsApp
                </span>
              </Button>
            </div>

            <p className="text-[11px] text-center text-stone-400 pt-1">
              Guaranteed confidentiality. We never solicit or share your applicant profile.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
