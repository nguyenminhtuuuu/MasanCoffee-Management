import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const kiemTraQuyenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const chuoiQuyen = localStorage.getItem('quyenTruyCap');

  if (!chuoiQuyen) {
    alert('Vui lòng đăng nhập!');
    router.navigate(['/']); 
    return false; 
  }

  const mangQuyen = JSON.parse(chuoiQuyen);
  
  const quyenYeuCau = route.data['quyenCanThiet']; 

  if (!quyenYeuCau || mangQuyen.includes(quyenYeuCau)) {
    return true; 
  } else {
    alert('Bạn không có quyền truy cập vào trang này!');
    router.navigate(['/']); 
    return false; 
  }
};