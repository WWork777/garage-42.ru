// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 Не используем 'export' — нужен сервер для API-роутов
  // output: 'export',  ← Эта строка должна быть ЗАКОММЕНТИРОВАНА или удалена!

  // 🔥 Оптимизация изображений
  images: {
    unoptimized: false,        // ✅ Включаем оптимизацию (работает только с сервером)
    formats: ['image/webp'],   // ✅ Конвертируем в WebP для скорости
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,       // ✅ Кэширование оптимизированных картинок (в секундах)
  },

  // 🔥 Компрессия для ускорения загрузки
  compress: true,

  // 🔥 Убираем лишние заголовки для безопасности
  poweredByHeader: false,

  // 🔥 Оптимизация сборки
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;