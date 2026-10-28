"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PARTNER_TERRITORIES = [
  { value: "United States (USA)", label: "United States (USA · FL, NY, CA)" },
  { value: "United Kingdom (UK)", label: "United Kingdom (London & England)" },
  { value: "Canada", label: "Canada (Toronto, Vancouver, Montreal)" },
  { value: "Australia", label: "Australia (Sydney, Melbourne, Gold Coast)" },
  { value: "European Union (EU)", label: "European Union (Portugal, Spain, Italy)" },
  { value: "UAE & GCC", label: "UAE & GCC (Dubai, Abu Dhabi, Doha)" },
  { value: "Other Worldwide Hub", label: "Other International Hub (Worldwide)" },
];

const EXPERIENCE_OPTIONS = [
  { value: "1-2 years", label: "1 - 2 years" },
  { value: "3-5 years", label: "3 - 5 years" },
  { value: "5+ years", label: "5+ years (Senior Broker)" },
];

export function BrokersClient() {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [territory, setTerritory] = useState("United States (USA)");
  const [experience, setExperience] = useState("3-5 years");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsapp || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);

    try {
      // Direct WhatsApp broker partnership channel
      const waMsg = `Hi PropGrowth Lab team, I want to apply as a Co-Broker Partner Agent in ${territory}. Name: ${fullName}, Experience: ${experience}, WhatsApp: ${whatsapp}, Email: ${email}`;
      window.open(`https://wa.me/8801540505122?text=${encodeURIComponent(waMsg)}`, "_blank");
      toast.success("Application submitted! Our partnership director will review your profile within 24 hours.");
      setFullName("");
      setWhatsapp("");
      setEmail("");
    } catch {
      toast.error("An error occurred. Please contact us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* ================= HERO HEADER ================= */}
      <section className="relative overflow-x-clip w-full max-w-full pt-18 pb-14 sm:pt-22 sm:pb-18 lg:pt-26 lg:pb-22 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-b border-stone-200/90 text-stone-900">
        {/* Background ambient warm gold glow (exact property-brokerage style) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10px] sm:text-[11px] font-mono font-bold tracking-wide uppercase mb-6 mx-auto max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse shrink-0" />
            <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="sm:hidden truncate">Stop 50% Brokerage Commission Splits</span>
            <span className="hidden sm:inline">Why Give 50% of Your Commission to Traditional Brokerages?</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.14] text-stone-900">
            Stop Giving Half Your Commission Away.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Close Ready Inbound Deals & Keep 70%.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop giving 50% of your commission away while doing all the prospecting. We deliver verified luxury buyers and tenants directly to your phone—you handle local viewings and keep a <strong className="text-stone-900 font-bold">guaranteed 70% commission</strong> with zero desk fees.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#partner-form" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 cursor-pointer">
                Apply for Territory Partnership
                <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
              </Button>
            </a>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold bg-white hover:bg-stone-100 hover:border-amber-400 text-stone-700 border border-stone-200/90 shadow-xs transition-colors cursor-pointer"
              >
                How Co-Brokering Works
              </Button>
            </a>
          </div>

          {/* Quick Problem-to-Gain Cards - Strict 1-Line Title & Subtitle Consistency */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[88px] sm:min-h-[92px]">
              <p className="text-xs sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug">70% Payout</p>
              <p className="text-[10px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal">Guaranteed deal payout</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[88px] sm:min-h-[92px]">
              <p className="text-xs sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug">Zero Desk Fees</p>
              <p className="text-[10px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal">No desk fees or lock-in</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[88px] sm:min-h-[92px]">
              <p className="text-xs sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug">No Prospecting</p>
              <p className="text-[10px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal">Ready clients delivered</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center min-h-[88px] sm:min-h-[92px]">
              <p className="text-xs sm:text-base lg:text-[17px] font-black text-amber-600 tracking-tight leading-snug">Max 2 Agents</p>
              <p className="text-[10px] sm:text-xs text-stone-600 mt-1 font-medium leading-normal">Exclusive territory lock</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMISSION SPLIT COMPARISON ================= */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-stone-50/70 border-b border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-amber-500/10 text-amber-800 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-[4px]">
              Transparent Economics
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Traditional Brokerage vs. PropGrowth Co-Broker Model
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Why independent top-producing brokers choose to partner with our digital engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Traditional Agency */}
            <Card className="p-6 sm:p-8 rounded-3xl border border-stone-200/90 bg-white shadow-xs overflow-visible">
              <div className="pb-4 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-400 font-mono uppercase tracking-wider">
                  The Old Agency Model
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-1">Traditional Agency Desk</h3>
              </div>
              <ul className="mt-6 space-y-3.5 text-xs text-stone-600">
                <li className="flex items-start gap-2.5 text-red-600">
                  <span className="font-bold text-base leading-none">✕</span>
                  <span>50% - 60% franchise desk split taken from your commission</span>
                </li>
                <li className="flex items-start gap-2.5 text-red-600">
                  <span className="font-bold text-base leading-none">✕</span>
                  <span>You have to cold-call, door-knock, and pay for your own ads</span>
                </li>
                <li className="flex items-start gap-2.5 text-red-600">
                  <span className="font-bold text-base leading-none">✕</span>
                  <span>Unpredictable deal flow with weeks of zero incoming leads</span>
                </li>
                <li className="flex items-start gap-2.5 text-red-600">
                  <span className="font-bold text-base leading-none">✕</span>
                  <span>Clunky internal CRMs and slow bureaucratic payment approvals</span>
                </li>
              </ul>
            </Card>

            {/* PropGrowth Partner Model */}
            <Card className="p-6 sm:p-8 rounded-3xl border-2 border-amber-500 bg-amber-50/20 shadow-xl shadow-amber-500/10 relative overflow-visible mt-3 sm:mt-0">
              <div className="absolute -top-3.5 right-6 z-20 pointer-events-none">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md border-2 border-white whitespace-nowrap">
                  Recommended
                </span>
              </div>
              <div className="pb-4 border-b border-amber-200/70">
                <span className="text-xs font-bold text-amber-800 font-mono uppercase tracking-wider">
                  PropGrowth Co-Broker Partner
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-1">Direct Deal Partnership</h3>
              </div>
              <ul className="mt-6 space-y-3.5 text-xs text-stone-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-900 font-bold">You keep 70%</strong> of closed deal commission (Fixed 70/30 split).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-900 font-bold">Zero ad spend needed:</strong> Inbound pre-screened clients handed directly to you.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-900 font-bold">Exclusive territory lock:</strong> Maximum 2 partner agents per designated micro-market.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-900 font-bold">Instant escrow payout:</strong> Platform 30% fee settled seamlessly on contract signing.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ================= PARTNER APPLICATION FORM ================= */}
      <section id="partner-form" className="py-16 sm:py-20 bg-gradient-to-b from-stone-950 via-[#14120f] to-stone-950 text-white relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-[4px]">
                Broker Application
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Apply to Become an Exclusive Co-Broker Partner
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-2">
                We accept only 2 licensed brokers per city territory to prevent internal competition and guarantee deal volume.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Full Legal Name *
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Sofia Martins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-stone-950 border-stone-800 text-white placeholder:text-stone-500 text-xs h-11 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="+351 961 234 567"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="bg-stone-950 border-stone-800 text-white placeholder:text-stone-500 text-xs h-11 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Professional Email Address *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="sofia@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-950 border-stone-800 text-white placeholder:text-stone-500 text-xs h-11 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Target Territory *
                  </label>
                  <Select
                    items={PARTNER_TERRITORIES}
                    value={territory}
                    onValueChange={(val) => {
                      if (val) setTerritory(val);
                    }}
                  >
                    <SelectTrigger className="w-full bg-stone-950 border-stone-800 text-white text-xs h-11 rounded-xl px-3 focus:outline-none focus:border-amber-500">
                      <SelectValue placeholder="Select target territory" />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-900 border border-stone-700/80 text-white rounded-xl shadow-2xl p-1 z-50 w-(--anchor-width) max-w-[calc(100vw-32px)]">
                      {PARTNER_TERRITORIES.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-xs text-stone-200 font-medium rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 data-[highlighted]:!bg-stone-800 data-[highlighted]:!text-white data-[highlighted]:font-semibold hover:!bg-stone-800 hover:!text-white focus:!bg-stone-800 focus:!text-white data-[selected]:!text-amber-400 data-[selected]:font-bold data-[selected]:!bg-amber-500/10 [&_span]:whitespace-normal [&_span]:break-words"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Experience in Real Estate
                  </label>
                  <Select
                    items={EXPERIENCE_OPTIONS}
                    value={experience}
                    onValueChange={(val) => {
                      if (val) setExperience(val);
                    }}
                  >
                    <SelectTrigger className="w-full bg-stone-950 border-stone-800 text-white text-xs h-11 rounded-xl px-3 focus:outline-none focus:border-amber-500">
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-900 border border-stone-700/80 text-white rounded-xl shadow-2xl p-1 z-50 w-(--anchor-width) max-w-[calc(100vw-32px)]">
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-xs text-stone-200 font-medium rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 data-[highlighted]:!bg-stone-800 data-[highlighted]:!text-white data-[highlighted]:font-semibold hover:!bg-stone-800 hover:!text-white focus:!bg-stone-800 focus:!text-white data-[selected]:!text-amber-400 data-[selected]:font-bold data-[selected]:!bg-amber-500/10 [&_span]:whitespace-normal [&_span]:break-words"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm mt-4 shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Broker Application"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-[11px] text-center text-stone-400 pt-2">
                No upfront fee required. Applications are reviewed within 24 business hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BrokersClient;

