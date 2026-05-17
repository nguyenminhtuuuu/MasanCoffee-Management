import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Phải có cái này mới xài được phép tàng hình *ngIf
import { RouterModule, Router } from '@angular/router'; // Phải có cái này mới xài được thẻ <a routerLink="..."> để chuyển trang mà không bị load lại cả trang
import { AuthService } from '../../services/auth.service';

// TODO: [BÀN GIAO - 1] Import Service quản lý Authentication
// Tương tự bên trang đăng nhập, sau này sẽ cần gọi Service vào đây để xử lý logic lấy thông tin và đăng xuất.
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule], // Đăng ký nó ở đây
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})

export class MenuComponent implements OnInit {
  // TODO: [BÀN GIAO - 2] Tiêm (Inject) Service vào đây
  // constructor(private router: Router, private authService: AuthService) { }
  constructor(private router: Router, private authService: AuthService) { } // Gọi xe ôm Router

  danhSachQuyen: string[] = [];
  isLoggedIn = false;

  // Hàm này tự động chạy khi Menu vừa được vẽ ra màn hình
  ngOnInit() {
    // TODO: [BÀN GIAO - 3] LƯU Ý VỀ LUỒNG DỮ LIỆU
    // Hiện tại dữ liệu đang đọc từ localStorage (mock data).
    // Khi làm thật: Frontend không nên tự lưu quyền thô ra localStorage như vầy. 
    // Backend nên nén quyền vào trong mã JWT Token, hoặc Frontend sẽ gọi 1 API (vd: GET /api/me) để lấy quyền mới nhất mỗi khi load lại trang.
    
    // Xuống kho lấy cái mảng quyền đã lưu lúc đăng nhập lên
    // Subscribe to permission and login changes so Menu updates immediately after login/logout
    this.authService.quyen$.subscribe(q => {
      this.danhSachQuyen = q || [];
    });

    this.authService.isLoggedIn$.subscribe(v => {
      this.isLoggedIn = !!v;
    });
  }

  // Viết 1 hàm nhỏ để đi soi quyền
  kiemTraQuyen(quyenCanCo: string): boolean {
    // TODO: [BÀN GIAO - 4] CHÚ Ý BẢO MẬT (RẤT QUAN TRỌNG)
    // Lời nhắn cho Backend: Việc ẩn/hiện các nút trên Menu bằng hàm này CHỈ LÀ TRẢI NGHIỆM UI.
    // Dữ liệu localStorage có thể bị hacker sửa bằng F12. 
    // => Backend BẮT BUỘC phải chặn quyền (Authorization) ở từng API. Không được chủ quan!
    return this.danhSachQuyen.includes(quyenCanCo);
  }

  // Hàm này kiểm tra xem trong túi có thẻ từ chưa
  daDangNhap(): boolean {
    // TODO: [BÀN GIAO - 5] Kiểm tra token thực tế
    // Khi ráp API thật, nên dùng hàm trong AuthService để kiểm tra xem token còn HẠN (expired) không, chứ không chỉ check xem nó có tồn tại hay không.
    return localStorage.getItem('token') !== null;
  }
  
  // Lấy tên người dùng ra để hiện lên góc phải cho nó chiên nghịp :')))
  layTenNguoiDung(): string {
    // Sau này thay vì chọc xuống localStorage, có thể lấy từ biến State quản lý tập trung.
    return localStorage.getItem('tenNguoiDung') || 'User';
  }

  dangXuat(){
    // TODO: [BÀN GIAO - 6] Gọi API Đăng xuất (Logout)
    // Nếu hệ thống dùng Token lưu ở Server (hoặc Cookie), phải gọi API để Backend tiêu hủy phiên đăng nhập đó trước.
    /*
    this.authService.logout().subscribe(() => {
      localStorage.clear(); // Xóa sạch sẽ mọi thứ trong kho
      this.router.navigate(['/']);
    });
    */

    // --- BẮT ĐẦU ĐOẠN CODE TẠM ---
    localStorage.removeItem('token'); // Tịch thu thẻ từ
    localStorage.removeItem('quyenTruyCap'); // Tịch thu quyền
    localStorage.removeItem('tenNguoiDung'); // Tịch thu cái tên
    // Notify app that permissions cleared so UI updates without reload
    this.authService.setQuyen([]);
    this.authService.setToken(null);
    this.router.navigate(['/']); // Chở về trang Đăng nhập
    // --- KẾT THÚC ĐOẠN CODE TẠM ---
  }
}