export interface NhanVien {
  maNhanVien?: number; // Có dấu ? nghĩa là lúc mới tạo chưa có mã cũng được (vì DB tự tăng)
  ho: string;
  ten: string;
  soDienThoai: string;
  diaChi: string;
  chucVu: string;
  gioiTinh: string;
  trangThai: boolean;
}