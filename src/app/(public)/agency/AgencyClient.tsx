"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CASE_STUDIES } from "@/data/case-studies";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  TrendingUp,
  Percent,
  DollarSign,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Video,
  Award,
  Globe2,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TERRITORY_OPTIONS = [
  { value: "United States (USA)", label: "United States (USA · FL, NY, CA)" },
  { value: "United Kingdom (UK)", label: "United Kingdom (London & England)" },
  { value: "Canada", label: "Canada (Toronto, Vancouver, Montreal)" },
  { value: "Australia", label: "Australia (Sydney, Melbourne, Gold Coast)" },
  { value: "European Union (EU)", label: "European Union (Portugal, Spain, Italy)" },
  { value: "UAE & GCC", label: "UAE & GCC (Dubai, Abu Dhabi, Doha)" },
  { value: "Other Worldwide Hub", label: "Other International Hub (Worldwide)" },
];

const TIER_OPTIONS = [
  { value: "full-growth", label: "$697/mo · Full Growth & Inbound Ads (Recommended)" },
  { value: "tech-engine", label: "$350/mo · Tech & Guest Retention Engine" },
  { value: "unsure", label: "Recommend best track during Free Audit" },
];

export function AgencyClient() {
  // OTA Commission Bleed Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(6000);
  const [agencyRetainer, setAgencyRetainer] = useState<350 | 697>(697);
  const otaFeePercent = 0.22; // Average OTA commission 18-25%
  const otaLoss = Math.round(monthlyRevenue * otaFeePercent);
  const annualOtaLoss = otaLoss * 12;
  const netMonthlySavings = Math.max(0, otaLoss - agencyRetainer);
  const netAnnualSavings = netMonthlySavings * 12;

  // Audit Form State
  const [propertyUrl, setPropertyUrl] = useState("");
  const [contactName, setContactName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [territory, setTerritory] = useState("United States (USA)");
  const [preferredTier, setPreferredTier] = useState("full-growth");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp || !propertyUrl) {
      toast.error("Please enter your property link and WhatsApp number.");
      return;
    }
    setIsSubmitting(true);

    const tierLabel =
      preferredTier === "full-growth"
        ? "$697/mo Full Growth Engine"
        : preferredTier === "tech-engine"
        ? "$350/mo Tech & Retention"
        : "Recommend during audit";

    try {
      // Direct notification trigger or API call
      const res = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyUrl,
          contactName,
          whatsapp,
          territory,
          preferredTier,
          monthlyRevenue,
        }),
      });

      if (!res.ok) {
        // Fallback open WhatsApp direct chat
        const waMsg = `Hi PropGrowth Lab, I want a free Direct Booking Growth Audit for my property: ${propertyUrl} in ${territory}. Preferred track: ${tierLabel}. My name: ${contactName}, WhatsApp: ${whatsapp}`;
        window.open(`https://wa.me/8801540505122?text=${encodeURIComponent(waMsg)}`, "_blank");
      }
      toast.success("Audit request received! Our growth team will reach out via WhatsApp within 2 hours.");
      setPropertyUrl("");
      setContactName("");
      setWhatsapp("");
    } catch {
      toast.success("Redirecting to WhatsApp for instant growth strategy session...");
      const waMsg = `Hi PropGrowth Lab, I want a free Direct Booking Growth Audit for my property: ${propertyUrl} in ${territory}. Preferred track: ${tierLabel}. My name: ${contactName}, WhatsApp: ${whatsapp}`;
      window.open(`https://wa.me/8801540505122?text=${encodeURIComponent(waMsg)}`, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-x-clip w-full max-w-full pt-18 pb-14 sm:pt-22 sm:pb-18 lg:pt-26 lg:pb-22 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-b border-stone-200/90 text-stone-900">
        {/* Background ambient warm gold glow (exact property-brokerage style) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-900 text-[10px] sm:text-xs font-mono font-bold tracking-wide uppercase mb-6 mx-auto whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse shrink-0" />
            <TrendingUp className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="hidden sm:inline">Why Hand Over $30K–$60K in Fees Every Year?</span>
            <span className="sm:hidden">Stop $30K–$60K Annual OTA Fees</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.14] text-stone-900">
            Stop Losing 25% of Your Revenue to OTAs.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Keep 100% of Guest Income With Direct Bookings.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Third-party booking platforms take up to 25% on every reservation and withhold guest data. We engineer your direct booking engine and run targeted guest acquisition funnels on flat <strong className="text-amber-700 font-bold">$350–$697/month retainers</strong>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <a href="#calculator" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 cursor-pointer">
                Calculate Your OTA Savings
                <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
              </Button>
            </a>
            <a href="#audit-form" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold bg-white hover:bg-stone-100 hover:border-amber-400 text-stone-700 border border-stone-200/90 shadow-xs transition-colors cursor-pointer"
              >
                Book Free Growth Audit
              </Button>
            </a>
          </div>

          {/* Quick Problem-to-Gain Cards */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[92px]">
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">Keep 100%</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Zero Airbnb & OTA fees</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[92px]">
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">Sub-Second Speed</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Hotel • Resort • Villa engine</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[92px]">
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">2-Way iCal</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Zero double-booking risk</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[92px]">
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">$350 – $697</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Flat monthly retainers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE OTA SAVINGS CALCULATOR ================= */}
      <section id="calculator" className="py-16 sm:py-20 bg-stone-50/70 border-b border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge className="bg-amber-500/10 text-amber-800 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-[4px]">
              Interactive ROI Model
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              How Much Revenue Are You Losing Right Now?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Slide to match your average monthly gross bookings from third-party booking platforms.
            </p>
          </div>

          <Card className="p-6 sm:p-10 bg-white border border-stone-200/90 rounded-3xl shadow-sm">
            <div className="space-y-8">
              {/* Slider Controller */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-stone-700">Monthly Gross Rental Revenue:</span>
                  <span className="text-3xl sm:text-4xl font-black text-stone-900 font-mono tracking-tight">
                    ${monthlyRevenue.toLocaleString()}
                  </span>
                </div>

                <Slider
                  value={[monthlyRevenue]}
                  onValueChange={(val) => {
                    const nextVal = Array.isArray(val) ? val[0] : typeof val === "number" ? val : 6000;
                    setMonthlyRevenue(nextVal);
                  }}
                  min={2000}
                  max={30000}
                  step={500}
                  className="w-full cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-mono text-stone-400">
                  <span>$2,000 / mo</span>
                  <span>$15,000 / mo</span>
                  <span>$30,000+ / mo</span>
                </div>
              </div>

              {/* Retainer Tier Selector Pill (Segmented Luxury Control) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-stone-100/90 border border-stone-200/90 shadow-2xs">
                <div className="flex items-center gap-2 px-2 text-xs font-bold text-stone-700 tracking-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>Compare Against Retainer Plan:</span>
                </div>
                <div className="grid grid-cols-2 gap-1 w-full sm:w-auto p-1 bg-stone-200/70 rounded-full border border-stone-300/60">
                  <button
                    type="button"
                    onClick={() => setAgencyRetainer(350)}
                    className={`h-9 px-3.5 sm:px-4.5 rounded-full text-xs sm:text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap text-center flex items-center justify-center gap-1.5 ${
                      agencyRetainer === 350
                        ? "bg-stone-900 text-white shadow-xs font-bold"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/80"
                    }`}
                  >
                    <span>
                      <span className="hidden sm:inline">Direct </span>Tech
                    </span>
                    <span className={`font-mono text-xs sm:text-[13.5px] font-bold tracking-tight ${agencyRetainer === 350 ? "text-amber-400" : "text-stone-500"}`}>
                      ($350)
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgencyRetainer(697)}
                    className={`h-9 px-3.5 sm:px-4.5 rounded-full text-xs sm:text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap text-center flex items-center justify-center gap-1.5 ${
                      agencyRetainer === 697
                        ? "bg-stone-900 text-white shadow-xs font-bold"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/80"
                    }`}
                  >
                    <span>
                      <span className="hidden sm:inline">Full </span>Growth
                    </span>
                    <span className={`font-mono text-xs sm:text-[13.5px] font-bold tracking-tight ${agencyRetainer === 697 ? "text-amber-400" : "text-stone-500"}`}>
                      ($697)
                    </span>
                    {agencyRetainer === 697 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0 ml-0.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* OTA Bleed */}
                <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200/70 text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
                    Current OTA Commission Bleed (~22%)
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-red-600 font-mono tracking-tight">
                    -${otaLoss.toLocaleString()}
                    <span className="text-xs sm:text-sm font-normal text-red-500"> /mo</span>
                  </p>
                  <p className="text-[11px] text-red-700 font-medium pt-1">
                    ${annualOtaLoss.toLocaleString()} lost every single year
                  </p>
                </div>

                {/* Agency Retainer */}
                <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200 text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-600 font-mono">
                    {agencyRetainer === 350 ? "Tech & Retention Retainer" : "Full Growth Retainer"}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-stone-900 font-mono tracking-tight">
                    ${agencyRetainer}
                    <span className="text-xs sm:text-sm font-normal text-stone-500"> /mo</span>
                  </p>
                  <p className="text-[11px] text-stone-600 font-medium pt-1">
                    {agencyRetainer === 350 ? "Software hosting & 2-way iCal sync" : "Full tech + Meta & Google guest ads"}
                  </p>
                </div>

                {/* Net Profit Saved */}
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                    Net Monthly Retained Profit
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-amber-700 font-mono tracking-tight">
                    +${netMonthlySavings.toLocaleString()}
                    <span className="text-xs sm:text-sm font-normal text-amber-700"> /mo</span>
                  </p>
                  <p className="text-[11px] text-amber-800 font-bold pt-1">
                    Save +${netAnnualSavings.toLocaleString()} / year back in your pocket
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border border-stone-800">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    <strong>The Math is Simple:</strong> With an average stay of $1,200, landing just <strong className="text-amber-400">one single direct booking</strong> per month pays for our entire ${agencyRetainer} retainer. Everything else is pure profit.
                  </span>
                </div>
                <a href="#audit-form" className="w-full sm:w-auto shrink-0">
                  <Button className="w-full sm:w-auto h-12 py-3.5 px-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow-md shadow-amber-500/20 active:scale-95 transition-all">
                    Claim Retainer Slot
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ================= SCOPE OF WORK / RETAINER TIERS ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="bg-amber-500/10 text-amber-800 border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-full">
            Transparent Monthly Retainers
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Two Transparent Partnership Tracks. Zero OTA Commissions.
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
            Choose between direct booking software infrastructure or a full inbound guest acquisition engine. No hidden percentages, no surprise markups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Tier 1: Direct Tech & Guest Retention Engine */}
          <Card className="p-6 sm:p-8 rounded-3xl border border-stone-200/90 bg-white shadow-xs hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    Tier 1 · Direct Tech
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                    Tech & Guest Retention
                  </h3>
                  <p className="text-xs sm:text-[13px] text-stone-500 mt-1 leading-relaxed">
                    Production Next.js direct-booking platform, 2-way iCal sync, and automated WhatsApp guest retention.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-4xl sm:text-5xl font-black text-stone-900 font-mono tracking-tight">$350</span>
                  <span className="text-xs text-stone-500 block font-medium">/ month flat</span>
                </div>
              </div>

              {/* Target / Best For */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Best For:</strong> Established villas, luxury holiday lets & boutique stays with existing traffic or social following that want to eliminate OTA fees on repeat & direct guests.
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">
                  Included in Tier 1:
                </p>
                <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom Next.js direct booking app (Hotel, Resort, Villa)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ultra-fast global edge hosting (0.8s mobile page speed)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Automatic 2-way iCal calendar sync (Zero double bookings)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct instant checkout: Stripe, Apple Pay, Google Pay & Cards</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Automated WhatsApp guest check-in guides & VIP discounts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Post-checkout 5-star Google review automation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col gap-2">
              <a href="#audit-form" onClick={() => setPreferredTier("tech-engine")} className="w-full block">
                <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all cursor-pointer">
                  Select Tech Track ($350/mo)
                </Button>
              </a>
            </div>
          </Card>

          {/* Tier 2: Full Growth & Paid Acquisition Engine (Most Popular) */}
          <Card className="p-6 sm:p-8 rounded-3xl border-2 border-amber-500/80 bg-gradient-to-b from-white via-amber-50/20 to-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Top Recommended Pill */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-mono text-[10.5px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-xs">
              ★ Most Popular · Full Engine
            </div>

            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4 pt-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                    Tier 2 · Full Growth
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                    Full Growth & Inbound Ads
                  </h3>
                  <p className="text-xs sm:text-[13px] text-stone-600 mt-1 leading-relaxed">
                    Complete software platform PLUS targeted Meta & Google Ads management to generate new international guest inquiries.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-4xl sm:text-5xl font-black text-amber-600 font-mono tracking-tight">$697</span>
                  <span className="text-xs text-stone-500 block font-medium">/ month flat</span>
                </div>
              </div>

              {/* Target / Best For */}
              <div className="p-3.5 rounded-2xl bg-amber-100/60 border border-amber-300/80 text-xs text-amber-950 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>1-Booking ROI:</strong> Landing just 1 direct booking ($1,200+) fully covers the $697 retainer. Best for owners seeking predictable new international guests from UK, US, EU, and GCC.
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                  Everything in Tier 1 PLUS:
                </p>
                <ul className="space-y-2.5 text-xs text-stone-800 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Laser-targeted Meta (Instagram/Facebook) campaigns for luxury travelers</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Geographic traveler targeting (UK, EU, US, GCC high-net-worth stays)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Local Google Search intent capture & Google Map direct booking setup</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Ad retargeting sequences for travelers who visited your property page</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Weekly budget optimization, A/B creative testing & monthly growth review</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Direct WhatsApp VIP inquiry dispatch with lead qualification</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-amber-200/60 flex flex-col gap-2">
              <a href="#audit-form" onClick={() => setPreferredTier("full-growth")} className="w-full block">
                <Button className="w-full h-11 rounded-xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/25 transition-all cursor-pointer">
                  Select Full Growth Track ($697/mo)
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* ================= FEATURED CASE STUDIES ================= */}
      <section className="py-16 sm:py-24 bg-stone-100/60 border-t border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <Badge className="bg-amber-500/10 text-amber-800 border-amber-500/30 font-mono text-[11px] uppercase tracking-wider rounded-[4px]">
                Proven ROI Blueprints
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                Featured Luxury Stay Transformations
              </h2>
              <p className="text-sm text-stone-600 max-w-xl">
                Explore in-depth performance breakdowns showing how boutique villa estates eliminated OTA fees and built direct booking engines.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                href={`/agency/case-studies/${study.slug}`}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-stone-400 transition-all duration-300"
              >
                <div>
                  {/* Image Thumb */}
                  <div className="relative w-full aspect-16/10 overflow-hidden bg-stone-100">
                    <Image
                      src={study.heroImage}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-[4px] bg-stone-950/90 text-white font-mono text-[10px] uppercase font-bold tracking-wider backdrop-blur-xs">
                        {study.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{study.location}</span>
                      <span className="text-stone-300">·</span>
                      <span className="font-mono">{study.duration}</span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-950 group-hover:text-amber-800 transition-colors leading-snug">
                      {study.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {study.subtitle}
                    </p>

                    {/* Stat Highlight */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 block uppercase">Direct Share</span>
                        <span className="font-extrabold text-stone-900 text-sm">{study.metrics[0].value}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 block uppercase">Fees Saved</span>
                        <span className="font-extrabold text-emerald-700 text-sm">{study.metrics[1].value}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="w-full inline-flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-amber-700 transition-colors pt-2 border-t border-stone-100">
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AUDIT REQUEST FORM ================= */}
      <section id="audit-form" className="py-16 sm:py-20 bg-gradient-to-b from-stone-950 via-[#14120f] to-stone-950 text-white relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-full">
                No Risk · No Obligation
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Request a Free 15-Minute Direct Booking Audit
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-2">
                Paste your Airbnb or website link. Our senior hospitality growth strategist will send you a personalized video breakdown showing exactly where you are losing direct bookings.
              </p>
            </div>

            <form onSubmit={handleAuditSubmit} className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Property Airbnb URL or Current Website *
                </label>
                <Input
                  type="text"
                  required
                  placeholder="https://airbnb.com/rooms/... or yourdomain.com"
                  value={propertyUrl}
                  onChange={(e) => setPropertyUrl(e.target.value)}
                  className="bg-stone-950 border-stone-800 text-white placeholder:text-stone-500 text-xs h-11 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Your Name *
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. David Silva"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="bg-stone-950 border-stone-800 text-white placeholder:text-stone-500 text-xs h-11 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    WhatsApp Number (with country code) *
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="+351 912 345 678"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="bg-stone-950 border-stone-800 text-white placeholder:text-stone-500 text-xs h-11 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Preferred Partnership Track
                </label>
                <Select
                  items={TIER_OPTIONS}
                  value={preferredTier}
                  onValueChange={(val) => {
                    if (val) setPreferredTier(val);
                  }}
                >
                  <SelectTrigger className="w-full bg-stone-950 border-stone-800 text-white text-xs h-11 rounded-xl px-3 focus:outline-none focus:border-amber-500">
                    <SelectValue placeholder="Select preferred track" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-900 border border-stone-700/80 text-white rounded-xl shadow-2xl p-1 z-50 w-(--anchor-width) max-w-[calc(100vw-32px)]">
                    {TIER_OPTIONS.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs text-stone-200 font-medium rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 data-[highlighted]:!bg-stone-800 data-[highlighted]:!text-white data-[highlighted]:font-semibold hover:!bg-stone-800 hover:!text-white focus:!bg-stone-800 focus:!text-white data-[selected]:!text-amber-400 data-[selected]:font-bold data-[selected]:!bg-amber-500/10 [&_[data-slot=select-item-text]]:whitespace-normal [&_[data-slot=select-item-text]]:break-words"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Location / Territory
                </label>
                <Select
                  items={TERRITORY_OPTIONS}
                  value={territory}
                  onValueChange={(val) => {
                    if (val) setTerritory(val);
                  }}
                >
                  <SelectTrigger className="w-full bg-stone-950 border-stone-800 text-white text-xs h-11 rounded-xl px-3 focus:outline-none focus:border-amber-500">
                    <SelectValue placeholder="Select location or territory" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-900 border border-stone-700/80 text-white rounded-xl shadow-2xl p-1 z-50 w-(--anchor-width) max-w-[calc(100vw-32px)]">
                    {TERRITORY_OPTIONS.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs text-stone-200 font-medium rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 data-[highlighted]:!bg-stone-800 data-[highlighted]:!text-white data-[highlighted]:font-semibold hover:!bg-stone-800 hover:!text-white focus:!bg-stone-800 focus:!text-white data-[selected]:!text-amber-400 data-[selected]:font-bold data-[selected]:!bg-amber-500/10 [&_[data-slot=select-item-text]]:whitespace-normal [&_[data-slot=select-item-text]]:break-words"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 sm:h-12 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm mt-4 shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2 px-3"
              >
                {isSubmitting ? (
                  "Submitting Request..."
                ) : (
                  <>
                    <span className="hidden sm:inline">Get Free Direct Booking Audit via WhatsApp</span>
                    <span className="sm:hidden">Get Free Direct Audit via WhatsApp</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </>
                )}
              </Button>

              <p className="text-[11px] text-center text-stone-400 pt-2">
                Strict privacy guarantee. We never share your revenue numbers or property data.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AgencyClient;
