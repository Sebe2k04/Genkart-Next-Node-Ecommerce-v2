"use server";

import { cookies } from 'next/headers';

export async function removeCookie(name) {
  const cookieStore = cookies();

  // Clear the cookie by setting it to an empty value and a past expiration date
  cookieStore.set({
    name: name,
    value: '',
    expires: new Date(0), // Expire the cookie immediately
    path: '/', // Ensure the cookie is deleted for the entire site
  });

  return { success: true };
}
