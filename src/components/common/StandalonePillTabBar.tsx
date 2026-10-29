"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TabCategory {
  id: string;
  label: string;
  count?: number;
  badge?: string;
}

export function StandalonePillTabBar({
  categories,
  activeTab,
  onTabChange,
  className = "",
  size = "default",
}: {
  categories: TabCategory[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
  size?: "default" | "sm";
}) {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isSlim = size === "sm";

  // Check scroll position to determine gradient fade & arrow visibility
  const checkTabsScroll = useCallback(() => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  }, []);

  // Center active tab smoothly on mount & tab change
  useEffect(() => {
    if (tabsListRef.current) {
      const activeEl = tabsListRef.current.querySelector<HTMLElement>("[data-active='true']");
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
    const timer = setTimeout(checkTabsScroll, 120);
    window.addEventListener("resize", checkTabsScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkTabsScroll);
    };
  }, [activeTab, checkTabsScroll]);

  // Smooth scroll by offset
  const handleScrollTabs = (direction: "left" | "right") => {
    if (tabsListRef.current) {
      const offset = direction === "left" ? (isSlim ? -180 : -240) : isSlim ? 180 : 240;
      tabsListRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setTimeout(checkTabsScroll, 320);
    }
  };

  return (
    <div className={`relative w-full lg:w-fit max-w-full ${className}`}>
      {/* Left gradient fade & scroll button */}
      <div
        className={`absolute left-0 top-0 bottom-0 z-20 flex items-center ${
          isSlim ? "pl-0.5 pr-4" : "pl-1 pr-6"
        } bg-gradient-to-r from-[#fbfbfa] via-[#fbfbfa]/95 to-transparent transition-opacity duration-200 pointer-events-none rounded-l-full ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => handleScrollTabs("left")}
          className={`pointer-events-auto ${
            isSlim ? "w-6 h-6" : "w-7 h-7"
          } rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer`}
          aria-label="Scroll left"
        >
          <ChevronLeft className={isSlim ? "w-3 h-3" : "w-4 h-4"} />
        </button>
      </div>

      {/* Core Pill TabBar Container */}
      <div
        ref={tabsListRef}
        onScroll={checkTabsScroll}
        className={`bg-stone-100/90 ${
          isSlim
            ? "p-1 min-h-[34px] sm:min-h-[36px]"
            : "p-1.5 min-h-[48px]"
        } rounded-full w-full lg:w-fit flex flex-nowrap overflow-x-auto gap-1 border border-stone-200/90 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth !justify-start items-center !h-auto`}
      >
        {categories.map((cat) => {
          const isActive = cat.id.toLowerCase() === activeTab.toLowerCase();
          return (
            <button
              key={cat.id}
              type="button"
              data-active={isActive ? "true" : undefined}
              onClick={() => onTabChange(cat.id)}
              className={`shrink-0 whitespace-nowrap ${
                isSlim
                  ? "h-6.5 sm:h-7 px-3 sm:px-3.5 text-[11px] sm:text-xs font-semibold"
                  : "h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold"
              } rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-stone-900 text-white shadow-xs font-bold"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <span>{cat.label}</span>
              {cat.count !== undefined && (
                <span className="text-[10px] sm:text-[11px] font-mono opacity-80">({cat.count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right gradient fade & scroll button */}
      <div
        className={`absolute right-0 top-0 bottom-0 z-20 flex items-center ${
          isSlim ? "pr-0.5 pl-4" : "pr-1 pl-6"
        } bg-gradient-to-l from-[#fbfbfa] via-[#fbfbfa]/95 to-transparent transition-opacity duration-200 pointer-events-none rounded-r-full ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => handleScrollTabs("right")}
          className={`pointer-events-auto ${
            isSlim ? "w-6 h-6" : "w-7 h-7"
          } rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer`}
          aria-label="Scroll right"
        >
          <ChevronRight className={isSlim ? "w-3 h-3" : "w-4 h-4"} />
        </button>
      </div>
    </div>
  );
}

export default StandalonePillTabBar;
