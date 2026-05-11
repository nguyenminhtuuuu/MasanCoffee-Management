import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhanCongCa } from '../../models/phan-cong.model';
import { NhanSuService } from '../../services/nhan-su.service';

@Component({
  selector: 'app-phan-cong',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './phan-cong.html',
  styleUrl: './phan-cong.css'
})
export class PhanCongComponent implements OnInit {
  danhSachNhanVien: any[] = [];

  danhSachCa = [
    { maCa: 1, tenCa: 'Ca Sáng (08:00 - 12:00)', gioBatDau: '08:00:00', gioKetThuc: '12:00:00', soGioLam: 4 },
    { maCa: 2, tenCa: 'Ca Chiều (12:00 - 17:00)', gioBatDau: '12:00:00', gioKetThuc: '17:00:00', soGioLam: 5 },
    { maCa: 3, tenCa: 'Ca Tối (17:00 - 22:00)', gioBatDau: '17:00:00', gioKetThuc: '22:00:00', soGioLam: 5 }
  ];

  caMoi: Partial<PhanCongCa> = {
    ngayLam: '',
    maNhanVien: 0,
    maCa: 0
  };

  lichDaPhan: PhanCongCa[] = [];
  thongBao = '';

  constructor(private nhanSuService: NhanSuService) { }

  ngOnInit() {
    // 1. Lấy danh sách nhân viên để đổ vào dropdown
    this.nhanSuService.getDanhSachNhanVien().subscribe(res => {
      this.danhSachNhanVien = res;
    });

    // 2. Tải lịch đã phân từ SQL Server lên bảng khi vừa mở trang
    this.loadLichPhanCong();
  }

  // Hàm bổ trợ để tải dữ liệu từ SQL Server
  loadLichPhanCong() {
    this.nhanSuService.getLichPhanCong().subscribe((res: any) => {
      this.lichDaPhan = res;
    });
  }

  xuLyPhanCa() {
    // 1. Tìm thông tin chi tiết của Nhân viên và Ca được chọn
    const nv = this.danhSachNhanVien.find(n => n.maNhanVien == this.caMoi.maNhanVien);
    const ca = this.danhSachCa.find(c => c.maCa == this.caMoi.maCa);

    if (nv && ca && this.caMoi.ngayLam) {

      // 2. Gom thành cục JSON hoàn chỉnh để gửi xuống Backend
      // Lưu ý: hoTenNhanVien giúp hiển thị lên UI ngay lập tức
      const phieuPhanCa: any = {
        ngayLam: this.caMoi.ngayLam,
        maNhanVien: nv.maNhanVien,
        maCa: ca.maCa,
        soGioLam: ca.soGioLam,
        // Backend sẽ dùng NhanVien.Ho + Ten để trả về hoTenNhanVien
      };

      // 3. GỌI API & BẮT LỖI NGHIỆP VỤ (Lưu vào SQL Server)
      this.nhanSuService.luuPhanCong(phieuPhanCa).subscribe({
        next: (res: any) => {
          // Thành công: Thông báo và tải lại danh sách từ SQL cho chuẩn
          alert('✅ ' + res.thongBao);
          this.thongBao = res.thongBao;
          this.loadLichPhanCong();

          // Reset form sau khi thêm thành công
          this.caMoi = { ngayLam: '', maNhanVien: 0, maCa: 0 };
        },
        error: (err: any) => {
          if (err.status === 409 || err.status === 400) {
            this.thongBao = err.error?.thongBao;
          } else {
            this.thongBao = 'Lỗi hệ thống, vui lòng thử lại sau!';
          }

          alert('❌ ' + this.thongBao);
        }
      });

    } else {
      this.thongBao = 'Vui lòng chọn đầy đủ Ngày, Nhân viên và Ca làm!';
    }
  }
  xoaCa(id: number | undefined) {
  if (id === undefined) return; // Nếu không có ID thì không làm gì cả
  
  const xacNhan = confirm('Bạn có chắc chắn muốn xóa ca làm này không?');
  if (xacNhan) {
    this.nhanSuService.xoaPhanCong(id).subscribe({
      next: (res: any) => {
        alert('✅ ' + res.thongBao);
        this.loadLichPhanCong();
      },
      error: (err) => {
        alert('❌ Lỗi: ' + err.error?.thongBao);
      }
    });
  }
}
}