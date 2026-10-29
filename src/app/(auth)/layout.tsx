import React from "react";
import Link from "next/link";
import { PropGrowthLogo } from "@/components/common/PropGrowthLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Centered Auth Group: Brand Logo + Card */}
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* Brand Logo nicely positioned above the card */}
        <div className="mb-6 flex justify-center">
          <PropGrowthLogo size="md" />
        </div>

        {/* Auth Form Card */}
        <div className="w-full">
          {children}
        </div>

        {/* Subtle Footer */}
        <footer className="mt-8 text-center text-xs text-slate-400 space-y-1.5">
          <p>&copy; 2026 PropGrowth Lab. Enterprise Hospitality Platform.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/privacy" className="hover:text-slate-600 hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-600 hover:underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-slate-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
