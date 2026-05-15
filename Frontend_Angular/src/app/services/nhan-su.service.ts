import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhanSuService {
  private apiUrl = 'https://localhost:7219/api/NhanVien'; 

  constructor(private http: HttpClient) { }

  getDanhSachNhanVien(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
  getDanhSachVaiTro(): Observable<any> {
    return this.http.get('https://localhost:7219/api/VaiTro'); 
 }

  themNhanVien(nhanVien: any): Observable<any> {
    return this.http.post(this.apiUrl, nhanVien);
  }

  suaNhanVien(id: number, nhanVien: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, nhanVien);
  }

  choNghiViec(id: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/nghi-viec`, {}); 
 }

  getLichPhanCong(): Observable<any> {
    return this.http.get('https://localhost:7219/api/PhanCongCa');
  }

  luuPhanCong(phieuPhanCa: any): Observable<any> {
    return this.http.post('https://localhost:7219/api/PhanCongCa', phieuPhanCa);
  }

  xoaPhanCong(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7219/api/PhanCongCa/${id}`);
  }
}