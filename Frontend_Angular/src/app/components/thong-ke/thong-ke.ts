import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'; // 1. NHẬP KHẨU ĐỒ CHƠI

// TODO: [BÀN GIAO - 1] Import Service
// import { ThongKeService } from '../services/thong-ke.service';

// TODO: [BÀN GIAO - 2] Định nghĩa Interface Data
// Ghi chú cho Đăng Khoa (Backend): Trả đúng cấu trúc này nha, đừng có mỗi mảng lại bọc thêm mấy tầng object.
// export interface DuLieuThongKe {
//   nhanBieuDo: string[];
//   duLieuDoanhThu: number[];
//   duLieuChiPhi: number[];
// }

@Component({
  selector: 'app-thong-ke',
  standalone: true,
  templateUrl: './thong-ke.html',
  styleUrl: './thong-ke.css'
})
export class ThongKeComponent implements OnInit {
  
  // Biến để lưu lại "thực thể" biểu đồ, sau này lỡ muốn đổi sang năm khác thì phải xóa biểu đồ cũ đi vẽ lại
  bieuDoHienTai: any; 

  // constructor(private thongKeService: ThongKeService) {}

  // 2. CHUẨN BỊ DỮ LIỆU 
  // TODO: [BÀN GIAO - 3] CẢNH BÁO CHO TEAM DATA / BACKEND (RẤT QUAN TRỌNG)
  // Ghi chú: Frontend CHỈ NHẬN DỮ LIỆU ĐÃ GOM NHÓM (Aggregated Data).
  // Đăng Khoa TUYỆT ĐỐI KHÔNG query select * (lấy toàn bộ hàng ngàn hóa đơn, phiếu nhập) rồi quăng cục thô đó lên cho Frontend tự cộng trừ nhân chia. 
  // Phải dùng SQL: SELECT MONTH(Ngay), SUM(DoanhThu), SUM(ChiPhi) GROUP BY MONTH(Ngay) rồi mới đẩy JSON lên. Nếu bắt trình duyệt tự tính, máy người dùng sẽ bị treo!

  duLieuTuBackend = {
    nhanBieuDo: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
    duLieuDoanhThu: [45000000, 52000000, 48000000, 60000000],
    duLieuChiPhi: [15000000, 18000000, 16000000, 20000000]
  };

  // Hàm này chạy ngay khi màn hình Thống kê được mở lên
  ngOnInit() {
    // TODO: [BÀN GIAO - 4] Gọi API lấy dữ liệu thực tế
    /*
    this.thongKeService.getBaoCaoTaiChinh(2026).subscribe(res => {
      this.duLieuTuBackend = res;
      this.veBieuDo();
    });
    */

    // Code tạm:
    this.veBieuDo();
  }

  // 3. LOGIC VẼ BIỂU ĐỒ
  veBieuDo() {
    // TODO: [BÀN GIAO - 5] Xóa biểu đồ cũ trước khi vẽ mới
    // Nếu Đăng Khoa làm thêm cái nút "Chọn Năm", khi user bấm nút, hàm này sẽ chạy lại.
    // Phải hủy (destroy) biểu đồ cũ, nếu không nó sẽ bị lỗi "Canvas is already in use".
    if (this.bieuDoHienTai) {
      this.bieuDoHienTai.destroy();
    }

    this.bieuDoHienTai = new Chart('bieuDoMasan', {
      type: 'bar', // 'bar' là biểu đồ cột. Thích đổi gió thì sửa thành 'line' (đường) hoặc 'pie' (tròn)
      data: {
        labels: this.duLieuTuBackend.nhanBieuDo, // Gắn trục X
        datasets: [
          {
            label: 'Doanh Thu (VNĐ)',
            data: this.duLieuTuBackend.duLieuDoanhThu,
            backgroundColor: 'rgba(54, 162, 235, 0.7)' // Màu xanh dương
          },
          {
            label: 'Chi Phí (VNĐ)',
            data: this.duLieuTuBackend.duLieuChiPhi,
            backgroundColor: 'rgba(255, 99, 132, 0.7)' // Màu đỏ
          }
        ]
      }
    });
  }
}