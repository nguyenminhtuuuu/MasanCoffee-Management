import { Routes } from '@angular/router';
import { DangNhapComponent } from './components/dang-nhap/dang-nhap';
import { KhoHangComponent } from './components/kho-hang/kho-hang'; 
import { ThemNhanVienComponent } from './components/them-nhan-vien/them-nhan-vien';
import { ThongKeComponent } from './components/thong-ke/thong-ke';
import { XuatKhoComponent } from './components/xuat-kho/xuat-kho';
import { PhanCongComponent } from './components/phan-cong/phan-cong';
import { TinhLuongComponent } from './components/tinh-luong/tinh-luong';
import { NhapKhoComponent } from './components/nhap-kho/nhap-kho';
import { kiemTraQuyenGuard } from './guards/kiem-tra-quyen-guard';


export const routes: Routes = [
  // Nếu gõ link gốc (chưa đăng nhập), ép nó chạy vô trang Đăng Nhập
  { path: '', component: DangNhapComponent },
  
  // Các đường dẫn khác
  { 
    path: 'kho-hang', 
    component: KhoHangComponent,
    canActivate: [kiemTraQuyenGuard], // Gắn bảo vệ
    data: { quyenCanThiet: 'QuanLyKho' } // Nội quy
  },
  { 
    path: 'xuat-kho', 
    component: XuatKhoComponent,
    canActivate: [kiemTraQuyenGuard],
    data: { quyenCanThiet: 'QuanLyKho' }
  },
  { 
    path: 'nhap-kho', 
    component: NhapKhoComponent,
    canActivate: [kiemTraQuyenGuard],
    data: { quyenCanThiet: 'QuanLyKho' }
  },
  { 
    path: 'nhan-vien', 
    component: ThemNhanVienComponent,
    canActivate: [kiemTraQuyenGuard] 
  },
  { 
    path: 'phan-cong', 
    component: PhanCongComponent,
    canActivate: [kiemTraQuyenGuard],
    data: { quyenCanThiet: 'QuanLyNhanVien' }
  },
  { 
    path: 'tinh-luong', 
    component: TinhLuongComponent,
    canActivate: [kiemTraQuyenGuard],
    data: { quyenCanThiet: 'ThanhToanLuong' }
  },
  // Riêng trang Thống Kê lỡ Minh Tú không phân quyền cụ thể thì tui khỏi để `data`, chỉ cần `canActivate` là ông bảo vệ hiểu "Ai đăng nhập rồi cũng được coi"
  { 
    path: 'thong-ke', 
    component: ThongKeComponent,
    canActivate: [kiemTraQuyenGuard] 
  }
];