// app/services/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getAllServiceSlugs } from '../data/services.data';
import styles from './page.module.scss';

// 🔥 Генерация статических параметров для всех услуг
export async function generateStaticParams() {
  const services = getAllServiceSlugs();
  return services;
}

// 🔥 Генерация метаданных для SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: "Услуга не найдена | Автопомощь 142",
      description: "Запрашиваемая услуга не найдена",
    };
  }

  const title = `${service.title} | Автопомощь 142 — автосервис в Кемерово`;
  const description = service.fullDescription.slice(0, 160) + '...';
  const baseUrl = 'https://avtohelp142.ru';
  const url = `${baseUrl}/services/${slug}`;

  return {
    title,
    description,
    keywords: [
      service.title,
      "автосервис",
      "Кемерово",
      "ремонт авто",
      "автопомощь",
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      url,
      siteName: "Автопомощь 142 — автосервис в Кемерово",
      images: [
        {
          url: `${baseUrl}${service.image}`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${service.image}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export const dynamic = 'force-static';

// 🔥 Основной компонент страницы
export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    notFound();
  }

  return (
    <section className={styles.servicePage}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/" className={styles.breadcrumbLink}>Главная</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/#services" className={styles.breadcrumbLink}>Услуги</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{service.title}</span>
        </nav>

        <div className={styles.content}>
          {/* Левая колонка — изображение */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              {/* 🔥 ЗАМЕНИЛИ <Image> НА <img> */}
              <img
                src={service.image}
                alt={service.title}
                width="600"
                height="400"
                className={styles.mainImage}
                loading="eager"  // 🔥 priority аналог для img
              />
            </div>
            
            {/* Инфо-карточка */}
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Срок:</span>
                <span className={styles.infoValue}>{service.time}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Стоимость:</span>
                <span className={styles.infoValue}>
                  {service.price.includes('/') ? service.price : `${service.price} ₽`}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Гарантия:</span>
                <span className={styles.infoValue}>{service.garanty}</span>
              </div>
            </div>
          </div>

          {/* Правая колонка — текст */}
          <div className={styles.textSection}>
            <h1 className={styles.title}>{service.title}</h1>
            
            <div className={styles.descriptionBlock}>
              <h2 className={styles.subtitle}>Описание услуги</h2>
              <p className={styles.fullDescription}>{service.fullDescription}</p>
            </div>

            {/* Кнопки действий */}
            <div className={styles.actions}>
              <Link href="/#form" className={styles.primaryButton}>
                Записаться на услугу
              </Link>
              
              <Link href="/#services" className={styles.secondaryButton}>
                Смотреть все услуги
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}