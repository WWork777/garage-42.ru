// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  ← Не указывай это, если нужны API-роуты
  images: {
    unoptimized: false, // Можно оставить оптимизацию
  },
};

export default nextConfig;