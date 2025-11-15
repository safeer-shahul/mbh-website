import { getLangCookie } from "@/utils/cookies";
import api from "./api";

export async function getAllServices() {
  const lang = await getLangCookie();

  const res = await api.get("/services", {
    params: {
      locale: lang,
      "populate[sections][populate]": "bullet_points",
    },
  });

  return res.data.data;
}

export async function getServiceBySlug(slug: string) {
  const lang = await getLangCookie();

  const res = await api.get("/services", {
    params: {
      locale: lang,
      "filters[slug][$eq]": slug,
      "populate[sections][populate]": "bullet_points",
    },
  });

  return res.data.data?.[0] || null;
}
