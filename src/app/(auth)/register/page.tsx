"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { User, Mail, Lock, Eye, EyeOff, Loader2, Info, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

interface FormErrors {
  fullname?: string;
  email?: string;
  password?: string;
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightGoogle, setHighlightGoogle] = useState(false);
  const [googleAccountNotice, setGoogleAccountNotice] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // Client-side field-level validator
  const validateFields = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullname.trim() || fullname.trim().length < 2) {
      newErrors.fullname = "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (
      !password ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, and a number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!validateFields()) {
      return;
    }

    setLoading(true);
    setHighlightGoogle(false);
    setGoogleAccountNotice(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullname.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errorType === "google_account") {
          setHighlightGoogle(true);
          const msg =
            data.message ||
            "আপনার এই ইমেইলটি Google দিয়ে রেজিস্টার করা। সরাসরি লগইন করতে 'Continue with Google' বাটন চাপুন।";
          setGoogleAccountNotice(msg);
          toast.warning("Google Account Detected", { description: msg, duration: 6000 });
          return;
        }

        if (data.errorType === "email") {
          setErrors((prev) => ({ ...prev, email: data.message }));
          toast.error("Email Already Registered", {
            description: "An account with this email already exists. Please sign in with your password.",
          });
          return;
        }

        toast.error("Registration Failed", {
          description: data.message || "Failed to create account. Please try again.",
        });
        return;
      }

      toast.success("Account Created Successfully!", {
        description: "Signing you into your workspace...",
      });

      // Auto-sign in the user directly into workspace
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInResult?.ok) {
        toast.success("Welcome aboard!", {
          description: "Entering your private portal...",
        });
        const targetUrl = callbackUrl && callbackUrl !== "/" ? callbackUrl : "/dashboard";
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 400);
      } else {
        toast.error("Auto Login Failed", {
          description: "Your account is created, but automatic login encountered an issue. Redirecting to sign in...",
        });
        setTimeout(() => {
          window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        }, 1000);
      }
    } catch (err: unknown) {
      console.error("Registration exception:", err);
      toast.error("Network or Database Error", {
        description: "Unable to complete registration. Please check database connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs sm:shadow-sm p-7 sm:p-9 space-y-5">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-slate-900 tracking-tight">
        Sign Up
      </h1>

      {/* Google Sign Up Button */}
      <div
        className={
          highlightGoogle
            ? "ring-2 ring-amber-500 ring-offset-2 rounded-xl transition-all duration-300 animate-pulse"
            : ""
        }
      >
        <GoogleSignInButton text="Sign up with Google" callbackUrl={callbackUrl} />
      </div>

      {/* Google Account Alert if detected */}
      {googleAccountNotice && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 leading-relaxed">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>{googleAccountNotice}</span>
        </div>
      )}

      {/* Minimal Divider */}
      <div className="relative flex items-center justify-center my-5">
        <div className="w-full border-t border-slate-100" />
        <span className="bg-white px-3 text-xs text-slate-400 font-normal">or</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div className="space-y-1">
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              autoComplete="name"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
                if (errors.fullname) setErrors((prev) => ({ ...prev, fullname: undefined }));
              }}
              placeholder="Full name"
              className={`w-full h-11 pl-10 pr-3.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.fullname
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-200 hover:border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              }`}
            />
          </div>
          {errors.fullname && (
            <p className="text-xs text-red-500 flex items-center gap-1 pl-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.fullname}</span>
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="Email"
              className={`w-full h-11 pl-10 pr-3.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-200 hover:border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 flex items-center gap-1 pl-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Password"
              className={`w-full h-11 pl-10 pr-10 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-200 hover:border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-xs text-red-500 flex items-center gap-1 pl-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.password}</span>
            </p>
          ) : (
            <p className="text-xs text-slate-400 leading-normal px-0.5">
              Must be 8+ characters, with an uppercase letter, a lowercase letter &amp; a number
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-medium text-sm sm:text-base transition-all duration-200 shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <p className="text-center text-xs sm:text-sm text-slate-500 pt-1">
        Already have an account?{" "}
        <Link
          href={`/login${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
          className="font-medium text-amber-600 hover:text-amber-700 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 text-xs">
          Loading sign up portal...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
