"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropGrowthLogo } from "@/components/common/PropGrowthLogo";
import { Button } from "@/components/ui/button";
import { UserNavDropdown } from "./UserNavDropdown";
import {
  Sparkles,
  Building2,
  TrendingUp,
  Handshake,
  Layers,
  MapPinHouse,
  User,
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
    name: "Coordinators",
    href: "/coordinators",
    tagline: "Territory coordinators & guaranteed 70/30 split",
    icon: Handshake,
    badge: "70/30 Split",
  },
  {
    name: "Find Room",
    href: "/find-room",
    tagline: "Verified executive room search & relocation",
    icon: MapPinHouse,
    badge: "Verified Rooms",
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-3 lg:px-4 xl:px-8">
        <div className="flex items-center justify-between h-12 sm:h-13.5 lg:h-14">
          {/* ================= LEFT: SINGLE-LINE LOGO ================= */}
          <div className="flex-shrink-0">
            <PropGrowthLogo size="sm" className="gap-1.5 sm:gap-2 xl:gap-2.5" />
          </div>

          {/* ================= CENTER: DESKTOP PILLAR NAVIGATION ================= */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-stone-100/90 backdrop-blur-md p-0.5 lg:p-1 rounded-full border border-stone-200/90 shadow-2xs shrink-0">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative px-2 md:px-2 lg:px-2 xl:px-2.5 py-1 rounded-full text-[10.5px] md:text-[11px] lg:text-[11.5px] xl:text-xs font-semibold tracking-tight lg:tracking-normal transition-all duration-200 whitespace-nowrap flex items-center gap-1 lg:gap-1.5 ${
                    isActive
                      ? "bg-stone-900 text-white font-bold shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/90"
                  }`}
                >
                  <Icon
                    className={`hidden lg:inline-block w-3 h-3 lg:w-3.5 lg:h-3.5 transition-colors shrink-0 ${
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

          {/* ================= RIGHT: PRIMARY CTA & USER PROFILE PLACEHOLDER ================= */}
          <div className="hidden md:flex items-center gap-1 md:gap-1.5 lg:gap-2 shrink-0">
            <Link href="/agency#audit-form">
              <Button
                size="sm"
                className="rounded-full text-[10.5px] md:text-[11px] lg:text-xs font-bold px-2 md:px-2 lg:px-2.5 xl:px-3 h-7.5 lg:h-8 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-xs border border-amber-600/30 transition-all active:scale-95 whitespace-nowrap gap-1 lg:gap-1.5 cursor-pointer"
              >
                <span>Book Audit</span>
                <Sparkles className="hidden lg:inline w-3 h-3 lg:w-3.5 lg:h-3.5 text-white shrink-0" />
              </Button>
            </Link>

            {/* Luxury User Profile Menu Dropdown */}
            <UserNavDropdown />
          </div>

          {/* ================= MOBILE TOP HEADER CONTROLS (CLEAN WITH USER PLACEHOLDER) ================= */}
          <div className="flex items-center gap-1.5 md:hidden">
            <Link href="/agency#audit-form">
              <Button
                size="sm"
                className="rounded-full text-[11px] font-bold px-2.5 h-7.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-1 active:scale-95 transition-transform"
              >
                <span>Book Audit</span>
                <Sparkles className="w-3 h-3 text-white" />
              </Button>
            </Link>

            {/* Mobile User Profile Menu Dropdown */}
            <UserNavDropdown isMobile />
          </div>
        </div>
      </div>
    </header>

    {/* ================= MOBILE FLOATING BOTTOM DOCK (BALANCED BREATHING ROOM ON SIDES) ================= */}
    <nav
      aria-label="Mobile Bottom Navigation"
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-16px)] max-w-md transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#fbfbfa]/95 text-stone-700 backdrop-blur-xl border border-stone-200/90 shadow-xl shadow-stone-950/12 rounded-full py-1 px-1.5 flex items-center justify-between gap-0.5">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href + "/"));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex-1 h-10 rounded-full flex flex-col items-center justify-center transition-all duration-200 px-0.5 ${
                isActive
                  ? "bg-stone-900 text-white font-bold shadow-xs"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/80"
              }`}
            >
              <div className="flex items-center gap-0.5">
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-amber-400" : "text-stone-400"
                  }`}
                />
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                )}
              </div>
              <span
                className={`text-[9px] mt-0.5 tracking-tight leading-none truncate max-w-full ${
                  isActive ? "font-bold text-white" : "font-semibold text-stone-600"
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
