"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Building,
  CheckCircle2,
  Clock,
  Compass,
  DollarSign,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function RentHubClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredHubs = [
    {
      slug: "doha",
      flag: "🇶🇦",
      city: "Doha & Lusail",
      country: "Qatar",
      headline: "Expat Bedspaces, Single & Master Rooms near Metro",
      areas: ["Najma", "Mansoura", "Al Sadd", "The Pearl", "Lusail City"],
      currency: "QAR",
      typicalRange: "1,000 – 2,500 QAR",
      badge: "Highest Demand",
      bgGradient: "from-amber-500/10 via-amber-500/5 to-white",
      borderColor: "border-amber-300",
      accentColor: "text-amber-800",
    },
    {
      slug: "madeira",
      flag: "🇵🇹",
      city: "Madeira Island",
      country: "Portugal",
      headline: "Digital Nomad Co-Living & Ocean-View Stays",
      areas: ["Funchal (Lido)", "Sé", "Calheta", "Ponta do Sol", "Caniço"],
      currency: "EUR",
      typicalRange: "€450 – €1,200",
      badge: "Nomad Hub",
      bgGradient: "from-emerald-500/10 via-emerald-500/5 to-white",
      borderColor: "border-emerald-300",
      accentColor: "text-emerald-800",
    },
    {
      slug: "dubai",
      flag: "🇦🇪",
      city: "Dubai",
      country: "United Arab Emirates",
      headline: "Executive Partitions & Private Rooms in Metro Hubs",
      areas: ["Deira", "Bur Dubai", "Al Barsha 1", "International City"],
      currency: "AED",
      typicalRange: "1,200 – 3,500 AED",
      badge: "Fast Dispatch",
      bgGradient: "from-blue-500/10 via-blue-500/5 to-white",
      borderColor: "border-blue-300",
      accentColor: "text-blue-800",
    },
  ];

  const filteredHubs = featuredHubs.filter(
    (hub) =>
      hub.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.areas.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-[#fbfbfa] pt-14 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-7 sm:space-y-9">
        
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          {/* AntD-style rounded-[4px] slim borderless tag matching Home / Templates / Agency / Leads / Partners */}
          <div className="inline-flex items-center gap-1.5 py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-[4px] bg-stone-900 text-amber-300 text-[9.5px] sm:text-[10.5px] lg:text-xs font-mono font-bold tracking-wider uppercase shadow-xs whitespace-nowrap border border-stone-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">Global Room Search & Relocation Dispatch</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Find Verified Rooms with Zero Broker Harassment
          </h1>

          <p className="text-xs sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Select your destination city to get direct room options, anti-fraud protected tickets, and optional luggage moving van discounts.
          </p>

          {/* Search Box */}
          <div className="pt-1 max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search city, country, or area (e.g. Doha, Madeira, Najma, Deira)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-stone-300 pl-10 pr-4 py-2 rounded-xl shadow-xs text-xs sm:text-sm h-10"
              />
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>

        {/* City Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredHubs.map((hub, index) => {
            const isLastOdd =
              filteredHubs.length % 2 !== 0 && index === filteredHubs.length - 1;
            return (
              <div
                key={hub.slug}
                className={`rounded-2xl border-2 ${hub.borderColor} bg-gradient-to-b ${hub.bgGradient} p-5 sm:p-6 shadow-lg shadow-stone-200/50 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${
                  isLastOdd
                    ? "md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none w-full"
                    : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{hub.flag}</span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-900 text-white font-mono font-bold text-[11px] tracking-wider">
                        {hub.slug === "doha" ? "QATAR" : hub.slug === "madeira" ? "MADEIRA" : "DUBAI"}
                      </span>
                    </div>
                    <Badge className="bg-stone-900 text-white text-[11px] font-semibold">
                      {hub.badge}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-stone-900">
                      {hub.city}
                    </h2>
                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                      {hub.country}
                    </div>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {hub.headline}
                  </p>

                  {/* Popular areas */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-bold text-stone-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Popular Zones:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {hub.areas.map((area) => (
                        <span
                          key={area}
                          className="text-[11px] font-medium bg-white/80 border border-stone-200/80 rounded-md px-2 py-0.5 text-stone-700"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-stone-600 flex items-center justify-between border-t border-stone-200/60">
                    <span>Price Range:</span>
                    <span className="font-bold text-stone-900">{hub.typicalRange}</span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6">
                  <Link
                    href={`/find-room/${hub.slug}`}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold h-11 px-4 rounded-xl flex items-center justify-center gap-2 group transition-colors text-xs sm:text-sm whitespace-nowrap"
                  >
                    <span>Enter {hub.city} Portal</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Anti-Cheat & 3-Party Value Explainer */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <h3 className="text-2xl font-black text-stone-900">
              How the PropGrowth Lab Anti-Fraud Ticket Protocol Works
            </h3>
            <p className="text-sm text-stone-600">
              A transparent, win-win marketplace connecting tenants, property hosts, freelance brokers, and moving van operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h4 className="font-bold text-stone-900 text-base">
                1. Submit Request & Get Ticket
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Choose your specific Upazila/Thana and budget. An anti-cheat ticket (e.g. <code>#TKT-QA-DOH-2041</code>) is instantly created.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h4 className="font-bold text-stone-900 text-base">
                2. Direct WhatsApp Dispatch
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our vetted local coordinator receives your ticket and sends matching room videos/photos directly to your WhatsApp with zero hidden fees.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h4 className="font-bold text-stone-900 text-base">
                3. Closed-Loop Mover Voucher
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Confirm your room booking with your ticket ID to unlock 20% discount on luggage moving vans, preventing broker bypass.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
