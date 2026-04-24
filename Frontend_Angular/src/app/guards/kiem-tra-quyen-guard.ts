import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const kiemTraQuyenGuard: CanActivateFn = (route, state) => {
  // 1. Cấp bộ đàm (Router) cho bảo vệ để ổng biết đường chở khách bị đuổi ra ngoài
  const router = inject(Router);
  
  // 2. Lục soát người xem có mang Thẻ từ và Giấy phép không
  const chuoiQuyen = localStorage.getItem('quyenTruyCap');

  if (!chuoiQuyen) {
    alert('Ê ê đi đâu đó? Vui lòng đăng nhập trước nha!');
    router.navigate(['/']); // Chở về trang chủ
    return false; // Chặn cửa
  }

  // 3. Đọc mảng quyền của người dùng
  const mangQuyen = JSON.parse(chuoiQuyen);
  
  // 4. Nhìn lên bảng nội quy xem phòng này đòi hỏi quyền gì (Mình sẽ cài đặt ở Bước 3)
  const quyenYeuCau = route.data['quyenCanThiet']; 

  // 5. Nếu phòng không đòi quyền gì, HOẶC người dùng có mang đúng cái quyền đó -> Cho qua
  if (!quyenYeuCau || mangQuyen.includes(quyenYeuCau)) {
    return true; 
  } else {
    // 6. Nếu không có quyền -> Đuổi cổ
    alert('Xin lỗi, thẻ của bạn không đủ "nhân phẩm" để vào phòng này!');
    router.navigate(['/']); 
    return false; 
  }
};