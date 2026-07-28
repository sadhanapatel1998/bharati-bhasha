import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname === "/admin/login";
  const isProtected = pathname.startsWith("/admin") && !isLoginRoute;

  if (isProtected && !token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in — skip the login screen.
  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
