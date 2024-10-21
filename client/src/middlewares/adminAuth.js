import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const adminAuth = async (req) => {
  const token = req.cookies.get("adminToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );

    return null;
  } catch (error) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
};
