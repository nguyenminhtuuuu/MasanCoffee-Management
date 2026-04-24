import { Component, OnInit } from '@angular/core'; // Nhớ thêm OnInit để gọi API lúc mở trang
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhanCongCa } from '../../models/phan-cong.model';

// TODO: [BÀN GIAO - 1] Import Service
// Nơi chứa các hàm gọi API về Nhân sự và Lịch làm việc
// import { NhanSuService } from '../services/nhan-su.service';

@Component({
  selector: 'app-phan-cong',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './phan-cong.html',
  styleUrl: './phan-cong.css'
})
export class PhanCongComponent implements OnInit { 
  // TODO: [BÀN GIAO - 2] Gọi API lấy Dữ liệu gốc (Master Data)
  // Yến Vy cần cung cấp 2 API: GET /api/nhan-vien và GET /api/ca-lam.
  // Frontend sẽ gọi về để đổ vào 2 mảng dưới đây.
  
  // Dữ liệu giả làm mồi
  danhSachNhanVien = [
    { maNhanVien: 1, hoTen: 'Nguyễn Văn Sếp' },
    { maNhanVien: 2, hoTen: 'Trần Thị Kho' },
    { maNhanVien: 3, hoTen: 'Bùi Anh' }
  ];

  danhSachCa = [
    { maCa: 1, tenCa: 'Ca Sáng (08:00 - 12:00)', gioBatDau: '08:00:00', gioKetThuc: '12:00:00', soGioLam: 4 },
    { maCa: 2, tenCa: 'Ca Chiều (12:00 - 17:00)', gioBatDau: '12:00:00', gioKetThuc: '17:00:00', soGioLam: 5 },
    { maCa: 3, tenCa: 'Ca Tối (17:00 - 22:00)', gioBatDau: '17:00:00', gioKetThuc: '22:00:00', soGioLam: 5 }
  ];

  // Cái giỏ để hứng dữ liệu người dùng chọn
  caMoi: Partial<PhanCongCa> = {
    ngayLam: '',
    maNhanVien: 0,
    maCa: 0
  };

  // Danh sách lịch đã phân
  lichDaPhan: PhanCongCa[] = [];
  thongBao = '';

  // constructor(private nhanSuService: NhanSuService) {}

  ngOnInit() {
    // TODO: [BÀN GIAO - 3] Lấy danh sách lịch đã phân
    // Khi vừa mở trang, cần gọi API (vd: GET /api/phan-cong?tuan=...) để lấy lịch đã xếp hiển thị lên cho người ta biết đường mà né, tránh phân trùng.
  }

  xuLyPhanCa() {
    // 1. Tìm thông tin chi tiết của Nhân viên và Ca được chọn
    const nv = this.danhSachNhanVien.find(n => n.maNhanVien == this.caMoi.maNhanVien);
    const ca = this.danhSachCa.find(c => c.maCa == this.caMoi.maCa);

    if (nv && ca && this.caMoi.ngayLam) {
      
      // TODO: [BÀN GIAO - 4] LƯU Ý VỀ CẤU TRÚC JSON LƯU DATABASE (DÀNH CHO DATA/BACKEND)
      // Ghi chú cho Yến Vy: Mặc dù Frontend gom đủ thứ thông tin (Tên NV, Giờ bắt đầu...) vào cục JSON này để hiển thị ra UI cho đẹp.
      // Nhưng khi lưu vào Database (bảng PHAN_CONG_CA), Backend CHỈ CẦN LƯU 3 TRƯỜNG CHÍNH: ngayLam, maNhanVien, maCa.
      // Các trường còn lại (hoTen, gioBatDau...) là dữ liệu dư thừa (denormalized), không cần lưu để chuẩn hóa Database (Normal Form 3).
      
      // 2. Gom thành cục JSON hoàn chỉnh
      const phieuPhanCa: PhanCongCa = {
        ngayLam: this.caMoi.ngayLam,
        maNhanVien: nv.maNhanVien,
        hoTenNhanVien: nv.hoTen,   // DB không cần lưu cái này
        maCa: ca.maCa,
        gioBatDau: ca.gioBatDau,   // DB không cần lưu cái này
        gioKetThuc: ca.gioKetThuc, // DB không cần lưu cái này
        soGioLam: ca.soGioLam      // DB không cần lưu cái này
      };

      // TODO: [BÀN GIAO - 5] GỌI API & BẮT LỖI NGHIỆP VỤ (BUSINESS LOGIC)
      // Yến Vy (Backend) BẮT BUỘC phải kiểm tra các điều kiện sau trước khi Insert vào Database:
      // - Nhân viên đó đã được phân vào ca này trong ngày hôm nay chưa? (Chống trùng lịch - Conflict 409).
      // - Một nhân viên có bị phân quá 8-12 tiếng một ngày không?
      // Nếu vi phạm, Backend quăng lỗi về, Frontend sẽ hứng và in ra dòng this.thongBao.

      /* LUỒNG CHẠY API THẬT:
      this.nhanSuService.luuPhanCong(phieuPhanCa).subscribe({
        next: (res) => {
          this.lichDaPhan.push(phieuPhanCa);
          this.thongBao = `Đã phân ${nv.hoTen} vào ca ${ca.maCa} ngày ${this.caMoi.ngayLam}!`;
        },
        error: (err) => {
          // err.error.message sẽ do Yến Vy trả về, ví dụ: "Bùi Anh đã làm ca này rồi, chọn ca khác đi má!"
          this.thongBao = err.error.message; 
        }
      });
      */

      // --- CODE CHẠY TẠM (MOCK) ---
      this.lichDaPhan.push(phieuPhanCa);
      this.thongBao = `Đã phân ${nv.hoTen} vào ca ${ca.maCa} ngày ${this.caMoi.ngayLam}!`;
      console.log('JSON gửi Yến Vy nè:', phieuPhanCa);
      // ----------------------------

    } else {
      this.thongBao = 'Vui lòng chọn đầy đủ Ngày, Nhân viên và Ca làm!';
    }
  }
}