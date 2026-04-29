import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BangLuong } from '../models/bang-luong.model';
import { ThongKe } from '../models/thong-ke.model';

export interface ThanhToanLuongResult {
  thanhCong: boolean;
  thongBao: string;
}

@Injectable({
  providedIn: 'root'
})
export class KeToanService {
  private apiUrl = 'http://localhost:5249/api';

  constructor(private http: HttpClient) { }

  layBangLuong(thang: number, nam: number): Observable<BangLuong[]> {
    return this.http.get<BangLuong[]>(
      `${this.apiUrl}/bang-luong?thang=${thang}&nam=${nam}`
    );
  }

  thanhToanLuong(maBangLuong: number, nguoiDuyet: string): Observable<ThanhToanLuongResult> {
    return this.http.post<ThanhToanLuongResult>(`${this.apiUrl}/bang-luong/thanh-toan`, {
      maBangLuong,
      nguoiDuyet
    });
  }

  layThongKe(nam: number): Observable<ThongKe> {
    return this.http.get<ThongKe>(`${this.apiUrl}/thong-ke?nam=${nam}`);
  }
}
