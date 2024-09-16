// middleware.js (Route protection middleware)
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Use a library like jose for JWT verification
import { adminAuth } from "./middlewares/adminAuth";
import { normalUserAuth } from "./middlewares/normalUserAuth";

export async function middleware(req) {
  // const token = req.cookies.get("adminToken")?.value;

  // if (!token) {
  //   // Redirect to login if no token is found
  //   return NextResponse.redirect(new URL("/admin", req.url));
  // }

  // try {
  //   // Verify JWT token
  //   const { payload } = await jwtVerify(
  //     token,
  //     new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
  //   );

  //   // Proceed to the requested page
  //   return NextResponse.next();
  // } catch (error) {
  //   // Token verification failed, redirect to login
  //   return NextResponse.redirect(new URL("/admin", req.url));
  // }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const adminResponse = await adminAuth(req);
    if (adminResponse) return adminResponse;
  } else if (
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/cart")
  ) {
    console.log("user route middleware")

    const userResponse = await normalUserAuth(req);
    if (userResponse) return userResponse;
  } else {


    console.log("normal route middleware")
    const token = req.cookies.get("token")?.value;
    console.log(token, "token");
    if (!token) {
      console.log("no token");




      const response = NextResponse.next();
      response.cookies.set("token", "no token", {
        httpOnly: true,
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
      return response;
      // Redirect to login if no token is found
      // return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify JWT token
      console.log("token verifying");
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_USER_SECRET)
      );

      const response = NextResponse.next();

      response.cookies.set("token2", token, {
        httpOnly: true,
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });

      // Proceed to the requested page
      return response;
    } catch (error) {
      console.log("token validation failed");
      return NextResponse.next();
      // Token verification failed, redirect to login
      // return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  // return NextResponse.next();
}

// Apply middleware to specific routes (e.g., dashboard, profile, etc.)
export const config = {
  matcher: ["/admin/secure/:path*", "/profile/:path", "/cart/:path", "/:path"],
};
