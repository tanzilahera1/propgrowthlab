"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  { value: "United States (USA)", label: "United States (USA / Florida, NY, California)" },
  { value: "United Kingdom (UK)", label: "United Kingdom (London & England)" },
  { value: "Canada", label: "Canada (Toronto, Vancouver, Montreal)" },
  { value: "Australia", label: "Australia (Sydney, Melbourne, Gold Coast)" },
  { value: "European Union (EU)", label: "European Union (Portugal, Spain, France, Italy)" },
  { value: "UAE & GCC", label: "UAE & GCC (Dubai, Abu Dhabi, Doha)" },
  { value: "Other Worldwide Hub", label: "Other International Destination (Worldwide)" },
];

export function AgencyClient() {
  // OTA Commission Bleed Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(6000);
  const otaFeePercent = 0.22; // Average OTA commission 18-25%
  const otaLoss = Math.round(monthlyRevenue * otaFeePercent);
  const annualOtaLoss = otaLoss * 12;
  const agencyRetainer = 350;
  const netMonthlySavings = Math.max(0, otaLoss - agencyRetainer);
  const netAnnualSavings = netMonthlySavings * 12;

  // Audit Form State
  const [propertyUrl, setPropertyUrl] = useState("");
  const [contactName, setContactName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [territory, setTerritory] = useState("United States (USA)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp || !propertyUrl) {
      toast.error("Please enter your property link and WhatsApp number.");
      return;
    }
    setIsSubmitting(true);

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
          monthlyRevenue,
        }),
      });

      if (!res.ok) {
        // Fallback open WhatsApp direct chat
        const waMsg = `Hi PropGrowth Lab, I want a free Direct Booking Growth Audit for my property: ${propertyUrl} in ${territory}. My name: ${contactName}, WhatsApp: ${whatsapp}`;
        window.open(`https://wa.me/8801540505122?text=${encodeURIComponent(waMsg)}`, "_blank");
      }
      toast.success("Audit request received! Our growth team will reach out via WhatsApp within 2 hours.");
      setPropertyUrl("");
      setContactName("");
      setWhatsapp("");
    } catch {
      toast.success("Redirecting to WhatsApp for instant growth strategy session...");
      const waMsg = `Hi PropGrowth Lab, I want a free Direct Booking Growth Audit for my property: ${propertyUrl} in ${territory}. My name: ${contactName}, WhatsApp: ${whatsapp}`;
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
          <div className="inline-flex items-center gap-2 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase mb-6 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>Why Hand Over $30K–$60K in Fees Every Year?</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.14] text-stone-900">
            Stop Losing 25% of Your Revenue to OTAs.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Keep 100% of Guest Income With Direct Bookings.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Third-party booking platforms take up to 25% on every reservation and withhold guest data. We engineer your direct booking engine and run targeted guest acquisition campaigns on a flat <strong className="text-amber-700 font-bold">$350/month retainer</strong>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#calculator">
              <Button size="lg" className="h-11 px-6 rounded-xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 cursor-pointer">
                Calculate Your OTA Savings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="#audit-form">
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-6 rounded-xl font-bold bg-white hover:bg-stone-100 hover:border-amber-400 text-stone-700 border border-stone-200/90 shadow-xs transition-colors cursor-pointer"
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
              <p className="text-sm sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug whitespace-nowrap">$350 Flat</p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal whitespace-nowrap">Predictable monthly fee</p>
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
                  <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
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

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {/* OTA Bleed */}
                <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200/70 text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
                    Current OTA Commission Bleed (~22%)
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
                    -${otaLoss.toLocaleString()}
                    <span className="text-xs font-normal text-red-500"> /mo</span>
                  </p>
                  <p className="text-[11px] text-red-700 font-medium pt-1">
                    ${annualOtaLoss.toLocaleString()} lost every single year
                  </p>
                </div>

                {/* Agency Retainer */}
                <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200 text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-600 font-mono">
                    PropGrowth 360° Retainer
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
                    ${agencyRetainer}
                    <span className="text-xs font-normal text-stone-500"> /mo</span>
                  </p>
                  <p className="text-[11px] text-stone-600 font-medium pt-1">
                    Fixed predictable price · Zero commission cut
                  </p>
                </div>

                {/* Net Profit Saved */}
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                    Net Monthly Retained Profit
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">
                    +${netMonthlySavings.toLocaleString()}
                    <span className="text-xs font-normal text-amber-700"> /mo</span>
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
                    <strong>The Math is Simple:</strong> With an average stay of $1,200, landing just <strong className="text-amber-400">one single direct booking</strong> per month pays for our entire $350 retainer. Everything else is pure profit.
                  </span>
                </div>
                <a href="#audit-form">
                  <Button size="sm" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold shrink-0 rounded-xl cursor-pointer">
                    Claim Retainer Slot
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ================= SCOPE OF WORK BREAKDOWN ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="bg-amber-500/10 text-amber-800 border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-[4px]">
            What You Get in the $350/mo Retainer
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            A Complete High-Performance In-House Marketing Team
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
            Hiring a media buyer, copywriter, and web engineer separately costs over $4,000/month. We deliver the full stack for $350.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Pillar 1: Paid Guest Acquisition */}
          <Card className="p-6 sm:p-7 rounded-3xl border border-stone-200/90 bg-white shadow-xs hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header row: Icon on left, Stage Badge on right */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-700 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Target className="w-5 h-5 text-amber-600" />
                </div>
                <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-[11px] font-mono font-bold tracking-wide whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse shrink-0" />
                  <span>01 · Inbound Ads</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight leading-snug">
                Paid Guest Acquisition Funnels
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 mt-2 leading-relaxed">
                We build and manage laser-targeted Meta (Instagram/Facebook) and Google Search campaigns targeting high-net-worth travelers searching for luxury stays in your exact location.
              </p>

              <div className="pt-4 border-t border-stone-100 mt-5">
                <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Geographic traveler targeting (UK, EU, US, GCC)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Retargeting users who viewed your property</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Weekly budget optimization & A/B testing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="font-semibold text-stone-700">Campaign Timeline:</span>
              <span className="font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 whitespace-nowrap">
                Live in 7 Days
              </span>
            </div>
          </Card>

          {/* Pillar 2: Next.js Direct Engine */}
          <Card className="p-6 sm:p-7 rounded-3xl border border-stone-200/90 bg-white shadow-xs hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header row: Icon on left, Stage Badge on right */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-700 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-[11px] font-mono font-bold tracking-wide whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse shrink-0" />
                  <span>02 · 0.8s Platform</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight leading-snug">
                Next.js Booking App (Hotel • Resort • Villa)
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 mt-2 leading-relaxed">
                We engineer, host, and continuously optimize your custom Next.js direct-booking engine with sub-second mobile speed to turn visitors into direct guests.
              </p>

              <div className="pt-4 border-t border-stone-100 mt-5">
                <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Automatic 2-way iCal calendar sync (Zero double bookings)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Instant Checkout: Stripe, Apple Pay, Google Pay & Cards</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Sub-second speed (0.8s), Google 99+ score & 100% SEO ready</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="font-semibold text-stone-700">Tech Performance:</span>
              <span className="font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 whitespace-nowrap">
                Google 99+ Score
              </span>
            </div>
          </Card>

          {/* Pillar 3: Automated WhatsApp */}
          <Card className="p-6 sm:p-7 rounded-3xl border border-stone-200/90 bg-white shadow-xs hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group md:col-span-2 lg:col-span-1">
            <div className="md:grid md:grid-cols-2 md:gap-8 lg:block">
              <div>
                {/* Header row: Icon on left, Stage Badge on right */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-700 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-[11px] font-mono font-bold tracking-wide whitespace-nowrap shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse shrink-0" />
                    <span>03 · Direct CRM</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight leading-snug">
                  Automated WhatsApp & Guest Retention
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-600 mt-2 leading-relaxed">
                  Repeat guests generate zero acquisition costs. We deploy automated WhatsApp sequences for check-in guides, local recommendations, and VIP direct re-booking discounts.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 mt-5 md:pt-0 md:border-t-0 md:mt-0 lg:pt-4 lg:border-t lg:mt-5 flex flex-col justify-between">
                <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Instant automated booking receipt & directions</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Automated 5-star Google Review request post-checkout</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Seasonal return guest broadcast campaigns</span>
                  </li>
                </ul>

                <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">Guest Automation:</span>
                  <span className="font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 whitespace-nowrap">
                    24/7 Auto-Dispatch
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ================= AUDIT REQUEST FORM ================= */}
      <section id="audit-form" className="py-16 sm:py-20 bg-gradient-to-b from-stone-950 via-[#14120f] to-stone-950 text-white relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-[4px]">
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
                  <SelectContent className="bg-stone-900 border border-stone-700/80 text-white rounded-xl shadow-2xl p-1 z-50">
                    {TERRITORY_OPTIONS.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs text-stone-200 font-medium rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 data-[highlighted]:!bg-stone-800 data-[highlighted]:!text-white data-[highlighted]:font-semibold hover:!bg-stone-800 hover:!text-white focus:!bg-stone-800 focus:!text-white data-[selected]:!text-amber-400 data-[selected]:font-bold data-[selected]:!bg-amber-500/10"
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
                className="w-full h-11 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm mt-4 shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                {isSubmitting ? "Submitting Request..." : "Get Free Direct Booking Audit via WhatsApp"}
                <ArrowRight className="w-4 h-4 ml-2" />
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
