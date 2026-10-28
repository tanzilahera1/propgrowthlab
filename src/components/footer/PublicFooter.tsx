import React from "react";
import Link from "next/link";
import { PropGrowthLogo } from "@/components/common/PropGrowthLogo";
import {
  XIcon,
  LinkedInIcon,
  WhatsAppIcon,
  DiscordIcon,
} from "@/socialCustomSVGIcon/SocialCustomSVGIcon";
import { ShieldCheck, MapPin, Zap } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#181206] via-[#120e07] to-stone-950 text-slate-300 pt-16 pb-12 border-t border-amber-500/30 relative overflow-hidden">
      {/* Subtle Ambient Footer Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[220px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[250px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* ================= COL 1: BRAND & VISION (SPAN 2) ================= */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <PropGrowthLogo size="md" theme="dark" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The 360° Tech & Performance Growth Engine for Luxury Stays, Villas & Real Estate.
              We build sub-second direct booking platforms, drive high-paying guests, and dispatch
              verified tenant leads to licensed broker partners.
            </p>

            {/* Global Territory Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-amber-400 border border-amber-500/30">
                <MapPin className="w-3 h-3 text-amber-400" />
                Worldwide Coverage
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-slate-300 border border-amber-500/20">
                USA & Canada
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-slate-300 border border-amber-500/20">
                UK & Europe
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-slate-300 border border-amber-500/20">
                Australia
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-slate-300 border border-amber-500/20">
                UAE & GCC
              </span>
            </div>

            {/* Social Icons using local SocialCustomSVGIcon */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <XIcon size="16" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size="16" />
              </a>
              <a
                href="https://wa.me/8801540505122"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size="16" />
              </a>
              <a
                href="https://discord.com/users/1055888694831239218"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Discord"
              >
                <DiscordIcon size="16" />
              </a>
            </div>
          </div>

          {/* ================= COL 2: GROWTH SOLUTIONS ================= */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-widest">
              Growth Solutions
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/templates"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Systems & Source Code</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/agency"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>360° Booking Agency</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/leads"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Daily Broker Lead Quotas</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Co-Broker Partner Network</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= COL 3: HOSPITALITY SERVICES ================= */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-widest">
              Solutions
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Direct Booking Engine (0% OTA)</li>
              <li>Meta & Google Ads Management</li>
              <li>48-Hour Turnkey Deployment</li>
              <li>Nomad & Expat Lead Pipeline</li>
              <li>Sub-Second Next.js Web Apps</li>
            </ul>
          </div>

          {/* ================= COL 4: ENTERPRISE TRUST ================= */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-widest">
              Trust & SLA
            </p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>100% Private Client Leads Guarantee (Zero Data Resale).</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>48-Hour Guaranteed SLA on Turnkey Website Delivery.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">PropGrowth Lab</span>. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-stone-400 hidden md:inline">Enterprise PropTech & Media</span>
            <Link
              href="/privacy"
              className="text-stone-400 hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-stone-400 hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-stone-400 hover:text-amber-400 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
