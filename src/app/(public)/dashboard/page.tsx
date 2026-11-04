import React, { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Client & Broker Portal | PropGrowth Lab",
  description:
    "Executive client dashboard for licensed real estate brokers and luxury stay operators. Manage daily lead quotas, live WhatsApp dispatches, 70/30 co-broker escrow, and direct stay GMV.",
  openGraph: {
    title: "Client & Partner Portal | PropGrowth Lab",
    description:
      "Real-time lead quota tracking, verified tenant dispatches, direct stay analytics, and co-broker escrow ledger.",
  },
};

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fcfcfb] flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
            <span className="text-xs font-semibold text-stone-500 tracking-wide uppercase">
              Loading PropGrowth Portal...
            </span>
          </div>
        </div>
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
