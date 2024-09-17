// middleware.js (Route protection middleware)
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Use a library like jose for JWT verification
import { adminAuth } from "./middlewares/adminAuth";
import { normalUserAuth } from "./middlewares/normalUserAuth";

export async function middleware(req,res) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const adminResponse = await adminAuth(req);
    if (adminResponse) return adminResponse;
  } else if (
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/cart")
  ) {
    // console.log("user route middleware");

    const userResponse = await normalUserAuth(req);
    if (userResponse) return userResponse;
  } 

  return NextResponse.next(); // Continue to the next middleware or route handler
}

// Apply middleware to specific routes (e.g., dashboard, profile, etc.)
export const config = {
  matcher: ["/admin/secure/:path*", "/profile/:path", "/cart/:path"],
};
