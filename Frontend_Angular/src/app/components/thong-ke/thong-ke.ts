import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { KeToanService } from '../../services/ke-toan.service';
import { ThongKe } from '../../models/thong-ke.model';

@Component({
  selector: 'app-thong-ke',
  standalone: true,
  templateUrl: './thong-ke.html',
  styleUrl: './thong-ke.css'
})
export class ThongKeComponent implements OnInit {
  bieuDoHienTai: any;

  duLieuTuBackend: ThongKe = {
    nhanBieuDo: [],
    duLieuDoanhThu: [],
    duLieuChiPhi: []
  };

  constructor(private keToanService: KeToanService) { }

  ngOnInit() {
    this.keToanService.layThongKe(2024).subscribe({
      next: (res) => {
        this.duLieuTuBackend = res;
        this.veBieuDo();
      },
      error: (err) => {
        console.error(err);
        alert('Không lấy được dữ liệu thống kê');
      }
    });
  }

  veBieuDo() {
    if (this.bieuDoHienTai) {
      this.bieuDoHienTai.destroy();
    }

    this.bieuDoHienTai = new Chart('bieuDoMasan', {
      type: 'bar',
      data: {
        labels: this.duLieuTuBackend.nhanBieuDo,
        datasets: [
          {
            label: 'Doanh Thu (VNĐ)',
            data: this.duLieuTuBackend.duLieuDoanhThu,
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          },
          {
            label: 'Chi Phí (VNĐ)',
            data: this.duLieuTuBackend.duLieuChiPhi,
            backgroundColor: 'rgba(255, 99, 132, 0.7)'
          }
        ]
      }
    });
  }
}
