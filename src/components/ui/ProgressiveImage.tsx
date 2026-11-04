"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressiveImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  /** Shimmer skeleton aspect ratio or sizing class */
  aspectClass?: string;
  /** Fallback icon size — default size-12 */
  fallbackIconSize?: string;
  /** Container-এর extra className */
  containerClassName?: string;
}

export function ProgressiveImage({
  src,
  alt,
  className,
  aspectClass = "aspect-video",
  fallbackIconSize = "size-10",
  containerClassName,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative w-full overflow-hidden", aspectClass, containerClassName)}>
      {/* ── 1. Shimmer Skeleton ── */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 img-shimmer rounded-[inherit] z-0"
          aria-hidden="true"
        />
      )}

      {/* ── 2. Error Fallback ── */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-900/60 text-stone-400 z-10">
          <ImageOff className={cn(fallbackIconSize)} strokeWidth={1.5} />
          <span className="text-[10px] font-mono uppercase tracking-wider">
            Image Unavailable
          </span>
        </div>
      )}

      {/* ── 3. Actual Image ── */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-700 ease-in-out",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(false);
            setHasError(true);
          }}
          {...props}
        />
      )}
    </div>
  );
}

