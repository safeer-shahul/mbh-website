// src/components/ServicesDropdown.tsx

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
console.log(services,'services')
  return (
    <div className="w-full bg-[var(--color-brown)] text-white py-10 shadow-xl 
                    rounded-b-2xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {cols.map((col, i) => (
          <div key={i} className="space-y-4">
            {col.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="block text-base hover:opacity-80 transition"
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
