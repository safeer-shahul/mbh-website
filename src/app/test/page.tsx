"use client";

import { useEffect } from "react";
import { getAllServices } from "@/services/servicesApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function TestPage() {
  const lang = useSelector((state: RootState) => state.language.lang);
  useEffect(() => {
    getAllServices(lang).then((data) => {
      console.log("SERVICES DATA:", data);
    });
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Testing Strapi API...</h1>
    </main>
  );
}
