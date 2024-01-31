const URL = 'https://presstointeract.com';

const config = {
  siteUrl: URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/admin/', '/user/'] },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [`${URL}/server-sitemap.xml`],
  },
  exclude: ['/admin/*', '/user/*'],
};

module.exports = config;
