import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

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


  constructor(private router: Router, private authService: AuthService) {}

  xuLyDangNhap() {
    this.authService.login(this.taiKhoan, this.matKhau).subscribe({
      next: (res: any) => {
        const duLieu = res.duLieu; 
        
        // Persist token, permissions and user name, and notify app state
        this.authService.setToken(duLieu.token);
        this.authService.setQuyen(duLieu.quyenTruyCap);
        localStorage.setItem('tenNguoiDung', duLieu.thongTinUser.hoTen);

        alert(res.thongBao);

        // Navigate to a default authenticated page; Menu subscribes to auth observables so UI updates immediately
        this.router.navigate(['/thong-ke']);
      },
      error: (err) => {
        
        if (err.error && err.error.thongBao) {
           this.thongBaoLoi = err.error.thongBao;
        } else {
           this.thongBaoLoi = 'Không thể kết nối đến Máy chủ Backend!';
        }
      }
    });
  }
}