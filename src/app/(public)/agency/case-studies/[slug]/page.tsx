import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/data/case-studies";
import { CaseStudyClient } from "./CaseStudyClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found | PropGrowth Lab Agency",
    };
  }

  return {
    title: `${study.title} Case Study | PropGrowth Lab Agency`,
    description: study.subtitle,
    openGraph: {
      title: `${study.title} · Direct Booking Case Study`,
      description: study.subtitle,
      images: [study.heroImage],
    },
  };
}

async function CaseStudyContent({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyClient study={study} />;
}

export default function CaseStudyPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#fbfbfa] flex items-center justify-center py-20">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Loading Case Study...</span>
          </div>
        </div>
      }
    >
      <CaseStudyContent params={params} />
    </Suspense>
  );
}
