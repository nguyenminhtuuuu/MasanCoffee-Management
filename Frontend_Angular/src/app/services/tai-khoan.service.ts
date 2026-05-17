import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaiKhoanAdmin } from '../models/tai-khoan-admin.model';

export interface TaiKhoanPayload {
  tenDangNhap: string;
  matKhau: string;
  maNhanVien: number;
  maVaiTro: number;
  trangThai?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaiKhoanService {
  private readonly apiUrl = 'https://localhost:7219/api/TaiKhoan';

  constructor(private http: HttpClient) {}

  getDanhSachTaiKhoan(): Observable<TaiKhoanAdmin[]> {
    return this.http.get<TaiKhoanAdmin[]>(this.apiUrl);
  }

  themTaiKhoan(payload: TaiKhoanPayload): Observable<any> {
    // Backend model validation expects nested objects for NhanVien and VaiTro.
    // Build a body with those nested shapes to satisfy server-side [Required] checks.
    // Send flat fields expected by the TaiKhoan model so the controller can map directly
    // into the TaiKhoan entity and save to TaiKhoan table.
    const body: any = {
      TenDangNhap: payload.tenDangNhap,
      MatKhau: payload.matKhau,
      MaNhanVien: payload.maNhanVien,
      MaVaiTro: payload.maVaiTro,
      TrangThai: payload.trangThai ?? true
    };

    return this.http.post(this.apiUrl, body);
  }

  doiTrangThaiTaiKhoan(tenDangNhap: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/trangThaiTaiKhoan/${encodeURIComponent(tenDangNhap)}`, {});
  }
}