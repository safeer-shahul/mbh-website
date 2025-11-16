"use client";

import PageHero from "@/components/layout/PageHero";
import SearchPageClient from "@/components/search/SearchPageClient";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const params = useSearchParams();

  const query = params.get("q") ?? "";
  const tab = params.get("tab") ?? "team";
  const page = Number(params.get("page") ?? 1);

  return (
    <>
      <PageHero imageUrl="/images/hero/main_hero.jpg" />

      <SearchPageClient
        initialQuery={query}
        initialTab={tab}
        initialPage={page}
      />
    </>
  );
}
