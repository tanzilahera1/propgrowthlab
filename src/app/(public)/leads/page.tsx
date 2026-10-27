import type { Metadata } from "next";
import LeadsClient from "./LeadsClient";

export const metadata: Metadata = {
  title: "Broker Daily Lead Quota Subscriptions | PropGrowth Lab",
  description:
    "Pre-screened, high-budget tenant and buyer inquiries dispatched daily to your WhatsApp. Silver (2 leads/day) and Gold (5 leads/day) quotas for real estate brokers across the USA, UK, Canada, Australia, EU, and UAE.",
  keywords: [
    "real estate leads USA",
    "broker lead quota subscription",
    "UK rental leads",
    "verified buyer leads Canada Australia",
    "real estate lead generation daily quota",
    "high ticket tenant leads worldwide",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/leads",
  },
  openGraph: {
    title: "Broker Daily Lead Quota Subscriptions | PropGrowth Lab",
    description:
      "Stop buying cold lists. Get 2 to 5 verified high-budget inquiries dispatched daily to your WhatsApp.",
    url: "https://propgrowthlab.com/leads",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab Broker Lead Quota",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function LeadsPage() {
  return <LeadsClient />;
}
