// src/utils/cookies.ts

"use server";

import { cookies } from "next/headers";

export async function getLangCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("lang")?.value || "en";
}
