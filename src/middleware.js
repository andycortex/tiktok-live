import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  console.log("Middleware executed");
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  console.log("Token from cookie:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname === "/live";
  const isAuthRoute = ["/login", "/register"].includes(pathname);

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret); // Verify token validity

      // If authenticated and trying to access auth routes, redirect to /live
      if (isAuthRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/live";
        return NextResponse.redirect(url);
      }
      // If authenticated and trying to access protected routes, allow
      if (isProtectedRoute) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Token verification failed:", error.message);
      // If token is invalid, clear it and redirect to login
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      const response = NextResponse.redirect(url);
      response.cookies.delete("token"); // Clear invalid token
      return response;
    }
  } else {
    // If no token and trying to access protected routes, redirect to login
    if (isProtectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Allow all other routes (including public routes and auth routes if not authenticated)
  return NextResponse.next();
}

export const config = {
  matcher: ["/live", "/login", "/register", "/dashboard/:path*"], // Apply middleware to these routes
};
