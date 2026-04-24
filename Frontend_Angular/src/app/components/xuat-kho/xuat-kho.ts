import { Component, OnInit } from '@angular/core'; // Nhớ có OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

// TODO: [BÀN GIAO - 1] Import Service
// import { KhoService } from '../services/kho.service';

@Component({
  selector: 'app-xuat-kho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './xuat-kho.html',
  styleUrl: './xuat-kho.css'
})
export class XuatKhoComponent implements OnInit {
  
  // TODO: [BÀN GIAO - 2] Gọi API lấy tồn kho (Method: GET)
  // Backend cần cung cấp API lấy danh sách hàng và số lượng tồn KHO THỰC TẾ NGAY LÚC NÀY.
  // khoHienTai: any[] = [];
  
  // Kho hàng giả lập hiện tại
  khoHienTai = [
    { maHang: 1, tenHang: 'Hạt Cà phê Arabica', soLuongTon: 50 },
    { maHang: 2, tenHang: 'Sữa đặc Ngôi Sao', soLuongTon: 20 }
  ];

  // Dữ liệu người dùng đang nhập vào Form
  phieuXuat = {
    maHang: 1,
    soLuong: 0
  };

  thongBaoLoi = '';
  thongBaoThanhCong = '';

  // constructor(private khoService: KhoService) {}

  ngOnInit() {
    // Gọi API load kho hiện tại khi mở trang
  }

  // Nút bấm sẽ gọi hàm này
  xuLyXuatKho() {
    // Reset thông báo mỗi lần bấm nút
    this.thongBaoLoi = '';
    this.thongBaoThanhCong = '';

    const hang = this.khoHienTai.find(h => h.maHang == this.phieuXuat.maHang);

    // TODO: [BÀN GIAO - 3] CẢNH BÁO CHO THANH VY (BACKEND/DATA) - RACE CONDITION
    // Ghi chú: Frontend ĐÃ check tồn kho tạm thời báo lỗi mượt mà cho user (code bên dưới).
    // NHƯNG, Backend KHÔNG ĐƯỢC TIN Frontend 100%. 
    // Giả sử Kho còn 20. Nhân viên A và Nhân viên B ở 2 máy tính khác nhau cùng mở trang này, cùng thấy tồn kho là 20.
    // Cả 2 cùng gõ số lượng 15 và bấm Xuất Kho cùng 1 mili-giây. Code Frontend của cả 2 máy đều thấy 15 < 20 nên cho qua.
    // Nếu Backend không check lại và dùng Transaction (Khóa dòng - Row Lock) hoặc Constraint (CHECK soLuong >= 0) trong SQL Server, kho sẽ bị âm thành -10.
    
    try {
      // Check Validation phía Frontend (UX)
      if (!hang) {
        throw new Error("Vui lòng chọn một mặt hàng!");
      }
      if (this.phieuXuat.soLuong <= 0) {
        throw new Error("Số lượng xuất phải lớn hơn 0!");
      }
      // BẮT ĐẦU VÙNG NGUY HIỂM: Giả lập SQL của Thanh Vy kiểm tra
      if (hang && this.phieuXuat.soLuong > hang.soLuongTon) {
        // Chủ động ném ra một cái lỗi y hệt như RAISERROR trong SQL Server
        throw new Error("Kho không đủ hàng! Bạn đang xuất âm kho."); 
      }

      // TODO: [BÀN GIAO - 4] Gọi API Xuất Kho (Method: POST)
      /* LUỒNG API THẬT SỰ
      this.khoService.taoPhieuXuat(this.phieuXuat).subscribe({
        next: (res) => {
           this.thongBaoThanhCong = `Xuất kho thành công ${this.phieuXuat.soLuong} ${hang?.tenHang}!`;
           // Thành công thì phải gọi API lấy lại số tồn kho mới nhất để update giao diện
           // this.loadLaiKho(); 
        },
        error: (err) => {
           // Hứng lỗi RAISERROR từ SQL Server do Thanh Vy quăng lên (ví dụ: HTTP 400 - Hết hàng)
           this.thongBaoLoi = err.error.message;
        }
      });
      */

      // --- CODE CHẠY TẠM (Sẽ bỏ khi có API) ---
      // Trừ ảo trên giao diện để test
      hang.soLuongTon -= this.phieuXuat.soLuong; 
      this.thongBaoThanhCong = `Xuất kho thành công ${this.phieuXuat.soLuong} ${hang?.tenHang}! Tồn kho còn lại: ${hang.soLuongTon}`;
      // ---------------------------------------

    } catch (error: any) {
      // HỨNG LỖI TỪ FRONTEND TỰ TẠO
      this.thongBaoLoi = error.message;
    }
  }
}