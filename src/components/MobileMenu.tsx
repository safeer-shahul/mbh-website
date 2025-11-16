// src/components/MobileMenu.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import i18n from "@/i18n";
import { FiSearch, FiX } from "react-icons/fi";

export default function MobileMenu({
  open,
  onClose,
  services,
  onToggleLang,
  lang,
  onMobileSearch,
}: {
  open: boolean;
  onClose: () => void;
  services: { id: number; title: string; slug: string }[];
  onToggleLang: () => void;
  lang: string;
  onMobileSearch?: (q?: string) => void;
}) {
  const [q, setQ] = useState("");

  return (
    <div
      className={`fixed inset-0 bg-black/60 z-50 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 w-4/5 max-w-sm bg-white h-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} aria-label="close">✕</button>
          <div className="flex items-center gap-2">
            <button onClick={onToggleLang} className="border px-3 py-1 rounded">
              {lang === "en" ? i18n.t("lang_en") : i18n.t("lang_ar")}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={i18n.t("search_placeholder") || "Search..."}
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              onClick={() => {
                if (q.trim()) {
                  onMobileSearch?.(q.trim());
                }
              }}
              className="p-2 bg-[var(--color-brown)] text-white rounded"
            >
              <FiSearch />
            </button>
          </div>
        </div>

        <nav className="space-y-4">
          <Link href="/" onClick={onClose}>{i18n.t("menu_home")}</Link>
          <Link href="/about" onClick={onClose}>{i18n.t("menu_about")}</Link>

          <div>
            <div className="font-semibold">{i18n.t("menu_services")}</div>
            <div className="pl-2 space-y-2">
              {services?.map((s) => (
                <Link href={`/services/${s.slug}`} key={s.id} onClick={onClose}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/blog" onClick={onClose}>{i18n.t("menu_blog")}</Link>
          <Link href="/team" onClick={onClose}>{i18n.t("menu_team")}</Link>
          <Link href="/contact" onClick={onClose}>{i18n.t("menu_contact")}</Link>
        </nav>

        <div className="mt-8 flex items-center gap-3">
          <button onClick={onToggleLang} className="border px-4 py-2 rounded">
            {lang === "en" ? i18n.t("lang_en") : i18n.t("lang_ar")}
          </button>
          <button className="ml-auto border px-4 py-2 rounded">
            {i18n.t("menu_book")}
          </button>
        </div>
      </div>
    </div>
  );
}
