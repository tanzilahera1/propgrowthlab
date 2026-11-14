import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service & Operational SLA | PropGrowth Lab",
  description:
    "Review PropGrowth Lab's master terms of service, including our 48-hour turnkey website deployment SLA, 70/30 territory coordinator commission split agreement, and lead replacement guarantees.",
  keywords: [
    "PropGrowth Lab terms of service",
    "real estate coordinator agreement terms",
    "48 hour turnkey website deployment SLA",
    "territory coordinator lead replacement guarantee",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/terms",
  },
  openGraph: {
    title: "Terms of Service & Operational SLA | PropGrowth Lab",
    description:
      "Review PropGrowth Lab's master service agreements, 48h SLA, 70/30 coordinator split, and lead guarantees.",
    url: "https://propgrowthlab.com/terms",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab Terms of Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}

