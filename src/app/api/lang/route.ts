import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { lang } = await request.json();

  const res = NextResponse.json({ ok: true });

  // Store cookie for SSR + browser
  res.cookies.set("lang", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
