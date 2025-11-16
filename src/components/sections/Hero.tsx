"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getHeroSlides } from "@/services/heroApi";
import HeroSlider from "@/components/sliders/HeroSlider";

export default function Hero() {
  const lang = useSelector((state: RootState) => state.language.lang);

  const [slides, setSlides] = useState<any[]>([]);
  const [loadedLang, setLoadedLang] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await getHeroSlides(lang);
      if (!mounted) return;

      setSlides(data);
      setLoadedLang(lang);
    })();

    return () => {
      mounted = false;
    };
  }, [lang]);

  if (!slides.length || loadedLang !== lang) return null;

  return (
    <section className="relative w-full h-[600px] md:h-[740px]">
      <HeroSlider slides={slides} />
    </section>
  );
}

