import type { Metadata } from "next";
import CookiesClient from "./CookiesClient";

export const metadata: Metadata = {
  title: "Cookie Policy & Web Storage Usage | PropGrowth Lab",
  description:
    "Review PropGrowth Lab's cookie policy. Learn how we use privacy-first essential technical cookies and anonymized Core Web Vitals telemetry without invasive ad trackers.",
  keywords: [
    "PropGrowth Lab cookie policy",
    "privacy-first cookies real estate",
    "web storage policy",
    "Core Web Vitals analytics privacy",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/cookies",
  },
  openGraph: {
    title: "Cookie Policy & Web Storage Usage | PropGrowth Lab",
    description:
      "Review PropGrowth Lab's privacy-first cookie policy and web storage standards.",
    url: "https://propgrowthlab.com/cookies",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab Cookie Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function CookiesPage() {
  return <CookiesClient />;
}

