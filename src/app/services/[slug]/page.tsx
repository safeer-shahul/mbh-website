import PageHero from "@/components/layout/PageHero";
import { getServiceBySlug } from "@/services/servicesApi";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { cookies } from "next/headers";
import en from "@/i18n/locales/en.json";
import ar from "@/i18n/locales/ar.json";

export default async function ServiceDetailPage(props: any) {
  const { slug } = await props.params;
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  
  const translations: any = { en, ar };
  const t = (key: string) => translations[lang][key] || key;
  
  const service = await getServiceBySlug(slug, lang);
  
  if (!service) {
    return (
      <div className="py-20 text-center text-white">
        {t("service_not_found")}
      </div>
    );
  }

  return (
    <div>
      <PageHero imageUrl="/images/hero/main_hero.jpg" />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--color-brown)] mb-6 text-sm hover:opacity-80"
        >
          <FiArrowLeft size={18} />
          <span>{t("back")}</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--color-brown)] mb-6">
          {service.title}
        </h1>

        {service.description_intro && (
          <p className="text-gray-700 leading-relaxed mb-10 max-w-4xl">
            {service.description_intro}
          </p>
        )}

        <div className="space-y-8">
          {service.sections?.map((section: any) => (
            <div 
              key={section.id} 
              className="border-s-3 border-gray-200 ps-6 py-2 bg-gray-50/50"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="block mt-[6px] w-2 h-2 bg-[var(--color-brown)] flex-shrink-0"></span>
                <h2 className="text-base font-semibold text-[var(--color-brown)]">
                  {section.section_title}
                </h2>
              </div>

              {section.section_paragraph && (
                <p className="text-gray-700 leading-relaxed mb-4 ml-5">
                  {section.section_paragraph}
                </p>
              )}

              {section.bullet_points?.length > 0 && (
                <ul className="space-y-2 ml-5">
                  {section.bullet_points.map((bp: any) => (
                    <li key={bp.id} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-[var(--color-brown)] mt-[2px]">−</span>
                      <span>{bp.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {service.description_end && (
          <p className="text-gray-700 leading-relaxed mt-12 max-w-4xl">
            {service.description_end}
          </p>
        )}

      </div>
    </div>
  );
}