"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TERRITORIES_DATA } from "@/data/territories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroBannerCarousel } from "@/components/common/HeroBannerCarousel";
import { PARTNERS_HERO_SLIDES } from "@/data/hero-banners";
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

const COORDINATOR_TERRITORIES = [
  { value: "United States (USA)", label: "United States (USA · FL, NY, CA)" },
  { value: "United Kingdom (UK)", label: "United Kingdom (London & England)" },
  { value: "Canada", label: "Canada (Toronto, Vancouver, Montreal)" },
  { value: "Australia", label: "Australia (Sydney, Melbourne, Gold Coast)" },
  { value: "European Union (EU)", label: "European Union (Portugal, Spain, Italy)" },
  { value: "UAE & GCC", label: "UAE & GCC (Dubai, Abu Dhabi, Doha)" },
  { value: "Other Worldwide Hub", label: "Other International Hub (Worldwide)" },
];

export const PARTNER_TERRITORIES = COORDINATOR_TERRITORIES;

const EXPERIENCE_OPTIONS = [
  { value: "1-2 years", label: "1 - 2 years" },
  { value: "3-5 years", label: "3 - 5 years" },
  { value: "5+ years", label: "5+ years (Senior Broker)" },
];

export function CoordinatorsClient() {
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
      // 1. Log partner lead in DB, sync to Notion CRM & trigger Telegram/Discord alert
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsapp,
          email,
          territory,
          propertyType: "Broker Partner Allocation",
          leadCategory: "partner_application",
          budget: "70/30 Commission Split",
          notes: `Experience: ${experience}. Role: Territory Broker Partner. Email: ${email}`,
          source: "Partner Application Portal",
        }),
      });

      // Direct WhatsApp coordinator application channel
      const waMsg = `Hi PropGrowth Lab team, I want to apply as a Coordinator in ${territory}. Name: ${fullName}, Experience: ${experience}, WhatsApp: ${whatsapp}, Email: ${email}`;
      window.open(`https://wa.me/8801330807372?text=${encodeURIComponent(waMsg)}`, "_blank");
      toast.success("Application submitted! Our coordinator team will review your profile within 24 hours.");
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
      {/* ================= HERO CAROUSEL ================= */}
      <HeroBannerCarousel slides={PARTNERS_HERO_SLIDES} />

      {/* ================= COMMISSION SPLIT COMPARISON ================= */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-stone-50/70 border-b border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-amber-500/10 text-amber-800 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-[4px]">
              Transparent Economics
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Traditional Agency vs. PropGrowth Coordinator Model
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Why independent top-producing agents choose to partner with our digital engine.
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
                  PropGrowth Territory Coordinator
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

      {/* ================= DEDICATED TERRITORY HUBS ================= */}
      <section id="territories" className="py-16 sm:py-20 bg-stone-100/60 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <Badge className="bg-amber-500/10 text-amber-800 border-amber-500/30 font-mono text-[11px] uppercase tracking-wider rounded-[4px]">
              Territory Exclusivity
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Explore Active Partner Allocation Portals
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Each market is strictly limited to 2 licensed brokers. Select your jurisdiction below to view localized commission economics and queue status.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {TERRITORIES_DATA.map((t) => (
              <Link
                key={t.id}
                href={`/partners/${t.id}`}
                className="group bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-xl hover:border-amber-400/80 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-[4px] bg-stone-900 text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                      {t.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-900 font-mono text-[11px] font-bold">
                      {t.slotsRemaining} Slots Open
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-stone-950 group-hover:text-amber-700 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {t.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-stone-500">
                      <span>Avg Commission:</span>
                      <span className="font-bold text-stone-900">{t.avgSaleCommission}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-500">
                      <span>Key Coverage:</span>
                      <span className="font-medium text-stone-700 truncate max-w-[170px]">{t.cities.slice(0, 3).join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  <span>View {t.shortName} Allocation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COORDINATOR APPLICATION FORM ================= */}
      <section id="coordinator-form" className="py-16 sm:py-24 bg-gradient-to-b from-[#fbfbfa] via-[#f6f3eb] to-[#fbfbfa] text-stone-900 relative overflow-hidden border-t border-stone-200/90">
        <div id="partner-form" className="absolute -top-20" />
        {/* Ambient warm gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/12 blur-[130px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xl shadow-stone-200/50 relative overflow-hidden">
            {/* Top subtle golden ambient flare */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-8">
              <Badge className="bg-amber-500/10 text-amber-800 border border-amber-500/30 font-mono text-[11px] uppercase tracking-wider mb-3 rounded-[4px]">
                Agent Application
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950">
                Apply to Become an Exclusive Territory Coordinator
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                We accept only 2 licensed agents per city territory to prevent internal competition and guarantee deal volume.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Full Legal Name *
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Sofia Martins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-stone-50/70 border-stone-300 text-stone-900 placeholder:text-stone-400 text-xs h-11 rounded-xl focus-visible:ring-amber-500 focus-visible:border-amber-500 focus-visible:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="+351 961 234 567"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="bg-stone-50/70 border-stone-300 text-stone-900 placeholder:text-stone-400 text-xs h-11 rounded-xl focus-visible:ring-amber-500 focus-visible:border-amber-500 focus-visible:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Professional Email Address *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="sofia@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-50/70 border-stone-300 text-stone-900 placeholder:text-stone-400 text-xs h-11 rounded-xl focus-visible:ring-amber-500 focus-visible:border-amber-500 focus-visible:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Target Territory *
                  </label>
                  <Select
                    items={PARTNER_TERRITORIES}
                    value={territory}
                    onValueChange={(val) => {
                      if (val) setTerritory(val);
                    }}
                  >
                    <SelectTrigger className="w-full bg-stone-50/70 border-stone-300 text-stone-900 text-xs h-11 rounded-xl px-3 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors">
                      <SelectValue placeholder="Select target territory" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-stone-200 text-stone-900 rounded-xl shadow-2xl p-1 z-50 w-(--anchor-width) max-w-[calc(100vw-32px)]">
                      {PARTNER_TERRITORIES.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-xs text-stone-700 font-medium rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 data-[highlighted]:!bg-amber-50 data-[highlighted]:!text-stone-900 data-[highlighted]:font-semibold hover:!bg-amber-50 hover:!text-stone-900 focus:!bg-amber-50 focus:!text-stone-900 data-[selected]:!text-amber-700 data-[selected]:font-bold data-[selected]:!bg-amber-500/15 [&_span]:whitespace-normal [&_span]:break-words"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Experience in Real Estate
                  </label>
                  <Select
                    items={EXPERIENCE_OPTIONS}
                    value={experience}
                    onValueChange={(val) => {
                      if (val) setExperience(val);
                    }}
                  >
                    <SelectTrigger className="w-full bg-stone-50/70 border-stone-300 text-stone-900 text-xs h-11 rounded-xl px-3 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors">
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-stone-200 text-stone-900 rounded-xl shadow-2xl p-1 z-50 w-(--anchor-width) max-w-[calc(100vw-32px)]">
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-xs text-stone-700 font-medium rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 data-[highlighted]:!bg-amber-50 data-[highlighted]:!text-stone-900 data-[highlighted]:font-semibold hover:!bg-amber-50 hover:!text-stone-900 focus:!bg-amber-50 focus:!text-stone-900 data-[selected]:!text-amber-700 data-[selected]:font-bold data-[selected]:!bg-amber-500/15 [&_span]:whitespace-normal [&_span]:break-words"
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
                className="w-full h-11 sm:h-12 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl text-xs sm:text-sm mt-4 shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2 border-0 transition-transform active:scale-95"
              >
                <span>{isSubmitting ? "Submitting Application..." : "Submit Coordinator Application"}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

              <p className="text-[11px] text-center text-stone-500 pt-2">
                No upfront fee required. Applications are reviewed within 24 business hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export const PartnersClient = CoordinatorsClient;
export default CoordinatorsClient;
