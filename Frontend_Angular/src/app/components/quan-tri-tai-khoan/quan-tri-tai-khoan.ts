import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { NhanSuService } from '../../services/nhan-su.service';
import { TaiKhoanPayload, TaiKhoanService } from '../../services/tai-khoan.service';
import { NhanVien } from '../../models/nhan-vien.model';
import { TaiKhoanAdmin } from '../../models/tai-khoan-admin.model';
import { VaiTro } from '../../models/vai-tro.model';

@Component({
  selector: 'app-quan-tri-tai-khoan',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quan-tri-tai-khoan.html',
  styleUrl: './quan-tri-tai-khoan.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuanTriTaiKhoanComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly nhanSuService = inject(NhanSuService);
  private readonly taiKhoanService = inject(TaiKhoanService);

  private readonly quyen = toSignal(this.authService.quyen$, { initialValue: [] as string[] });

  readonly danhSachTaiKhoan = signal<TaiKhoanAdmin[]>([]);
  readonly danhSachNhanVien = signal<NhanVien[]>([]);
  readonly danhSachVaiTro = signal<VaiTro[]>([]);
  readonly dangTai = signal(false);
  readonly hienThiForm = signal(false);
  readonly thongBao = signal('');

  readonly coQuyenQuanTriTaiKhoan = computed(() => {
    const danhSachQuyen = this.quyen();
    return danhSachQuyen.includes('QuanTriTaiKhoan') || danhSachQuyen.includes('Admin');
  });

  readonly form = this.fb.nonNullable.group({
    tenDangNhap: ['', [Validators.required, Validators.minLength(3)]],
    matKhau: ['', [Validators.required, Validators.minLength(6)]],
    maNhanVien: [0, [Validators.required, Validators.min(1)]],
    maVaiTro: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.taiKhoanService.getDanhSachTaiKhoan().subscribe({
      next: data => this.danhSachTaiKhoan.set(data ?? []),
      error: err => {
        console.error('Lỗi khi tải danh sách tài khoản:', err);
        const body = err.error || err.message || null;
        this.thongBao.set(body?.message || body?.thongBao || 'Không tải được danh sách tài khoản!');
      }
    });

    this.nhanSuService.getDanhSachNhanVien().subscribe({
      next: data => this.danhSachNhanVien.set(data ?? []),
      error: err => {
        console.error('Lỗi khi tải danh sách nhân viên:', err);
        const body = err.error || err.message || null;
        this.thongBao.set(body?.message || 'Không tải được danh sách nhân viên!');
      }
    });

    this.nhanSuService.getDanhSachVaiTro().subscribe({
      next: data => this.danhSachVaiTro.set(data ?? []),
      error: err => {
        console.error('Lỗi khi tải danh sách vai trò:', err);
        const body = err.error || err.message || null;
        this.thongBao.set(body?.message || 'Không tải được danh sách vai trò!');
      }
    });
  }

  moForm(): void {
    this.form.reset({
      tenDangNhap: '',
      matKhau: '',
      maNhanVien: 0,
      maVaiTro: 0
    });
    this.thongBao.set('');
    this.hienThiForm.set(true);
  }

  dongForm(): void {
    this.hienThiForm.set(false);
  }

  layThongBao(res: any, macDinh: string): string {
    return res?.thongBao || res?.message || macDinh;
  }

  luuTaiKhoan(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.thongBao.set('Vui lòng nhập đầy đủ thông tin tài khoản!');
      return;
    }

    this.dangTai.set(true);

    const payload: TaiKhoanPayload = {
      tenDangNhap: this.form.controls.tenDangNhap.value.trim(),
      matKhau: this.form.controls.matKhau.value,
      maNhanVien: this.form.controls.maNhanVien.value,
      maVaiTro: this.form.controls.maVaiTro.value
    };

    this.taiKhoanService.themTaiKhoan(payload).subscribe({
      next: res => {
        this.thongBao.set(this.layThongBao(res, 'Cấp tài khoản thành công!'));
        this.hienThiForm.set(false);
        this.napLaiDanhSach();
        this.dangTai.set(false);
      },
      error: err => {
        console.error('Lỗi khi cấp tài khoản:', err);
        const body = err.error || null;
        // show status + backend body if available to help debugging
        const status = err.status ? `(${err.status}) ` : '';
        const detail = body?.message || body?.thongBao || JSON.stringify(body) || err.message;
        this.thongBao.set(status + detail || 'Cấp tài khoản thất bại!');
        this.dangTai.set(false);
      }
    });
  }

  doiTrangThai(tenDangNhap: string): void {
    if (!confirm(`Đổi trạng thái tài khoản ${tenDangNhap}?`)) {
      return;
    }

    this.taiKhoanService.doiTrangThaiTaiKhoan(tenDangNhap).subscribe({
      next: res => {
        this.thongBao.set(this.layThongBao(res, 'Đã cập nhật trạng thái tài khoản!'));
        this.napLaiDanhSach();
      },
      error: err => {
        console.error('Lỗi khi đổi trạng thái tài khoản:', err);
        const body = err.error || null;
        const status = err.status ? `(${err.status}) ` : '';
        const detail = body?.message || body?.thongBao || JSON.stringify(body) || err.message;
        this.thongBao.set(status + detail || 'Cập nhật trạng thái thất bại!');
      }
    });
  }

  private napLaiDanhSach(): void {
    this.taiKhoanService.getDanhSachTaiKhoan().subscribe({
      next: data => this.danhSachTaiKhoan.set(data ?? [])
    });
  }

  layNhanVien(id: number): string {
    const nv = this.danhSachNhanVien().find(item => item.maNhanVien === id);
    return nv ? `${nv.ho} ${nv.ten}` : `NV-${id}`;
  }

  layVaiTro(id: number): string {
    const vaiTro = this.danhSachVaiTro().find(item => item.maVaiTro === id);
    return vaiTro?.tenVaiTro || `Vai trò #${id}`;
  }
}