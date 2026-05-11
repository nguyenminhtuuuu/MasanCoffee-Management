import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NhanVien } from '../models/nhan-vien.model';

@Injectable({
  providedIn: 'root'
})
export class NhanSuService {

  private apiUrl = 'https://localhost:7219/api/NhanVien';

  constructor(private http: HttpClient) { }

  getDanhSachNhanVien(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.apiUrl);
  }

  getLichPhanCong(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7219/api/PhanCongCa');
  }
  themNhanVien(nv: any): Observable<any> {
    return this.http.post('https://localhost:7219/api/NhanVien', nv);
  }

  capNhatNhanVien(id: any, data: any): Observable<any> {
    return this.http.put(`https://localhost:7219/api/NhanVien/${id}`, data);
  }

  xoaNhanVien(id: any): Observable<any> {
    return this.http.delete(`https://localhost:7219/api/NhanVien/${id}`);
  }
  
luuPhanCong(data: any): Observable<any> {
  return this.http.post('https://localhost:7219/api/PhanCongCa', data);
}
xoaPhanCong(id: number) {
  return this.http.delete(`https://localhost:7219/api/PhanCongCa/${id}`);
}


}