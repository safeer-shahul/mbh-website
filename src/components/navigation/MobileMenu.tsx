// src/components/MobileMenu.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import i18n from "@/i18n";
import { FiSearch, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

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
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div
      className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute right-0 top-0 w-4/5 max-w-sm bg-white h-full p-6 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button and language toggle */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onClose} 
            aria-label="close"
            className="p-2 hover:bg-gray-100 rounded"
          >
            <FiX size={24} />
          </button>
          <button 
            onClick={onToggleLang} 
            className="border border-[var(--color-brown)] text-[var(--color-brown)] px-4 py-1.5 rounded text-sm hover:bg-[var(--color-brown)] hover:text-white transition"
          >
            {lang === "en" ? i18n.t("lang_en") : i18n.t("lang_ar")}
          </button>
        </div>

        {/* Mobile search */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && q.trim()) {
                  onMobileSearch?.(q.trim());
                  setQ("");
                }
              }}
              placeholder={i18n.t("search_placeholder") || "Search..."}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brown)]"
            />
            <button
              onClick={() => {
                if (q.trim()) {
                  onMobileSearch?.(q.trim());
                  setQ("");
                }
              }}
              className="p-2 bg-[var(--color-brown)] text-white rounded hover:bg-[var(--color-brown-dark)] transition"
            >
              <FiSearch size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Menu - Column Layout */}
        <nav className="flex flex-col space-y-1">
          <Link 
            href="/" 
            onClick={onClose}
            className="py-3 px-3 text-gray-800 hover:bg-gray-100 rounded transition"
          >
            {i18n.t("menu_home")}
          </Link>

          <Link 
            href="/about" 
            onClick={onClose}
            className="py-3 px-3 text-gray-800 hover:bg-gray-100 rounded transition"
          >
            {i18n.t("menu_about")}
          </Link>

          {/* Services - Collapsible */}
          <div className="border-t border-b border-gray-200">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between py-3 px-3 text-gray-800 hover:bg-gray-100 rounded transition"
            >
              <span>{i18n.t("menu_services")}</span>
              {servicesOpen ? (
                <FiChevronUp size={18} />
              ) : (
                <FiChevronDown size={18} />
              )}
            </button>

            {/* Services Submenu */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                servicesOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="pl-6 pr-3 py-2 space-y-1 bg-gray-50">
                {services?.map((s) => (
                  <Link
                    href={`/services/${s.slug}`}
                    key={s.id}
                    onClick={onClose}
                    className="block py-2 px-3 text-sm text-gray-700 hover:bg-white hover:text-[var(--color-brown)] rounded transition"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link 
            href="/blog" 
            onClick={onClose}
            className="py-3 px-3 text-gray-800 hover:bg-gray-100 rounded transition"
          >
            {i18n.t("menu_blog")}
          </Link>

          <Link 
            href="/team" 
            onClick={onClose}
            className="py-3 px-3 text-gray-800 hover:bg-gray-100 rounded transition"
          >
            {i18n.t("menu_team")}
          </Link>

          <Link 
            href="/contact" 
            onClick={onClose}
            className="py-3 px-3 text-gray-800 hover:bg-gray-100 rounded transition"
          >
            {i18n.t("menu_contact")}
          </Link>
        </nav>

        {/* Book Appointment Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button 
            className="w-full px-4 py-3 bg-[var(--color-brown)] text-white rounded-lg hover:bg-[var(--color-brown-dark)] transition"
            onClick={onClose}
          >
            {i18n.t("menu_book")}
          </button>
        </div>
      </div>
    </div>
  );
}