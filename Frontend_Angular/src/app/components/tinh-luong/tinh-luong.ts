import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BangLuong } from '../../models/bang-luong.model';

// TODO: [BÀN GIAO - 1] Import Service
// import { KeToanService } from '../services/ke-toan.service';

@Component({
  selector: 'app-tinh-luong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tinh-luong.html',
  styleUrl: './tinh-luong.css'
})
export class TinhLuongComponent implements OnInit {
  // TODO: [BÀN GIAO - 2] Gọi API lấy Bảng lương (Method: GET)
  // Backend cần cung cấp API: GET /api/bang-luong?thang=04&nam=2026
  
  danhSachLuong: BangLuong[] = [
    { maNhanVien: 1, hoTen: 'Bùi Anh', soGioLam: 120, luongCoBan: 25000, tongLuong: 0, daThanhToan: false },
    { maNhanVien: 2, hoTen: 'Trần Thị Kho', soGioLam: 100, luongCoBan: 22000, tongLuong: 0, daThanhToan: true },
    { maNhanVien: 3, hoTen: 'Nguyễn Văn Sếp', soGioLam: 150, luongCoBan: 35000, tongLuong: 0, daThanhToan: false }
  ];

  // constructor(private keToanService: KeToanService) {}

  ngOnInit() {
    // Gọi API lấy danh sách ở đây. 

    // TODO: [BÀN GIAO - 3] CẢNH BÁO BẢO MẬT & BUSINESS LOGIC (DÀNH CHO BACKEND)
    // Cực kỳ quan trọng: FRONTEND KHÔNG ĐƯỢC PHÉP TÍNH LƯƠNG!
    // Đoạn code vòng lặp tính (tongLuong = soGioLam * luongCoBan) ở dưới ĐÃ BỊ XÓA (hoặc chỉ dùng để mock tạm).
    // Lý do: Nếu Frontend tự tính, user có thể F12 sửa luongCoBan thành 1 tỷ rồi gửi xuống Server.
    // Backend/Data BẮT BUỘC phải thực hiện việc tính toán này dưới Database (dùng SQL SUM, JOIN với bảng Ca Làm và NhanVien) hoặc ở tầng Service của Backend, sau đó trả cục JSON đã có sẵn "tongLuong" lên cho Frontend chỉ việc in ra màn hình.
    
    // --- ĐOẠN MOCK DATA TẠM THỜI (SẼ BỎ KHI CÓ API) ---
    this.danhSachLuong.forEach(nv => {
      nv.tongLuong = nv.soGioLam * nv.luongCoBan;
    });
    // --------------------------------------------------
  }

  thanhToan(nv: BangLuong) {
    // TODO: [BÀN GIAO - 4] Gọi API Thanh toán (Method: POST hoặc PUT)
    // Ghi chú cho Backend: Khi Frontend bấm nút này, Backend không chỉ đơn giản là đổi trạng thái daThanhToan = true.
    // Backend cần ghi log lại 1 dòng vào bảng LICH_SU_GIAO_DICH (Ai là người duyệt chi? Trả lúc mấy giờ? Tổng tiền bao nhiêu?).
    // Nhớ dùng Database Transaction (BEGIN TRAN... COMMIT TRAN) nhé!

    /* LUỒNG API THẬT:
    this.keToanService.xacNhanThanhToan(nv.maNhanVien).subscribe({
      next: () => {
        nv.daThanhToan = true; // Chỉ đổi trạng thái UI khi Server báo OK (HTTP 200)
        alert(`Đã chuyển khoản ${nv.tongLuong.toLocaleString()} VNĐ cho ${nv.hoTen}!`);
      },
      error: (err) => alert('Lỗi thanh toán: ' + err.error.message)
    });
    */

    // --- CODE CHẠY TẠM ---
    nv.daThanhToan = true;
    alert(`Đã chuyển khoản ${nv.tongLuong.toLocaleString()} VNĐ cho ${nv.hoTen}!`);
  }
}