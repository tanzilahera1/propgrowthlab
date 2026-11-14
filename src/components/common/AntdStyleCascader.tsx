"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, Check, X, MapPin } from "lucide-react";
import { MunicipalityGroup, DistrictOption } from "@/data/rentalCities";

export interface AntdStyleCascaderProps {
  municipalities: MunicipalityGroup[];
  selectedMunicipality: string;
  selectedDistrict: string;
  onSelect: (municipality: string, districtFullName: string) => void;
  placeholder?: string;
  className?: string;
}

export function AntdStyleCascader({
  municipalities,
  selectedMunicipality,
  selectedDistrict,
  onSelect,
  placeholder = "Please select location...",
  className = "",
}: AntdStyleCascaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active municipality previewed in Column 1 (switches Column 2 on hover/click)
  const [activeMuniName, setActiveMuniName] = useState<string>(
    selectedMunicipality || municipalities[0]?.name || "Doha"
  );

  // Sync activeMuniName when selectedMunicipality changes or when dropdown opens
  useEffect(() => {
    if (selectedMunicipality) {
      setActiveMuniName(selectedMunicipality);
    }
  }, [selectedMunicipality, isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Get active municipality object
  const activeMuni =
    municipalities.find((m) => m.name === activeMuniName) || municipalities[0];
  const activeAreas: DistrictOption[] = activeMuni?.districts || [];

  // Display text for the trigger box (strips serial number for selected display: "Doha / Madinat Khalifa North")
  const cleanDistrictName = selectedDistrict.replace(/^\d+\.\s*/, "").trim();
  const displayText =
    selectedMunicipality && selectedDistrict
      ? `${selectedMunicipality} / ${cleanDistrictName}`
      : "";

  const handleSelectArea = (areaFullName: string) => {
    onSelect(activeMuniName, areaFullName);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (municipalities[0]?.districts?.[0]) {
      onSelect(municipalities[0].name, municipalities[0].districts[0].fullName);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      
      {/* ============================================================== */}
      {/* CASCADER TRIGGER INPUT BOX (Matches Ant Design Cascader Input)  */}
      {/* ============================================================== */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border bg-white text-left transition-all flex items-center justify-between gap-2 shadow-xs cursor-pointer group ${
          isOpen
            ? "border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
            : "border-stone-300 hover:border-stone-400"
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          {displayText ? (
            <span className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
              {displayText}
            </span>
          ) : (
            <span className="text-stone-400 text-xs sm:text-sm truncate">
              {placeholder}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-stone-400">
          {displayText && (
            <span
              onClick={handleClear}
              className="p-1 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              title="Reset selection"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-blue-600" : ""
            }`}
          />
        </div>
      </button>

      {/* ============================================================== */}
      {/* MULTI-COLUMN CASCADING DROPDOWN (Exact Ant Design Visual Style) */}
      {/* ============================================================== */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white rounded-xl border border-stone-200 shadow-2xl overflow-hidden flex divide-x divide-stone-200 animate-in fade-in-50 zoom-in-95 duration-100 max-w-[calc(100vw-2rem)] max-h-[min(420px,calc(100vh-140px))]">
          
          {/* ---------------------------------------------------------- */}
          {/* COLUMN 1: MUNICIPALITIES (Left Column)                     */}
          {/* ---------------------------------------------------------- */}
          <div className="w-32 sm:w-36 py-1.5 bg-stone-50/70 overflow-y-auto h-[340px] sm:h-[400px] shrink-0">
            <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 mb-1">
              Municipality
            </div>
            {municipalities.map((muni) => {
              const isActive = activeMuniName === muni.name;
              return (
                <div
                  key={muni.name}
                  onMouseEnter={() => setActiveMuniName(muni.name)}
                  onClick={() => setActiveMuniName(muni.name)}
                  className={`px-3 py-2.5 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors mx-1 rounded-lg ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs font-bold"
                      : "text-stone-700 hover:bg-stone-200/60"
                  }`}
                >
                  <span className="truncate">{muni.name}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? "text-white" : "text-stone-400"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* ---------------------------------------------------------- */}
          {/* COLUMN 2: AREAS (Right Cascading Column)                   */}
          {/* ---------------------------------------------------------- */}
          <div className="w-56 sm:w-64 md:w-72 py-1.5 bg-white overflow-y-auto h-[340px] sm:h-[400px] scroll-smooth">
            <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 mb-1 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
              <span>Areas in {activeMuniName}</span>
              <span className="text-stone-400">{activeAreas.length}</span>
            </div>

            {activeAreas.map((area) => {
              const isSelected =
                selectedMunicipality === activeMuniName &&
                (selectedDistrict === area.fullName ||
                  cleanDistrictName === area.name ||
                  selectedDistrict === area.name);

              return (
                <div
                  key={area.fullName}
                  onClick={() => handleSelectArea(area.fullName)}
                  className={`px-3 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors mx-1 rounded-lg ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-stone-800 hover:bg-stone-100"
                  }`}
                >
                  <span className="truncate">{area.fullName}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 shrink-0 ml-1.5" />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
