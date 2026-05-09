import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NhanVien } from '../../models/nhan-vien.model';

// TODO: [BÀN GIAO - 1] Import Service
import { NhanSuService } from '../../services/nhan-su.service';

@Component({
  selector: 'app-them-nhan-vien',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './them-nhan-vien.html',
  styleUrl: './them-nhan-vien.css'
})
export class ThemNhanVienComponent implements OnInit {
  // Danh sách hiển thị trên bảng
  danhSachNhanVien: NhanVien[] = [];

  // Biến điều khiển màn hình (false là hiện Bảng, true là hiện Form)
  hienThiForm = false;
  dangSua = false; // Phân biệt đang là Thêm Mới hay Cập Nhật
  
  // Cái giỏ trống để hứng dữ liệu trên Form
  nhanVienHienTai: NhanVien = { 
    ho: '', 
    ten: '', 
    soDienThoai: '', 
    diaChi: '', 
    chucVu: 'Nhân viên', 
    gioiTinh: 'Nam', 
    trangThai: true 
  };

  constructor(private nhanSuService: NhanSuService) {}

  ngOnInit() {
    // Tự động lấy dữ liệu khi vừa mở trang
    this.loadLaiDanhSach();
  }

  // Hàm bổ trợ: Lấy dữ liệu mới nhất từ SQL Server
  loadLaiDanhSach() {
    this.nhanSuService.getDanhSachNhanVien().subscribe({
      next: (res: any) => {
        this.danhSachNhanVien = res;
        console.log('Dữ liệu từ SQL đã cập nhật:', res);
      },
      error: (err) => console.error('Lỗi tải danh sách:', err)
    });
  }

  // CHIÊU BẢO MẬT: Kiểm tra quyền truy cập
  kiemTraQuyen(quyenCanCheck: string): boolean {
    const chuoiQuyen = localStorage.getItem('quyenTruyCap');
    if (!chuoiQuyen) return false;
    return JSON.parse(chuoiQuyen).includes(quyenCanCheck);
  }

  // Mở form để Thêm mới
  moFormThem() {
    this.dangSua = false;
    this.nhanVienHienTai = { 
      ho: '', 
      ten: '', 
      soDienThoai: '', 
      diaChi: '', 
      chucVu: 'Nhân viên', 
      gioiTinh: 'Nam', 
      trangThai: true 
    };
    this.hienThiForm = true;
  }

  // Mở form để Sửa
  moFormSua(nv: NhanVien) {
    this.dangSua = true;
    this.nhanVienHienTai = { ...nv }; 
    this.hienThiForm = true;
  }

  // Xóa nhân viên (Sử dụng Soft Delete - Cập nhật trạng thái)
  xoaNhanVien(maNV: number | undefined) {
    if (confirm('Bồ có chắc chắn muốn cho người này nghỉ việc không?')) {
      // TODO: [BÀN GIAO - 4] LƯU Ý CHO DATA & BACKEND - SOFT DELETE
      this.nhanSuService.xoaNhanVien(maNV).subscribe({
        next: () => {
          alert('✅ Đã cập nhật trạng thái nghỉ việc thành công!');
          this.loadLaiDanhSach(); // Tải lại bảng ngay lập tức
        },
        error: (err:any) => {
          alert('❌ Lỗi: ' + (err.error?.thongBao || 'Không thể xóa'));
        }
      });
    }
  }

  // Bấm nút Lưu (Xử lý cả Thêm và Sửa)
  luuNhanVien() {
    if (this.dangSua) {
      // TODO: [BÀN GIAO - 5] Gọi API Cập nhật (Method: PUT)
      this.nhanSuService.capNhatNhanVien(this.nhanVienHienTai.maNhanVien, this.nhanVienHienTai).subscribe({
        next: () => {
          alert('✅ Cập nhật thông tin thành công!');
          this.loadLaiDanhSach();
          this.hienThiForm = false;
        },
        error: (err) => alert('❌ Lỗi cập nhật: ' + (err.error?.thongBao || 'Lỗi hệ thống'))
      });

    } else {
      // TODO: [BÀN GIAO - 6] Gọi API Thêm mới (Method: POST)
      // Tạo bản sao và xóa MaNhanVien để SQL Server tự sinh mã (Identity)
      const dataMoi = { ...this.nhanVienHienTai };
      delete (dataMoi as any).maNhanVien;

      this.nhanSuService.themNhanVien(dataMoi).subscribe({
        next: (res) => {
          alert(`✅ Đã lưu nhân viên ${res.ho} ${res.ten} vào Database!`);
          this.loadLaiDanhSach();
          this.hienThiForm = false;
        },
        error: (err) => alert('❌ Lỗi lưu mới: ' + (err.error?.thongBao || 'Lỗi hệ thống'))
      });
    }
  }

  // Bấm nút Hủy
  huyBo() {
    this.hienThiForm = false;
  }
}