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
    <aside
      aria-label="Floating Actions"
      className="fixed z-40 bottom-20 md:bottom-6 right-3.5 flex flex-col items-center gap-2.5"
    >
      {/* 1. Scroll-To-Top Button (TOP) - Same w-11 h-11 Size */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="relative w-11 h-11 rounded-full bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-md flex items-center justify-center text-stone-700 hover:text-stone-900 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          {/* Circular SVG Progress Ring */}
          <svg className="w-11 h-11 absolute -rotate-90 pointer-events-none">
            <circle
              cx="22"
              cy="22"
              r="18"
              className="text-stone-200 stroke-current"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              className="text-amber-500 stroke-current transition-all duration-150"
              strokeWidth="2"
              strokeDasharray={113.1}
              strokeDashoffset={113.1 - (113.1 * scrollProgress) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Screenshot-Style Top Bar + Arrow Up */}
          <div className="flex flex-col items-center justify-center">
            <span className="w-3.5 h-[1.5px] bg-stone-700 rounded-full mb-[1px]" />
            <ArrowUp className="w-3.5 h-3.5 text-stone-700 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </button>
      )}

      {/* 2. WhatsApp Button (BOTTOM) - Same w-11 h-11 Size, Luxury Dark Color, Reduced Soft Ping */}
      <div className="relative">
        {/* Subtle, Low-Intensity Ping Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-25 animate-ping pointer-events-none" />
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with PropGrowth Lab on WhatsApp"
          title="Chat on WhatsApp"
          className="relative w-11 h-11 rounded-full bg-stone-950/95 text-[#25D366] border border-stone-700/80 backdrop-blur-xl shadow-xl shadow-stone-950/30 hover:border-emerald-500/70 hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
        >
          <WhatsAppIcon size="20" className="group-hover:scale-110 transition-transform" />

          {/* Live Online Indicator Dot */}
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366] border border-stone-950" />
          </span>
        </a>
      </div>
    </aside>
  );
}

export default FloatingWhatsAppCTA;
