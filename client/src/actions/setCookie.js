"use server";

import { cookies } from 'next/headers';

export async function setCookie(value) {
  const cookieStore = cookies();

  // Set the cookie with httpOnly, secure, and other attributes
  cookieStore.set({
    name: 'token',
    value: value,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure only in production
    path: '/',
    sameSite: 'strict', // CSRF protection
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true };
}
