import api from "./api";

type Meta = { page: number; pageCount: number; total: number };

function buildServiceFilters(q: string) {
  if (!q) return {};
  return {
    "filters[$or][0][title][$containsi]": q,
    "filters[$or][1][description_intro][$containsi]": q,
    "filters[$or][2][sections][section_title][$containsi]": q,
    "filters[$or][3][sections][section_paragraph][$containsi]": q,
  };
}

function buildTeamFilters(q: string) {
  if (!q) return {};
  return {
    "filters[$or][0][name][$containsi]": q,
    "filters[$or][1][position][$containsi]": q,
  };
}

export async function getServiceResults({
    q,
    page = 1,
    pageSize = 10,
    lang = "en",
  }: {
    q?: string;
    page?: number;
    pageSize?: number;
    lang?: string;
  }) {
    const params: any = {
      locale: lang,
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      populate: "sections",
      ...buildServiceFilters(q || ""),
    };
  
    const res = await api.get("/services", { params });
  
    console.log("SERVICE RAW:", res.data);
  
    const data = res.data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      description_intro: item.description_intro,
    }));
  
    const meta = res.data.meta.pagination;
  
    return { data, meta };
  }

export async function getTeamResults({
  q,
  page = 1,
  pageSize = 10,
  lang = "en",
}: {
  q?: string;
  page?: number;
  pageSize?: number;
  lang?: string;
}) {
  const params: any = {
    locale: lang,
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    populate: "photo",
    ...buildTeamFilters(q || ""),
  };

  const res = await api.get("/team-members", { params });
  const data = res.data.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    position: item.position,
    photo: item.photo?.url || (item.photo?.data?.attributes?.url ?? null),
  }));

  const meta: Meta = {
    page: res.data.meta.pagination.page,
    pageCount: res.data.meta.pagination.pageCount,
    total: res.data.meta.pagination.total,
  };

  return { data, meta };
}
