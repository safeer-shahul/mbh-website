"use client";

import { useEffect } from "react";
import i18n from "@/i18n";

export default function useLangWatcher() {
  const lang = i18n.language;

  useEffect(() => {
    // Force re-render when language changes
  }, [lang]);

  return lang;
}
