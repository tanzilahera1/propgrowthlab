import React from "react";
import { PublicNavbar } from "@/components/navbar/PublicNavbar";
import { PublicFooter } from "@/components/footer/PublicFooter";
import { FloatingWhatsAppCTA } from "@/components/floating/FloatingWhatsAppCTA";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfa] text-stone-900 selection:bg-amber-500 selection:text-white relative">
      {/* Smart Auto-Hiding Navbar */}
      <PublicNavbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Global Enterprise Footer */}
      <PublicFooter />

      {/* Instant WhatsApp Concierge & Scroll-to-Top Floating Dock */}
      <FloatingWhatsAppCTA />
    </div>
  );
}
