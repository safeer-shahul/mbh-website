"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getTestimonials } from "@/services/testimonialApi";
import TestimonialSlider from "@/components/sliders/TestimonialSlider";
import i18n from "@/i18n";

export default function Testimonials() {
  const lang = useSelector((state: RootState) => state.language.lang);

  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  const t = (key: string) => i18n.t(key, { lng: currentLang });

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getTestimonials(lang).then((data) => {
      setItems(data);
    });
  }, [lang]);

  if (items.length === 0) return null;

  return (
    <section className="bg-[var(--color-brown-dark)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-22">
        
        <h2 className="text-2xl md:text-4xl font-semibold mb-2">
          {t("testimonials_heading")}
        </h2>

        <p className="text-sm text-white max-w-lg mb-8">
          {t("testimonials_subheading")}
        </p>

        <TestimonialSlider items={items} />
      </div>
    </section>
  );
}

