import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const normalUserAuth = async (req) => {
  const token = req.cookies.get("token")?.value;
  // console.log(token, "token");
  if (!token) {
   
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // console.log("token verifying");
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_USER_SECRET)
    );

    return null;
  } catch (error) {
    // console.log("token validation failed");

    return NextResponse.redirect(new URL("/login", req.url));
  }
};
