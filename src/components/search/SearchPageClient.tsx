"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TeamSearchResults from "./TeamSearchResults";
import ServiceSearchResults from "./ServiceSearchResults";
import { getServiceResults, getTeamResults } from "@/services/searchApi";

export default function SearchPageClient({
    initialQuery,
    initialTab,
    initialPage,
}: any) {
    const router = useRouter();
    const params = useSearchParams();

    const urlQuery = params.get("q") ?? initialQuery;
    const urlTab = params.get("tab") ?? initialTab;
    const urlPage = Number(params.get("page") ?? initialPage);

    const [query, setQuery] = useState(urlQuery);
    const [tab, setTab] = useState(urlTab);
    const [page, setPage] = useState(urlPage);

    const [teamCount, setTeamCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const updateURL = (nextTab: string, nextPage = 1) => {
        router.push(`/search?q=${query}&tab=${nextTab}&page=${nextPage}`);
    };

    useEffect(() => {
        setQuery(urlQuery);
        setTab(urlTab);
        setPage(urlPage);
    }, [urlQuery, urlTab, urlPage]);

    useEffect(() => {
        setLoaded(false);

        Promise.all([
            getTeamResults({ q: query, page: 1, pageSize: 1 }),
            getServiceResults({ q: query, page: 1, pageSize: 1 }),
        ]).then(([teamRes, serviceRes]) => {
            const tCount = teamRes.meta.total || 0;
            const sCount = serviceRes.meta.total || 0;

            setTeamCount(tCount);
            setServiceCount(sCount);

            const urlHasTab = params.has("tab");

            if (!urlHasTab) {
                if (sCount > 0) {
                    setTab("services");
                    updateURL("services", 1);
                } else {
                    setTab("team");
                    updateURL("team", 1);
                }
            }

            setLoaded(true);
        });
    }, [query]);

    if (!loaded)
        return (
            <p className="py-20 text-center text-gray-500">
                Loading search results...
            </p>
        );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex md:hidden gap-6 mb-8 border border-gray-200 pb-3 text-lg">
                <button
                    onClick={() => {
                        setTab("team");
                        updateURL("team", 1);
                    }}
                    className={`pb-2 ${
                        tab === "team"
                            ? "text-brown font-semibold border-b-2 border-brown"
                            : "text-gray-500"
                    }`}
                >
                    Our Team ({teamCount})
                </button>

                <button
                    onClick={() => {
                        setTab("services");
                        updateURL("services", 1);
                    }}
                    className={`pb-2 ${
                        tab === "services"
                            ? "text-brown font-semibold border-b-2 border-brown"
                            : "text-gray-500"
                    }`}
                >
                    Services ({serviceCount})
                </button>
            </div>

            <div className="flex gap-10">
                <div className="hidden md:block min-w-[180px] text-lg">
                    <button
                        onClick={() => {
                            setTab("team");
                            updateURL("team", 1);
                        }}
                        className={`block py-2 ${
                            tab === "team"
                                ? "text-brown font-semibold"
                                : "text-gray-500"
                        }`}
                    >
                        Our Team ({teamCount})
                    </button>

                    <button
                        onClick={() => {
                            setTab("services");
                            updateURL("services", 1);
                        }}
                        className={`block py-2 ${
                            tab === "services"
                                ? "text-brown font-semibold"
                                : "text-gray-500"
                        }`}
                    >
                        Services ({serviceCount})
                    </button>
                </div>

                <div className="flex-1">
                    {teamCount === 0 && serviceCount === 0 ? (
                        <p className="text-gray-600 mt-10">No results found.</p>
                    ) : tab === "team" ? (
                        <TeamSearchResults
                            query={query}
                            page={page}
                            onPageChange={(p: number) => {
                                setPage(p);
                                updateURL("team", p);
                            }}
                        />
                    ) : (
                        <ServiceSearchResults
                            query={query}
                            page={page}
                            onPageChange={(p: number) => {
                                setPage(p);
                                updateURL("services", p);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
