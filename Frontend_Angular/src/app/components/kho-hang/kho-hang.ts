import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. THÊM DÒNG NÀY ĐỂ XÀI NGFOR VÀ NGIF TRONG TEMPLATE
import { HangTonKho } from '../../models/kho-hang.model';
// import { ApiService } from '../../services/api'; Bật để gọi xe ôm ApiService chở hàng về


@Component({
  selector: 'app-kho-hang',
  standalone: true,
  imports: [CommonModule], // 2. NHÉT NÓ VÀO ĐÂY ĐỂ SỬ DỤNG TRONG TEMPLATE
  templateUrl: './kho-hang.html',
  styleUrl: './kho-hang.css' 
})

// Khi nào có Backend thì phải sửa lại thành "implements OnInit" và bỏ comment hàm ngOnInit đi để vặn van lấy hàng về
export class KhoHangComponent {
  // XÓA sạch dữ liệu giả đi nếu muốn cái bồn chứa nước trống không
  danhSachKho: HangTonKho[] = [
    { maHang: 1, tenHang: 'Hạt Cà phê Arabica', soLuongTon: 50, mucToiThieu: 10, donViTinh: 'Kg' },
    { maHang: 2, tenHang: 'Sữa đặc Ngôi Sao', soLuongTon: 5, mucToiThieu: 5, donViTinh: 'Hộp' },
    { maHang: 3, tenHang: 'Đường cát trắng', soLuongTon: 20, mucToiThieu: 5, donViTinh: 'Kg' },
    { maHang: 4, tenHang: 'Ly nhựa Takeaway', soLuongTon: 500, mucToiThieu: 100, donViTinh: 'Cái' }
  ];

  // 2. Cấp quyền cho ông thợ nước hoạt động trong phòng này
  //constructor(private api: ApiService) {} Bật để cấp quyền cho ông thợ nước ApiService chở hàng về

  // 3. Hàm này sẽ tự động chạy ngay khi màn hình Kho Hàng vừa mở lên
  // Khoá van chờ Backend trả hàng về
  /*ngOnInit() {
    // MỞ VAN NƯỚC! (Lệnh subscribe chính là hành động vặn van)
    this.api.layDanhSachKho().subscribe({
      next: (duLieuThanhVyTraVe) => {
        // Nếu lấy thành công, đổ hết nước vào bồn chứa
        this.danhSachKho = duLieuThanhVyTraVe;
        console.log('Lấy hàng thật thành công gòi nè:', this.danhSachKho);
      },
      error: (loi) => {
        // Nếu đứt cáp quang hoặc Thanh Vy sập server
        alert('Server Backend đang ngủ hoặc sai link API gòi bồ ơi!');
        console.error(loi);
      }
    });
  }*/ 
}