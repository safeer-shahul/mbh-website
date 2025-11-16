//src/services/heroApi.ts

import api from "./api";
import { getLangCookie } from "@/utils/cookies";

export async function getHeroSlides() {
  const lang = await getLangCookie();

  const res = await api.get("/hero-slides", {
    params: {
      locale: lang,
      "populate[media]": true,
      "populate[person_photo]": true,
    },
  });

  return res.data.data;
}
