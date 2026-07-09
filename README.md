# Bối Rối Lương Tâm (Scrupulosity) - Web Report

Một ứng dụng web tương tác được thiết kế tối ưu dành riêng cho việc xuất bản và trải nghiệm đọc báo cáo nghiên cứu chuyên sâu về **"Bối rối lương tâm trong Linh Thao và Linh Đạo I-Nhã"**. Dự án là sự kết hợp giữa thiết kế học thuật cổ điển (academic/classical) và các công nghệ web hiện đại.

## ✨ Các Tính Năng Nổi Bật

- 📖 **Thiết Kế Học Thuật (Academic UI):** Giao diện đọc lấy cảm hứng từ các bản thảo cổ, với phông chữ serif sang trọng (Playfair Display & Lora) và các họa tiết tối giản (màu Đỏ Cardinal làm điểm nhấn).
- 🎨 **Chế Độ Chủ Đề (Themes):** Hỗ trợ 3 chế độ đọc bảo vệ mắt:
  - **Parchment (Mặc định):** Màu giấy da cổ điển.
  - **Sepia:** Màu vàng nhạt êm dịu.
  - **Dark:** Chế độ tối dành cho môi trường thiếu sáng.
- 🔠 **Tùy Chỉnh Kích Cỡ Chữ:** Cho phép phóng to/thu nhỏ toàn bộ giao diện (A-, A, A+) thông qua cơ chế CSS Root Scaling, giúp nâng cao khả năng tiếp cận (Accessibility).
- 🔍 **Tìm Kiếm Thần Tốc (Ctrl + K):** Tích hợp modal tìm kiếm cục bộ (Local Search) siêu tốc, hỗ trợ tra cứu các đề mục và danh sách tài liệu tham khảo với thao tác cuộn mượt mà (smooth scroll).
- 📱 **Tối Ưu Hóa Di Động (Mobile-First):** Trải nghiệm vuốt chạm hoàn hảo trên điện thoại. Mục lục (TOC) được thiết kế dưới dạng Bottom Sheet (Vuốt từ dưới lên).
- 📊 **Thanh Tiến Độ (Reading Progress):** Theo dõi tiến trình đọc theo thời gian thực (hiển thị phần trăm % trên Header).
- ⚡ **PWA (Progressive Web App):** Hỗ trợ "Thêm vào Màn hình chính" trên điện thoại để trải nghiệm như một ứng dụng gốc không có thanh địa chỉ trình duyệt.
- 📈 **SEO & Thống Kê:** Cấu hình đầy đủ Metadata, Open Graph, sitemap.xml, robots.txt, cùng với **Vercel Analytics** để theo dõi lượng truy cập.

## 🛠 Công Nghệ Sử Dụng

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Library:** [React](https://react.dev/)
- **Ngôn ngữ:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Markdown Parsing:** `react-markdown`, `remark-gfm`, `rehype-raw`
- **Analytics:** `@vercel/analytics`

## 📂 Cấu Trúc Dự Án

```
├── app/
│   ├── layout.tsx         # Root layout, Metadata, Analytics, ThemeProvider
│   ├── page.tsx           # Trang chủ chứa tiêu đề và ghép nối các components
│   ├── globals.css        # CSS toàn cục (Định nghĩa Theme & Root Scaling)
│   ├── manifest.ts        # PWA Manifest
│   ├── sitemap.ts         # Sinh tự động Sitemap
│   └── robots.ts          # Sinh tự động Robots.txt
├── components/
│   ├── ArticleRenderer.tsx # Máy gia tốc Markdown rendering (Xử lý chú thích, bảng, blockquote)
│   ├── Header.tsx         # Thanh điều hướng phía trên kèm % tiến độ đọc
│   ├── ReaderControls.tsx # Các nút điều khiển Theme, Cỡ chữ, Mục lục (Nổi ở góc phải)
│   ├── SearchModal.tsx    # Giao diện Tìm kiếm (Ctrl+K)
│   ├── TableOfContents.tsx # Mục lục động & Bottom sheet cho mobile
│   └── ThemeProvider.tsx  # Context quản lý Theme & Cỡ chữ (Lưu vào localStorage)
├── content/
│   └── article.ts         # Nội dung bài viết và danh sách tài liệu tham khảo (Đã parse)
├── lib/
│   └── toc.ts             # Tiện ích sinh slug ID & Mục lục
└── public/
    └── icons/             # Chứa icon 192x192 và 512x512 cho PWA
```

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local)

1. **Yêu cầu hệ thống:**
   - [Node.js](https://nodejs.org/) (phiên bản 18+ trở lên).
   - Trình quản lý gói `npm`.

2. **Cài đặt các gói phụ thuộc:**
   Mở terminal tại thư mục gốc của dự án và chạy:
   ```bash
   npm install
   ```

3. **Chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt và truy cập vào [http://localhost:3000](http://localhost:3000).

4. **Biên dịch sản phẩm (Production Build):**
   Để kiểm tra xem ứng dụng có sẵn sàng tung ra môi trường thực tế không:
   ```bash
   npm run build
   npm run start
   ```

## 📝 Quản Lý Nội Dung
Nội dung của bài viết không nằm trực tiếp trong file code giao diện, mà được quản lý tại file `content/article.ts`.
- Mọi thay đổi về nội dung bài viết, sửa lỗi chính tả hay thêm bớt tài liệu tham khảo đều được thực hiện thông qua file `content/article.ts`.
- Hệ thống Markdown trong `ArticleRenderer.tsx` sẽ tự động phân tích cú pháp HTML/Markdown và biến các số chú thích dạng `<sup>1</sup>` thành những nút nhấn nổi (tooltip).

## 🌍 Triển Khai (Deployment)
Dự án được tối ưu hóa đặc biệt để triển khai (deploy) hoàn toàn tự động và miễn phí trên nền tảng **[Vercel](https://vercel.com/)**. 
- Chỉ cần đẩy (push) mã nguồn lên GitHub.
- Nhập (Import) dự án vào Vercel.
- Tính năng Vercel Analytics sẽ tự động kích hoạt.
