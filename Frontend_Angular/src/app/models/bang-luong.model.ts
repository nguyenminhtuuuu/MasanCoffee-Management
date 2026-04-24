export interface BangLuong {
  maNhanVien: number;
  hoTen: string;
  soGioLam: number;
  luongCoBan: number; // Lương 1 giờ
  tongLuong: number;
  daThanhToan: boolean; // Trạng thái: true là đã trả, false là đang nợ
}