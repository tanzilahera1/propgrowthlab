"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  StandalonePillTabBar,
  TabCategory,
} from "@/components/common/StandalonePillTabBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Building2,
  TrendingUp,
  Handshake,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Bell,
  Lock,
  ExternalLink,
  ChevronRight,
  Info,
  DollarSign,
  Calendar,
  MapPin,
  AlertCircle,
  Download,
  Check,
} from "lucide-react";

// ================= DUMMY USER & CLIENT DATA =================
interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  maskedPhone: string;
  property: string;
  neighborhood: string;
  budget: string;
  dealType: "Purchase" | "Luxury Lease";
  moveIn: string;
  qualification: string;
  timestamp: string;
  status: "new" | "contacted" | "scheduled" | "replaced";
}

const INITIAL_LEADS: LeadRecord[] = [
  {
    id: "LEAD-9081",
    name: "Alexander Wright",
    phone: "+13055550182",
    maskedPhone: "+1 (305) 555-01••",
    property: "Brickell Bay Tower Penthouse (3 Bed / 3.5 Bath)",
    neighborhood: "Brickell Financial District, Miami",
    budget: "$14,000 / mo",
    dealType: "Luxury Lease",
    moveIn: "Under 14 Days",
    qualification: "Cash Advance Verified · Corporate Relocation",
    timestamp: "12 mins ago",
    status: "new",
  },
  {
    id: "LEAD-9080",
    name: "Elena Rostova",
    phone: "+13055550199",
    maskedPhone: "+1 (305) 555-01••",
    property: "Biscayne Bay Modern Waterfront Villa",
    neighborhood: "Biscayne Bay / Coconut Grove, Miami",
    budget: "$2,850,000",
    dealType: "Purchase",
    moveIn: "30–45 Days",
    qualification: "Jumbo Pre-Approval Letter · Proof of Funds On File",
    timestamp: "2 hours ago",
    status: "new",
  },
  {
    id: "LEAD-9076",
    name: "David Sterling",
    phone: "+13055550143",
    maskedPhone: "+1 (305) 555-01••",
    property: "Sunny Isles Oceanfront High-Floor Condo",
    neighborhood: "Sunny Isles Beach, FL",
    budget: "$9,500 / mo",
    dealType: "Luxury Lease",
    moveIn: "Urgent (< 7 Days)",
    qualification: "790 FICO Verified · Private Equity Partner",
    timestamp: "5 hours ago",
    status: "contacted",
  },
  {
    id: "LEAD-9069",
    name: "Sophia & Marc Chen",
    phone: "+13055550118",
    maskedPhone: "+1 (305) 555-01••",
    property: "Coconut Grove Tropical Modern Villa",
    neighborhood: "Coconut Grove, FL",
    budget: "$1,650,000",
    dealType: "Purchase",
    moveIn: "Flexible (Investment)",
    qualification: "1031 Exchange Ready · Escrow Deposit Confirmed",
    timestamp: "Yesterday",
    status: "scheduled",
  },
  {
    id: "LEAD-9055",
    name: "Marcus Beaumont",
    phone: "+13055550171",
    maskedPhone: "+1 (305) 555-01••",
    property: "South Beach Venetian Islands Residence",
    neighborhood: "Venetian Islands, Miami Beach",
    budget: "$18,000 / mo",
    dealType: "Luxury Lease",
    moveIn: "Immediate",
    qualification: "Verified HNW Individual · Annual Lease Prepaid Option",
    timestamp: "2 days ago",
    status: "contacted",
  },
];

const DASHBOARD_TABS: TabCategory[] = [
  { id: "leads", label: "Broker Lead Quota", badge: "84/120" },
  { id: "stays", label: "Direct Stay Engine", badge: "3 Villas" },
  { id: "escrow", label: "Co-Broker Escrow", badge: "$48k In Pipeline" },
  { id: "routing", label: "WhatsApp Routing", badge: "Active" },
];

