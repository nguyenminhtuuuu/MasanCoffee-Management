import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguyenLieuService } from './nguyen-lieu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1> Kho Cà Phê Masan</h1>
      <table border="1" cellpadding="10" style="border-collapse: collapse;">
        <tr>
          <th>Mã Hàng</th>
          <th>Tên Hàng</th>
          <th>Số lượng tồn</th>
          <th>Đơn vị</th>
        </tr>
        <tr *ngFor="let item of danhSach">
          <td>{{ item.maHang }}</td>
          <td>{{ item.tenHang }}</td>
          <td [style.color]="item.soLuongTon < item.mucToiThieu ? 'red' : 'black'">
            {{ item.soLuongTon }}
          </td>
          <td>{{ item.donViTinh }}</td>
        </tr>
      </table>
    </div>
  `
})
export class AppComponent implements OnInit {
  danhSach: any[] = [];

  constructor(private nguyenLieuService: NguyenLieuService) {}

  ngOnInit() {
    this.nguyenLieuService.getDanhSach().subscribe(data => {
      this.danhSach = data;
    });
  }
}