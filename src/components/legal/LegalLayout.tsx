"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, FileText, Cookie, ArrowRight, Lock, MessageSquare } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  badge: string;
  summary: string;
  toc: TocItem[];
  children: React.ReactNode;
}

const LEGAL_TABS = [
  { name: "Privacy Policy", shortName: "Privacy", href: "/privacy", icon: Lock },
  { name: "Terms of Service", shortName: "Terms", href: "/terms", icon: FileText },
  { name: "Cookie Policy", shortName: "Cookie", href: "/cookies", icon: Cookie },
];

export function LegalLayout({
  title,
  subtitle,
  effectiveDate,
  badge,
  summary,
  toc,
  children,
}: LegalLayoutProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(toc[0]?.id || "");

  // Intersection observer to highlight current TOC section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = toc.length - 1; i >= 0; i--) {
        const section = document.getElementById(toc[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(toc[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fbfbfa] text-stone-900 overflow-x-hidden">
      {/* ================= HERO HEADER ================= */}
      <section className="relative w-full pt-20 pb-12 sm:pt-26 sm:pb-16 bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#fbfbfa] border-b border-stone-200/90">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* AntD-style rounded-[4px] badge */}
          <div className="inline-flex items-center gap-2 py-0.5 px-2.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wide uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight">
            {title}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-3 flex items-center justify-center gap-3 text-xs font-mono text-stone-500">
            <span>Effective Date: <strong className="text-stone-800">{effectiveDate}</strong></span>
            <span>·</span>
            <span>Jurisdiction: <strong className="text-stone-800">USA, UK & International</strong></span>
          </div>

          {/* Quick Legal Switcher Tabs */}
          <div className="mt-7 sm:mt-8 inline-flex p-1 bg-stone-200/70 backdrop-blur-md rounded-2xl border border-stone-300/80 shadow-xs max-w-full">
            {LEGAL_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-stone-900 shadow-sm border border-stone-200/80"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-amber-600" : "text-stone-400"}`} />
                  <span className="sm:hidden">{tab.shortName}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT WITH TOC ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Executive Summary Callout Box */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider">
                Executive Compliance Summary
              </p>
              <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                {summary}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          {/* ================= STICKY TABLE OF CONTENTS (DESKTOP) ================= */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-400">
                Table of Contents
              </p>
              <nav className="space-y-1">
                {toc.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`block px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                        isActive
                          ? "bg-amber-500/15 text-amber-900 font-bold border-l-2 border-amber-600 pl-2.5"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Direct Legal Assistance Card */}
              <div className="pt-3 border-t border-stone-100">
                <p className="text-[11px] font-bold text-stone-800">Legal Inquiries?</p>
                <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                  Our compliance officer responds within 24 business hours.
                </p>
                <a
                  href="https://wa.me/8801540505122?text=Hi%20PropGrowth%20Lab%20Legal%20Team%2C%20I%20have%20an%20inquiry%20regarding%20compliance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Legal Desk</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* ================= DOCUMENT ARTICLE CONTENT ================= */}
          <article className="flex-1 min-w-0 prose prose-stone max-w-none">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}

export default LegalLayout;

