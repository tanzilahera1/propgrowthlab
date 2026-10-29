"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff, Loader2, Info, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightGoogle, setHighlightGoogle] = useState(false);
  const [googleAccountNotice, setGoogleAccountNotice] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateFields = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
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
      const result = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
      });

      if (result?.error || !result?.ok) {
        const errorCode = (result as { code?: string })?.code || result?.error;

        if (errorCode === "google_only_account") {
          setHighlightGoogle(true);
          const msg =
            "আপনার এই অ্যাকাউন্টটি Google দিয়ে খোলা। পাসওয়ার্ড ছাড়া ১-ক্লিকে লগইন করতে উপরের 'Continue with Google' বাটন চাপুন।";
          setGoogleAccountNotice(msg);
          toast.warning("Google Account Detected", { description: msg, duration: 6000 });
          return;
        }

        if (errorCode === "user_not_found") {
          setErrors({ email: "No account found with this email." });
          toast.error("Account Not Found", {
            description: "No account found with this email. Please check your spelling or sign up.",
          });
          return;
        }

        if (errorCode === "invalid_password") {
          setErrors({ password: "The password you entered is incorrect." });
          toast.error("Incorrect Password", {
            description: "The password you entered is incorrect. Please try again or reset it.",
          });
          return;
        }

        if (errorCode === "account_suspended") {
          toast.error("Account Suspended", {
            description: "Your account is temporarily suspended. Please contact platform administration.",
          });
          return;
        }

        toast.error("Login Failed", { description: "Invalid email or password. Please try again." });
        return;
      }

      toast.success("Success", { description: "Logged in successfully! Redirecting..." });

      setTimeout(() => {
        const targetUrl =
          callbackUrl && callbackUrl !== "/" ? callbackUrl : "/dashboard";
        window.location.href = targetUrl;
      }, 300);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login Failed", { description: "Something went wrong, please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs sm:shadow-sm p-7 sm:p-9 space-y-5">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-slate-900 tracking-tight">
        Sign In
      </h1>

      {/* Google Sign In Button */}
      <div
        className={
          highlightGoogle
            ? "ring-2 ring-amber-500 ring-offset-2 rounded-xl transition-all duration-300 animate-pulse"
            : ""
        }
      >
        <GoogleSignInButton text="Continue with Google" callbackUrl={callbackUrl} />
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

      {/* Credentials Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              autoComplete="current-password"
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
          {errors.password && (
            <p className="text-xs text-red-500 flex items-center gap-1 pl-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Options Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500/20 accent-amber-600 cursor-pointer"
            />
            <span>Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-amber-600 hover:text-amber-700 font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-medium text-sm sm:text-base transition-all duration-200 shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer pt-0.5"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      {/* Switch to Register */}
      <p className="text-center text-xs sm:text-sm text-slate-500 pt-1">
        Don&apos;t have an account?{" "}
        <Link
          href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
          className="font-medium text-amber-600 hover:text-amber-700 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 text-xs">
          Loading sign in portal...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
