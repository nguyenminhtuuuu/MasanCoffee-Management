import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HangTonKho } from '../../models/kho-hang.model';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-kho-hang',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kho-hang.html',
  styleUrls: ['./kho-hang.css']
})
export class KhoHangComponent implements OnInit {

  danhSachKho: HangTonKho[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.apiService.layDanhSachKho().subscribe({

      next: (res: any) => {

        console.log('Danh sach ton kho API tra ve:', res);

        // lấy mảng data từ backend
        this.danhSachKho = [...res.data];

        console.log('So dong sau khi gan:', this.danhSachKho.length);

        // cập nhật UI
        this.cdr.detectChanges();
      },

      error: (err: Error) => {

        console.error('Loi lay danh sach ton kho:', err.message);

        alert('Không lấy được danh sách tồn kho');
}
    });
  }
}