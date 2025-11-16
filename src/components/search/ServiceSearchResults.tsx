"use client";

import { useEffect, useState } from "react";
import { getServiceResults } from "@/services/searchApi";
import Link from "next/link";
import Pagination from "./Pagination";
import { stripHtml, truncate } from "@/utils/strHelpers";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import i18n from "@/i18n";
import SkeletonList from "@/components/ui/SkeletonList";

interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  description_intro?: string;
}

export default function ServiceSearchResults({ query, page, onPageChange }: any) {
  const lang = useSelector((s: RootState) => s.language.lang);

  const [items, setItems] = useState<ServiceItem[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getServiceResults({ q: query, page, pageSize: 10, lang }).then((res) => {
      setItems(res.data);
      console.log(res,'ssssssssssssss')
      setPageCount(res.meta.pageCount);
      setLoading(false);
    });
  }, [query, page, lang]);

  if (loading) return <SkeletonList />;

  if (!items.length)
    return <p className="text-gray-600">{i18n.t("no_results")}</p>;

  return (
    <div>
      {items.map((s) => (
       
        <div key={s.id} className="py-5 border border-gray-200">
          <Link href={`/services/${s.slug}`} className="text-lg font-semibold">
            {s.title}
          </Link>

          <p className="text-gray-600 text-sm mt-1">
            {truncate(stripHtml(s.description_intro || ""), 200)}
          </p>

          <Link
            href={`/services/${s.slug}`}
            className="text-[var(--color-brown)] underline text-sm mt-2 block"
          >
            {i18n.t("read_more")}
          </Link>
        </div>
      ))}

      <Pagination page={page} pageCount={pageCount} onChange={onPageChange} />
    </div>
  );
}
