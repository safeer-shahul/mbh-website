import api from "./api";

// Always use client Redux language (passed manually)
export async function getAllServices(lang: string) {
  const res = await api.get("/services", {
    params: {
      locale: lang,
      populate: "*",
    },
  });

  const all = res.data.data || [];

  return all.map((item: any) => {
    const title = item.title ?? item.attributes?.title ?? "";
    const slug = item.slug ?? item.attributes?.slug ?? "";
    return {
      id: item.id,
      title,
      slug,
    };
  });
}

export async function getServiceBySlug(slug: string, lang: string) {
  const res = await api.get("/services", {
    params: {
      locale: lang,
      "filters[slug][$eq]": slug,
      "populate[sections][populate][bullet_points]": "*",
    },
  });

  const item = res.data.data?.[0];
  if (!item) return null;

  const attrs = item.attributes ?? item;

  return {
    id: item.id,
    title: attrs.title ?? "",
    slug: attrs.slug ?? "",
    description_intro: attrs.description_intro ?? "",
    description_end: attrs.description_end ?? null,
    sections: attrs.sections ?? [],
  };
}
