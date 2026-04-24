export interface TaiKhoan {
  tenDangNhap: string;
  matKhau?: string; // Dấu ? vì lúc lấy thông tin về mình không cần lấy mật khẩu
  hoTenNhanVien: string;
  quyenTruyCap: string[]; // Đây chính là cái mảng bồ dùng để "tàng hình" nút bấm nè
  trangThai: boolean;
}