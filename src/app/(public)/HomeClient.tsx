"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Layers,
  TrendingUp,
  Building2,
  Users,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  DollarSign,
  Sparkles,
  MapPin,
  Calendar,
  Smartphone,
  ChevronRight,
} from "lucide-react";

const CITIES = [
  { id: "usa", name: "Miami & New York, USA", shortName: "Miami & New York", demand: "High Demand", avgRent: "$4,200/mo" },
  { id: "uk", name: "London & Cotswolds, UK", shortName: "London & Cotswolds", demand: "Prime Expat Hub", avgRent: "£3,100/mo" },
  { id: "europe", name: "Madeira & Lisbon, Portugal", shortName: "Madeira & Lisbon", demand: "Peak Nomad Season", avgRent: "€2,500/mo" },
  { id: "uae", name: "Dubai & Doha, GCC", shortName: "Dubai & Doha, GCC", demand: "Ultra Luxury", avgRent: "$4,800/mo" },
  { id: "australia", name: "Sydney & Melbourne, Australia", shortName: "Sydney & Melbourne", demand: "Surging Influx", avgRent: "A$3,400/mo" },
  { id: "canada", name: "Toronto & Vancouver, Canada", shortName: "Toronto & Vancouver", demand: "Executive Stays", avgRent: "C$3,200/mo" },
];

const PILLARS = [
  {
    id: "templates",
    number: "01",
    badge: "Turnkey Tech & Code",
    title: "PropTech Systems & Code",
    tagline: "Instant source code download & 48-hour turnkey deployment.",
    description:
      "Production-ready Next.js booking engines, arbitrage OS, and brokerage multi-listing platforms. Buy the source code or let our engineers launch it on your domain in 48 hours.",
    price: "From $19 (Code) · $99 Turnkey",
    href: "/templates",
    icon: Layers,
    accentColor: "from-blue-500/10 to-indigo-500/5",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    highlights: [
      "Sub-second Next.js · Google 99+ score",
      "Automatic 2-way iCal sync ready",
      "PWA 1-Click install & native app UX",
    ],
  },
  {
    id: "agency",
    number: "02",
    badge: "Direct Bookings",
    title: "360° Hospitality Growth Agency",
    tagline: "Eliminate 25% OTA commissions with direct guest booking engines.",
    description:
      "Boutique resorts and luxury villa operators lose thousands each month to Airbnb and Booking.com. We design high-converting direct booking funnels and run hyper-targeted Meta & Google Search ads.",
    price: "From $350 – $697 / mo",
    href: "/agency",
    icon: TrendingUp,
    accentColor: "from-amber-500/10 to-orange-500/5",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    highlights: [
      "Zero Airbnb/OTA fees — Keep 100% revenue",
      "Instant checkout: Stripe, Apple Pay, Google Pay",
      "Smart cart drawer & instant WhatsApp alerts",
    ],
  },
  {
    id: "leads",
    number: "03",
    badge: "Daily Lead Quotas",
    title: "Broker Daily Lead Subscriptions",
    tagline: "A steady pipeline of verified tenant & buyer inquiries delivered daily.",
    description:
      "Stop wasting hours scrolling social groups. Subscribe to your city's quota and receive 30 to 150+ verified expat and luxury tenant inquiries sent directly to your WhatsApp each morning.",
    price: "From $99 / month",
    href: "/leads",
    icon: Building2,
    accentColor: "from-amber-500/10 to-orange-500/5",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    highlights: [
      "Daily automated WhatsApp dispatch",
      "Pre-qualified budget & move-in dates",
      "30 to 150+ monthly inquiry tiers",
    ],
  },
  {
    id: "partners",
    number: "04",
    badge: "Co-Broker Partnership",
    title: "The Co-Broker Network",
    tagline: "Exclusive ground partnership with high-ticket commission splits.",
    description:
      "For licensed agents and experienced property handlers in key territories. We provide qualified high-budget leads, you manage physical viewings and contracts. Earn 70% of every closed deal.",
    price: "70 / 30 Payout Split",
    href: "/partners",
    icon: Users,
    accentColor: "from-amber-500/10 to-orange-500/5",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    highlights: [
      "Exclusive geographic territory lock",
      "High-ticket luxury villa mandates",
      "Prompt escrow commission payouts",
    ],
  },
];

