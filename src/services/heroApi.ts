import api from "./api";

export async function getHeroSlides(lang: string) {
  const res = await api.get("/hero-slides", {
    params: {
      locale: lang,
      "populate[media]": true,
      "populate[person_photo]": true,
    },
  });

  return res.data.data || [];
}
