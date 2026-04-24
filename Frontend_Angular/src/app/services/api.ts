import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Ống nước
import { Observable } from 'rxjs';
import { HangTonKho } from '../models/kho-hang.model'; // Khuôn đúc

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Giả sử đây là cái link mà Thanh Vy gửi (Link API Backend)
  // Tạm thời mình để một cái link giả lập để test thử
  private linkBackend = 'https://api-gia-lap-cua-thanh-vy.com/api'; 

  // Mời thợ nước (http) vào làm việc
  constructor(private http: HttpClient) { }

  // Viết một hàm để chạy qua nhà Thanh Vy lấy dữ liệu kho về
  layDanhSachKho(): Observable<HangTonKho[]> {
    return this.http.get<HangTonKho[]>(`${this.linkBackend}/danh-sach-kho`);
  }
}