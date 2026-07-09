import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tuananhhusc.github.io/Boi-Roi-Luong-Tam-Trong-Linh-Thao-Va-Linh-Dao-I-Nha/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
