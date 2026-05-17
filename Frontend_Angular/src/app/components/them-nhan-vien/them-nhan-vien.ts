import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NhanVien } from '../../models/nhan-vien.model';
import { NhanSuService } from '../../services/nhan-su.service'; 

@Component({
  selector: 'app-them-nhan-vien',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './them-nhan-vien.html',
  styleUrl: './them-nhan-vien.css'
})
export class ThemNhanVienComponent implements OnInit {
  danhSachNhanVien: NhanVien[] = [];
  danhSachVaiTro: any[] = [];
  hienThiForm = false;
  dangSua = false; 
  nhanVienHienTai: NhanVien = { ho: '', ten: '', soDienThoai: '', diaChi: '', chucVu: 'Nhân viên', gioiTinh: 'Nam', trangThai: true };

  // INJECT SERVICE
  constructor(
    private nhanSuService: NhanSuService,
    private cdr: ChangeDetectorRef
  
  ) {}

  ngOnInit() {
    this.loadDanhSach();
    this.loadVaiTro();
  }

  loadDanhSach() {
    this.nhanSuService.getDanhSachNhanVien().subscribe({
      next: (data) => {
        this.danhSachNhanVien = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Lỗi khi tải danh sách:', err)
    });
  }

  loadVaiTro() {
    this.nhanSuService.getDanhSachVaiTro().subscribe({
      next: (data) => {
        this.danhSachVaiTro = data;
      },
      error: (err) => console.error('Lỗi tải vai trò:', err)
    });
  }

  layThongBao(res: any, macDinh: string): string {
    return res?.thongBao || res?.message || res?.moTa || macDinh;
  }

  kiemTraQuyen(quyenCanCheck: string): boolean {
    const chuoiQuyen = localStorage.getItem('quyenTruyCap');
    if (!chuoiQuyen) return false;
    const mangQuyen = JSON.parse(chuoiQuyen);
    return mangQuyen.includes('Admin') || mangQuyen.includes(quyenCanCheck);
  }

  moFormThem() {
    this.dangSua = false;
    this.nhanVienHienTai = { ho: '', ten: '', soDienThoai: '', diaChi: '', chucVu: 'Nhân viên', gioiTinh: 'Nam', trangThai: true };
    this.hienThiForm = true;
  }

  moFormSua(nv: NhanVien) {
    this.dangSua = true;
    this.nhanVienHienTai = { ...nv }; 
    this.hienThiForm = true;
  }

  choNghiViec(maNV: number | undefined) {
    if (maNV && confirm('Xác nhận cho nhân viên này nghỉ việc?')) {
      this.nhanSuService.choNghiViec(maNV).subscribe({
        next: (res) => {
          alert(this.layThongBao(res, 'Cập nhật trạng thái nhân viên thành công!')); 
          this.loadDanhSach();
        },
        error: (err) => {
          alert(err.error.thongBao || 'Có lỗi xảy ra khi cho nhân viên này nghỉ việc!');
        }
      });
    }
  }

  luuNhanVien() {
    if (this.dangSua) {
      this.nhanSuService.suaNhanVien(this.nhanVienHienTai.maNhanVien!, this.nhanVienHienTai).subscribe({
        next: (res) => {
          alert(this.layThongBao(res, 'Cập nhật nhân viên thành công!'));
          this.hienThiForm = false;
          this.loadDanhSach(); 
        },
        error: (err) => alert(err.error.thongBao || 'Cập nhật thất bại!')
      });
    } else {
      this.nhanSuService.themNhanVien(this.nhanVienHienTai).subscribe({
        next: (res) => {
          alert(this.layThongBao(res, 'Thêm nhân viên thành công!'));
          this.hienThiForm = false;
          this.loadDanhSach();
        },
        error: (err) => alert(err.error.thongBao || 'Thêm mới thất bại!')
      });
    }
  }

  huyBo() {
    this.hienThiForm = false;
  }
}