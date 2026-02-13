import Hero from "./components/main-page/hero/Hero";
import How from "./components/main-page/how/How";
import Services from "./components/main-page/services/Services";
import UnderHero from "./components/main-page/underhero/Underhero";
import Faq from "./components/main-page/faq/Faq";
import Rewievs from "./components/main-page/rewievs/Rewievs";

export async function generateMetadata() {
  return {
    title: "Автосервис в Кемерово – Ремонт и ТО | ГаражАвтоТехЦентр",
    description:
      "ГаражАвтоТехЦентр – профессиональный ремонт и обслуживание автомобилей в Кемерово. Честная диагностика, гарантия, опытные мастера. Запись онлайн.",
    keywords:
      "сто кемерово, автосервис кемерово, ремонт автомобилей кемерово, диагностика кемерово, то кемерово, ремонт двигателя кемерово, ремонт подвески кемерово, сварочные работы кемерово, автоэлектрика кемерово",
    authors: [{ name: "АвтоТехЦентр Кемерово" }],
    publisher: "АвтоТехЦентр",
    formatDetection: {
      telephone: true,
      email: false,
      address: true,
    },
    openGraph: {
      title: "СТО Кемерово | Автосервис и ремонт автомобилей",
      description:
        "ГаражАвтоТехЦентр – профессиональный ремонт и обслуживание автомобилей в Кемерово. Честная диагностика, гарантия, опытные мастера. Запись онлайн.",
      url: "https://garage-42.ru",
      siteName: "АвтоТехЦентр Кемерово",
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "СТО Кемерово | Автосервис и ремонт автомобилей",
      description:
        "ГаражАвтоТехЦентр – профессиональный ремонт и обслуживание автомобилей в Кемерово. Честная диагностика, гарантия, опытные мастера. Запись онлайн.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://garage-42.ru",
    },
  };
}

export default function Home() {
  return (
    <div>
      <Hero />
      <UnderHero />
      <Services />
      <How />
      <Faq />
      <Rewievs />
    </div>
  );
}
