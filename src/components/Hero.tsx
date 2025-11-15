"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getHeroSlides } from "@/services/heroApi";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  const lang = useSelector((state: RootState) => state.language.lang);
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    getHeroSlides().then((data) => setSlides(data));
  }, [lang]); // 👈 re-fetch when language changes

  if (!slides.length) return null;

  return (
    <section className="relative w-full h-[850px]">
      <HeroSlider slides={slides} />
    </section>
  );
}