const STATS = [
  { value: "0.8s", label: "Sub-Second Page Speed", sub: "Google 99+ Score & 100% SEO" },
  { value: "0%", label: "Zero Airbnb Fees", sub: "Automatic 2-way iCal sync" },
  { value: "48h", label: "Figma → Next.js Live", sub: "Clean code & fast architecture" },
  { value: "1-Tap", label: "WhatsApp Direct Booking", sub: "Stripe, Apple Pay & instant alerts" },
];

export function HomeClient() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* ================= SECTION 1: HERO SECTION ================= */}
      <section className="relative overflow-x-clip w-full max-w-full pt-18 pb-14 sm:pt-22 sm:pb-18 lg:pt-26 lg:pb-22 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-b border-stone-200/90 text-stone-900">
        {/* Background ambient warm gold glow (exact property-brokerage style) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* Ant Design Style Precision Tag */}
            <div className="inline-flex items-center gap-2 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase whitespace-nowrap mb-6 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span>Hospitality · PropTech · Growth Engine</span>
            </div>

            {/* Main Headline with property-brokerage Amber Gradient */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.14] text-center mx-auto max-w-3xl">
              The 360° Tech & Performance Growth Engine for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                Luxury Stays & Real Estate
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed text-center font-normal">
              We engineer blazing-fast direct booking systems, run paid guest acquisition to eliminate
              25% OTA fees, and dispatch verified tenant leads to licensed broker partners.
            </p>

            {/* CTA Button Cluster */}
            <div className="mt-8 w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <Link href="/agency" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-8 rounded-full text-sm font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 transition-all active:scale-95 gap-2 group cursor-pointer">
                  <span>Explore 360° Agency</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="/leads" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 rounded-full text-sm font-semibold bg-white border border-stone-200 hover:border-amber-400 hover:bg-stone-50 text-stone-700 shadow-xs transition-all cursor-pointer"
                >
                  Broker Daily Leads
                </Button>
              </Link>
            </div>

            {/* Micro Trust Markers - Informational Trust Specs (Non-button style) */}
            <div className="mt-8 pt-4 sm:pt-5 border-t border-stone-200/80 w-full max-w-2xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-2 text-[11px] sm:text-xs select-none">
                <div className="flex items-center justify-center gap-1.5 py-1 text-stone-700">
                  <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="whitespace-nowrap font-medium">0.8s Modern Next.js</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="whitespace-nowrap font-medium">Google 99+ Score</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 text-stone-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="whitespace-nowrap font-medium">Zero Airbnb Fees</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 text-stone-700">
                  <Smartphone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="whitespace-nowrap font-medium">1-Tap WhatsApp Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: METRICS BAR (4 STAT CARDS) ================= */}
      <section className="relative w-full py-8 sm:py-12 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-b border-stone-200/90 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="relative bg-white/95 p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-1 sm:space-y-1.5 overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent group-hover:via-amber-500 transition-all duration-300" />
                <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  {stat.label}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: THE 4 PILLARS SHOWCASE ================= */}
      <section className="py-20 sm:py-28 bg-[#fbfbfa] relative overflow-hidden">
        {/* Subtle Ambient Mesh Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-amber-500/5 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase">
              The Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Complete Growth Solutions. One Engine.
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              From plug-and-play source code to performance marketing and daily broker subscriptions,
              every solution is engineered to maximize occupancy and revenue.
            </p>
          </div>

          {/* Pillars 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.id}
                  className="rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-amber-400/90 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent group-hover:via-amber-500 transition-all duration-300" />
                  <CardContent className="p-6 sm:p-8 space-y-6">
                    {/* Top Row: Badge, Number, Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-[4px] border bg-amber-500/10 text-amber-800 border-amber-500/25">
                          {pillar.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-stone-400">
                          {pillar.number}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 group-hover:bg-stone-900 group-hover:text-amber-400 group-hover:border-stone-800 transition-all duration-300 shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-stone-700">
                        {pillar.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Highlights List */}
                    <ul className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                      {pillar.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Action & Price */}
                    <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          Pricing Model
                        </span>
                        <span className="text-sm font-black text-stone-900">
                          {pillar.price}
                        </span>
                      </div>
                      <Link href={pillar.href}>
                        <Button
                          size="sm"
                          className="rounded-full text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 gap-1.5 px-4 shadow-sm hover:shadow-md transition-all"
                        >
                          <span>Explore</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: DIRECT BOOKING VS OTA SAVINGS ================= */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-[#14120f] to-stone-950 text-white relative overflow-hidden">
        {/* Ambient warm gold glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase">
              The Math That Matters
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Why Luxury Operators Are Leaving 25% OTA Fees Behind
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              A luxury villa generating $15,000 monthly loses over $3,750 every 30 days to Airbnb
              and Booking.com. Here is what happens when you switch to PropGrowth Lab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card A: The Traditional OTA Way */}
            <div className="bg-stone-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-900/60 w-fit">
                  The Traditional OTA Trap
                </span>
                <h3 className="text-xl font-bold text-white">Airbnb & Booking.com</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400 font-black">✕</span>
                    <span>15% to 25% commissions on every single reservation.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400 font-black">✕</span>
                    <span>Zero guest data ownership (Email & phone hidden).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400 font-black">✕</span>
                    <span>Guests see competitor villas recommended right on your page.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-stone-800">
                <span className="text-xs text-stone-400 block">Annual Commission Lost</span>
                <span className="text-2xl font-black text-rose-400">~$45,000 / year</span>
              </div>
            </div>

            {/* Card B: The PropGrowth Lab Way (property-brokerage styling) */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border-2 border-amber-500/70 shadow-xl shadow-amber-500/10 flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="space-y-3">
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 w-fit">
                  The PropGrowth Lab Way
                </span>
                <h3 className="text-xl font-bold text-white">Direct Booking Engine</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span><strong>0% Commission</strong> — You keep 100% of guest rent.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span><strong>Full Guest CRM</strong> — Collect direct email & WhatsApp.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span><strong>Sub-second Speed</strong> — Next.js loads in 0.8s on 4G.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-stone-800">
                <span className="text-xs text-stone-400 block">Net Annual Profit Saved</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Keep All $45,000
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: GLOBAL COVERAGE & LIVE INQUIRIES ================= */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-b border-stone-200/90 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase">
              Active Territories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Where High-Ticket Inquiries Originate Daily
            </h2>
          </div>

          {/* City Selector Pills - Balanced Character Length & Fixed Single-Line Height */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-center gap-2 sm:gap-2.5 max-w-2xl mx-auto mb-6 sm:mb-8">
            {CITIES.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className={`h-10 px-2 sm:px-4 rounded-xl sm:rounded-full text-[10.5px] sm:text-xs font-bold transition-all text-center flex items-center justify-center whitespace-nowrap cursor-pointer ${
                  selectedCity.id === city.id
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200 shadow-2xs"
                }`}
              >
                {city.shortName}
              </button>
            ))}
          </div>

          {/* Active City Overview Box */}
          <div className="max-w-2xl mx-auto bg-white p-5 sm:p-7 lg:p-9 rounded-3xl border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent group-hover:via-amber-500 transition-all duration-300" />
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-amber-700 flex items-center justify-center sm:justify-start gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                {selectedCity.demand}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">{selectedCity.name}</h3>
              <p className="text-xs text-stone-500">Average Expat/Nomad Monthly Rent: {selectedCity.avgRent}</p>
            </div>
            <Link href="/leads" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto rounded-full text-xs font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white gap-1.5 px-5 shadow-md shadow-amber-500/20 transition-all">
                <span>View Daily Quota</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: READY TO SCALE CTA ================= */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-stone-950 via-[#14120f] to-stone-950 text-white relative overflow-hidden border-t border-stone-800">
        {/* Ambient gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl flex flex-col items-center text-center space-y-6 relative overflow-hidden backdrop-blur-xs">
            {/* Ambient Radiant Gold Lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-48 bg-amber-500/15 blur-3xl pointer-events-none" />

            <div className="space-y-3 max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase">
                Start Scaling Today
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Accelerate Your Hospitality or Brokerage Business?
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Whether you need a turnkey direct booking website, want to eliminate OTA fees,
                or need daily qualified tenant leads delivered to your WhatsApp—we are ready.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto relative z-10">
              <Link href="/agency" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-8 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white shadow-lg shadow-amber-500/25 transition-transform active:scale-95 cursor-pointer">
                  Book 360° Growth Audit
                </Button>
              </Link>
              <Link href="/leads" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto h-12 px-8 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-stone-700 backdrop-blur-xs shadow-xs transition-colors cursor-pointer"
                >
                  Subscribe to Daily Leads
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeClient;
