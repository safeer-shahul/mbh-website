import { getLangCookie } from "@/utils/cookies";
import api from "./api";

export async function getAllServices() {
  const lang = await getLangCookie();

  const res = await api.get("/services", {
    params: {
      locale: lang,
      populate: "*", // required for localized title/slug
    },
  });

  return res.data.data; // return raw data
}

export async function getServiceBySlug(slug: string) {
  const lang = await getLangCookie();

  const res = await api.get("/services", {
    params: {
      locale: lang,
      "filters[slug][$eq]": slug,
      populate: "*",
    },
  });

  return res.data.data?.[0] || null;
}
