"use client";

import React from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { ShieldCheck, Lock, Database, UserCheck, Bell, Globe } from "lucide-react";

const TOC = [
  { id: "information-collection", label: "1. Information We Collect" },
  { id: "how-we-use", label: "2. How We Use Your Data" },
  { id: "zero-data-resale", label: "3. Zero Data Resale Guarantee" },
  { id: "whatsapp-communications", label: "4. WhatsApp Communications" },
  { id: "gdpr-ccpa-rights", label: "5. GDPR & CCPA Rights" },
  { id: "data-security", label: "6. Data Security & Storage" },
  { id: "compliance-contact", label: "7. Contact Compliance Team" },
];

export function PrivacyClient() {
  return (
    <LegalLayout
      title="Privacy Policy & Client Data Protection"
      subtitle="How PropGrowth Lab safeguards high-net-worth traveler inquiries, broker records, and direct booking transaction data worldwide."
      effectiveDate="March 1, 2026"
      badge="Client Data & Privacy Protection"
      summary="PropGrowth Lab operates on a strict Zero-Data-Resale framework. We collect only verified inquiry records necessary to power direct bookings and dispatch high-budget client inquiries to licensed territory partners. Your data is never sold, leased, or syndicated."
      toc={TOC}
    >
      <div className="space-y-12 text-stone-700 leading-relaxed text-sm sm:text-base">
        {/* Section 1 */}
        <section id="information-collection" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Database className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              1. Information We Collect
            </h2>
          </div>
          <p>
            PropGrowth Lab (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects only information that is strictly required to deliver our PropTech direct booking engineering, paid guest acquisition, and territory co-broker quota dispatching.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                Client & Guest Inquiries
              </h4>
              <p className="text-xs text-stone-600">
                Full name, verified WhatsApp phone number, email address, travel dates, requested luxury stay duration, and confirmed monthly rental budget.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                Licensed Broker Records
              </h4>
              <p className="text-xs text-stone-600">
                Brokerage affiliation, local jurisdiction license details, territory preferences (USA, UK, Canada, Australia, EU, UAE), and payout escrow destinations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="how-we-use" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <UserCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              2. How We Use Your Data
            </h2>
          </div>
          <p>
            Information collected through our public portals and screening forms is utilized exclusively for:
          </p>
          <ul className="space-y-2.5 list-disc pl-5 text-stone-700 text-xs sm:text-sm">
            <li>
              <strong>Direct Booking Systems:</strong> Powering sub-second booking engines, automated calendar availability sync, and direct guest communication.
            </li>
            <li>
              <strong>Instant Lead Dispatching:</strong> Routing pre-screened luxury inquiries to designated territory broker partners via automated WhatsApp alerts within 90 seconds.
            </li>
            <li>
              <strong>Escrow Commission Settlement:</strong> Verifying closed transaction logs for 70/30 commission distribution.
            </li>
            <li>
              <strong>Security & Fraud Prevention:</strong> Checking phone carrier validation to prevent fake lead submissions or spam attempts.
            </li>
          </ul>
        </section>

        {/* Section 3: THE GUARANTEE */}
        <section id="zero-data-resale" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              3. Zero Data Resale Guarantee
            </h2>
          </div>
          <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-stone-900 space-y-2">
            <p className="font-bold text-sm text-amber-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              Institutional Guarantee on Exclusive Lead Data
            </p>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
              Unlike generic lead generation agencies, PropGrowth Lab <strong>never sells, leases, rents, or syndicates your contact details or client inquiries</strong> to third-party marketing companies, insurance networks, or public broker directories. Inquiries are dispatched exclusively to your licensed territory partner.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="whatsapp-communications" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Bell className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              4. WhatsApp Communications & Instant Alerts
            </h2>
          </div>
          <p>
            By submitting your WhatsApp number on our audit request, territory application, or lead subscription forms, you consent to receive direct transactional alerts, inquiry handoffs, and verification pings from our territory dispatch directors.
          </p>
          <p className="text-xs sm:text-sm text-stone-600">
            You may revoke WhatsApp communication at any time by replying <strong>&quot;STOP&quot;</strong> or contacting our legal desk directly. Revocation will immediately halt automated dispatch pings.
          </p>
        </section>

        {/* Section 5 */}
        <section id="gdpr-ccpa-rights" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Globe className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              5. GDPR & CCPA Compliance Rights
            </h2>
          </div>
          <p>
            Whether your territory is located in the United Kingdom, European Union, United States, or GCC, we honor statutory privacy regulations including the EU/UK General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA):
          </p>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-white border border-stone-200">
              <strong className="text-stone-900">Right to Access & Portability:</strong> You may request a complete export of all contact records and inquiry histories associated with your account.
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200">
              <strong className="text-stone-900">Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Upon verified written request, we permanently purge all personal identifiable records from our production databases within 72 business hours.
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200">
              <strong className="text-stone-900">Right to Opt-Out:</strong> We do not sell your data; however, you retain full rights to restrict automated profile processing.
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="data-security" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Lock className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              6. Data Security & Storage Architecture
            </h2>
          </div>
          <p>
            All data transmissions are encrypted in transit via TLS 1.3 encryption protocols. Production databases are hosted on enterprise MongoDB Atlas clusters with automated encrypted snapshots, strict IP whitelisting, and role-based access control (RBAC).
          </p>
        </section>

        {/* Section 7 */}
        <section id="compliance-contact" className="space-y-4 pb-8">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              7. Contact Compliance Team
            </h2>
          </div>
          <p>
            If you have questions regarding this Privacy Policy, your data rights, or wish to submit an erasure request, please reach out to our legal desk:
          </p>
          <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm space-y-1">
            <p><strong className="text-stone-900">PropGrowth Lab Legal & Compliance</strong></p>
            <p className="text-stone-600">Email: legal@propgrowthlab.com</p>
            <p className="text-stone-600">WhatsApp Concierge Desk: +880 1540 505122</p>
            <p className="text-stone-500 text-[11px] font-mono pt-1">Response Commitment: 24 business hours</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}

export default PrivacyClient;

