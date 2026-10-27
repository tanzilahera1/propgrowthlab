"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/socialCustomSVGIcon/SocialCustomSVGIcon";

export function FloatingWhatsAppCTA() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = totalScroll / (windowHeight || 1);
      setScrollProgress(Math.min(100, Math.round(scroll * 100)));
      setShowScrollTop(totalScroll > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl =
    "https://wa.me/8801540505122?text=" +
    encodeURIComponent(
      "Hi PropGrowth Lab team, I would like to inquire about your PropTech systems, turnkey launches, and direct booking growth services."
    );

  return (
    <>
      {/* Scroll-To-Top Button with Circular SVG Progress Ring */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed z-40 bottom-20 sm:bottom-22 right-4 sm:right-6 w-11 h-11 rounded-full bg-stone-900/95 backdrop-blur-xl border border-stone-700/80 shadow-xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          {/* Circular SVG Progress Ring */}
          <svg className="w-11 h-11 absolute -rotate-90 pointer-events-none">
            <circle
              cx="22"
              cy="22"
              r="18"
              className="text-stone-800 stroke-current opacity-50"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              className="text-amber-500 stroke-current transition-all duration-150"
              strokeWidth="2.5"
              strokeDasharray={113.1}
              strokeDashoffset={113.1 - (113.1 * scrollProgress) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <ArrowUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Floating WhatsApp Action Pill Dock */}
      <aside
        aria-label="Instant WhatsApp Concierge"
        className="fixed z-40 bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center gap-2"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with PropGrowth Lab on WhatsApp"
          className="group relative h-11 sm:h-12 px-3.5 sm:px-4.5 rounded-full bg-stone-950/95 text-white border border-stone-700/80 backdrop-blur-xl shadow-2xl hover:border-emerald-500/70 hover:shadow-emerald-500/10 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
        >
          {/* Live Online Glowing Pulse */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
          </span>

          {/* WhatsApp Custom SVG Icon */}
          <div className="w-5 h-5 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
            <WhatsAppIcon size="20" />
          </div>

          {/* Text Labels */}
          <div className="flex flex-col items-start leading-none pr-1">
            <span className="text-[10px] font-mono text-stone-400 font-medium uppercase tracking-wider hidden sm:block">
              Live Concierge
            </span>
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
              <span>WhatsApp Chat</span>
              <Sparkles className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline" />
            </span>
          </div>
        </a>
      </aside>
    </>
  );
}

export default FloatingWhatsAppCTA;
