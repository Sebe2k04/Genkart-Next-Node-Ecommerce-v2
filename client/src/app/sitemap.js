export default function sitemap() {
    return [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/projects`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/certifications`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/resume`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      },
    ]
  }