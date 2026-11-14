"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  MapPin,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Phone,
  ArrowRight,
  Clock,
  DollarSign,
  Copy,
  Info,
  Check,
  Home,
  MessageCircle,
  Sparkles,
  Search,
  ChevronDown,
  Sliders,
  Compass,
  Radio,
  Navigation,
  Crosshair,
  Filter,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CITY_CONFIGS,
  MunicipalityGroup,
  DistrictOption,
  QATAR_MUNICIPALITIES,
} from "@/data/rentalCities";
import { AntdStyleCascader } from "@/components/common/AntdStyleCascader";

interface LocalRentClientProps {
  slug: string;
}

export function LocalRentClient({ slug }: LocalRentClientProps) {
  const { data: session } = useSession();
  const normalizedSlug = (slug || "doha").toLowerCase();
  const config = CITY_CONFIGS[normalizedSlug] || CITY_CONFIGS["doha"];

  const municipalities: MunicipalityGroup[] =
    config.municipalities && config.municipalities.length > 0
      ? config.municipalities
      : QATAR_MUNICIPALITIES;

  // 1st Layer: Municipality (e.g. Doha, Al Rayyan, Al Wakrah, Umm Salal)
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>(() => {
    return municipalities[0]?.name || "Doha";
  });

  // Current active municipality & its numbered districts
  const activeMunicipality =
    municipalities.find((m) => m.name === selectedMunicipality) || municipalities[0];
  const activeDistricts: DistrictOption[] = activeMunicipality?.districts || [];

  // Area Select (Serially Numbered, e.g. "01. Madinat Khalifa North")
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    return activeDistricts[0]?.fullName || "";
  });

  // Form State
  const [selectedArea, setSelectedArea] = useState<string>(() => {
    return activeDistricts[0]?.fullName || config.popularAreas[0] || "";
  });
  const [selectedRoomType, setSelectedRoomType] = useState<string>(config.roomTypes[0]?.label || "Single Room");
  const [customRoomType, setCustomRoomType] = useState<string>("");
  const [isCustomRoomType, setIsCustomRoomType] = useState<boolean>(false);
  const defaultBudgetValue =
    config.budgetPresets.find((bp) => bp.label.includes("1,200 – 1,500"))?.value ||
    config.budgetPresets[2]?.value ||
    config.budgetPresets[0]?.value ||
    "";

  const [budget, setBudget] = useState<string>(defaultBudgetValue);
  const [customBudget, setCustomBudget] = useState<string>("");
  const [isCustomBudget, setIsCustomBudget] = useState<boolean>(false);
  const [moveInTimeframe, setMoveInTimeframe] = useState<string>("Within 15 days");
  const [needsMovingService, setNeedsMovingService] = useState<boolean>(true);
  const [movingCurrentArea, setMovingCurrentArea] = useState<string>("");

  // Contact info
  const [fullName, setFullName] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>(config.defaultPhoneCode);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Pre-fill user details if logged in
  useEffect(() => {
    if (session?.user) {
      if (session.user.name && !fullName) {
        setFullName(session.user.name);
      }
      if (session.user.email && !email) {
        setEmail(session.user.email);
      }
    }
  }, [session]);

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [ticketModalOpen, setTicketModalOpen] = useState<boolean>(false);
  const [generatedTicket, setGeneratedTicket] = useState<{
    ticketId: string;
    fullName: string;
    roomType: string;
    territory: string;
    budget: string;
    whatsapp: string;
    needsMovingService: boolean;
  } | null>(null);

  const [savedTicket, setSavedTicket] = useState<{
    ticketId: string;
    fullName: string;
    roomType: string;
    territory: string;
    budget: string;
    whatsapp: string;
    needsMovingService: boolean;
  } | null>(null);

  // Load previously saved ticket from browser localStorage (Guest recovery)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("propgrowth_last_ticket");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.ticketId) {
            setSavedTicket(parsed);
          }
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const [copied, setCopied] = useState<boolean>(false);

  // Clusters fallback for territory grouping
  const clusters = config.clusters || [
    {
      id: "hub_primary",
      name: `${config.name} Core Zones`,
      coordinatorTitle: `${config.name} Coordinator Hub`,
      anchorLocation: config.popularAreas[0] || config.name,
      radiusKm: 12,
      zones: config.popularAreas,
    },
  ];

  // Sync if slug / config changes
  useEffect(() => {
    setSelectedRoomType(config.roomTypes[0]?.label || "Single Room");
    const defBudget =
      config.budgetPresets.find((bp) => bp.label.includes("1,200 – 1,500"))?.value ||
      config.budgetPresets[2]?.value ||
      config.budgetPresets[0]?.value ||
      "";
    setBudget(defBudget);
    setPhoneCode(config.defaultPhoneCode);

    const mList = config.municipalities && config.municipalities.length > 0
      ? config.municipalities
      : QATAR_MUNICIPALITIES;

    const firstMuni = mList[0];
    const defaultMuniName = firstMuni?.name || "Doha";
    setSelectedMunicipality(defaultMuniName);

    if (firstMuni && firstMuni.districts.length > 0) {
      const defaultDist = firstMuni.districts[0];
      setSelectedDistrict(defaultDist.fullName);
      setSelectedArea(defaultDist.fullName);
    }
  }, [config]);

  // Handle Layer 1 Municipality change (switches Layer 2 to first district of new municipality)
  const handleMunicipalityChange = (muniName: string) => {
    setSelectedMunicipality(muniName);
    const targetMuni = municipalities.find((m) => m.name === muniName);
    if (targetMuni && targetMuni.districts.length > 0) {
      const firstDistrict = targetMuni.districts[0].fullName;
      setSelectedDistrict(firstDistrict);
      setSelectedArea(firstDistrict);
    }
  };

  // Handle Layer 2 District change
  const handleDistrictChange = (districtFullName: string) => {
    setSelectedDistrict(districtFullName);
    setSelectedArea(districtFullName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMsg("Please enter your active WhatsApp contact number.");
      return;
    }

    const fullWhatsApp = `${phoneCode}${phoneNumber.replace(/[^0-9]/g, "")}`;
    const effectiveBudget = isCustomBudget && customBudget.trim()
      ? `${customBudget.trim()} ${config.currency} / mo`
      : budget;
    const effectiveRoomType = isCustomRoomType && customRoomType.trim()
      ? customRoomType.trim()
      : selectedRoomType;

    const rawDistrict = selectedDistrict || selectedArea;
    const cleanDistrict = rawDistrict.replace(/^\d+\.\s*/, "").replace(/\s*\(.*?\)/, "").trim();

    setLoading(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        whatsapp: fullWhatsApp,
        email: email.trim(),
        territory: `${cleanDistrict}, ${selectedMunicipality} (${config.countryName})`,
        territoryCode: `${config.countryCode}-${cleanDistrict.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase()}-01`,
        locationDetails: {
          countryCode: config.countryCode,
          divisionOrState: selectedMunicipality,
          districtOrCity: config.districtOrCity,
          upazilaOrThana: cleanDistrict,
        },
        propertyType: effectiveRoomType,
        leadCategory: "room_rental",
        budget: effectiveBudget,
        moveInTimeframe,
        needsMovingService,
        movingDetails: needsMovingService
          ? {
              currentArea: movingCurrentArea.trim() || "Local Area",
              preferredDate: moveInTimeframe,
            }
          : undefined,
        source: `Public Landing /find-room/${config.slug}`,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit lead request.");
      }

      const ticketObj = {
        ticketId: data.ticketId,
        fullName: fullName.trim(),
        roomType: effectiveRoomType,
        territory: payload.territory,
        budget: effectiveBudget,
        whatsapp: fullWhatsApp,
        needsMovingService,
      };

      setGeneratedTicket(ticketObj);
      setSavedTicket(ticketObj);

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("propgrowth_last_ticket", JSON.stringify(ticketObj));
        } catch (storageErr) {
          console.warn("Could not save ticket to localStorage:", storageErr);
        }
      }

      setTicketModalOpen(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyTicketCode = () => {
    if (generatedTicket?.ticketId) {
      navigator.clipboard.writeText(generatedTicket.ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getWhatsAppShareLink = () => {
    if (!generatedTicket) return "#";
    const cleanDistrict = (selectedDistrict || selectedArea).replace(/^\d+\.\s*/, "").trim();
    const msg = `Hello PropGrowth Lab Concierge! I just requested a room in ${config.countryName} > ${selectedMunicipality} > ${cleanDistrict} under Ticket #${generatedTicket.ticketId}. Please connect me with verified options and moving assistance.`;
    return `https://wa.me/8801330807372?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#fbfbfa] pt-14 sm:pt-16 pb-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Breadcrumb & Regional Quick Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 pb-2 border-b border-stone-200">
          <div className="flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/find-room" className="hover:text-stone-900 transition-colors">
              Find Room
            </Link>
            <span>/</span>
            <span className="font-bold text-stone-900 flex items-center gap-1">
              <span>{config.flag}</span> {config.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-stone-400 hidden xs:inline">Region:</span>
            <Link
              href="/find-room/doha"
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                config.slug === "doha"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-stone-200/80 hover:bg-stone-300 text-stone-700"
              }`}
            >
              🇶🇦 Doha
            </Link>
            <Link
              href="/find-room/madeira"
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                config.slug === "madeira"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-stone-200/80 hover:bg-stone-300 text-stone-700"
              }`}
            >
              🇵🇹 Madeira
            </Link>
            <Link
              href="/find-room/dubai"
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                config.slug === "dubai"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-stone-200/80 hover:bg-stone-300 text-stone-700"
              }`}
            >
              🇦🇪 Dubai
            </Link>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center space-y-3 pt-1">
          {/* AntD-style rounded-[4px] slim borderless tag matching Home / Templates / Agency / Leads / Partners */}
          <div className="inline-flex items-center gap-1.5 py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-[4px] bg-stone-900 text-amber-300 text-[9.5px] sm:text-[10.5px] lg:text-xs font-mono font-bold tracking-wider uppercase shadow-xs whitespace-nowrap border border-stone-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">{config.flag} {config.tagline.toUpperCase()}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-900 leading-tight">
            {config.heroHeadline}
          </h1>

          <p className="text-xs sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            {config.heroSubheadline}
          </p>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 text-[11px] sm:text-xs text-stone-600 font-medium">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Anti-Fraud Verified Ticket</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Direct WhatsApp Match</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Luggage & Van Assistance</span>
            </div>
          </div>
        </div>

        {/* Returning Guest / Active Ticket Banner (Auto-recovered from browser storage) */}
        {savedTicket && !ticketModalOpen && (
          <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="text-emerald-950 font-medium">
                Active Ticket in Browser: <span className="font-mono font-bold text-stone-900 bg-white px-1.5 py-0.5 rounded border border-emerald-300">{savedTicket.ticketId}</span>
                <span className="text-emerald-800 ml-1.5 hidden xs:inline">({savedTicket.roomType} • {savedTicket.territory.split(",")[0]})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setGeneratedTicket(savedTicket);
                setTicketModalOpen(true);
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View Ticket Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Booking Card - Ultra Mobile Optimized */}
        <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-200/90 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-stone-900 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center font-black text-stone-950 text-xs">
                PGL
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm">
                  Verified Room & Relocation Request
                </div>
                <div className="text-[11px] text-stone-400">
                  Instant ticket match across {config.name} zones
                </div>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono">
              Live Network
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-7 space-y-6">
            
            {/* ========================================================================= */}
            {/* Step 1: Target Location - ANT DESIGN STYLE CASCADER                        */}
            {/* ========================================================================= */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>1. Select Location</span>
                </label>
                <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Cascader &bull; {activeDistricts.length} Areas
                </span>
              </div>

              {/* Ant Design Exact Multi-Column Cascader Dropdown */}
              <AntdStyleCascader
                municipalities={municipalities}
                selectedMunicipality={selectedMunicipality}
                selectedDistrict={selectedDistrict}
                onSelect={(muni, districtFullName) => {
                  setSelectedMunicipality(muni);
                  setSelectedDistrict(districtFullName);
                  setSelectedArea(districtFullName);
                }}
                placeholder={`Select location in ${config.countryName}...`}
              />

              {/* Active Selection Summary Breadcrumb */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-100/90 border border-stone-200 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-stone-500">Selected:</span>
                <span className="font-bold text-stone-900 truncate">
                  {selectedMunicipality} &gt; {selectedDistrict.replace(/^\d+\.\s*/, "").trim()}
                </span>
              </div>
            </div>

            {/* Step 2: Room Accommodation Type */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-amber-600" />
                  <span>2. Accommodation Type</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomRoomType(!isCustomRoomType)}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold underline cursor-pointer"
                >
                  {isCustomRoomType ? "Standard Types" : "Custom Type"}
                </button>
              </div>

              {!isCustomRoomType ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                  {config.roomTypes.map((rt) => {
                    const isSelected = selectedRoomType === rt.label;
                    return (
                      <button
                        type="button"
                        key={rt.id}
                        onClick={() => setSelectedRoomType(rt.label)}
                        className={`p-3 rounded-xl border text-left transition-all min-h-[60px] sm:min-h-[66px] flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20 shadow-xs"
                            : "border-stone-200 hover:border-stone-300 bg-stone-50/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 w-full">
                          <span className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                            {rt.label}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <div className="text-[10.5px] sm:text-xs text-stone-500 leading-tight mt-1 line-clamp-2">
                          {rt.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-1">
                  <Input
                    type="text"
                    placeholder="e.g. 2BHK Family Flat, Female Bedspace, Villa Portion..."
                    value={customRoomType}
                    onChange={(e) => setCustomRoomType(e.target.value)}
                    className="bg-white border-stone-300 h-10 text-xs sm:text-sm rounded-lg"
                  />
                  <p className="text-[11px] text-stone-500">
                    Describe your required accommodation type if not listed in standard presets.
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Monthly Budget */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  <span>3. Monthly Budget ({config.currency})</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomBudget(!isCustomBudget)}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold underline"
                >
                  {isCustomBudget ? "Standard Presets" : "Custom Amount"}
                </button>
              </div>

              {!isCustomBudget ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {config.budgetPresets.map((bp) => {
                    const isSelected = budget === bp.value;
                    return (
                      <button
                        type="button"
                        key={bp.value}
                        onClick={() => setBudget(bp.value)}
                        className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] flex items-center justify-center text-center ${
                          isSelected
                            ? "bg-stone-900 text-white shadow-xs"
                            : "bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200"
                        }`}
                      >
                        {bp.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center gap-2 max-w-xs">
                  <Input
                    type="number"
                    placeholder="e.g. 1500"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    className="bg-white border-stone-300 h-10"
                  />
                  <span className="font-bold text-xs sm:text-sm text-stone-700 shrink-0">
                    {config.currency} / month
                  </span>
                </div>
              )}
            </div>

            {/* Step 4: Move-in Timeframe */}
            <div className="space-y-2.5">
              <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>4. Move-in Timeline</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Immediate (< 3 Days)",
                  "Within 15 Days",
                  "1st of Next Month",
                  "Flexible Inquiry",
                ].map((time) => {
                  const isSelected = moveInTimeframe === time;
                  return (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setMoveInTimeframe(time)}
                      className={`px-2.5 py-2.5 rounded-xl text-xs font-semibold border text-center transition-all min-h-[42px] flex items-center justify-center ${
                        isSelected
                          ? "border-amber-500 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500"
                          : "border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Relocation & Moving Van Assistance (High-Conversion 4th-Party Upsell) */}
            <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white p-3.5 sm:p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500 text-white shrink-0 shadow-xs">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5 flex-wrap">
                      <span>Luggage & Moving Van Assistance</span>
                      <Badge className="bg-amber-600 text-white text-[9px] px-1.5 py-0">20% Voucher</Badge>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                      {config.moverPromoText}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <Switch
                    checked={needsMovingService}
                    onCheckedChange={setNeedsMovingService}
                    className="data-[state=checked]:bg-amber-500"
                  />
                </div>
              </div>

              {needsMovingService && (
                <div className="pt-2 border-t border-amber-200/60 space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-800">
                    Current Location / Moving From:
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Mansoura Street 810 or Funchal Lido"
                    value={movingCurrentArea}
                    onChange={(e) => setMovingCurrentArea(e.target.value)}
                    className="bg-white border-amber-200 text-xs h-9 rounded-lg"
                  />
                  <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>20% discount coupon will be locked with your Ticket ID upon closing.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 6: Contact Information */}
            <div className="space-y-3 pt-1 border-t border-stone-200">
              <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>5. Your Contact Information</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-600">Full Name *</label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Mohammad Rahman"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-stone-50 border-stone-300 text-sm h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-600">
                    WhatsApp Number *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value)}
                      className="w-20 bg-stone-100 border-stone-300 text-center font-bold text-xs sm:text-sm h-11 rounded-xl"
                    />
                    <Input
                      type="tel"
                      required
                      placeholder="e.g. 5550182"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 bg-stone-50 border-stone-300 text-sm h-11 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-stone-600">
                  Email Address (Optional — for digital ticket receipt)
                </label>
                <Input
                  type="email"
                  placeholder="e.g. tenant@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-50 border-stone-300 text-xs sm:text-sm h-10 rounded-xl"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-13 text-sm sm:text-base font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Generating Verification Ticket...</span>
                ) : (
                  <>
                    <span>Submit & Generate Verification Ticket</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
              <div className="text-center text-[11px] text-stone-500 mt-2 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero advance fees. Inspect before finalizing. Protected by PropGrowth Protocol.</span>
              </div>
            </div>

          </form>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1">
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-stone-200 shadow-xs text-center space-y-0.5">
            <div className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">
              Network Stays
            </div>
            <div className="text-sm sm:text-lg font-bold text-stone-900">
              {config.popularAreas.length * 4}+ Available
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-stone-200 shadow-xs text-center space-y-0.5">
            <div className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">
              Agent Match
            </div>
            <div className="text-sm sm:text-lg font-bold text-stone-900 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>&lt; 15 Mins</span>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-stone-200 shadow-xs text-center space-y-0.5">
            <div className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">
              Mover Discount
            </div>
            <div className="text-sm sm:text-lg font-bold text-emerald-600 flex items-center justify-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              <span>20% Off</span>
            </div>
          </div>
        </div>

      </div>

      {/* Ticket Success Modal (Optimized for Mobile & Desktop) */}
      <Dialog open={ticketModalOpen} onOpenChange={setTicketModalOpen}>
        <DialogContent className="sm:max-w-xl md:max-w-2xl bg-white border-stone-200 p-4 sm:p-6 rounded-2xl shadow-2xl max-h-[min(92vh,620px)] overflow-y-auto">
          <DialogHeader className="text-center sm:text-left pb-2 border-b border-stone-100 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-black text-stone-900">
                Room Request Ticket Generated!
              </DialogTitle>
              <DialogDescription className="text-xs text-stone-500">
                Your inquiry has been allocated to the {config.name} verified broker dispatch queue.
              </DialogDescription>
            </div>
          </DialogHeader>

          {generatedTicket && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Left Column: Official Ticket Box & Actions */}
              <div className="space-y-3 flex flex-col justify-between">
                {/* Ticket Monospace Display */}
                <div className="bg-stone-900 text-white rounded-xl p-3.5 text-center space-y-1 shadow-xs">
                  <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                    Official Verification Ticket
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-black tracking-wider text-white flex items-center justify-center gap-2">
                    <span>{generatedTicket.ticketId}</span>
                    <button
                      onClick={copyTicketCode}
                      className="p-1 hover:bg-stone-800 rounded text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="Copy Ticket ID"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Always quote this Ticket ID when communicating with the broker. Saved in WhatsApp &amp; browser.
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <a
                    href={getWhatsAppShareLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Track on WhatsApp Concierge</span>
                  </a>

                  {session?.user && (
                    <Link
                      href="/dashboard?tab=leads"
                      className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold h-9 rounded-xl flex items-center justify-center gap-1.5 transition-colors text-xs cursor-pointer"
                    >
                      <span>View in My Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={() => setTicketModalOpen(false)}
                    className="w-full border-stone-300 text-stone-700 h-9 rounded-xl text-xs hover:bg-stone-100 cursor-pointer"
                  >
                    Close Window
                  </Button>
                </div>
              </div>

              {/* Right Column: Summary Details & Security Advisory */}
              <div className="space-y-3">
                {/* Summary Details (Resume / Official Receipt Key-Value Grid) */}
                <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 text-xs space-y-2.5 text-stone-700">
                  <div className="grid grid-cols-[92px_12px_1fr] items-center">
                    <span className="text-stone-500 font-medium">Tenant Name</span>
                    <span className="text-stone-400 font-bold">:</span>
                    <span className="font-bold text-stone-900 truncate">{generatedTicket.fullName}</span>
                  </div>
                  <div className="grid grid-cols-[92px_12px_1fr] items-center">
                    <span className="text-stone-500 font-medium">Room Type</span>
                    <span className="text-stone-400 font-bold">:</span>
                    <span className="font-bold text-amber-700 truncate">{generatedTicket.roomType}</span>
                  </div>
                  <div className="grid grid-cols-[92px_12px_1fr] items-start">
                    <span className="text-stone-500 font-medium pt-0.5">Target Area</span>
                    <span className="text-stone-400 font-bold pt-0.5">:</span>
                    <span className="font-semibold text-stone-900 text-left leading-snug">{generatedTicket.territory}</span>
                  </div>
                  <div className="grid grid-cols-[92px_12px_1fr] items-center">
                    <span className="text-stone-500 font-medium">Budget Bracket</span>
                    <span className="text-stone-400 font-bold">:</span>
                    <span className="font-bold text-emerald-700">{generatedTicket.budget}</span>
                  </div>
                  {generatedTicket.needsMovingService && (
                    <div className="grid grid-cols-[92px_12px_1fr] items-center border-t border-stone-200/60 pt-2">
                      <span className="text-stone-500 font-medium">Moving Van</span>
                      <span className="text-stone-400 font-bold">:</span>
                      <span className="inline-flex items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-[11px] font-semibold w-fit">
                        Requested
                      </span>
                    </div>
                  )}
                </div>

                {/* Anti-Fraud / Security Protocol Notice */}
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Tenant Security Protocol:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Our verified coordinator will reach out via WhatsApp quoting Ticket #{generatedTicket.ticketId}. Never pay any advance deposit before viewing the room in person.
                  </p>
                </div>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
