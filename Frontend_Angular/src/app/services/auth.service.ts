import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'https://localhost:7219/api/DangNhap/login'; 

  constructor(private http: HttpClient) { }

  login(taiKhoan: string, matKhau: string) {
    const body = {
      tenDangNhap: taiKhoan,
      matKhau: matKhau
    };
    return this.http.post(this.apiUrl, body);
  }
}