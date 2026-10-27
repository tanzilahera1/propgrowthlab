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
    sm: { width: 32, height: 32, class: "w-8 h-8" },
    md: { width: 40, height: 40, class: "w-10 h-10" },
    lg: { width: 56, height: 56, class: "w-14 h-14" },
    xl: { width: 80, height: 80, class: "w-20 h-20" },
  };

  // Text Sizes
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  };

  const currentSize = iconPixelSizes[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-opacity hover:opacity-95 active:scale-[0.98] ${
        layout === "vertical" ? "flex-col text-center" : "flex-row"
      } ${className}`}
      aria-label="PropGrowth Lab"
    >
      {/* ================= LOGO IMAGE ================= */}
      <div className={`relative flex-shrink-0 ${currentSize.class}`}>
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
          <div className="flex items-center tracking-tight leading-none">
            <span
              className={`font-black tracking-tight text-transparent bg-clip-text ${
                theme === "dark"
                  ? "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"
                  : "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"
              } ${textSizes[size]}`}
            >
              PropGrowth <span className="font-semibold ml-0.5">Lab</span>
            </span>
          </div>

          {showTagline && (
            <span
              className={`text-[9px] font-semibold tracking-widest uppercase mt-1 ${
                theme === "dark" ? "text-amber-400/70" : "text-amber-800/70"
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
