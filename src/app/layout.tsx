//src/app/layout.tsx

import "./globals.css";
import "../i18n";
import Providers from "./providers";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();  
  const lang = cookieStore.get("lang")?.value || "en";

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
