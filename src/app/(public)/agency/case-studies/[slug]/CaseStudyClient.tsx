"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CaseStudy, CASE_STUDIES } from "@/data/case-studies";
import { StandalonePillTabBar } from "@/components/common/StandalonePillTabBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Smartphone,
  Quote,
} from "lucide-react";

interface Props {
  study: CaseStudy;
}

export function CaseStudyClient({ study }: Props) {
  const router = useRouter();

  const caseStudyTabs = CASE_STUDIES.map((s) => ({
    id: s.slug,
    label: s.title,
  }));

  const auditWhatsAppUrl = `https://wa.me/8801540505122?text=${encodeURIComponent(
    `Hi PropGrowth Lab team, I reviewed the ${study.title} case study. I own/manage a luxury stay and want a free direct booking audit to stop OTA commission bleed.`
  )}`;

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa] overflow-hidden">
      {/* Top Breadcrumb & Responsive Rule 10 Pill TabBar - Seamless Canvas, Zero Border Clutter */}
      <section className="w-full pt-18 sm:pt-20 pb-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          {/* Left: Breadcrumb Trail (Zero squishing or wrapping on middle devices) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 shrink-0">
            <Link
              href="/agency"
              className="inline-flex items-center gap-1.5 font-medium hover:text-stone-950 transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-stone-400" />
              <span>Stay Growth Agency</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="font-semibold text-stone-900 truncate max-w-[240px] sm:max-w-none">
              {study.title}
            </span>
          </div>

          {/* Right: Universal Standalone Pill TabBar (Fluid on mobile/tablet, snug on desktop) */}
          <div className="w-full lg:w-auto flex justify-start lg:justify-end">
            <StandalonePillTabBar
              categories={caseStudyTabs}
              activeTab={study.slug}
              onTabChange={(slug) => router.push(`/agency/case-studies/${slug}`)}
            />
          </div>
        </div>
      </section>

      {/* Hero Section (Halved Bottom Padding, Zero Separator) */}
      <section className="w-full pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight leading-[1.15]">
              {study.title}
            </h1>
            <p className="text-base sm:text-xl text-stone-600 font-normal leading-relaxed max-w-3xl">
              {study.subtitle}
            </p>
            {/* Clean Editorial Metadata Line (Zero Tag Clutter) */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-500 font-medium pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1 text-stone-700 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                {study.location}
              </span>
              <span className="text-stone-300">•</span>
              <span className="inline-flex items-center gap-1 text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                {study.duration}
              </span>
              <span className="text-stone-300">•</span>
              <span className="inline-flex items-center gap-1 text-amber-800 font-mono text-[11px] uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                {study.badge}
              </span>
            </div>
          </div>

          {/* Property Image Banner */}
          <div className="relative w-full aspect-16/9 md:aspect-21/9 rounded-2xl overflow-hidden border border-stone-300 shadow-md">
            <Image
              src={study.heroImage}
              alt={study.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4 sm:p-8">
              <div className="text-white space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Verified Hospitality Asset</span>
                <p className="text-lg sm:text-2xl font-bold">{study.propertyType}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified KPI & Performance Scorecard (Halved Gap, Seamless Transition) */}
      <section className="w-full pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 bg-stone-100/60">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-7">
          <div>
            <span className="text-xs font-mono font-semibold text-amber-800 uppercase tracking-wider block">
              Verified ROI Scorecard
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-950 tracking-tight mt-1">
              Tangible Financial & Operational Uplift
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {study.metrics.map((metric, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-200/90 p-3.5 sm:p-4.5 shadow-xs flex flex-col justify-between space-y-2.5 min-h-[110px] sm:min-h-[120px]"
              >
                <span className="text-[10px] sm:text-[11px] font-mono font-medium text-stone-500 uppercase tracking-wider line-clamp-1">
                  {metric.label}
                </span>
                <div className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-extrabold text-stone-950 tracking-tight whitespace-nowrap">
                  {metric.value}
                </div>
                <div className="flex items-center gap-1 text-[10.5px] sm:text-xs font-medium text-emerald-700 leading-tight">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span className="line-clamp-1">{metric.sublabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Summary & Client Testimonial (Halved Gap, Zero Separator Line) */}
      <section className="w-full pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider block">
              Executive Brief
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
              Reclaiming Profit Margins From Third-Party Gatekeepers
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {study.executiveSummary}
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[4px] bg-stone-100 border border-stone-200 text-stone-700 font-mono text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="lg:col-span-5 bg-stone-950 text-white rounded-2xl p-5 sm:p-7 shadow-lg relative overflow-hidden space-y-3.5 sm:space-y-4">
            <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400/40" />
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic">
              &ldquo;{study.clientQuote}&rdquo;
            </p>
            <div className="pt-3.5 border-t border-stone-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">{study.clientAuthor}</div>
                <div className="text-xs text-stone-400">{study.clientRole}</div>
              </div>
              <span className="px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 font-mono text-[10px] uppercase font-bold">
                Verified Client
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge vs The Solution Grid (Halved Gap, Seamless Flow) */}
      <section className="w-full pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 bg-[#fbfbfa]">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          {/* Challenges */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg sm:text-2xl font-bold text-stone-950 tracking-tight">
                The Core Bottlenecks Before Intervention
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {study.challenges.map((c, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-2"
                >
                  <div className="text-xs font-mono font-bold text-stone-400">0{i + 1}</div>
                  <h4 className="text-sm font-bold text-stone-950">{c.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg sm:text-2xl font-bold text-stone-950 tracking-tight">
                The PropGrowth Engineering & Growth Solution
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {study.solutions.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-emerald-600/30 bg-emerald-50/20 p-5 shadow-xs space-y-2"
                >
                  <div className="text-xs font-mono font-bold text-emerald-700">SOLVED 0{i + 1}</div>
                  <h4 className="text-sm font-bold text-stone-950">{s.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Outcomes Checklist */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              Verified Business Transformation Outcomes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {study.keyOutcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Audit CTA */}
      <section className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-stone-950 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold uppercase tracking-wider">
            Stop The Commission Bleed
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Reclaim Your Property&apos;s Direct Bookings?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Get a complimentary Direct Booking Audit for your villa or luxury stay. We analyze your OTA commission loss, mobile site speed, and guest acquisition potential.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={auditWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md"
            >
              <Smartphone className="w-4 h-4" />
              <span>Claim Free WhatsApp Audit</span>
            </a>
            <Link
              href="/agency"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 text-sm font-semibold transition-all"
            >
              <span>Explore Agency Retainer Tiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

