"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HeroSlider({ slides }: { slides: any[] }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const lang = useSelector((state: RootState) => state.language.lang);
  const isRTL = lang === "ar";

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(0, 0);
    }
  }, [slides]);

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Navigation, Pagination, Autoplay]}
      navigation={{
        prevEl: isRTL ? ".hero-next" : ".hero-prev",
        nextEl: isRTL ? ".hero-prev" : ".hero-next",
      }}
      pagination={{
        clickable: true,
        el: ".hero-pagination",
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={slides.length >= 2}
      speed={800}
      className="w-full h-full"
      watchSlidesProgress={true}
      observer={true}
      observeParents={true}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {slides.map((slide) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.media?.url}`;
        const avatarUrl = slide.person_photo
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.person_photo.url}`
          : null;

        return (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={slide.title || "Hero slide"}
                fill
                className="object-cover grayscale"
                priority={false}
                sizes="100vw"
                unoptimized={process.env.NODE_ENV === 'development'}
              />

              <div 
                className="absolute inset-0" 
                style={{
                  background: 'linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 1.2%, rgba(75, 38, 21, 0.68) 86.38%)'
                }}
              />

              <div className="absolute inset-0 flex items-center z-10">
                <div className="w-full px-4 md:px-20 lg:px-32 xl:px-40 flex items-center justify-between">
                  <div className="max-w-xl lg:max-w-2xl text-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed">
                      {slide.description}
                    </p>

                    {slide.cta_text && (
                      <a
                        href={slide.cta_link || "#"}
                        className="inline-block bg-white text-[var(--color-brown-dark)] px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base"
                      >
                        {slide.cta_text}
                      </a>
                    )}
                  </div>

                  {avatarUrl && (
                    <div className="hidden lg:block">
                      <div className="relative w-80 h-80 xl:w-96 xl:h-96">
                        <Image
                          src={avatarUrl}
                          alt={slide.person_name || "Person"}
                          fill
                          className="object-cover"
                          unoptimized={process.env.NODE_ENV === 'development'}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}

      {!isRTL ? (
        <button 
          className="hero-prev hidden md:block absolute left-8 md:left-12 lg:left-16 top-1/2 -translate-y-20 z-20 text-white text-4xl cursor-pointer hover:opacity-70 transition"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <IoChevronBack />
        </button>
      ) : (
        <button 
          className="hero-prev hidden md:block absolute right-8 md:right-12 lg:right-16 top-1/2 -translate-y-20 z-20 text-white text-4xl cursor-pointer hover:opacity-70 transition"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <IoChevronForward />
        </button>
      )}

      <div className="hero-next hidden" />

      <div className={`hero-pagination ${isRTL ? 'hero-pagination-rtl' : ''}`} />
    </Swiper>
  );
}

