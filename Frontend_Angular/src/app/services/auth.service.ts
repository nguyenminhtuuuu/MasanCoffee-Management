import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'https://localhost:7219/api/DangNhap/login'; 

  // Observable stream to publish permission changes so UI can react immediately after login/logout
  public quyen$ = new BehaviorSubject<string[]>(this.loadQuyenFromStorage());

  // Observable to represent login state based on presence of token
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  private hasToken(): boolean {
    return localStorage.getItem('token') !== null;
  }

  private loadQuyenFromStorage(): string[] {
    const quyen = localStorage.getItem('quyenTruyCap');
    return quyen ? JSON.parse(quyen) : [];
  }

  setQuyen(quyen: string[]) {
    if (quyen) {
      localStorage.setItem('quyenTruyCap', JSON.stringify(quyen));
    } else {
      localStorage.removeItem('quyenTruyCap');
    }
    this.quyen$.next(quyen || []);
  }

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    this.isLoggedIn$.next(this.hasToken());
  }
  constructor(private http: HttpClient) { }

  login(taiKhoan: string, matKhau: string) {
    const body = {
      tenDangNhap: taiKhoan,
      matKhau: matKhau
    };
    return this.http.post(this.apiUrl, body);
  }
}