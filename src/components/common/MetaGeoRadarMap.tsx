"use client";

import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Minus,
  LocateFixed,
  Radio,
  Check,
  Info,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface MetaGeoRadarMapProps {
  locationName: string;
  countryName: string;
  radiusKm: number;
  onRadiusChange: (km: number) => void;
  coveredZones: string[];
  selectedZone: string;
  onSelectZone: (zone: string) => void;
  coordinatorTitle?: string;
}

export function MetaGeoRadarMap({
  locationName,
  countryName,
  radiusKm,
  onRadiusChange,
  coveredZones,
  selectedZone,
  onSelectZone,
  coordinatorTitle = "Zone 30-38 Coordinator Territory",
}: MetaGeoRadarMapProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [droppedPin, setDroppedPin] = useState<{ x: number; y: number } | null>(null);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoomLevel(1);
    setDroppedPin(null);
  };

  // Dynamic radius circle calculation
  const baseCircleRadius = 80;
  const radiusRatio = radiusKm / 12;
  const calculatedRadius = Math.round(baseCircleRadius * radiusRatio);

  // Approximate relative offsets for Doha zones on the vector canvas
  const zoneCoords: Record<string, { x: number; y: number; label: string }> = {
    "Madinat Khalifa North": { x: 195, y: 135, label: "Madinat Khalifa N" },
    "Madinat Khalifa South": { x: 198, y: 155, label: "Madinat Khalifa S" },
    "Al Gharrafa": { x: 165, y: 140, label: "Al Gharrafa" },
    "Al Duhail": { x: 215, y: 110, label: "Al Duhail" },
    "Dafna (West Bay)": { x: 250, y: 135, label: "Dafna" },
    "Dafna": { x: 250, y: 135, label: "Dafna" },
    "Bin Omran": { x: 210, y: 160, label: "Bin Omran" },
    "Al Sadd (Metro & Sports Club)": { x: 210, y: 180, label: "Al Sadd" },
    "Najma (Near Metro)": { x: 240, y: 195, label: "Najma" },
    "The Pearl-Qatar (Porto Arabia / Marina)": { x: 275, y: 105, label: "The Pearl" },
  };

  const currentCoords = zoneCoords[selectedZone] || { x: 200, y: 140, label: selectedZone };
  const pinX = droppedPin ? droppedPin.x : currentCoords.x;
  const pinY = droppedPin ? droppedPin.y : currentCoords.y;

  return (
    <div className="bg-white border-2 border-stone-300 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            f
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono">
              Locations • Meta Geo-Targeting Engine
            </div>
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <span>{countryName}</span>
              <span className="text-stone-300">/</span>
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[11px]">
                {locationName} + {radiusKm} km
              </span>
            </div>
          </div>
        </div>

        {/* Radius presets */}
        <div className="flex items-center gap-1">
          {[5, 10, 12, 17, 25].map((km) => (
            <button
              key={km}
              type="button"
              onClick={() => onRadiusChange(km)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                radiusKm === km
                  ? "bg-stone-900 text-amber-300 shadow-2xs"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-600"
              }`}
            >
              +{km}km
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE VECTOR RADAR MAP CANVAS                             */}
      {/* ============================================================== */}
      <div className="relative w-full h-[220px] sm:h-[260px] bg-[#eef3f7] rounded-xl overflow-hidden border border-stone-300 select-none">
        
        {/* SVG Vector Map Rendering */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Sea / Persian Gulf Water Background */}
            <rect width="400" height="300" fill="#d9ebf7" />

            {/* Qatar Landmass Shape */}
            <path
              d="M 50,0 
                 L 260,0 
                 C 270,30 290,60 280,95
                 C 275,110 295,115 285,130
                 C 270,145 280,170 270,195
                 C 260,225 250,260 260,300
                 L 0,300 
                 L 0,0 Z"
              fill="#f5efe6"
              stroke="#d8cfbe"
              strokeWidth="2"
            />

            {/* West Bay & The Pearl Coastline Contour */}
            <path
              d="M 280,95 Q 315,90 310,115 Q 290,130 275,135"
              fill="#e7dbcc"
              stroke="#caa97d"
              strokeWidth="1.5"
            />

            {/* Major Arterial Roads & Ring Roads (C-Ring, D-Ring, Al Shamal Expy) */}
            <path
              d="M 60,30 L 250,140 L 270,220"
              stroke="#ffffff"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M 60,30 L 250,140 L 270,220"
              stroke="#f3a953"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
            />

            {/* Ring Road Circles around Doha Center */}
            <circle cx="210" cy="155" r="55" fill="none" stroke="#ffffff" strokeWidth="3" />
            <circle cx="210" cy="155" r="85" fill="none" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="210" cy="155" r="115" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />

            {/* Top Metro Red Line Vector */}
            <path
              d="M 220,20 L 220,120 L 250,150 L 260,280"
              stroke="#e11d48"
              strokeWidth="2.5"
              fill="none"
              strokeOpacity="0.8"
            />

            {/* -------------------------------------------------------- */}
            {/* META RADIUS CIRCLE (Animated Translucent Blue Radar)      */}
            {/* -------------------------------------------------------- */}
            <g transform={`translate(${pinX}, ${pinY})`}>
              {/* Outer pulsing ring */}
              <circle
                r={calculatedRadius}
                fill="#2563eb"
                fillOpacity="0.14"
                stroke="#1d4ed8"
                strokeWidth="2"
                strokeDasharray="6 3"
                className="animate-pulse"
              />
              {/* Inner focus gradient */}
              <circle
                r={Math.max(calculatedRadius - 20, 20)}
                fill="#3b82f6"
                fillOpacity="0.08"
              />
              {/* Center Crosshair Marker */}
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#1e40af" strokeWidth="1.5" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#1e40af" strokeWidth="1.5" />
            </g>

            {/* Micro-Zones Interactive Pins on the Canvas */}
            {coveredZones.map((zone) => {
              const coords = zoneCoords[zone] || { x: 200, y: 150, label: zone };
              const isSelected = selectedZone === zone;

              return (
                <g
                  key={zone}
                  transform={`translate(${coords.x}, ${coords.y})`}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => onSelectZone(zone)}
                >
                  {/* Pin Dot */}
                  <circle
                    r={isSelected ? 7 : 4}
                    fill={isSelected ? "#dc2626" : "#2563eb"}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="shadow-md"
                  />
                  {/* Pin Label Box */}
                  <rect
                    x={-(coords.label.length * 3.2)}
                    y="-22"
                    width={coords.label.length * 6.4 + 10}
                    height="16"
                    rx="3"
                    fill={isSelected ? "#0f172a" : "#ffffff"}
                    stroke={isSelected ? "#f59e0b" : "#cbd5e1"}
                    strokeWidth={isSelected ? "1.5" : "1"}
                    filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.15))"
                  />
                  <text
                    x="5"
                    y="-11"
                    textAnchor="middle"
                    fill={isSelected ? "#fef08a" : "#334155"}
                    fontSize="8.5"
                    fontWeight={isSelected ? "bold" : "600"}
                    fontFamily="system-ui, sans-serif"
                  >
                    {coords.label}
                  </text>
                </g>
              );
            })}

            {/* Dropped Pin (if user clicked custom point) */}
            {droppedPin && (
              <g transform={`translate(${droppedPin.x}, ${droppedPin.y})`}>
                <circle r="8" fill="#dc2626" stroke="#ffffff" strokeWidth="2.5" />
                <text x="0" y="-14" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">
                  📍 Target Pin
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Floating Zoom & Center Controls (Top-Right, Meta Style) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 z-10">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-7 h-7 rounded bg-white shadow-md border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-7 h-7 rounded bg-white shadow-md border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-7 h-7 rounded bg-white shadow-md border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
            title="Center Pin"
          >
            <LocateFixed className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Drop Pin Button (Bottom-Right, exactly like Meta Ads Manager) */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <button
            type="button"
            onClick={() => {
              setDroppedPin({ x: 200, y: 140 });
            }}
            className="px-2.5 py-1 rounded bg-white hover:bg-stone-100 border border-stone-300 shadow-md text-stone-800 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Drop Pin</span>
          </button>
        </div>

        {/* Floating Scale & Attribution (Bottom-Left) */}
        <div className="absolute bottom-2 left-2.5 z-10 text-[10px] text-stone-600 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-stone-200 font-mono">
          Radius: ±{radiusKm} km • Doha Metro Arc
        </div>
      </div>

      {/* ============================================================== */}
      {/* COVERED MICRO-ZONES IN RADIUS (Click to Switch 1-Tap)          */}
      {/* ============================================================== */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] text-stone-600">
          <span className="font-bold flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Click any micro-zone within this +{radiusKm} km radius:</span>
          </span>
          <span className="text-[10px] text-stone-400 font-mono">1-tap select</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {coveredZones.map((zone) => {
            const isSelected = selectedZone === zone;
            return (
              <button
                key={zone}
                type="button"
                onClick={() => onSelectZone(zone)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? "bg-stone-900 text-amber-300 border-stone-900 shadow-2xs font-bold scale-[1.02]"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <span>{zone}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Meta Notice & Coordinator Guarantee */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-2.5 text-[11px] text-blue-900 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-bold text-blue-950">
            Assigned Coordinator: {coordinatorTitle}
          </div>
          <p className="text-blue-800 leading-tight">
            The location selection includes all areas within this {radiusKm} km radius, ensuring direct matching between room landlord, verified broker, and luggage mover with anti-scam ticket protection.
          </p>
        </div>
      </div>
    </div>
  );
}

