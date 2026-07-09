import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tuananhhusc.github.io/Boi-Roi-Luong-Tam-Trong-Linh-Thao-Va-Linh-Dao-I-Nha'),
  title: "Bối Rối Lương Tâm Trong Linh Thao Và Linh Đạo I-Nhã",
  description:
    "Báo cáo nghiên cứu chuyên sâu về bối rối lương tâm (scrupulosity) trong Linh Thao và Linh Đạo I-Nhã dưới lăng kính thần học, mục vụ và tâm lý học. Phân tích sáu ghi chú của Thánh I-nhã (SE 345-351), đối chiếu với OCD tôn giáo, và phương pháp đồng hành thiêng liêng.",
  keywords: [
    "bối rối lương tâm",
    "scrupulosity",
    "Linh Thao",
    "Thánh I-nhã",
    "St. Ignatius of Loyola",
    "Linh Đạo I-Nhã",
    "Ignatian Spirituality",
    "OCD tôn giáo",
    "nhận định thần loại",
    "Pierre Favre",
    "đồng hành thiêng liêng",
  ],
  authors: [{ name: "Báo Cáo Nghiên Cứu Thần Học" }],
  alternates: {
    canonical: '/boi-roi-luong-tam',
  },
  openGraph: {
    title: "Bối Rối Lương Tâm Trong Linh Thao Và Linh Đạo I-Nhã",
    description:
      "Nghiên cứu chuyên sâu về scrupulosity trong truyền thống thiêng liêng I-Nhã: thần học, tâm lý học và đồng hành mục vụ.",
    type: "article",
    locale: "vi_VN",
    url: '/boi-roi-luong-tam',
    siteName: "Dòng Tên Việt Nam",
    images: [
      {
        url: '/Boi-Roi-Luong-Tam-Trong-Linh-Thao-Va-Linh-Dao-I-Nha/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bối Rối Lương Tâm Trong Linh Thao Và Linh Đạo I-Nhã',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bối Rối Lương Tâm Trong Linh Thao Và Linh Đạo I-Nhã",
    description:
      "Nghiên cứu chuyên sâu về scrupulosity trong truyền thống thiêng liêng I-Nhã.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${lora.variable}`}>
      <body className="antialiased min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
