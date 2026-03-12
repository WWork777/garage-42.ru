/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

const nextConfig = {
  output: 'export',  // 🔥 Создаёт статический сайт в папке out/
  images: {
    unoptimized: true, // 🔥 Обязательно для статического экспорта (отключает оптимизацию картинок)
  },
  trailingSlash: true, // 🔥 Добавляет слэш в конце URL (важно для nginx)
};

module.exports = nextConfig;