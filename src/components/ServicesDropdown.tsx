"use client";

import React from "react";
import Link from "next/link";

type Service = {
  id: number;
  title: string;
  slug: string;
};

function chunk<T>(arr: T[], n: number) {
  const per = Math.ceil(arr.length / n);
  const out: T[][] = [];
  for (let i = 0; i < n; i++) out.push(arr.slice(i * per, (i + 1) * per));
  return out;
}

export default function ServicesDropdown({ services }: { services: Service[] }) {
  const cols = chunk(services || [], 4);

  return (
    <div className="w-full bg-[var(--color-brown)] text-white rounded-b-2xl p-8 shadow-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {cols.map((col, i) => (
          <div key={i} className="space-y-3">
            {col.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="block text-sm hover:underline"
              >
                {s.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
