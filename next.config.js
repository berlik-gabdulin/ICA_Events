const nextConfig = {
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    domains: ['onsite.iteca.kz'], // разрешает загрузку изображений с основного домена
  },
};

module.exports = nextConfig;