import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/Header";
import { cookies } from "next/headers";
import Footer from "@/components/layout/Footer";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();  
  const lang = cookieStore.get("lang")?.value || "en";

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={`${dmSans.variable}`}>
      <body className="font-dm-sans">
        <Providers lang={lang}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
