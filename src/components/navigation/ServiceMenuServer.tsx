import { getAllServices } from "@/services/servicesApi";
import ServicesDropdown from "./ServicesDropdown";

export default async function ServiceMenuServer({ lang }: { lang: string }) {
  const services = await getAllServices(lang);

  return <ServicesDropdown services={services} />;
}

