import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/live'];

  // Check if the current route is protected
  if (protectedRoutes.includes(pathname)) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // If no token, redirect to login page
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      // Verify the token
      verify(token, process.env.JWT_SECRET);
      // If token is valid, allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      // If token is invalid, redirect to login page
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Allow all other routes to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/live'], // Apply middleware to /live route
};
