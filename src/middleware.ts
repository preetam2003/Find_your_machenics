import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/search', '/shops'];
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith('/shops/') || pathname.startsWith('/api/auth')
  );

  // API routes that don't require authentication
  const publicApiRoutes = ['/api/auth', '/api/shops'];
  const isPublicApiRoute = publicApiRoutes.some(route => pathname.startsWith(route));

  // If no token and trying to access protected route
  if (!token) {
    if (!isPublicRoute && !isPublicApiRoute) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const userRole = token.role as string;

  // Redirect authenticated users away from auth pages
  if (pathname === '/login' || pathname === '/register') {
    const dashboardUrl = getDashboardUrl(userRole);
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  // Role-based route protection
  if (pathname.startsWith('/admin')) {
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (pathname.startsWith('/mechanic')) {
    if (userRole !== 'MECHANIC') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect mechanic API routes
  if (pathname.startsWith('/api/mechanic')) {
    if (userRole !== 'MECHANIC') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin')) {
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
  }

  return NextResponse.next();
}

function getDashboardUrl(role: string): string {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard';
    case 'MECHANIC':
      return '/mechanic/dashboard';
    default:
      return '/';
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
