import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api';

@Component({
  selector: 'app-nhap-kho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nhap-kho.html',
  styleUrls: ['./nhap-kho.css']
})
export class NhapKhoComponent
implements OnInit {

  // danh sách hàng hoá
  danhSachHangHoa: any[] = [];

  // phiếu nhập
  phieuNhap: any = {
    maNhanVien: 0,
    ngayNhap: new Date().toISOString().substring(0, 10),
    nhanVienLap: '',
    danhSachHang: [],
    tongTien: 0
  };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // load hàng hoá
    this.apiService.layDanhSachKho().subscribe({
        next: (res: any) => {
          console.log(
            'Danh sach ton kho API tra ve:',res);
        
          this.danhSachHangHoa =[...res.data];

          console.log(
            'So dong sau khi gan:',
            this.danhSachHangHoa.length
          );
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Loi lay danh sach hang hoa:',err);
          alert('Không lấy được danh sách hàng hoá');
        }
      });

    // tạo sẵn 1 dòng
    this.themDongMoi();
  }

  // thêm dòng
  themDongMoi(): void {

    this.phieuNhap
      .danhSachHang
      .push({

        maHang: 0,

        soLuong: 1,

        donGia: 0
      });
  }

  // xoá dòng
  xoaDong(vitri: number): void {

    this.phieuNhap
      .danhSachHang
      .splice(vitri, 1);

    this.tinhTongTien();
  }

  // tính tổng tiền
  tinhTongTien(): void {

    this.phieuNhap.tongTien =

      this.phieuNhap
        .danhSachHang
        .reduce(

          (
            tong: number,
            monHang: any
          ) => {

            return tong +

              (
                monHang.soLuong *
                monHang.donGia
              );
          },

          0
        );
  }

  // lưu phiếu
  luuPhieu(): void {

    // validate mã nhân viên
    if (
      this.phieuNhap.maNhanVien <= 0
    ) {

      alert(
        'Vui lòng nhập mã nhân viên'
      );

      return;
    }

    // validate danh sách hàng
    const loi =

      this.phieuNhap
        .danhSachHang
        .some(

          (x: any) =>

            x.maHang <= 0 ||

            x.soLuong <= 0 ||

            x.donGia <= 0
        );

    if (loi) {

      alert(
        'Vui lòng nhập đầy đủ thông tin hàng hoá'
      );

      return;
    }

    // payload gửi backend
    const payload = {

      maNhanVien:
        this.phieuNhap.maNhanVien,

      chiTiet:
        this.phieuNhap
          .danhSachHang
    };

    console.log(
      'JSON gui backend:',
      payload
    );

    // gọi API
    this.apiService
      .taoPhieuNhap(payload)
      .subscribe({

        next: (res: any) => {

          console.log(
            'Backend tra ve:',
            res
          );

          if (res.success) {

            alert(
              'Nhập kho thành công! Mã phiếu: '
              + res.maPhieuNhap
            );

            // reset form
            this.phieuNhap = {

              maNhanVien: 0,

              ngayNhap:
                new Date()
                  .toISOString()
                  .substring(0, 10),

              nhanVienLap: '',

              danhSachHang: [],

              tongTien: 0
            };

            this.themDongMoi();
          }
          else {

            alert(
              res.message
            );
          }
        },

        error: (err: any) => {

          console.error(
            'Loi tao phieu:',
            err
          );

          alert(
            err.error?.message
            ?? 'Lỗi nhập kho'
          );
        }
      });
  }
}