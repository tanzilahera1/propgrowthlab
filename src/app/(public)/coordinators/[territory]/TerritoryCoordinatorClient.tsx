"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TerritoryData, TERRITORIES_DATA } from "@/data/territories";
import { StandalonePillTabBar } from "@/components/common/StandalonePillTabBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Users,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Building,
  Award,
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

export function TerritoryCoordinatorClient({ territory }: Props) {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsapp || !email) {
      toast.error("Please fill in your name, WhatsApp, and email.");
      return;
    }
    setIsSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsapp,
          email,
          territory: territory.name,
          propertyType: "Exclusive Territory Allocation",
          leadCategory: "partner_application",
          budget: "70/30 Commission Split",
          notes: `Experience: ${experience}. Brokerage: ${brokerageName || "Independent"}. Role: Exclusive Territory Coordinator. Email: ${email}`,
          source: "Territory Application Portal",
        }),
      });
    } catch {
      // Continue to WhatsApp even if network fails
    }

    const waMsg = `Hi PropGrowth Lab team, I want to lock in the exclusive Territory Coordinator allocation for ${territory.name}.
Name: ${fullName}
Brokerage: ${brokerageName || "Independent Broker"}
Experience: ${experience}
WhatsApp: ${whatsapp}
Email: ${email}`;

    window.open(`https://wa.me/8801330807372?text=${encodeURIComponent(waMsg)}`, "_blank");
    toast.success("Allocation application initiated! Opening WhatsApp direct concierge.");
    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* Top Breadcrumb & Responsive Rule 10 Pill TabBar - Seamless Canvas, Zero Border Clutter */}
      <section className="w-full pt-18 sm:pt-20 pb-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 shrink-0">
            <Link
              href="/coordinators"
              className="inline-flex items-center gap-1.5 font-medium hover:text-stone-950 transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-stone-400" />
              <span>Coordinator Network</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="font-semibold text-stone-900 truncate">{territory.shortName} Allocation</span>
          </div>

          <div className="w-full lg:w-auto flex justify-start lg:justify-end">
            <StandalonePillTabBar
              categories={territoryTabs}
              activeTab={territory.id}
              onTabChange={(id) => router.push(`/coordinators/${id}`)}
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight leading-[1.15]">
                {territory.name} Coordinator Portal
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
                    <Building className="w-3 h-3 text-stone-400" />
                    {district}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Economics Summary Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-mono uppercase text-stone-500 font-bold">Deal Economics</span>
                <Badge className="bg-emerald-500/10 text-emerald-800 border-emerald-500/30 text-[10px] font-mono rounded-[4px]">
                  70% Payout Guaranteed
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Avg Market Commission:</span>
                  <span className="font-bold text-stone-900">{territory.avgSaleCommission}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Your Share (70%):</span>
                  <span className="font-bold text-amber-700">
                    ${Math.round((parseInt(territory.avgSaleCommission.replace(/[^0-9]/g, ""), 10) || 20000) * 0.7).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Market Exclusivity:</span>
                  <span className="font-semibold text-stone-700">Max 2 Coordinators</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Upfront Desk Fees:</span>
                  <span className="font-bold text-emerald-600">$0 (Zero)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 70/30 Commission Calculator */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-amber-500/10 text-amber-800 border-amber-500/30 font-mono text-[11px] uppercase tracking-wider rounded-[4px]">
              Interactive Estimator
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Calculate Your {territory.shortName} Net Earnings
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Adjust your deal size and quarterly closing volume to see your net 70% commission payout.
            </p>
          </div>

          <Card className="p-6 sm:p-8 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                  Gross Commission per Closed Deal
                </label>
                <span className="text-base font-extrabold text-stone-950 font-mono">
                  ${dealCommission.toLocaleString()}
                </span>
              </div>
              <Slider
                value={[dealCommission]}
                min={5000}
                max={100000}
                step={2500}
                onValueChange={(val) => {
                  const nextVal = Array.isArray(val) ? val[0] : typeof val === "number" ? val : baseCommission;
                  setDealCommission(nextVal);
                }}
                className="py-2"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                <span>$5,000</span>
                <span>$50,000</span>
                <span>$100,000</span>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-stone-100">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                  Deals Closed per Quarter (3 Months)
                </label>
                <span className="text-base font-extrabold text-stone-950 font-mono">
                  {dealsPerQuarter} {dealsPerQuarter === 1 ? "Deal" : "Deals"}
                </span>
              </div>
              <Slider
                value={[dealsPerQuarter]}
                min={1}
                max={10}
                step={1}
                onValueChange={(val) => {
                  const nextVal = Array.isArray(val) ? val[0] : typeof val === "number" ? val : 3;
                  setDealsPerQuarter(nextVal);
                }}
                className="py-2"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                <span>1 Deal</span>
                <span>5 Deals</span>
                <span>10 Deals</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1">
                <span className="text-[11px] font-mono uppercase text-stone-500 font-bold">
                  Quarterly Net Take-Home (70%)
                </span>
                <p className="text-2xl sm:text-3xl font-black text-stone-950 font-mono">
                  ${totalQuarterlyEarnings.toLocaleString()}
                </p>
                <span className="text-[10px] text-stone-400">Paid out via instant escrow</span>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                <span className="text-[11px] font-mono uppercase text-amber-800 font-bold">
                  Projected Annual Net Earnings
                </span>
                <p className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">
                  ${totalAnnualEarnings.toLocaleString()}
                </p>
                <span className="text-[10px] text-amber-700">Zero desk fees or franchise cuts</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Allocation Application Form */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-stone-100/60">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <Badge className="bg-amber-500/10 text-amber-800 border-amber-500/30 font-mono text-[11px] uppercase tracking-wider rounded-[4px]">
              Apply for {territory.shortName}
            </Badge>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-950 tracking-tight">
              Lock in {territory.name} Exclusivity
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Only 2 licensed coordinators are accepted for {territory.name}. Submit your details below to connect with our territory director via WhatsApp concierge.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. David Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white border-stone-200 text-xs h-10 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Current Brokerage / Firm</label>
                <Input
                  type="text"
                  placeholder="e.g. Independent or Luxury Realty"
                  value={brokerageName}
                  onChange={(e) => setBrokerageName(e.target.value)}
                  className="bg-white border-stone-200 text-xs h-10 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp Phone *</label>
                <Input
                  type="tel"
                  required
                  placeholder="+1 (305) 555-0192"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="bg-white border-stone-200 text-xs h-10 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Work Email *</label>
                <Input
                  type="email"
                  required
                  placeholder="david@realty.com"
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

export default TerritoryCoordinatorClient;
