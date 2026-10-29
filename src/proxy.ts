import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { UserRole } from "@/types/auth";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isAuthenticated = Boolean(session?.user);
  const userRole = session?.user?.role;

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  // 1. If logged in and visiting login/register, redirect to appropriate portal
  if (isAuthRoute && isAuthenticated) {
    if (
      userRole === UserRole.OWNER ||
      userRole === UserRole.ADMIN ||
      userRole === "Platform Owner" ||
      userRole === "System Administrator"
    ) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 2. Protect Admin Route
  if (isAdminRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
    const isOwnerOrAdmin =
      userRole === UserRole.OWNER ||
      userRole === UserRole.ADMIN ||
      userRole === "Platform Owner" ||
      userRole === "System Administrator";

    if (!isOwnerOrAdmin) {
      return NextResponse.redirect(
        new URL("/dashboard?error=access_denied", req.url)
      );
    }
  }

  // 3. Protect Dashboard Route
  if (isDashboardRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
