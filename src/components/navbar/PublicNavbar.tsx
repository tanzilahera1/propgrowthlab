"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropGrowthLogo } from "@/components/common/PropGrowthLogo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menu,
  ArrowRight,
  Sparkles,
  Building2,
  TrendingUp,
  Users,
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
    icon: Users,
    badge: "Co-Broker",
  },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#fbfbfa]/95 backdrop-blur-xl shadow-xs border-b border-stone-200/90"
          : "bg-[#fbfbfa]/85 backdrop-blur-lg border-b border-stone-200/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* ================= LEFT: SINGLE-LINE LOGO ================= */}
          <div className="flex-shrink-0">
            <PropGrowthLogo size="md" />
          </div>

          {/* ================= CENTER: DESKTOP PILLAR NAVIGATION ================= */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 bg-stone-100/90 backdrop-blur-md p-1 lg:p-1.5 rounded-full border border-stone-200/90 shadow-xs">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-2.5 lg:px-4 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                    isActive
                      ? "bg-stone-900 text-white font-bold shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/90"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ================= RIGHT: CTA BUTTON CLUSTER (RESPONSIVE) ================= */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/leads" className="hidden xl:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-semibold px-3.5 h-9 bg-white border border-stone-200 hover:border-amber-400 hover:bg-stone-50 text-stone-700 whitespace-nowrap shadow-xs transition-colors"
              >
                Broker Leads
              </Button>
            </Link>
            <Link href="/agency">
              <Button
                size="sm"
                className="rounded-full text-xs font-bold px-3.5 lg:px-4 h-9 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 border border-amber-600/30 transition-all active:scale-95 whitespace-nowrap gap-1.5"
              >
                <span>Book Audit</span>
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </Button>
            </Link>
          </div>

          {/* ================= MOBILE HAMBURGER TRIGGER ================= */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/agency" className="hidden sm:inline-flex">
              <Button
                size="sm"
                className="rounded-full text-[11px] font-bold px-3 h-8 bg-gradient-to-r from-amber-600 to-amber-700 text-white whitespace-nowrap shadow-xs"
              >
                Book Audit
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-stone-100 transition-colors focus:outline-none border border-stone-200/80 bg-white shadow-xs"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-sm p-6 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-l border-stone-200/90 flex flex-col justify-between z-[9999]"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <PropGrowthLogo size="sm" />
                    <SheetTitle className="sr-only">
                      Mobile Navigation Menu
                    </SheetTitle>
                  </div>

                  {/* Growth Solutions Menu */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">
                      Growth Solutions & Services
                    </p>
                    <div className="space-y-1">
                      {NAV_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-start gap-3.5 p-3 rounded-2xl transition-all duration-200 ${
                              isActive
                                ? "bg-slate-900 text-amber-400 shadow-sm border border-amber-500/20"
                                : "hover:bg-amber-50/60 text-slate-700"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                isActive
                                  ? "bg-slate-800 text-amber-400"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold truncate">
                                  {link.name}
                                </span>
                                <span
                                  className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                                    isActive
                                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                      : "bg-slate-200 text-slate-600"
                                  }`}
                                >
                                  {link.badge}
                                </span>
                              </div>
                              <p
                                className={`text-xs mt-0.5 truncate ${
                                  isActive ? "text-slate-300" : "text-slate-500"
                                }`}
                              >
                                {link.tagline}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile Bottom Actions */}
                <div className="pt-6 border-t border-slate-100 space-y-2.5">
                  <Link
                    href="/leads"
                    onClick={() => setMobileOpen(false)}
                    className="w-full block"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-xl text-xs font-bold border-amber-300 text-slate-800 hover:bg-amber-50"
                    >
                      Broker Daily Lead Quota
                    </Button>
                  </Link>
                  <Link
                    href="/agency"
                    onClick={() => setMobileOpen(false)}
                    className="w-full block"
                  >
                    <Button className="w-full h-11 rounded-xl text-xs font-bold bg-slate-950 text-white hover:bg-slate-900 gap-2 border border-amber-500/20">
                      <span>Schedule 360° Growth Audit</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
