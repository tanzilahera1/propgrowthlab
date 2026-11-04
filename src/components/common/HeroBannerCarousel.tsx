"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: string | number;
  image: string;
  alt: string;
  badge: string;
  badgeIcon?: LucideIcon;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  hookArrowText?: string;
  subtitle: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  trustPills?: Array<{
    icon: LucideIcon;
    label: string;
  }>;
}

interface HeroBannerCarouselProps {
  slides: HeroSlide[];
  autoplayDelay?: number;
  priorityFirst?: boolean;
  className?: string;
}

const emptySubscribe = () => () => {};

export function HeroBannerCarousel({
  slides,
  autoplayDelay = 5000,
  priorityFirst = true,
  className,
}: HeroBannerCarouselProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const plugins = useMemo(() => {
    if (!isClient) return [];
    return [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })];
  }, [isClient, autoplayDelay]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    plugins
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    queueMicrotask(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!slides || slides.length === 0) return null;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden group select-none pt-12 sm:pt-13.5 lg:pt-14",
        className
      )}
    >
      {/* ── Carousel Track ── */}
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex w-full">
          {slides.map((slide, index) => {
            const BadgeIcon = slide.badgeIcon || Sparkles;

            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] min-w-0 w-full"
              >
                {/* ── Responsive Luxury Banner Frame: Perfectly proportioned with spacious breathing room ── */}
                <div className="relative w-full h-[440px] sm:h-[480px] md:h-[510px] lg:h-[535px] xl:h-[550px] overflow-hidden">
                  {/* Background Image */}
                  <ProgressiveImage
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={priorityFirst && index === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                    aspectClass=""
                    containerClassName="absolute inset-0 z-0"
                  />

                  {/* Contrast Vignette Gradient: Top & Bottom Protection */}
                  <div className="absolute inset-0 z-1 bg-gradient-to-t from-black/90 via-black/50 to-black/40 pointer-events-none" />

                  {/* Subtle Amber Horizon Flare */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-28 bg-gradient-to-b from-amber-500/20 via-transparent to-transparent blur-3xl pointer-events-none z-1" />

                  {/* ── TOP BADGE: AntD-style rounded-[4px] borderless tag pinned near top edge ── */}
                  <div className="absolute top-2.5 sm:top-3 lg:top-3.5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-[4px] bg-black/70 backdrop-blur-md border-0 text-amber-300 text-[9.5px] sm:text-[10.5px] lg:text-xs font-mono font-bold tracking-wider uppercase shadow-md whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    <BadgeIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="whitespace-nowrap">{slide.badge}</span>
                  </div>

                  {/* ── Content Overlay: Generous, spacious, completely uncluttered typography with open vertical gaps (py) ── */}
                  <div className="relative z-10 w-full h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-5 sm:pb-8 flex flex-col justify-center items-center text-center">
                    {/* ── Commanding Headline: Bold, un-cramped, generous ── */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-black tracking-tight text-white leading-[1.22] sm:leading-[1.18] max-w-4xl drop-shadow-md">
                      {slide.titlePrefix}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                        {slide.titleHighlight}
                      </span>
                      {slide.titleSuffix ? ` ${slide.titleSuffix}` : ""}
                    </h1>

                    {/* ── Minimalist Clean Description with Leading ⤷ Arrow (Card removed for ultra-clean, uncluttered UX) ── */}
                    <p className="mt-2.5 sm:mt-4 lg:mt-4.5 max-w-2xl mx-auto px-4 text-xs sm:text-sm md:text-[15px] text-stone-200/95 font-normal leading-relaxed drop-shadow-sm text-balance text-center">
                      <span className="text-amber-400 font-black text-sm sm:text-base lg:text-lg mr-1.5 inline-block select-none align-baseline">
                        ⤷
                      </span>
                      {slide.subtitle}
                    </p>

                    {/* ── Action CTAs: 3x expanded vertical spacing (py) between description and action-btn ── */}
                    {(slide.primaryCta || slide.secondaryCta) && (
                      <div className="w-full max-w-2xl mx-auto py-3 sm:py-8 lg:py-12 mt-3 sm:mt-5 lg:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5">
                        {slide.primaryCta && (
                          <Link
                            href={slide.primaryCta.href}
                            className="w-full max-w-[245px] sm:max-w-none sm:w-auto shrink-0 flex justify-center"
                          >
                            <button
                              type="button"
                              className="w-full sm:w-auto h-10 sm:h-10.5 lg:h-11 px-3 sm:px-6.5 lg:px-7.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer border-0 whitespace-nowrap"
                            >
                              <span className="whitespace-nowrap">{slide.primaryCta.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-stone-950 shrink-0" />
                            </button>
                          </Link>
                        )}
                        {slide.secondaryCta && (
                          <Link
                            href={slide.secondaryCta.href}
                            className="w-full max-w-[245px] sm:max-w-none sm:w-auto shrink-0 flex justify-center"
                          >
                            <button
                              type="button"
                              className="w-full sm:w-auto h-10 sm:h-10.5 lg:h-11 px-3 sm:px-6.5 lg:px-7.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/30 hover:border-amber-400 text-white hover:text-amber-300 shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center text-center whitespace-nowrap"
                            >
                              <span className="whitespace-nowrap">{slide.secondaryCta.label}</span>
                            </button>
                          </Link>
                        )}
                      </div>
                    )}

                    {/* ── BOTTOM: Informational Trust Chips (border-none to eliminate button confusion) ── */}
                    {slide.trustPills && slide.trustPills.length > 0 && (
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-items-start sm:justify-center gap-x-2.5 sm:gap-x-2 gap-y-1.5 sm:gap-y-2 md:gap-2.5 lg:gap-3 mt-1 sm:mt-2 lg:mt-2.5 w-fit sm:w-full max-w-sm sm:max-w-5xl mx-auto text-[10px] sm:text-[11px] lg:text-xs">
                        {slide.trustPills.map((pill, pIdx) => {
                          const PillIcon = pill.icon;
                          return (
                            <div
                              key={pIdx}
                              className="inline-flex items-center justify-start gap-1.5 py-0.5 sm:py-1 px-2 sm:px-2.5 lg:px-3 rounded-full bg-black/35 backdrop-blur-xs text-stone-300 font-normal border-0 shadow-none select-none pointer-events-none text-left"
                            >
                              <PillIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span className="whitespace-nowrap">{pill.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Desktop Left / Right Navigation Buttons (Hover on desktop) ── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-xl hover:bg-black/80 hover:border-amber-400/80 text-white transition-all opacity-0 group-hover:opacity-100 items-center justify-center cursor-pointer active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-xl hover:bg-black/80 hover:border-amber-400/80 text-white transition-all opacity-0 group-hover:opacity-100 items-center justify-center cursor-pointer active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          {/* ── Slide Pagination Indicators (Clean, borderless & background-free dots) ── */}
          <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-auto">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer p-0 border-0",
                  index === selectedIndex
                    ? "w-5 sm:w-7 bg-amber-400 shadow-sm shadow-amber-400/40"
                    : "w-1.5 bg-white/50 hover:bg-white/90"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
