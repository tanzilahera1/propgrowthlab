import React from "react";
import Link from "next/link";
import Image from "next/image";

interface PropGrowthLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  layout?: "horizontal" | "vertical" | "icon-only";
  showTagline?: boolean;
  theme?: "light" | "dark";
}

export function PropGrowthLogo({
  className = "",
  size = "md",
  layout = "horizontal",
  showTagline = false,
  theme = "light",
}: PropGrowthLogoProps) {
  // Dimensions for Icon Image
  const iconPixelSizes = {
    sm: { width: 36, height: 36, class: "w-8 h-8 sm:w-8.5 sm:h-8.5" },
    md: { width: 44, height: 44, class: "w-9 h-9 sm:w-10 sm:h-10" },
    lg: { width: 56, height: 56, class: "w-12 h-12 sm:w-14 sm:h-14" },
    xl: { width: 80, height: 80, class: "w-16 h-16 sm:w-20 sm:h-20" },
  };

  // Text Sizes
  const textSizes = {
    sm: "text-base sm:text-lg",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
    xl: "text-3xl sm:text-4xl",
  };

  const currentSize = iconPixelSizes[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 sm:gap-3 group transition-opacity hover:opacity-95 active:scale-[0.98] ${
        layout === "vertical" ? "flex-col text-center" : "flex-row"
      } ${className}`}
      aria-label="PropGrowth Lab"
    >
      {/* ================= LOGO IMAGE (BORDERLESS, EXPANDED TO FULL BOUNDS) ================= */}
      <div
        className={`relative flex-shrink-0 ${currentSize.class} flex items-center justify-center`}
      >
        <Image
          src="/logo.png"
          alt="PropGrowth Lab"
          width={currentSize.width}
          height={currentSize.height}
          priority
          unoptimized
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* ================= WORDMARK ================= */}
      {layout !== "icon-only" && (
        <div className="flex flex-col">
          <div className={`flex items-center tracking-tight leading-none ${textSizes[size]}`}>
            <span
              className={`font-black tracking-tight text-transparent bg-clip-text ${
                theme === "dark"
                  ? "bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600"
                  : "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"
              }`}
            >
              PropGrowth
            </span>
            <span
              className={`font-semibold ml-1.5 ${
                theme === "dark" ? "text-white" : "text-stone-900"
              }`}
            >
              Lab
            </span>
          </div>

          {showTagline && (
            <span
              className={`text-[9px] font-semibold tracking-widest uppercase mt-1 ${
                theme === "dark" ? "text-stone-400" : "text-stone-500"
              }`}
            >
              Hospitality · PropTech · Growth
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
