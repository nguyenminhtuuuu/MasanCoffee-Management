// Khuôn "Con" (Từng món hàng)
export interface ChiTietPhieuNhap {
  maHang: number;
  soLuong: number;
  donGia: number;
}

// Khuôn "Cha" (Nguyên cái tờ phiếu)
export interface PhieuNhapKho {
  maPhieuNhap?: number;
  ngayNhap: string;
  nhanVienLap: string; // Tên người đang đăng nhập
  danhSachHang: ChiTietPhieuNhap[]; // Lồng nguyên cái mảng "Con" vào đây
  tongTien?: number;
}