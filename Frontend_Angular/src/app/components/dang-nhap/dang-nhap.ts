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
        
        // LocalStorage
        localStorage.setItem('token', duLieu.token);
        localStorage.setItem('quyenTruyCap', JSON.stringify(duLieu.quyenTruyCap));
        localStorage.setItem('tenNguoiDung', duLieu.thongTinUser.hoTen);
        
        alert(res.thongBao); 

        this.router.navigate(['/trang-chu']).then(() => {
           window.location.reload(); 
        }); 
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