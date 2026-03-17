import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const isPublic =
    ["/", "/login", "/register", "/forgot-password"].includes(pathname) ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email");

  if (!token) {
    if (!isPublic) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublic && pathname !== "/") {
    return NextResponse.redirect(
      new URL(role === "ADMIN" ? "/dashboard" : "/playground", req.url)
    );
  }

  if (
    role === "USER" &&
    !pathname.startsWith("/playground") &&
    pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/playground", req.url));
  }

  if (
    role === "ADMIN" &&
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/admin") &&
    pathname !== "/" &&
    !pathname.startsWith("/playground")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/admin/:path*",
    "/playground/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password/:path*",
    "/verify-email/:path*",
  ],
};
