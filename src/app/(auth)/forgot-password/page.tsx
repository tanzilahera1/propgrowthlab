"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2, Info, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isGoogleOnly, setIsGoogleOnly] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || timer > 0) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);
    setLoading(true);
    setIsGoogleOnly(false);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Request Failed", {
          description: data.message || "Failed to process request. Please try again.",
        });
        return;
      }

      if (data.isGoogleOnly) {
        setIsGoogleOnly(true);
        setStatusMessage(data.message);
        toast.info("Google Account Detected", { description: data.message });
        return;
      }

      toast.success("Reset Link Dispatched", {
        description: data.message || "Check your email for the reset link.",
      });
      setStatusMessage(data.message);
      setTimer(300); // 5-minute cooldown
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error("Network Error", {
        description: "Something went wrong. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs sm:shadow-sm p-7 sm:p-9 space-y-5">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-slate-900 tracking-tight">
        Reset Password
      </h1>

      <p className="text-xs text-center text-slate-500 -mt-2">
        Enter your email address, and we&apos;ll send you a password reset link.
      </p>

      {/* Google Account Special Notification */}
      {isGoogleOnly && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
          <div className="flex items-start gap-2 text-xs text-amber-900 leading-relaxed">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{statusMessage}</span>
          </div>
          <GoogleSignInButton text="Continue with Google" />
        </div>
      )}

      {/* Timer Cooldown Notice */}
      {timer > 0 && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900 leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Password reset link sent!</p>
            <p className="text-slate-600">
              Please wait before retrying:{" "}
              <span className="font-mono font-bold text-emerald-700">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Request Form */}
      {!isGoogleOnly && (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1">
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                disabled={timer > 0}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                placeholder="Email"
                className={`w-full h-11 pl-10 pr-3.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all disabled:opacity-60 ${
                  emailError
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                }`}
              />
            </div>
            {emailError && (
              <p className="text-xs text-red-500 flex items-center gap-1 pl-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || timer > 0}
            className="w-full h-11 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-medium text-sm sm:text-base transition-all duration-200 shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Reset Link...</span>
              </>
            ) : timer > 0 ? (
              <span>Please Wait ({timer}s)</span>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>
        </form>
      )}

      {/* Back to Login */}
      <div className="pt-2 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign in</span>
        </Link>
      </div>
    </div>
  );
}
