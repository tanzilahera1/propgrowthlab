import React from "react";
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
  return <DashboardClient />;
}

