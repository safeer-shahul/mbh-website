import api from "./api";

export async function getTestimonials(lang: string) {
  const res = await api.get("/testimonials", {
    params: {
      locale: lang,
      populate: "photo",
      sort: "id:asc",
    },
  });

  const list = res.data?.data || [];

  return list.map((item: any) => {
    const photo = item.photo;

    return {
      id: item.id,
      message: item.message,
      client_name: item.client_name,
      position: item.position,
      photo: photo?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${photo.url}`
        : null,
    };
  });
}
