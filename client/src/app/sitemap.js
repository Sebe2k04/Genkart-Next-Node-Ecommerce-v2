export default function sitemap() {
    return [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/product`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/categories`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/trend`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/offer`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      },
    ]
  }