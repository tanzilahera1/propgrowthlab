"use client";

import React from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { FileText, Zap, DollarSign, RefreshCw, Award, Scale, HelpCircle } from "lucide-react";

const TOC = [
  { id: "acceptance-terms", label: "1. Acceptance of Terms" },
  { id: "turnkey-sla", label: "2. 48-Hour Turnkey Deployment SLA" },
  { id: "co-broker-splits", label: "3. 70/30 Co-Broker Commission Split" },
  { id: "lead-quotas", label: "4. Lead Quota & Replacement Guarantee" },
  { id: "billing-cancellation", label: "5. Billing, Rollover & Cancellations" },
  { id: "ip-code-ownership", label: "6. Code Ownership & Intellectual Property" },
  { id: "disputes-jurisdiction", label: "7. Governing Law & Dispute Resolution" },
];

export function TermsClient() {
  return (
    <LegalLayout
      title="Terms of Service & Operational Agreements"
      subtitle="The contractual framework governing PropTech engineering deliverables, 70/30 co-broker commission splits, and broker lead quotas."
      effectiveDate="March 1, 2026"
      badge="Enterprise Master Service Agreement"
      summary="These Terms of Service govern all services provided by PropGrowth Lab. Key provisions include our guaranteed 48-hour turnkey website deployment SLA, the 70/30 Co-Broker commission split agreement, and our 100% instant lead replacement guarantee."
      toc={TOC}
    >
      <div className="space-y-12 text-stone-700 leading-relaxed text-sm sm:text-base">
        {/* Section 1 */}
        <section id="acceptance-terms" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <FileText className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              1. Acceptance of Terms & Services
            </h2>
          </div>
          <p>
            By accessing PropGrowth Lab, booking an audit, purchasing turnkey Next.js PropTech platforms, subscribing to daily lead quotas, or submitting a Co-Broker territory partnership application, you enter into a binding master agreement with PropGrowth Lab.
          </p>
          <p className="text-xs sm:text-sm text-stone-600">
            These terms apply equally to luxury property hosts, villa management companies, and licensed real estate brokers worldwide.
          </p>
        </section>

        {/* Section 2: 48-HOUR SLA */}
        <section id="turnkey-sla" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Zap className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              2. 48-Hour Turnkey Web Deployment SLA
            </h2>
          </div>
          <p>
            For all Turnkey PropTech Platform packages purchased via our `/templates` portal, PropGrowth Lab commits to a strict 48-hour Service Level Agreement (SLA):
          </p>
          <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-2">
            <h4 className="font-bold text-sm text-amber-900">
              The 48-Hour Guaranteed Delivery Commitment
            </h4>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
              Upon receipt of client property assets (branding logo, images, and property calendar URLs), your custom Next.js direct booking platform will be deployed live to your custom domain within <strong>48 continuous business hours</strong>, fully configured with 2-way iCal sync, Stripe checkout, and WhatsApp direct concierge routing.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-stone-600">
            If we fail to deploy within 48 hours due to our internal engineering delays, the client is entitled to a 100% waiver of their first month&apos;s hosting retainer.
          </p>
        </section>

        {/* Section 3: CO-BROKER 70/30 SPLIT */}
        <section id="co-broker-splits" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <DollarSign className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              3. 70/30 Co-Broker Commission Split Agreement
            </h2>
          </div>
          <p>
            Under our exclusive territory partnership agreements (`/partners`), the contractual economics operate strictly on a 70/30 revenue split:
          </p>
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white border border-stone-200 flex items-start gap-3">
              <span className="font-bold text-base text-amber-600 shrink-0">70%</span>
              <div>
                <strong className="text-stone-900">Partner Broker Payout:</strong> The local licensed broker retains a guaranteed 70% of the total earned broker commission on all property leases, corporate lets, and sales initiated through our dispatch engine.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-200 flex items-start gap-3">
              <span className="font-bold text-base text-stone-400 shrink-0">30%</span>
              <div>
                <strong className="text-stone-900">Platform Marketing Fee:</strong> PropGrowth Lab retains 30% to offset advertising spend, tech maintenance, and inbound buyer qualification.
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-600">
            Brokers are obligated to report deal closings within 5 business days of contract execution. Payouts are settled through verified escrow or direct international wire transfer.
          </p>
        </section>

        {/* Section 4: LEAD QUOTA & REPLACEMENT GUARANTEE */}
        <section id="lead-quotas" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <RefreshCw className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              4. Lead Quota & 100% Replacement Guarantee
            </h2>
          </div>
          <p>
            Brokers subscribing to our Daily Lead Quotas (`/leads`) receive guaranteed quantities of verified inquiries based on their active plan:
          </p>
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Replacement Guarantee Terms
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              If an inquiry dispatched to your WhatsApp contains a disconnected number, invalid email, or fraudulent contact submission, report it within <strong>48 hours</strong> of dispatch. We will issue a <strong>100% free credit replacement</strong> with your next daily delivery batch.
            </p>
          </div>
        </section>

        {/* Section 5: BILLING & CANCELLATIONS */}
        <section id="billing-cancellation" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Award className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              5. Billing, Rollover Protection & Cancellations
            </h2>
          </div>
          <p>
            Subscriptions for lead quotas and monthly agency retainers operate on a 30-day recurring billing cycle:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-xs sm:text-sm text-stone-700">
            <li><strong>No Long-Term Lock-in:</strong> Subscriptions can be paused or canceled at any time with 7 days written notice prior to next renewal date.</li>
            <li><strong>Daily Rollover Protection:</strong> Unused daily lead allotments automatically roll over for up to 30 continuous calendar days.</li>
            <li><strong>Refund Policy:</strong> Setup fees for custom coding deliverables are non-refundable once engineering milestones are delivered. Lead quota subscriptions carry a pro-rata guarantee for non-dispatched quota batches.</li>
          </ul>
        </section>

        {/* Section 6: CODE OWNERSHIP */}
        <section id="ip-code-ownership" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <FileText className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              6. Code Ownership & Intellectual Property
            </h2>
          </div>
          <p>
            Clients purchasing our Turnkey PropTech Platforms receive full non-exclusive commercial licenses to operate their custom Next.js instance, domain, client database, and direct booking engine. PropGrowth Lab retains ownership of core platform frameworks, reusable modules, and proprietary algorithms.
          </p>
        </section>

        {/* Section 7: GOVERNING LAW */}
        <section id="disputes-jurisdiction" className="space-y-4 pb-8">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <Scale className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              7. Governing Law & Dispute Resolution
            </h2>
          </div>
          <p>
            These Terms are governed by and construed under international commercial contract standards. In the event of any contractual controversy, the parties agree to seek informal executive mediation via our legal desk before pursuing formal arbitration proceedings.
          </p>
          <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm">
            <p><strong className="text-stone-900">Legal Department:</strong> legal@propgrowthlab.com</p>
            <p className="text-stone-500 text-[11px] font-mono mt-1">PropGrowth Lab Enterprise PropTech Services</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}

export default TermsClient;

