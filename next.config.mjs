// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 Оптимизация изображений ВКЛЮЧЕНА
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // Кэш на 1 год
  },
  
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;