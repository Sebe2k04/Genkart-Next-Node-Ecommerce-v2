import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const normalUserAuth = async (req) => {
  const token = req.cookies.get("token")?.value;
  console.log(token);
  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify JWT token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_USER_SECRET)
    );

    // Proceed to the requested page
    return null;
  } catch (error) {
    // Token verification failed, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
};
