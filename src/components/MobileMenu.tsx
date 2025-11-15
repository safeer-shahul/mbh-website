"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function MobileMenu({
  open,
  onClose,
  services,
  onToggleLang,
  lang,
}: any) {
  const { t } = useTranslation();

  return (
    <div
      className={`fixed inset-0 bg-black/60 z-50 transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 w-4/5 max-w-sm bg-white dark:bg-slate-800 h-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="mb-5" onClick={onClose}>
          ✕
        </button>

        <nav className="space-y-4">
          <Link href="/">{t("menu_home")}</Link>
          <Link href="/about">{t("menu_about")}</Link>

          <div>
            <div className="font-semibold">{t("menu_services")}</div>
            <div className="pl-2 space-y-2">
              {services?.map((s: any) => (
                <Link key={s.id} href={`/services/${s.slug}`}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/blog">{t("menu_blog")}</Link>
          <Link href="/team">{t("menu_team")}</Link>
          <Link href="/contact">{t("menu_contact")}</Link>
        </nav>

        <div className="mt-8 flex items-center gap-3">
          <button className="border px-4 py-2 rounded" onClick={onToggleLang}>
            {t(lang === "en" ? "lang_en" : "lang_ar")}
          </button>

          <button className="ml-auto border px-4 py-2 rounded">
            {t("menu_book")}
          </button>
        </div>
      </div>
    </div>
  );
}
