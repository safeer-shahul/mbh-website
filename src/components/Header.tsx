"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "@/redux/store";
import { setLanguage } from "@/redux/languageSlice";

import { getAllServices } from "@/services/servicesApi";
import ServicesDropdown from "./ServicesDropdown";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  const lang = useSelector((state: RootState) => state.language.lang);
  const { t } = useTranslation(); // ✅ IMPORTANT

  const [services, setServices] = useState<any[]>([]);
  const [showServices, setShowServices] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const path = usePathname();

  // Re-fetch services when language changes
  useEffect(() => {
    getAllServices().then((res) => {
      if (Array.isArray(res?.data)) setServices(res.data);
    });
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setShowServices(false), [path]);

  async function onToggleLang() {
    const newLang = lang === "en" ? "ar" : "en";

    dispatch(setLanguage(newLang)); // redux + i18n sync

    await fetch("/api/lang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: newLang }),
    });

    router.refresh(); // refresh SSR components
  }

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isSticky ? "bg-[var(--color-brown)]/90 shadow" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setMobileOpen(true)}>
              ☰
            </button>

            <Link href="/">
              <img src="/logo.png" className="h-10" />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav
            className={`hidden md:flex gap-8 text-white ${
              showSearch ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Link href="/">{t("menu_home")}</Link>
            <Link href="/about">{t("menu_about")}</Link>

            <div
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
              className="relative"
            >
              <button>{t("menu_services")}</button>

              {showServices && (
                <div className="absolute left-0 top-full w-[900px] mt-3">
                  <ServicesDropdown services={services} />
                </div>
              )}
            </div>

            <Link href="/blog">{t("menu_blog")}</Link>
            <Link href="/team">{t("menu_team")}</Link>
            <Link href="/contact">{t("menu_contact")}</Link>
          </nav>

          {/* RIGHT BUTTONS */}
          <div className="flex items-center gap-3 text-white">
            <button
              onClick={onToggleLang}
              className="px-3 py-1 rounded border"
            >
              {t(lang === "en" ? "lang_en" : "lang_ar")}
            </button>

            <button className="hidden md:block px-4 py-2 rounded border">
              {t("menu_book")}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        services={services}
        onToggleLang={onToggleLang}
        lang={lang}
      />
    </>
  );
}
