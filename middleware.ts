import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySession, homeForRole } from './src/server/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);

  const isSuperArea = pathname.startsWith('/superadmin');
  const isSchoolArea = pathname.startsWith('/school');
  const isAuthPage = pathname === '/login' || pathname === '/registration';

  // legacy admin URLs -> new console
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.redirect(new URL('/superadmin/dashboard', req.url));
  }

  if ((isSuperArea || isSchoolArea) && !session) {
    const url = new URL('/login', req.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // role fencing
  if (session) {
    if (isSuperArea && session.role === 'school') {
      return NextResponse.redirect(new URL('/school/dashboard', req.url));
    }
    if (isSchoolArea && session.role !== 'school') {
      return NextResponse.redirect(new URL('/superadmin/dashboard', req.url));
    }
    if (isAuthPage) {
      return NextResponse.redirect(new URL(homeForRole(session.role), req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin', '/superadmin/:path*', '/school/:path*', '/login', '/registration'],
};
