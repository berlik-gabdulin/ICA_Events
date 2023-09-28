// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('graceful-fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
fs.gracefulify(require('fs'));

const nextConfig = {
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    domains: ['onsite.iteca.kz', 'exhibitions.az', 'iteca.uz'], // разрешает загрузку изображений с основного домена
    unoptimized: false,
  },
};

module.exports = nextConfig;
