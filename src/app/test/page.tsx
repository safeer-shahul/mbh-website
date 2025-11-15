"use client";

import { useEffect } from "react";
import { getAllServices } from "@/services/servicesApi";

export default function TestPage() {
  useEffect(() => {
    getAllServices().then((data) => {
      console.log("SERVICES DATA:", data);
    });
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Testing Strapi API...</h1>
    </main>
  );
}
