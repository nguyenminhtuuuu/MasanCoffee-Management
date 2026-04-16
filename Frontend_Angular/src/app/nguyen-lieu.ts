import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NguyenLieu {
  maHang: number;
  tenHang: string;
  soLuongTon: number;
  mucToiThieu: number;
  donViTinh: string;
}

@Injectable({
  providedIn: 'root'
})
export class NguyenLieuService {
  private apiUrl = 'http://localhost:5249/api/NguyenLieu';

  constructor(private http: HttpClient) { }

  getDanhSach(): Observable<NguyenLieu[]> {
    return this.http.get<NguyenLieu[]>(this.apiUrl);
  }
}