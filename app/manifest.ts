import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bối Rối Lương Tâm Trong Linh Thao',
    short_name: 'Bối Rối Lương Tâm',
    description: 'Báo cáo nghiên cứu chuyên sâu về bối rối lương tâm trong Linh Thao và Linh Đạo I-Nhã',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9F8F6',
    theme_color: '#8B0000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
