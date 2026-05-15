import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api';

@Component({
  selector: 'app-xuat-kho',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './xuat-kho.html',
  styleUrl: './xuat-kho.css'
})

export class XuatKhoComponent
implements OnInit {

  // tồn kho
  khoHienTai: any[] = [];

  // form
  phieuXuat = {

    maNhanVien: 0,

    maHang: 0,

    soLuong: 1
  };

  thongBaoLoi = '';

  thongBaoThanhCong = '';

  constructor(

    private apiService: ApiService,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit() {

    this.loadDanhSachKho();
  }

  // load kho
  loadDanhSachKho() {

    this.apiService
      .layDanhSachKho()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Danh sach ton kho:',
            res
          );

          this.khoHienTai = [
            ...res.data
          ];

          this.cdr.detectChanges();
        },

        error: (err: any) => {

          console.error(err);

          alert(
            'Không lấy được danh sách kho'
          );
        }
      });
  }

  // xuất kho
  xuLyXuatKho() {

    this.thongBaoLoi = '';

    this.thongBaoThanhCong = '';

    const hang = this.khoHienTai.find(
      h => h.maHang == this.phieuXuat.maHang
    );

    try {

      if (!hang) {

        throw new Error(
          'Vui lòng chọn hàng'
        );
      }

      if (this.phieuXuat.maNhanVien <= 0) {

        throw new Error(
          'Mã nhân viên không hợp lệ'
        );
      }

      if (this.phieuXuat.soLuong <= 0) {

        throw new Error(
          'Số lượng phải lớn hơn 0'
        );
      }

      if (
        this.phieuXuat.soLuong >
        hang.soLuongTon
      ) {

        throw new Error(
          'Kho không đủ hàng'
        );
      }

      // DTO ĐÚNG FORMAT BACKEND
      const dataGui = {

        maNhanVien:
          this.phieuXuat.maNhanVien,

        chiTietXuat: [

          {
            maHang:
              this.phieuXuat.maHang,

            soLuong:
              this.phieuXuat.soLuong
          }
        ]
      };

      console.log(
        'JSON gui backend:',
        dataGui
      );

      this.apiService
        .taoPhieuXuat(dataGui)
        .subscribe({

          next: (res: any) => {

            console.log(
              'Backend tra ve:',
              res
            );

            if (res.success) {

              this.thongBaoThanhCong =
                `Xuất kho thành công! Mã phiếu: ${res.maPhieuXuat}`;

              // LOAD LẠI KHO
              this.loadDanhSachKho();

              // reset form
              this.phieuXuat.maHang = 0;

              this.phieuXuat.soLuong = 1;
            }
            else {

              this.thongBaoLoi =
                res.message;
            }
          },

          error: (err: any) => {

            console.error(err);

            this.thongBaoLoi =
              err.error?.message ??
              'Lỗi xuất kho';
          }
        });

    }
    catch (error: any) {

      this.thongBaoLoi =
        error.message;
    }
  }
}