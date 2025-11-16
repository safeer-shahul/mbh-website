//src/app/api/lang/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lang } = await req.json();

  const res = NextResponse.json({ ok: true });
  res.cookies.set("lang", lang, { path: "/" });

  return res;
}
