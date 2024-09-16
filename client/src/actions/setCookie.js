"use server";

import { cookies } from 'next/headers';

export async function setCookie(name,value) {
  const cookieStore = cookies();

  // Set the cookie with httpOnly, secure, and other attributes
  cookieStore.set({
    name: name,
    value: value,
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production', // Use secure only in production
    path: '/',
    sameSite: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "None" : "Lax", // CSRF protection
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true };
}
