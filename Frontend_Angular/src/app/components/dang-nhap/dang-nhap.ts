import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// TODO: [BÀN GIAO - 1] Import Service gọi API từ Backend vào đây. 
// Service này sẽ chứa các hàm gọi HTTP POST đến server.
// import { AuthService } from '../services/auth.service';

// TODO: [BÀN GIAO - 2] Định nghĩa Interface hứng dữ liệu từ API trả về.
// Giúp các bạn Backend biết Frontend đang cần cấu trúc cục JSON như thế nào.
// export interface LoginResponse {
//   token: string;          // Token thật (vd: JWT) do server sinh ra
//   tenNguoiDung: string;   // Tên hiển thị lấy từ Database
//   quyenTruyCap: string[]; // Mảng các quyền
// }

@Component({
  selector: 'app-dang-nhap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dang-nhap.html',
  styleUrl: './dang-nhap.css'
})
export class DangNhapComponent {
  taiKhoan = '';
  matKhau = '';
  thongBaoLoi = '';

  // TODO: [BÀN GIAO - 3] Inject AuthService vào constructor để sử dụng.
  // constructor(private router: Router, private authService: AuthService) {}
  constructor(private router: Router) {}

  xuLyDangNhap() {
    // TODO: [BÀN GIAO - 4] CHỖ NÀY LÀ QUAN TRỌNG NHẤT 
    // Toàn bộ logic if-else kiểm tra mật khẩu bên dưới sẽ bị xóa khi ráp API thật.
    // Frontend không bao giờ được phép chứa logic kiểm tra mật khẩu hay quyền hạn hardcode.
    
    /* === ĐOẠN CODE MẪU KHI GẮN API THẬT SẼ NHƯ THẾ NÀY ===
    this.authService.login(this.taiKhoan, this.matKhau).subscribe({
      next: (response: LoginResponse) => {
        // Xử lý khi Backend trả về thành công 200 OK
        localStorage.setItem('token', response.token);
        localStorage.setItem('quyenTruyCap', JSON.stringify(response.quyenTruyCap));
        localStorage.setItem('tenNguoiDung', response.tenNguoiDung);
        
        alert(`Chào mừng ${response.tenNguoiDung} quay trở lại!`);

        // Dùng Router của Angular để chuyển trang mượt mà, không dùng window.location.reload()
        this.router.navigate(['/trang-chu']).then(() => {
           window.location.reload(); // Chỉ gọi reload nếu thực sự cần ép tải lại toàn bộ app
        }); 
      },
      error: (err) => {
        // Xử lý khi Backend báo lỗi (vd: 401 Unauthorized, sai pass)
        this.thongBaoLoi = err.error.message || 'Sai tên đăng nhập hoặc mật khẩu!';
      }
    });
    return; // Dừng hàm ở đây, không chạy xuống đoạn code mock bên dưới nữa.
    ======================================================= */


    // --- BẮT ĐẦU ĐOẠN CODE CHẠY TẠM (MOCK DATA) HIỆN TẠI ---
    let quyenTruyCap: string[] = [];
    let tenNguoiDung = '';

    // Phân loại tài khoản và gán quyền
    if (this.taiKhoan === 'admin' && this.matKhau === '123') {
      tenNguoiDung = 'Sếp Tổng';
      quyenTruyCap = ["QuanLyKho", "QuanLyNhanVien", "ThanhToanLuong"];
    } 
    else if (this.taiKhoan === 'thukho' && this.matKhau === '123') {
      tenNguoiDung = 'Thủ Kho';
      quyenTruyCap = ["QuanLyKho"];
    } 
    else if (this.taiKhoan === 'nhansu' && this.matKhau === '123') {
      tenNguoiDung = 'Quản lý Nhân Sự';
      quyenTruyCap = ["QuanLyNhanVien"];
    } 
    else if (this.taiKhoan === 'ketoan' && this.matKhau === '123') {
      tenNguoiDung = 'Kế Toán';
      quyenTruyCap = ["ThanhToanLuong"];
    } 
    else {
      this.thongBaoLoi = 'Sai tên đăng nhập hoặc mật khẩu!';
      return; // Dừng lại không chạy tiếp
    }

    // Nếu đúng tài khoản thì lưu Thẻ từ và Quyền vào localStorage
    localStorage.setItem('token', 'Token_Cua_' + this.taiKhoan);
    localStorage.setItem('quyenTruyCap', JSON.stringify(quyenTruyCap));
    localStorage.setItem('tenNguoiDung', tenNguoiDung);

    alert(`Chào mừng ${tenNguoiDung} quay trở lại!`);
    
    // Tải lại trang một phát để thanh Menu cập nhật quyền
    window.location.reload(); 
    // --- KẾT THÚC ĐOẠN CODE CHẠY TẠM ---
  }
}