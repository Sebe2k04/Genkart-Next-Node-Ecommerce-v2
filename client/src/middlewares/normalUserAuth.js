import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const normalUserAuth = async (req) => {
  const token = req.cookies.get("token")?.value;
  console.log(token, "token");
  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL("/login", req.url));
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
    // Token verification failed, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
};
