import React, { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import AdminClient from "./AdminClient";

export const instant = false;

export const metadata: Metadata = {
  title: "Operations Console | PropGrowth Lab",
  description:
    "Enterprise command center for PropGrowth Lab operations: Daily lead dispatch, broker quota subscriptions, 48-hour turnkey SLA tracking, and co-broker commission splits.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  await connection();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-emerald-400 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Loading Operations Console...</span>
          </div>
        </div>
      }
    >
      <AdminClient />
    </Suspense>
  );
}
