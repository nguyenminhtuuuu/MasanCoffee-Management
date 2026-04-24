import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhieuNhapKho, ChiTietPhieuNhap } from '../../models/phieu-nhap.model'; // Nhớ lôi cái khuôn đúc ra nha

// TODO: [BÀN GIAO - 1] Import Service kho hàng
// import { KhoService } from '../services/kho.service';

@Component({
  selector: 'app-nhap-kho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nhap-kho.html',
  styleUrl: './nhap-kho.css'
})
export class NhapKhoComponent implements OnInit {
  // TODO: [BÀN GIAO - 2] Gọi API lấy danh mục hàng hóa (Master Data)
  // Backend cần cung cấp API: GET /api/hang-hoa
  // Frontend sẽ gọi hàm fetch cục này về thay vì gán cứng (hardcode) như dưới đây.
  // danhSachHangHoa: any[] = []; 
  
  // Kho hàng giả lập để chọn
  danhSachHangHoa = [
    { maHang: 1, tenHang: 'Hạt Cà phê Arabica' },
    { maHang: 2, tenHang: 'Sữa đặc Ngôi Sao' },
    { maHang: 3, tenHang: 'Đường cát trắng' }
  ];

  // TODO: [BÀN GIAO - 3] Tiêm (Inject) KhoService vào đây
  // constructor(private khoService: KhoService) {}
  constructor() {}

  // 1. Lấy sẵn một tờ phiếu trống (Khuôn Cha)
  phieuNhap: PhieuNhapKho = {
    ngayNhap: new Date().toISOString().substring(0, 10), // Tự động điền ngày hôm nay
    
    // TODO: [BÀN GIAO - 4] Lấy thông tin người dùng thật
    // Thay vì điền cứng 'Sếp Tổng', bồ móc cái tenNguoiDung hoặc ID từ localStorage (hoặc State) ra điền vô đây.
    // VD: nhanVienLap: localStorage.getItem('tenNguoiDung') || 'Unknown',
    nhanVienLap: 'Sếp Tổng', 
    
    danhSachHang: [], // Cái mảng rỗng chờ chứa hàng (Khuôn Con)
    tongTien: 0
  };

  ngOnInit() {
    // TODO: [BÀN GIAO - 5] Nơi gọi API khởi tạo
    // Nếu ráp API, mình sẽ gọi this.khoService.getDanhSachHangHoa().subscribe(...) ở chỗ này để đổ dữ liệu vào cái mảng danhSachHangHoa ở trên.
    
    // Vừa mở màn hình lên là cho sẵn 1 dòng trống để nhập
    this.themDongMoi();
  }

  // 2. Hàm đẻ thêm dòng mới
  themDongMoi() {
    this.phieuNhap.danhSachHang.push({ maHang: 0, soLuong: 1, donGia: 0 });
  }

  // 3. Hàm xóa dòng nếu lỡ tay bấm nhầm
  xoaDong(vitri: number) {
    this.phieuNhap.danhSachHang.splice(vitri, 1);
    this.tinhTongTien(); // Xóa xong nhớ tính lại tiền
  }

  // 4. Hàm tính tổng tiền mỗi khi mình gõ phím
  tinhTongTien() {
    this.phieuNhap.tongTien = this.phieuNhap.danhSachHang.reduce((tong, monHang) => {
      return tong + (monHang.soLuong * monHang.donGia);
    }, 0);
  }

  // 5. Gửi hàng cho Backend
  luuPhieu() {
    // TODO: [BÀN GIAO - 6] Gửi cục JSON bự (Master-Detail) xuống Database
    // Ghi chú cho Backend/Data: Frontend sẽ đẩy xuống 1 cục JSON duy nhất chứa cả Thông tin phiếu (Cha) và Danh sách hàng (Con).
    // Backend cần có cơ chế "Transaction" (Giao dịch) để lưu:
    // Bước 1: Insert vào bảng PHIEU_NHAP, lấy ra PhieuNhap_ID.
    // Bước 2: Vòng lặp Insert vào bảng CHI_TIET_PHIEU_NHAP với cái ID vừa lấy.
    // Nếu Bước 2 xịt thì phải Rollback Bước 1, tránh tình trạng có Phiếu mà không có Hàng.
    
    /* Đoạn code thật sẽ như vầy:
    this.khoService.taoPhieuNhap(this.phieuNhap).subscribe({
      next: (res) => alert('Nhập kho thành công! Mã phiếu: ' + res.maPhieu),
      error: (err) => alert('Lỗi rồi: ' + err.message)
    });
    */

    // --- CODE TẠM ---
    console.log('JSON nguyên cục bự gửi Backend:', this.phieuNhap);
    alert('Nhập hàng thành công! Nhấn F12 coi cục JSON nha.');
  }
}