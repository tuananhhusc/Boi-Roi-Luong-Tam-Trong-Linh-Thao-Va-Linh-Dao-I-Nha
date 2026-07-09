export interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const tocItems: TocItem[] = [
  // H2: Section 1
  { id: slugify("Bối Cảnh Lịch Sử Đêm Tối Của Lương Tâm Tại Manresa"), text: "Bối Cảnh Lịch Sử", level: 2 },
  { id: slugify("Từ Hiệp Sĩ Mơ Mộng Đến Cuộc Hoán Cải Tại Loyola"), text: "Cuộc Hoán Cải Tại Loyola", level: 3 },
  { id: slugify("Sự Khắc Nghiệt Tại Manresa Và Khủng Hoảng Lương Tâm"), text: "Khủng Hoảng Tại Manresa", level: 3 },
  { id: slugify("Sự Giải Thoát Qua Đức Vâng Phục Và Nguyên Tắc Trái Nghịch"), text: "Sự Giải Thoát Qua Đức Vâng Phục", level: 3 },

  // H2: Section 2
  { id: slugify("Cấu Trúc Động Lực Học Của Lương Tâm Trong Sách Linh Thao"), text: "Cấu Trúc Động Lực Học Của Lương Tâm", level: 2 },
  { id: slugify("Phân Loại Các Trạng Thái Lương Tâm"), text: "Phân Loại Các Trạng Thái Lương Tâm", level: 3 },
  { id: slugify("Động Lực Học Của Thần Lành Và Thần Dữ"), text: "Động Lực Học Của Thần Lành Và Thần Dữ", level: 3 },

  // H2: Section 3
  { id: slugify("Phân Tích Chuyên Sâu Các Ghi Chú Về Bối Rối SE 345 351"), text: "Phân Tích Các Ghi Chú Về Bối Rối", level: 2 },
  { id: slugify("Ghi Chú I SE 346 Phán Đoán Sai Lầm Khác Với Bối Rối Thực Sự"), text: "Ghi Chú I: Phán Đoán Sai Lầm", level: 3 },
  { id: slugify("Ghi Chú II SE 347 Bản Chất Đích Thực Của Bối Rối Lương Tâm"), text: "Ghi Chú II: Bản Chất Bối Rối", level: 3 },
  { id: slugify("Ghi Chú III SE 347 348 Lợi Ích Khởi Đầu Của Sự Nhạy Bén"), text: "Ghi Chú III: Lợi Ích Sự Nhạy Bén", level: 3 },
  { id: slugify("Ghi Chú IV SE 348 Chiến Thuật Thích Ứng Của Kẻ Thù"), text: "Ghi Chú IV: Chiến Thuật Kẻ Thù", level: 3 },
  { id: slugify("Ghi Chú V SE 349 Nguyên Tắc Agere Contra Hành Động Trái Nghịch"), text: "Ghi Chú V: Agere Contra", level: 3 },
  { id: slugify("Ghi Chú VI SE 350 351 Đối Phó Với Cám Dỗ Hư Danh"), text: "Ghi Chú VI: Cám Dỗ Hư Danh", level: 3 },

  // H2: Section 4
  { id: slugify("Bối Rối Lương Tâm Dưới Góc Nhìn Của Tâm Lý Học Lâm Sàng Hiện Đại OCD Tôn Giáo"), text: "Góc Nhìn Tâm Lý Học (OCD)", level: 2 },
  { id: slugify("Cơ Chế Hoạt Động Của Rối Loạn Ám Ảnh Cưỡng Chế Tôn Giáo"), text: "Cơ Chế OCD Tôn Giáo", level: 3 },
  { id: slugify("Sự Phá Sản Của Các Lời Khuyên Mục Vụ Thông Thường"), text: "Lời Khuyên Mục Vụ Sai Lầm", level: 3 },
  { id: slugify("Liệu Pháp ERP Và Đức Vâng Phục Sự Tương Đồng Kỳ Diệu"), text: "Liệu Pháp ERP & Đức Vâng Phục", level: 3 },

  // H2: Section 5
  { id: slugify("Vai Trò Của Đồng Hành Thiêng Liêng Phương Dược Chữa Lành Hữu Hiệu Nhất"), text: "Vai Trò Đồng Hành Thiêng Liêng", level: 2 },
  { id: slugify("Sự Cần Thiết Của Việc Khách Quan Hóa Lương Tâm"), text: "Khách Quan Hóa Lương Tâm", level: 3 },
  { id: slugify("Chân Dung Pierre Favre Vị Thánh Của Lương Tâm Bối Rối"), text: "Chân Dung Pierre Favre", level: 3 },

  // H2: Section 6
  { id: slugify("Tổng Kết Mở Ra Sự Tự Do Nội Tâm"), text: "Tổng Kết", level: 2 },
];

export { slugify };
