// src/components/Header.tsx

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiX, FiMenu } from "react-icons/fi";
import i18n from "@/i18n";

import { RootState } from "@/redux/store";
import { setLanguage } from "@/redux/languageSlice";
import { setQuery as setSearchQuery } from "@/redux/searchSlice";

import { getAllServices } from "@/services/servicesApi";
import ServicesDropdown from "./ServicesDropdown";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.lang);

  const [services, setServices] = useState<any[]>([]);
  const [showServices, setShowServices] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const path = usePathname();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await getAllServices();
        if (!mounted) return;
console.log(list,'list')
        const normalized =
          list?.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
          })) || [];

        setServices(normalized);
      } catch {
        setServices([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setShowServices(false);
  }, [path]);

  function openSearch() {
    setShowSearch(true);
    setSearchInput("");
  }

  function closeSearch() {
    setShowSearch(false);
    setSearchInput("");
  }

  function submitSearch(q?: string) {
    const query = (q ?? searchInput).trim();
    if (!query) return;
    dispatch(setSearchQuery(query) as any);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowSearch(false);
  }

  async function onToggleLang() {
    const newLang = lang === "en" ? "ar" : "en";

    try {
      i18n.changeLanguage(newLang);
    } catch {}

    dispatch(setLanguage(newLang) as any);

    try {
      await fetch("/api/lang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: newLang }),
      });
    } catch {}

    router.refresh();
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          showServices
            ? "bg-[var(--color-brown)]"
            : isSticky
            ? "bg-[var(--color-brown)]/90 shadow"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-4">

          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="open menu"
            >
              <FiMenu size={20} />
            </button>

            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="logo" className="h-12" />
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center">

            <nav
              className={`hidden md:flex gap-8 items-center text-white ${
                showSearch ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <Link href="/">{i18n.t("menu_home")}</Link>
              <Link href="/about">{i18n.t("menu_about")}</Link>

              {/* SERVICES MENU TRIGGER - Extended hover area */}
              <div
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
                className="relative"
              >
                <button className="inline-flex items-center gap-1 py-2">
                  {i18n.t("menu_services")}
                </button>
                {/* Invisible bridge to connect button to dropdown */}
                {showServices && (
                  <div className="absolute left-0 right-0 h-8 -bottom-8" />
                )}
              </div>

              <Link href="/blog">{i18n.t("menu_blog")}</Link>
              <Link href="/team">{i18n.t("menu_team")}</Link>
              <Link href="/contact">{i18n.t("menu_contact")}</Link>
            </nav>

            <div className={`w-full max-w-xl ${showSearch ? "block" : "hidden"}`}>
              <div className="flex items-center gap-2">
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitSearch();
                    if (e.key === "Escape") closeSearch();
                  }}
                  className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                  placeholder={i18n.t("search_placeholder")}
                  autoFocus
                />

                <button
                  onClick={() => submitSearch()}
                  className="px-3 py-2 rounded bg-[var(--color-brown)] text-white"
                >
                  <FiSearch />
                </button>

                <button onClick={closeSearch} className="px-3 py-2 text-white">
                  <FiX />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white">
            {!showSearch && (
              <button
                onClick={openSearch}
                className="p-2 rounded-full text-white hidden md:inline-flex"
              >
                <FiSearch size={18} />
              </button>
            )}

            <button
              onClick={onToggleLang}
              className="px-3 py-1 rounded border text-sm"
            >
              {lang === "en" ? i18n.t("lang_en") : i18n.t("lang_ar")}
            </button>

            <button className="hidden md:inline-block px-4 py-2 rounded border">
              {i18n.t("menu_book")}
            </button>
          </div>
        </div>

        {/* MEGA MENU - Positioned directly below header */}
        {showServices && (
          <div
            className="absolute left-0 right-0 top-full"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <div className="max-w-7xl mx-auto">
              <ServicesDropdown services={services} />
            </div>
          </div>
        )}
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        services={services}
        onToggleLang={onToggleLang}
        lang={lang}
        onMobileSearch={(q?: string) => {
          if (q) {
            dispatch(setSearchQuery(q) as any);
            router.push(`/search?q=${encodeURIComponent(q)}`);
            setMobileOpen(false);
          }
        }}
      />
    </>
  );
}