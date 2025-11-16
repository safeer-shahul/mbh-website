"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import i18n from "@/i18n";
import { useEffect } from "react";

export default function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  // Sync client i18n BEFORE hydration
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return <Provider store={store}>{children}</Provider>;
}
