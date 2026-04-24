import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NhanVien } from '../../models/nhan-vien.model';

// TODO: [BÀN GIAO - 1] Import Service
// import { NhanSuService } from '../services/nhan-su.service';

@Component({
  selector: 'app-them-nhan-vien',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './them-nhan-vien.html',
  styleUrl: './them-nhan-vien.css'
})
export class ThemNhanVienComponent implements OnInit {
  // TODO: [BÀN GIAO - 2] Gọi API lấy danh sách (Method: GET)
  // Backend cung cấp API GET /api/nhan-vien.
  // danhSachNhanVien: NhanVien[] = [];

  // 1. Dữ liệu giả lập
  danhSachNhanVien: NhanVien[] = [
    { maNhanVien: 1, ho: 'Nguyễn Văn', ten: 'Sếp', soDienThoai: '0901234567', diaChi: '', chucVu: 'Sếp Tổng', gioiTinh: 'Nam', trangThai: true },
    { maNhanVien: 2, ho: 'Trần Thị', ten: 'Kho', soDienThoai: '0912345678', diaChi: '', chucVu: 'Thủ kho', gioiTinh: 'Nữ', trangThai: true },
    { maNhanVien: 3, ho: 'Bùi', ten: 'Anh', soDienThoai: '0987654321', diaChi: '', chucVu: 'Nhân sự', gioiTinh: 'Nữ', trangThai: true }
  ];

  // Biến điều khiển màn hình (false là hiện Bảng, true là hiện Form)
  hienThiForm = false;
  dangSua = false; // Phân biệt đang là Thêm Mới hay Cập Nhật
  
  // Cái giỏ trống để hứng dữ liệu trên Form
  nhanVienHienTai: NhanVien = { ho: '', ten: '', soDienThoai: '', diaChi: '', chucVu: 'Nhân viên', gioiTinh: 'Nam', trangThai: true };

  // constructor(private nhanSuService: NhanSuService) {}

  ngOnInit() {
    // Gọi this.nhanSuService.getDanhSachNhanVien().subscribe(...) ở đây để load dữ liệu từ Database lên.
  }

  // CHIÊU BẢO MẬT: Kiểm tra xem thẻ từ có quyền này không
  kiemTraQuyen(quyenCanCheck: string): boolean {
    // TODO: [BÀN GIAO - 3] Nhắc nhở Backend về phân quyền
    // Ghi chú cho Backend: Hàm này ở Frontend chỉ dùng để ẨN/HIỆN các nút (như nút Thêm, Xóa, Sửa) cho giao diện sạch sẽ.
    // Backend BẮT BUỘC phải check quyền tương ứng (Role: QuanLyNhanVien) ở mọi API POST, PUT, DELETE để tránh bị gọi API chui.
    const chuoiQuyen = localStorage.getItem('quyenTruyCap');
    if (!chuoiQuyen) return false;
    return JSON.parse(chuoiQuyen).includes(quyenCanCheck);
  }

  // Mở form để Thêm mới
  moFormThem() {
    this.dangSua = false;
    this.nhanVienHienTai = { ho: '', ten: '', soDienThoai: '', diaChi: '', chucVu: 'Nhân viên', gioiTinh: 'Nam', trangThai: true };
    this.hienThiForm = true;
  }

  // Mở form để Sửa
  moFormSua(nv: NhanVien) {
    this.dangSua = true;
    // Dấu ... giúp tạo ra một bản copy, để lúc mình gõ phím trên form, cái Bảng ở ngoài không bị thay đổi theo liền
    this.nhanVienHienTai = { ...nv }; 
    this.hienThiForm = true;
  }

  // Xóa nhân viên
  xoaNhanVien(maNV: number | undefined) {
    if (confirm('Bồ có chắc chắn muốn cho người này nghỉ việc không?')) {
      // TODO: [BÀN GIAO - 4] LƯU Ý CHO DATA & BACKEND - SOFT DELETE
      // Ghi chú cực kỳ quan trọng: TUYỆT ĐỐI KHÔNG DÙNG LỆNH "DELETE FROM NhanVien" trong Database.
      // Nếu xóa mất nhân viên, các phiếu nhập kho hoặc lịch phân ca cũ liên kết với mã nhân viên này sẽ bị lỗi (hỏng khóa ngoại - Foreign Key constraint), hoặc làm sai lệch dữ liệu thống kê sau này.
      // Giải pháp: Backend viết API (vd: PUT /api/nhan-vien/{id}/nghi-viec) để cập nhật trường "trangThai = false".
      // Frontend sau đó sẽ gọi API load lại danh sách.
      
      /* Luồng thật:
      this.nhanSuService.xoaNhanVien(maNV).subscribe(() => this.loadLaiDanhSach());
      */

      // Code tạm:
      this.danhSachNhanVien = this.danhSachNhanVien.filter(n => n.maNhanVien !== maNV);
    }
  }

  // Bấm nút Lưu
  luuNhanVien() {
    if (this.dangSua) {
      // TODO: [BÀN GIAO - 5] Gọi API Cập nhật (Method: PUT)
      // Gửi cục this.nhanVienHienTai xuống API: PUT /api/nhan-vien/{maNV}
      
      const index = this.danhSachNhanVien.findIndex(n => n.maNhanVien === this.nhanVienHienTai.maNhanVien);
      if (index !== -1) this.danhSachNhanVien[index] = { ...this.nhanVienHienTai };
    } else {
      // TODO: [BÀN GIAO - 6] Gọi API Thêm mới (Method: POST)
      // Ghi chú cho Backend: Khi Frontend gửi dữ liệu Thêm mới, sẽ KHÔNG CÓ trường maNhanVien.
      // Database (SQL Server) sẽ tự động sinh mã (Identity / Auto Increment). Sau khi Insert xong, Backend trả về object có chứa cái mã mới đó cho Frontend.
      
      this.nhanVienHienTai.maNhanVien = new Date().getTime(); // Mượn tạm số mili-giây làm mã nhân viên
      this.danhSachNhanVien.push({ ...this.nhanVienHienTai });
    }
    // Lưu xong thì tắt form, quay lại Bảng
    this.hienThiForm = false; 
  }

  // Bấm nút Hủy
  huyBo() {
    this.hienThiForm = false;
  }
}