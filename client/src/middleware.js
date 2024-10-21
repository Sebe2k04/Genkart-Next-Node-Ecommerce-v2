import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; 
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

    const userResponse = await normalUserAuth(req);
    if (userResponse) return userResponse;
  } 

  return NextResponse.next();
}
//path
export const config = {
  matcher: ["/admin/secure/:path*", "/profile/:path", "/cart/:path"],
};
