// middleware.js (Route protection middleware)
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Use a library like jose for JWT verification

export async function middleware(req) {
  const token = req.cookies.get('adminToken')?.value;

  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  try {
    // Verify JWT token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));

    // Proceed to the requested page
    return NextResponse.next();
  } catch (error) {
    // Token verification failed, redirect to login
    return NextResponse.redirect(new URL('/admin', req.url));
  }
}

// Apply middleware to specific routes (e.g., dashboard, profile, etc.)
export const config = {
  matcher: ['/admin/secure/:path*'],
};
