"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropGrowthLogo } from "@/components/common/PropGrowthLogo";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Building2,
  TrendingUp,
  Handshake,
  Layers,
} from "lucide-react";

const NAV_LINKS = [
  {
    name: "Templates",
    href: "/templates",
    tagline: "PropTech code & 48h turnkey launch",
    icon: Layers,
    badge: "Turnkey Tech",
  },
  {
    name: "Agency",
    href: "/agency",
    tagline: "360° Ads & Direct Booking Engines",
    icon: TrendingUp,
    badge: "Direct Stays",
  },
  {
    name: "Leads",
    href: "/leads",
    tagline: "Daily verified tenant quota for brokers",
    icon: Building2,
    badge: "Daily Quotas",
  },
  {
    name: "Partners",
    href: "/partners",
    tagline: "Co-brokering & guaranteed 70/30 split",
    icon: Handshake,
    badge: "Co-Broker",
  },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Auto-hiding scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 15);

      // Always show navbar at the very top of the page
      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#fbfbfa]/95 backdrop-blur-xl shadow-xs border-b border-stone-200/90"
          : "bg-[#fbfbfa]/85 backdrop-blur-lg border-b border-stone-200/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* ================= LEFT: SINGLE-LINE LOGO ================= */}
          <div className="flex-shrink-0">
            <div className="md:hidden lg:block">
              <PropGrowthLogo size="md" />
            </div>
            <div className="hidden md:block lg:hidden">
              <PropGrowthLogo size="sm" />
            </div>
          </div>

          {/* ================= CENTER: DESKTOP PILLAR NAVIGATION ================= */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 bg-stone-100/90 backdrop-blur-md p-1 lg:p-1.5 rounded-full border border-stone-200/90 shadow-xs shrink-0">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative px-2.5 lg:px-3.5 py-1 lg:py-1.5 rounded-full text-[11px] lg:text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "bg-stone-900 text-white font-bold shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/90"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-colors shrink-0 ${
                      isActive
                        ? "text-amber-400"
                        : "text-stone-400 group-hover:text-stone-700"
                    }`}
                  />
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5 shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ================= RIGHT: PRIMARY CTA (SINGLE HIGH-CONVERTING ACTION) ================= */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link href="/agency#audit-form">
              <Button
                size="sm"
                className="rounded-full text-[11px] lg:text-xs font-bold px-3 lg:px-4 h-8.5 lg:h-9 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 border border-amber-600/30 transition-all active:scale-95 whitespace-nowrap gap-1.5 cursor-pointer"
              >
                <span>Book Audit</span>
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </Button>
            </Link>
          </div>

          {/* ================= MOBILE TOP HEADER CONTROLS (CLEAN: ZERO CLUTTER) ================= */}
          <div className="flex items-center md:hidden">
            <Link href="/agency#audit-form">
              <Button
                size="sm"
                className="rounded-full text-[11px] font-bold px-3.5 h-8 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>Book Audit</span>
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>

    {/* ================= MOBILE FLOATING BOTTOM DOCK (ULTRA-SLIM, LIGHT LUXURY THEME) ================= */}
    <nav
      aria-label="Mobile Bottom Navigation"
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-48px)] max-w-[290px] transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#fbfbfa]/95 text-stone-700 backdrop-blur-xl border border-stone-200/90 shadow-xl shadow-stone-900/10 rounded-full p-1 flex items-center justify-between gap-1">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex-1 py-1 px-1 rounded-full flex flex-col items-center justify-center transition-all ${
                isActive
                  ? "bg-stone-900 text-white font-bold shadow-xs"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/70"
              }`}
            >
              <div className="flex items-center gap-0.5">
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-amber-400" : "text-stone-400"
                  }`}
                />
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <span
                className={`text-[9px] mt-0.5 tracking-tight ${
                  isActive ? "font-bold text-white" : "font-medium text-stone-600"
                }`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  </>
);
}
