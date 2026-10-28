"use client";

import React from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { Cookie, CheckCircle2, ShieldCheck, Zap, Sliders, Settings } from "lucide-react";

const TOC = [
  { id: "what-are-cookies", label: "1. What Are Cookies" },
  { id: "cookies-we-use", label: "2. Types of Cookies We Use" },
  { id: "zero-ad-trackers", label: "3. Zero Invasive Ad Trackers" },
  { id: "performance-monitoring", label: "4. Performance & Core Web Vitals" },
  { id: "managing-cookies", label: "5. How to Manage Cookies" },
  { id: "policy-updates", label: "6. Updates to This Policy" },
];

export function CookiesClient() {
  return (
    <LegalLayout
      title="Cookie Policy & Web Storage Usage"
      subtitle="How PropGrowth Lab utilizes privacy-first technical cookies to power sub-second page performance and secure territory browsing."
      effectiveDate="March 1, 2026"
      badge="Cookie & Web Storage Policy"
      summary="PropGrowth Lab uses only essential technical cookies and privacy-first web performance telemetry. We do not use intrusive third-party cross-site advertising trackers or sell your device fingerprint to ad networks."
      toc={TOC}
    >
      <div className="space-y-12 text-stone-700 leading-relaxed text-sm sm:text-base">
        {/* Section 1 */}
        <section id="what-are-cookies" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Cookie className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              1. What Are Cookies & Web Storage?
            </h2>
          </div>
          <p>
            Cookies are small text data files stored on your computer or mobile device when you navigate through modern web applications. They allow platforms to remember your viewport preferences, maintain active session states, and measure web performance.
          </p>
          <p className="text-xs sm:text-sm text-stone-600">
            In addition to HTTP cookies, our application may utilize modern browser storage technologies such as <code>localStorage</code> and <code>sessionStorage</code> to store non-sensitive user interface preferences (such as selected territory filters).
          </p>
        </section>

        {/* Section 2 */}
        <section id="cookies-we-use" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Sliders className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              2. Types of Cookies We Utilize
            </h2>
          </div>
          <p>
            We strictly limit our use of cookies to three functional categories:
          </p>

          <div className="space-y-3.5 pt-1 text-xs sm:text-sm">
            {/* Category A */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">Strictly Necessary & Functional Cookies</span>
                <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/30">
                  Always Active
                </span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                Essential for basic web navigation, CSRF security verification, Next.js server component rendering, and form submission handoffs. Without these, our direct booking engine and forms cannot function.
              </p>
            </div>

            {/* Category B */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">UI & Territory Preference Storage</span>
                <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold bg-amber-500/10 text-amber-800 border border-amber-500/30">
                  Functional
                </span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                Remembers your selected geographic territory (e.g. USA, UK, UAE) as you navigate between our `/templates`, `/agency`, and `/leads` sections, preventing you from having to re-select your city hub on every page refresh.
              </p>
            </div>

            {/* Category C */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">Performance Telemetry (Core Web Vitals)</span>
                <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold bg-stone-100 text-stone-700 border border-stone-200">
                  Anonymized Analytics
                </span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                Monitors page load times, layout stability, and sub-second Next.js edge routing speed via Vercel Speed Insights. All telemetry is aggregated and completely anonymized.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: THE PRIVACY GUARANTEE */}
        <section id="zero-ad-trackers" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              3. Zero Invasive Third-Party Ad Trackers
            </h2>
          </div>
          <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-stone-900 space-y-2">
            <p className="font-bold text-sm text-amber-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              Privacy-First Architecture
            </p>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
              PropGrowth Lab does <strong>not deploy cross-site tracking cookies, third-party data broker beacons, or invasive behavior-profiling trackers</strong>. We respect your browser&apos;s &quot;Do Not Track&quot; (DNT) and Global Privacy Control (GPC) headers by default.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="performance-monitoring" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Zap className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              4. Performance Monitoring & Core Web Vitals
            </h2>
          </div>
          <p>
            To guarantee sub-second load times worldwide for luxury property listings, we use Vercel Speed Insights. This measures:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-xs sm:text-sm text-stone-700">
            <li><strong>Largest Contentful Paint (LCP):</strong> Ensures villa hero media renders in under 1.2 seconds.</li>
            <li><strong>First Input Delay (FID):</strong> Guarantees instantaneous button click response.</li>
            <li><strong>Cumulative Layout Shift (CLS):</strong> Prevents jumpy elements as images load.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="managing-cookies" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Settings className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              5. How You Can Manage or Clear Cookies
            </h2>
          </div>
          <p>
            You have full control over cookie storage through your browser settings. You can delete existing cookies, block specific domains, or configure your browser to reject all cookies:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-white border border-stone-200">
              <strong className="text-stone-900 block mb-1">Google Chrome & Brave:</strong>
              Settings → Privacy and security → Third-party cookies → Clear browsing data.
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200">
              <strong className="text-stone-900 block mb-1">Apple Safari (iOS & macOS):</strong>
              Settings → Safari → Advanced → Privacy → Block All Cookies / Clear History.
            </div>
          </div>
          <p className="text-xs text-stone-500 italic">
            * Note: Disabling necessary cookies may prevent dynamic pricing calculations and direct WhatsApp message pre-filling.
          </p>
        </section>

        {/* Section 6 */}
        <section id="policy-updates" className="space-y-4 pb-8">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              6. Updates to This Cookie Policy
            </h2>
          </div>
          <p>
            We may periodically update this Cookie Policy to reflect new regulatory requirements or web platform enhancements. Significant amendments will be accompanied by an updated effective date at the top of this document.
          </p>
          <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm">
            <p><strong className="text-stone-900">Questions regarding cookies:</strong> privacy@propgrowthlab.com</p>
            <p className="text-stone-500 text-[11px] font-mono mt-1">PropGrowth Lab Global Compliance Directorate</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}

export default CookiesClient;

