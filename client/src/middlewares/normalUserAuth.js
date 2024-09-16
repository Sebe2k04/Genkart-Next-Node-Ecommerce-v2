import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// export const normalUserAuth = async (req) => {
//   const token = req.cookies.get("token")?.value;
//   console.log(token, "token");
//   if (!token) {
//     // Redirect to login if no token is found
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     // Verify JWT token
//     console.log("token verifying");
//     const { payload } = await jwtVerify(
//       token,
//       new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_USER_SECRET)
//     );

//     const response = NextResponse.next();

//     response.cookies.set("token2", token, {
//       httpOnly: true, // Accessible by JavaScript
//       path: "/", // Cookie available across all pages
//       maxAge: 30 * 24 * 60 * 60, // 30 days
//     });

//     // Proceed to the requested page
//     return null;
//   } catch (error) {
//     console.log("token validation failed");
//     // Token verification failed, redirect to login
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// };

export const normalUserAuth = async (req) => {
  const token = req.headers.get("authorization")?.split(" ")[1]; // Extract the token

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    const response = NextResponse.next();
    response.cookies.set("token", token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000, });
    return response;
  }

  // return NextResponse.next();
};
