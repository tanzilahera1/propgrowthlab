"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Key,
  Users,
  LogIn,
  UserPlus,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface UserNavDropdownProps {
  className?: string;
  isMobile?: boolean;
}

export function UserNavDropdown({
  className = "",
  isMobile = false,
}: UserNavDropdownProps) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    toast.success("Signed out successfully", {
      description: "Returning to homepage...",
    });
    await signOut({ callbackUrl: "/" });
  };

  const user = session?.user;
  const isAuthenticated = status === "authenticated" && Boolean(user);
  const isAdminOrOwner =
    user?.role === "Platform Owner" ||
    user?.role === "System Administrator" ||
    user?.role === "admin" ||
    user?.role === "owner";

  // Initial letter for fallback avatar
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={isAuthenticated ? `${user?.name} (${user?.role})` : "Account & Navigation"}
        className={`rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${
          isMobile ? "w-8 h-8" : "w-8.5 lg:w-9 h-8.5 lg:h-9"
        } ${
          isAuthenticated
            ? "border border-amber-500/60 shadow-xs hover:border-amber-400"
            : "bg-stone-900 border border-stone-800 hover:border-amber-500/80 text-amber-400"
        }`}
      >
        {status === "loading" ? (
          <div className="w-full h-full rounded-full bg-stone-800 animate-pulse" />
        ) : isAuthenticated ? (
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-stone-900 text-amber-400 font-bold text-xs">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "Avatar"}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <span>{initial}</span>
            )}
            {/* Green Online Dot */}
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-stone-900" />
          </div>
        ) : (
          <User className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
        )}
      </button>

      {/* Luxury Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 z-50 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/10 p-1.5 transition-all animate-in fade-in-0 zoom-in-95 ${
            isMobile ? "w-64" : "w-72"
          }`}
        >
          {isAuthenticated ? (
            <>
              {/* Authenticated User Header Card */}
              <div className="px-3 py-2.5 rounded-xl bg-slate-50/80 border border-slate-100 mb-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 text-sm truncate" title={user?.name || ""}>
                    {user?.name || "PropGrowth User"}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-amber-100/80 text-amber-800 border border-amber-200/60 shrink-0">
                    {user?.role || "Member"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate font-mono" title={user?.email || ""}>
                  {user?.email}
                </p>
              </div>

              {/* Navigation Options */}
              <div className="py-1 space-y-0.5">
                {isAdminOrOwner && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Admin Studio (CEO Engine)</span>
                  </Link>
                )}

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Client Dashboard</span>
                </Link>

                <Link
                  href="/templates"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <Key className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Commercial Licenses</span>
                </Link>

                <Link
                  href="/partners"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <Users className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Partner Network</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="my-1 border-t border-slate-100" />

              {/* Sign Out Action */}
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              {/* Unauthenticated Guest Header */}
              <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 mb-1">
                <span className="font-semibold text-slate-800 text-xs block">
                  PropGrowth Portal
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Sign in to manage engines & leads
                </span>
              </div>

              {/* Guest Options */}
              <div className="py-1 space-y-0.5">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Create Account</span>
                </Link>
              </div>

              <div className="my-1 border-t border-slate-100" />

              <Link
                href="/agency#audit-form"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 hover:text-amber-700 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Book 48h Growth Audit</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