export function DashboardClient() {
  const [activeTab, setActiveTab] = useState("leads");
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);
  const [leadFilter, setLeadFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [replacementModalOpen, setReplacementModalOpen] = useState(false);
  const [replacementTargetLead, setReplacementTargetLead] = useState<LeadRecord | null>(null);
  const [replacementReason, setReplacementReason] = useState("unreachable");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings form states
  const [whatsappNumber, setWhatsappNumber] = useState("+1 (305) 555-0192");
  const [instantAlerts, setInstantAlerts] = useState(true);
  const [minBudget, setMinBudget] = useState("$5,000 / mo or $1,000,000 Purchase");
  const [settingsSaved, setSettingsSaved] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleTriggerReplacement = () => {
    if (!replacementTargetLead) return;

    setLeads((prev) =>
      prev.map((item) =>
        item.id === replacementTargetLead.id
          ? { ...item, status: "replaced" }
          : item
      )
    );
    setReplacementModalOpen(false);
    showToast(
      `Replacement Approved: +1 Credit credited to your quota for #${replacementTargetLead.id}. Fresh lead incoming on WhatsApp.`
    );
    setReplacementTargetLead(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    showToast("Dispatch routing preferences updated successfully.");
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesFilter =
      leadFilter === "all" ? true : lead.status === leadFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#fbfbfa] text-stone-900 pb-20 pt-20 sm:pt-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-stone-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1">{toastMessage}</div>
        </div>
      )}

      {/* ================= TOP HERO & USER GREETING ================= */}
      <section className="w-full border-b border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Developer Preview Banner Notice */}
          <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/25 text-amber-900 text-[11px] sm:text-xs font-semibold tracking-wide">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              Preview Mode · Client session active. Auth gate will protect this route in production.
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                  Client & Partner Portal
                </h1>
                <span className="px-2.5 py-0.5 rounded-[4px] bg-stone-900 text-amber-400 text-[11px] font-mono font-bold tracking-wider uppercase border border-stone-800">
                  Gold Power Broker
                </span>
              </div>
              <p className="mt-1 text-sm text-stone-600 flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-stone-800">Marcus Vance</span>
                <span>•</span>
                <span>Premier Florida Realty (FL-BK349102)</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Dispatch Online
                </span>
              </p>
            </div>

            {/* Quick Territory Info */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200/90 text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Assigned Territory
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Miami Tier-1 Hub (USA)</span>
                </div>
              </div>

              <Link href="/leads/usa">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-stone-300 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                >
                  <span>Quota Terms</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* ================= TABBAR: STANDALONE PILL TABBAR ================= */}
          <div className="mt-6 sm:mt-8">
            <StandalonePillTabBar
              categories={DASHBOARD_TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </section>

      {/* ================= TAB CONTENT WRAPPER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        {/* ============================================================== */}
        {/* TAB 1: BROKER LEADS CONSOLE                                    */}
        {/* ============================================================== */}
        {activeTab === "leads" && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {/* Metric 1 */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Monthly Lead Quota
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    70% Delivered
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  84 <span className="text-sm font-semibold text-stone-400">/ 120 leads</span>
                </div>
                <div className="mt-3 w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "70%" }} />
                </div>
                <div className="mt-2 text-[11px] text-stone-500 flex justify-between">
                  <span>36 leads remaining</span>
                  <span>Cycle resets in 12 days</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Today&apos;s Dispatches
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                    Target: 2–4/day
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  3 Inquiries
                </div>
                <p className="mt-3 text-[11px] text-stone-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>All delivered to WhatsApp within 90s</span>
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Last dispatch: 12 minutes ago
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Avg Inbound Budget
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-stone-100 text-stone-700 text-[10px] font-bold border border-stone-200">
                    Tier-1 Filtered
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  $1.85M
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  Lease Floor: <span className="font-bold text-stone-800">$5,000/mo</span>
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Sales Range: $1.2M – $4.5M
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Rollover Protection
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Zero Wastage
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  18 Credits
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  Unused leads automatically roll over for 30 days.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  100% Instant credit replacement active
                </div>
              </div>
            </div>

            {/* Filter and Action Header */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <Input
                    placeholder="Search by client name, building, or district..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9.5 text-xs bg-stone-50/70 border-stone-200 rounded-xl focus:bg-white"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: "all", label: "All Leads" },
                    { id: "new", label: "New (Uncontacted)" },
                    { id: "contacted", label: "In Discussion" },
                    { id: "scheduled", label: "Showing Set" },
                    { id: "replaced", label: "Replaced" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setLeadFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        leadFilter === filter.id
                          ? "bg-stone-900 text-white shadow-xs"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead Stream Card List */}
              <div className="space-y-3 pt-2">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-12 text-stone-500 bg-stone-50/50 rounded-xl border border-dashed border-stone-200">
                    <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold">No lead inquiries match your filter</p>
                    <p className="text-xs text-stone-400 mt-1">Try resetting the search or filter pills.</p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="group relative bg-[#fcfcfb] hover:bg-white transition-all duration-200 border border-stone-200/90 hover:border-stone-300 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      {/* Left: Lead Core Data */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-stone-500">
                            #{lead.id}
                          </span>
                          <h2 className="text-base font-bold text-stone-900">
                            {lead.name}
                          </h2>
                          <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-amber-500/10 text-amber-800 border border-amber-600/20">
                            {lead.dealType}
                          </span>
                          {lead.status === "new" && (
                            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-600/20 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              NEW INQUIRY
                            </span>
                          )}
                          {lead.status === "contacted" && (
                            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              In Discussion
                            </span>
                          )}
                          {lead.status === "scheduled" && (
                            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                              Showing Arranged
                            </span>
                          )}
                          {lead.status === "replaced" && (
                            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-stone-100 text-stone-500 border border-stone-200">
                              Credit Replaced
                            </span>
                          )}
                          <span className="text-[11px] text-stone-400 ml-auto lg:ml-0 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lead.timestamp}
                          </span>
                        </div>

                        {/* Property & Neighborhood */}
                        <div className="text-xs sm:text-sm font-semibold text-stone-800 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-stone-400 shrink-0" />
                          <span>{lead.property}</span>
                        </div>

                        {/* Pre-Screening Badges */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs text-stone-600 pt-0.5">
                          <span className="inline-flex items-center gap-1 font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                            {lead.budget}
                          </span>
                          <span className="inline-flex items-center gap-1 text-stone-600 bg-stone-100/80 px-2 py-0.5 rounded">
                            <Calendar className="w-3 h-3 text-stone-500" />
                            Move-in: {lead.moveIn}
                          </span>
                          <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            {lead.qualification}
                          </span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello ${lead.name}, this is Marcus Vance from Premier Florida Realty. I received your inquiry regarding ${lead.property}. When would you like to arrange a private viewing?`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            size="sm"
                            className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-xs cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Client</span>
                          </Button>
                        </a>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                          className="rounded-full text-xs font-semibold h-9 px-3.5 text-stone-700 border-stone-300 hover:bg-stone-100"
                        >
                          <span>Full Profile</span>
                        </Button>

                        {lead.status !== "replaced" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setReplacementTargetLead(lead);
                              setReplacementModalOpen(true);
                            }}
                            className="rounded-full text-stone-500 hover:text-stone-900 text-xs h-9 px-2.5"
                            title="Request 100% Replacement Credit if unreachable"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: DIRECT STAY GROWTH ENGINE (AGENCY PERSPECTIVE)           */}
        {/* ============================================================== */}
        {activeTab === "stays" && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Direct GMV (YTD)
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    +38% vs OTA
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  $384,500
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  Total direct booking revenue processed with 0% OTA fees.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Average booking value: $3,450
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    OTA Fees Saved
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Retained Profit
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">
                  $57,675
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  Saved from Airbnb & Booking.com 15%–20% commission cuts.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Direct Stripe gateway fee: 2.9%
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Funnel Conversion
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                    Industry: 1.8%
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  4.92%
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  Direct stay funnel converting 2.7x higher than marketplace.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  High-intent Meta & Google luxury ads
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Lighthouse Speed Score
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Sub-Second Load
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  99 / 100
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  PropGrowth Next.js engine with zero-blocking render.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Zero bounce rate from slow loading
                </div>
              </div>
            </div>

            {/* Active Managed Properties */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">
                    Managed Direct Stay Assets
                  </h2>
                  <p className="text-xs text-stone-500">
                    Turnkey direct engines running live with calendar sync & Stripe payments.
                  </p>
                </div>
                <Link href="/agency">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs font-semibold border-stone-300"
                  >
                    <span>Agency Retainer Plan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {[
                  {
                    name: "The Palms Villa Estate",
                    location: "Golden Mile, Marbella",
                    occupancy: "92%",
                    directGMV: "$162,400",
                    otaSaved: "$24,360",
                    status: "High Season Peak",
                  },
                  {
                    name: "Serena Cliffside Villas",
                    location: "Uluwatu, Bali",
                    occupancy: "94%",
                    directGMV: "$148,600",
                    otaSaved: "$22,290",
                    status: "Full Capacity",
                  },
                  {
                    name: "Horizon Chalet & Spa",
                    location: "Zermatt, Swiss Alps",
                    occupancy: "88%",
                    directGMV: "$73,500",
                    otaSaved: "$11,025",
                    status: "Winter Bookings Open",
                  },
                ].map((stay) => (
                  <div
                    key={stay.name}
                    className="rounded-xl border border-stone-200 p-4 bg-stone-50/60 hover:bg-stone-50 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-[4px] bg-stone-900 text-white text-[10px] font-bold">
                        {stay.status}
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        {stay.occupancy} Occupancy
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-stone-900">{stay.name}</h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {stay.location}
                      </p>
                    </div>

                    <div className="border-t border-stone-200/80 pt-2 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-stone-500 block text-[10px]">Direct GMV</span>
                        <span className="font-extrabold text-stone-900">{stay.directGMV}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-500 block text-[10px]">OTA Fees Saved</span>
                        <span className="font-extrabold text-emerald-700">{stay.otaSaved}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CO-BROKER ESCROW & DEALS                                */}
        {/* ============================================================== */}
        {activeTab === "escrow" && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Commissions Paid (YTD)
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Disbursed
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  $64,000
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  70% broker commission share directly wired to your escrow.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Last payout: 10 days ago ($24,500)
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Pending In Escrow
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                    Closing Soon
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight">
                  $48,000
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  2 contracts under active escrow closing this month.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Guaranteed 70/30 split locked
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Partner Split Ratio
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-stone-100 text-stone-700 text-[10px] font-bold border border-stone-200">
                    Standard
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  70% / 30%
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  70% to local closing broker · 30% PropGrowth inbound lead origination.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Zero desk or tech fees deducted
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Active Buyer Pipeline
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Live Showings
                  </span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  6 Buyers
                </div>
                <p className="mt-3 text-[11px] text-stone-500">
                  Pre-screened inbound buyers currently attending showings with you.
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  Territory: Miami, Coral Gables, Palm Beach
                </div>
              </div>
            </div>

            {/* Escrow Pipeline Table */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">
                    Active Co-Broker Escrow Ledger
                  </h2>
                  <p className="text-xs text-stone-500">
                    Live deal status, title escrow verification, and scheduled settlement dates.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast("Downloading Escrow Co-Broker PDF Agreement...")}
                  className="rounded-full text-xs font-semibold border-stone-300"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  <span>Download Agreement Template</span>
                </Button>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  {
                    deal: "Porsche Design Tower Penthouse #4201",
                    location: "Sunny Isles Beach, FL",
                    amount: "$4,200,000",
                    commissionTotal: "$42,000",
                    brokerCommission: "$29,400 (70%)",
                    stage: "Title Search & HOA Approval",
                    estClosing: "November 14, 2026",
                    status: "In Escrow",
                  },
                  {
                    deal: "Venetian Islands Bayfront Estate",
                    location: "San Marino Island, Miami Beach",
                    amount: "$3,500,000",
                    commissionTotal: "$35,000",
                    brokerCommission: "$24,500 (70%)",
                    stage: "Home & Marine Inspection Cleared",
                    estClosing: "November 28, 2026",
                    status: "In Escrow",
                  },
                  {
                    deal: "Continuum South Beach #2804",
                    location: "South of Fifth, Miami Beach",
                    amount: "$2,100,000",
                    commissionTotal: "$21,000",
                    brokerCommission: "$14,700 (70%)",
                    stage: "Wire Confirmed · Closed",
                    estClosing: "October 18, 2026",
                    status: "Paid",
                  },
                ].map((deal) => (
                  <div
                    key={deal.deal}
                    className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-[#fcfcfb] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-stone-900">{deal.deal}</span>
                        <span
                          className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold ${
                            deal.status === "Paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {deal.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {deal.location}
                      </p>
                      <div className="text-xs text-stone-600 font-medium pt-1">
                        Deal Value: <span className="font-bold text-stone-900">{deal.amount}</span> • Stage:{" "}
                        <span className="text-stone-800 font-semibold">{deal.stage}</span>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-center gap-1 border-t md:border-t-0 pt-2 md:pt-0 border-stone-100">
                      <span className="text-[11px] text-stone-400 font-mono uppercase">
                        Your 70% Share
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-emerald-700">
                        {deal.brokerCommission}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Target Close: {deal.estClosing}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: WHATSAPP DISPATCH & ROUTING SETTINGS                    */}
        {/* ============================================================== */}
        {activeTab === "routing" && (
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                  WhatsApp Dispatch Routing & Filters
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Configure where instant buyer & luxury tenant inquiries are dispatched. Guaranteed under 90-second delivery.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                {/* WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Primary WhatsApp Phone for Instant Dispatches
                  </label>
                  <Input
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+1 (305) 555-0192"
                    className="h-10 text-sm bg-stone-50/70 border-stone-200 rounded-xl"
                  />
                  <p className="text-[11px] text-stone-500">
                    Inbound pre-screened leads are sent directly to this WhatsApp number within 90 seconds.
                  </p>
                </div>

                {/* Minimum Budget Qualification Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Strict Budget Floor Filter
                  </label>
                  <Input
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    className="h-10 text-sm bg-stone-50/70 border-stone-200 rounded-xl"
                  />
                  <p className="text-[11px] text-stone-500">
                    Inquiries below this threshold are automatically routed away from your exclusive slot.
                  </p>
                </div>

                {/* Instant Notifications Toggle */}
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      90-Second WhatsApp Alert Ping
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Send audio notification alert alongside complete client dossier.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInstantAlerts(!instantAlerts)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      instantAlerts ? "bg-emerald-600" : "bg-stone-300"
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        instantAlerts ? "translate-x-6.5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* Save Button */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    Changes take effect on your next incoming lead.
                  </span>
                  <Button
                    type="submit"
                    className="rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs h-10 px-6 cursor-pointer"
                  >
                    {settingsSaved ? (
                      <span className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Saved
                      </span>
                    ) : (
                      "Save Preferences"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ================= FULL PROFILE DIALOG MODAL ================= */}
      <Dialog
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
      >
        <DialogContent className="max-w-lg bg-white rounded-2xl p-6 border border-stone-200 shadow-2xl">
          {selectedLead && (
            <div className="space-y-4">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-stone-500">
                    CLIENT DOSSIER #{selectedLead.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-amber-500/10 text-amber-800">
                    {selectedLead.dealType}
                  </span>
                </div>
                <DialogTitle className="text-xl font-bold text-stone-900">
                  {selectedLead.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-stone-500">
                  Pre-screened verified lead dispatched to your Miami Tier-1 quota.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Direct WhatsApp</span>
                  <span className="font-bold text-stone-900 font-mono">
                    {selectedLead.maskedPhone}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Target Property</span>
                  <span className="font-semibold text-stone-900 text-right">
                    {selectedLead.property}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Budget Bracket</span>
                  <span className="font-bold text-emerald-700">
                    {selectedLead.budget}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Move-in Timeframe</span>
                  <span className="font-semibold text-stone-900">
                    {selectedLead.moveIn}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Proof of Funds</span>
                  <span className="font-semibold text-stone-900">
                    {selectedLead.qualification}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9.5 gap-1.5 cursor-pointer">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Launch WhatsApp Chat</span>
                  </Button>
                </a>
                <Button
                  variant="outline"
                  onClick={() => setSelectedLead(null)}
                  className="rounded-full text-xs font-semibold h-9.5 px-4 border-stone-300"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ================= 100% REPLACEMENT MODAL ================= */}
      <Dialog
        open={replacementModalOpen}
        onOpenChange={setReplacementModalOpen}
      >
        <DialogContent className="max-w-md bg-white rounded-2xl p-6 border border-stone-200 shadow-2xl">
          <DialogHeader>
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center mb-2">
              <RefreshCw className="w-5 h-5 text-amber-600" />
            </div>
            <DialogTitle className="text-lg font-bold text-stone-900">
              Request 100% Credit Replacement
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-600">
              Under our Zero-Wastage SLA, if a client does not reply within 48 hours or provided an invalid requirement, we replace the lead credit instantly with zero questions asked.
            </DialogDescription>
          </DialogHeader>

          {replacementTargetLead && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-stone-500">Lead to be replaced:</div>
                <div className="font-bold text-stone-900 mt-0.5">
                  #{replacementTargetLead.id} · {replacementTargetLead.name}
                </div>
                <div className="text-stone-600 mt-0.5">
                  {replacementTargetLead.property} ({replacementTargetLead.budget})
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-stone-700">Reason for Replacement:</label>
                <select
                  value={replacementReason}
                  onChange={(e) => setReplacementReason(e.target.value)}
                  className="w-full h-9 rounded-xl border border-stone-200 bg-white px-3 text-xs text-stone-800"
                >
                  <option value="unreachable">Client unreachable via WhatsApp / Phone after 48h</option>
                  <option value="budget_mismatch">Budget bracket does not match property tier</option>
                  <option value="outside_territory">Client relocated outside Miami Tier-1</option>
                  <option value="already_contracted">Client signed elsewhere prior to dispatch</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  onClick={handleTriggerReplacement}
                  className="flex-1 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs h-9.5 cursor-pointer"
                >
                  Confirm Instant Replacement
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setReplacementModalOpen(false)}
                  className="rounded-full text-xs font-semibold h-9.5 px-4 border-stone-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

