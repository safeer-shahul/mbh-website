"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getTeamMembers } from "@/services/teamApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TeamCard from "@/components/cards/TeamCard";
import i18n from "@/i18n";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Teams() {
  const lang = useSelector((state: RootState) => state.language.lang);
  const [members, setMembers] = useState<any[]>([]);
  const [loadedLang, setLoadedLang] = useState("");

  useEffect(() => {
    getTeamMembers(lang).then((data) => {
      setMembers(data);
      setLoadedLang(lang);
    });
  }, [lang]);

  if (loadedLang !== lang || members.length === 0) return null;

  const t = (key: string) => i18n.t(key, { lng: loadedLang });

  const showNavigation = members.length >= 3;

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 relative">
      <h2 className="text-center text-3xl font-bold text-[var(--color-brown-dark)] mb-4">
        {t("menu_team")}
      </h2>

      <p className="text-center text-sm text-gray-600 font-medium max-w-2xl mx-auto mb-12">
        {t("team_subheading")}
      </p>

      <div className="relative px-8 sm:px-12 md:px-40">
        <Swiper
          modules={[Navigation]}
          navigation={showNavigation ? {
            nextEl: ".team-next",
            prevEl: ".team-prev",
          } : false}
          spaceBetween={16}
          slidesPerView={1}
          loop={showNavigation}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="team-swiper"
        >
          {members.map((member) => (
            <SwiperSlide key={member.id}>
              <TeamCard member={member} />
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <>
            <button
              className="team-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-700 hover:text-gray-900 transition-all hover:scale-110"
              style={{ fontSize: "2.5rem" }}
              aria-label="Previous"
            >
              <IoChevronBack />
            </button>

            <button
              className="team-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-700 hover:text-gray-900 transition-all hover:scale-110"
              style={{ fontSize: "2.5rem" }}
              aria-label="Next"
            >
              <IoChevronForward />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

