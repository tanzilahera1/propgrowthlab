import type { Metadata } from "next";
import TemplatesClient from "./TemplatesClient";

export const metadata: Metadata = {
  title: "Sub-Second Next.js Website Templates & Full-Stack Systems | PropGrowth Lab",
  description:
    "Replace slow WordPress sites with sub-second Next.js platforms. High-converting templates for boutique hotels, luxury villas, real estate, clinics, and local services. Buy clean code from $19–$69 or order 48-hour turnkey deployment for $99–$199.",
  keywords: [
    "Sub-second Next.js website",
    "Next.js direct booking engine",
    "Replace WordPress Next.js",
    "real estate brokerage portal Next.js",
    "dental clinic website template",
    "tradie services website template",
    "turnkey website launch 48 hours",
    "Next.js Tailwind CSS source code",
    "MEST showcase templates",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/templates",
  },
  openGraph: {
    title: "Sub-Second Next.js Website Templates & Systems | PropGrowth Lab",
    description:
      "Replace slow WordPress sites with sub-second Next.js platforms. 99+ PageSpeed and 48-hour turnkey launch.",
    url: "https://propgrowthlab.com/templates",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab PropTech Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}
