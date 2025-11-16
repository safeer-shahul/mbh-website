// src/components/HeroSlider.tsx

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function HeroSlider({ slides }: { slides: any[] }) {
  return (
    <div className="relative w-full h-[100vh]">
      {/* Custom pagination container */}
      <div className="hero-pagination absolute left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3" />

      <Swiper key={slides[0]?.locale}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{
          clickable: true,
          el: ".hero-pagination",
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.media?.url}`;
          const avatarUrl = slide.person_photo
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.person_photo.url}`
            : null;

          return (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[850px]">
                <Image
                  src={imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4B2615]/28 to-[#4B2615]/68"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center px-10 max-w-7xl mx-auto text-white">
                  <div className="flex-1">
                    <h1 className="text-5xl font-bold">{slide.title}</h1>
                    <p className="mt-4 max-w-xl">{slide.description}</p>

                    {slide.cta_text && (
                      <a
                        href={slide.cta_link}
                        className="inline-block mt-6 px-8 py-3 bg-white text-black rounded"
                      >
                        {slide.cta_text}
                      </a>
                    )}
                  </div>

                  {avatarUrl && (
                    <Image
                      src={avatarUrl}
                      alt="person"
                      width={420}
                      height={520}
                      className="rounded-lg object-cover ml-10"
                      unoptimized
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
