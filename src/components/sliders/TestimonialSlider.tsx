"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import type { Swiper as SwiperType } from "swiper";

type Testimonial = {
  id: number;
  message: string;
  client_name: string;
  position?: string;
  photo?: string | null;
};

export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const lang = useSelector((state: RootState) => state.language.lang);
  const isRTL = lang === "ar";

  useEffect(() => {
    if (swiperRef.current) {
      setTimeout(() => {
        swiperRef.current?.slideToLoop(0, 0);
      }, 100);
    }
  }, [items, isRTL]);

  if (!items || items.length === 0) return null;

  const showNav = items.length > 1;

  return (
    <div className="relative max-w-7xl mx-auto  py-12">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Autoplay]}
        className="testimonial-swiper"
        spaceBetween={30}
        slidesPerView={1}
        loop={items.length > 1}
        navigation={
          showNav
            ? {
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
              }
            : false
        }
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        dir={isRTL ? "rtl" : "ltr"}
        key={`testimonial-${isRTL ? 'rtl' : 'ltr'}`}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
      >
        {items.map((it) => (
          <SwiperSlide key={it.id}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pb-6 md:pb-16">
              <div className="flex justify-center md:justify-start">
                {it.photo ? (
                  <div className="w-44 h-44 md:w-100 md:h-100 rounded-md overflow-hidden">
                    <Image
                      src={it.photo}
                      alt={it.client_name}
                      width={480}
                      height={480}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-44 h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-md bg-white/10" />
                )}
              </div>

              <div className="md:col-span-2 text-white">
                <blockquote className="text-base md:text-lg leading-relaxed mb-6">
                  "{it.message}"
                </blockquote>

                <div>
                  <div className="font-semibold text-lg">
                    {it.client_name}
                  </div>
                  {it.position && (
                    <div className="text-sm text-white/70 mt-1">{it.position}</div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showNav && (
        <div className={`absolute bottom-0 z-20 flex  gap-4 ${isRTL ? 'left-6 md:left-12' : 'right-6 md:right-12'}`}>
          <button
            className="testimonial-prev w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
            onClick={() => isRTL ? swiperRef.current?.slideNext() : swiperRef.current?.slidePrev()}
            aria-label="Previous testimonial"
          >
            {isRTL ? <IoArrowForward className="text-2xl" /> : <IoArrowBackOutline className="text-2xl" />}
          </button>

          <button
            className="testimonial-next w-12 h-12 rounded-full bg-white hover:bg-white/90 flex items-center justify-center text-[var(--color-brown-dark)] transition-all"
            onClick={() => isRTL ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext()}
            aria-label="Next testimonial"
          >
            {isRTL ? <IoArrowBackOutline className="text-2xl" /> : <IoArrowForward className="text-2xl" />}
          </button>
        </div>
      )}
    </div>
  );
}

