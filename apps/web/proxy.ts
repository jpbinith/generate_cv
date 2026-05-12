import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/auth";

export function proxy(request: NextRequest) {
  const hasAccessToken = request.cookies.has(ACCESS_TOKEN_COOKIE_NAME);
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN_COOKIE_NAME);
  const isAuthenticated = hasAccessToken || hasRefreshToken;
  const isRootPath = request.nextUrl.pathname === "/";

  if (isRootPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isRootPath) {
    return NextResponse.next();
  }

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/", request.url);
  signInUrl.searchParams.set(
    "redirect",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/master-profile/:path*"],
};
