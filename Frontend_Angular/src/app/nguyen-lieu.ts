import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NguyenLieuService {
  private apiUrl = 'https://localhost:7219/api/NguyenLieu'; 

  constructor(private http: HttpClient) { }

  getDanhSach() {
    return this.http.get<any[]>(this.apiUrl);
  }
}