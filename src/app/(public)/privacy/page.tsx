import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy & Client Data Protection | PropGrowth Lab",
  description:
    "Review PropGrowth Lab's Zero-Data-Resale privacy policy. We strictly safeguard luxury stay direct bookings, broker data, and inquiry records under GDPR and CCPA compliance.",
  keywords: [
    "PropGrowth Lab privacy policy",
    "real estate client data protection",
    "GDPR luxury property booking privacy",
    "zero data resale real estate policy",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Client Data Protection | PropGrowth Lab",
    description:
      "Review PropGrowth Lab's Zero-Data-Resale privacy policy. GDPR and CCPA compliant client protection.",
    url: "https://propgrowthlab.com/privacy",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}

