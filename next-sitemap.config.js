/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ica-events.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/admin', // Исключить конкретный путь
    '/admin/*', // Исключить все подпути в /admin
    // Вы можете добавить дополнительные пути здесь
  ],
};
