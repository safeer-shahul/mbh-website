"use client";

import { useEffect, useState } from "react";
import { getTeamResults } from "@/services/searchApi";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import i18n from "@/i18n";
import SkeletonList from "@/components/ui/SkeletonList";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  photo?: string;   // IMPORTANT: photo is a string
}

export default function TeamSearchResults({ query, page, onPageChange }: any) {
  const lang = useSelector((s: RootState) => s.language.lang);

  const [items, setItems] = useState<TeamMember[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTeamResults({ q: query, page, pageSize: 10, lang }).then((res) => {
      setItems(res.data);
      setPageCount(res.meta.pageCount);
      setLoading(false);
    });
  }, [query, page, lang]);

  if (loading) return <SkeletonList />;

  if (!items.length)
    return <p className="text-gray-600">{i18n.t("no_results")}</p>;

  return (
    <div>
      {items.map((m) => {
        const img = m.photo
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${m.photo}`
          : "/images/placeholder.png";

        return (
          <div key={m.id} className="py-5 border border-gray-200 flex gap-4 items-center">
            <Image
              src={img}
              alt={m.name}
              width={60}
              height={60}
              className="rounded-lg object-cover"
              unoptimized
            />

            <div>
              <p className="text-lg font-medium">{m.name}</p>
              <p className="text-gray-600 text-sm">{m.position}</p>
            </div>
          </div>
        );
      })}

      <Pagination page={page} pageCount={pageCount} onChange={onPageChange} />
    </div>
  );
}
