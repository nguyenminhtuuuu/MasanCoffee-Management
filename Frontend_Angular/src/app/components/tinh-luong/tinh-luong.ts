import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BangLuong } from '../../models/bang-luong.model';
import { KeToanService } from '../../services/ke-toan.service';

@Component({
  selector: 'app-tinh-luong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tinh-luong.html',
  styleUrl: './tinh-luong.css'
})
export class TinhLuongComponent implements OnInit {
  danhSachLuong: BangLuong[] = [];
  thang = 5;
  nam = 2024;

  constructor(
    private keToanService: KeToanService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.keToanService.layBangLuong(this.thang, this.nam).subscribe({
      next: (data) => {
        console.log('Bang luong API tra ve:', data);
        this.danhSachLuong = [...data];
        console.log('So dong sau khi gan:', this.danhSachLuong.length);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Loi lay bang luong:', err);
        alert('Không lấy được bảng lương');
      }
    });
  }

  thanhToan(nv: BangLuong) {
    if (nv.daThanhToan) {
      alert('Bảng lương này đã được thanh toán trước đó');
      return;
    }

    if (nv.tongLuong <= 0) {
      alert('Không thể thanh toán bảng lương có tổng lương bằng 0');
      return;
    }

    this.keToanService.thanhToanLuong(nv.maBangLuong, 'Trần Đăng Khoa').subscribe({
      next: (res) => {
        alert(res.thongBao);

        if (res.thanhCong) {
          nv.daThanhToan = true;
        }
      },
      error: (err) => {
        console.error('Loi thanh toan:', err);
        alert(err.error?.thongBao ?? 'Lỗi thanh toán');
      }
    });
  }

  coTheThanhToan(nv: BangLuong): boolean {
    return !nv.daThanhToan && nv.tongLuong > 0;
  }
}
