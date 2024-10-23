export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
      sitemap: `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap.xml`,
    }
  }