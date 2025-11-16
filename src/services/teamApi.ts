import api from "./api";

export async function getTeamMembers(lang: string) {
  const res = await api.get("/team-members", {
    params: {
      locale: lang,
      populate: "*",
    },
  });

  return res.data.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    position: item.position,
    whatsapp: item.whatsapp,
    phone: item.phone,
    email: item.email,
    linkedin: item.linkedin,
    photo: item.photo?.url || "",
  }));
}
