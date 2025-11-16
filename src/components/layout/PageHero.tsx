"use client";

import React from "react";
import Image from "next/image";

type PageHeroProps = {
  imageUrl: string;
  height?: string;
  children?: React.ReactNode;
};

export default function PageHero({
  imageUrl,
  height = "450px",
  children,
}: PageHeroProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <Image
        src={imageUrl}
        alt="hero background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-[var(--color-brown)]/70 mix-blend-multiply"></div>

      <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-6">
        {children}
      </div>
    </div>
  );
}

