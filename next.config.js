const nextConfig = {
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    domains: ['onsite.iteca.kz', 'exhibitions.az', 'iteca.uz'],
    formats: ['image/avif', 'image/webp'], // Добавьте поддержку современных форматов изображений
    loader: 'default',
  },
  async headers() {
    return [
      {
        // Кеширование статических ресурсов Next.js
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Кеширование ваших статических ресурсов
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Кеширование изображений
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Дополнительные настройки webpack, если они вам нужны

    if (!dev && isServer) {
      // Оптимизация изображений на стороне сервера, если это необходимо
    }

    return config;
  },
};

module.exports = nextConfig;
