using MasanCoffee.API.DTOs;
using MasanCoffee.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MasanCoffee.API.Services
{
    public class KeToanService
    {
        private readonly ApplicationDbContext _context;

        public KeToanService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<BangLuongDto>> LayBangLuongAsync(int thang, int nam)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"EXEC sp_ChotBangLuongTheoThang @Thang = {thang}, @Nam = {nam}");

            var thangNam = new DateOnly(nam, thang, 1);

            var danhSachLuong = await _context.BangLuong
                .Include(bl => bl.NhanVien)
                .Where(bl => bl.ThangNam == thangNam)
                .Join(
                    _context.NhanVien,
                    bl => bl.MaNhanVien,
                    nv => nv.MaNhanVien,
                    (bl, nv) => new BangLuongDto
                    {
                        MaBangLuong = bl.MaBangLuong,
                        ThangNam = bl.ThangNam,
                        MaNhanVien = nv.MaNhanVien,
                        HoTenNhanVien = (nv.Ho + " " + nv.Ten).Trim(),
                        ChucVu = nv.ChucVu,
                        TongGioLam = bl.TongGioLam,
                        HeSoLuong = bl.HeSoLuong,
                        TongLuong = bl.TongLuong,
                        DaThanhToan = bl.DaThanhToan,
                        TrangThai = bl.NhanVien.TrangThai
                    }
                )
                .OrderBy(x => x.MaNhanVien)
                .ToListAsync();

            return danhSachLuong;
        }

        public async Task<ThanhToanLuongResultDto> ThanhToanLuongAsync(ThanhToanLuongDto model)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var bangLuong = await _context.BangLuong
                    .Include(bl => bl.NhanVien)
                    .FirstOrDefaultAsync(bl => bl.MaBangLuong == model.MaBangLuong);

                if (bangLuong == null)
                {
                    return new ThanhToanLuongResultDto
                    {
                        ThanhCong = false,
                        ThongBao = "Không tìm thấy bảng lương cần thanh toán"
                    };
                }

                if (bangLuong.DaThanhToan)
                {
                    return new ThanhToanLuongResultDto
                    {
                        ThanhCong = false,
                        ThongBao = "Bảng lương này đã được thanh toán trước đó"
                    };
                }

                if (bangLuong.TongLuong <= 0)
                {
                    return new ThanhToanLuongResultDto
                    {
                        ThanhCong = false,
                        ThongBao = "Không thể thanh toán bảng lương có tổng lương bằng 0"
                    };
                }

                bangLuong.DaThanhToan = true;
                bangLuong.NgayThanhToan = DateTime.Now;

                var lichSu = new LichSuGiaoDichLuong
                {
                    MaBangLuong = bangLuong.MaBangLuong,
                    MaNhanVien = bangLuong.MaNhanVien,
                    NguoiDuyet = model.NguoiDuyet,
                    TongTien = bangLuong.TongLuong,
                    ThoiGianGiaoDich = DateTime.Now,
                    GhiChu = $"Thanh toán lương tháng {bangLuong.ThangNam:yyyy-MM} cho {bangLuong.NhanVien.Ho} {bangLuong.NhanVien.Ten}"
                };

                _context.LichSuGiaoDichLuong.Add(lichSu);

                await _context.ChiPhi
                    .Where(cp => cp.MaBangLuong == bangLuong.MaBangLuong && cp.LoaiChiPhi == "Lương")
                    .ExecuteDeleteAsync();

                var chiPhiLuong = new ChiPhi
                {
                    NgayChiPhi = DateOnly.FromDateTime(DateTime.Now),
                    LoaiChiPhi = "Lương",
                    NoiDung = $"Chi lương tháng {bangLuong.ThangNam:MM/yyyy} cho {bangLuong.NhanVien.Ho} {bangLuong.NhanVien.Ten}",
                    SoTien = bangLuong.TongLuong,
                    MaBangLuong = bangLuong.MaBangLuong
                };

                _context.ChiPhi.Add(chiPhiLuong);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return new ThanhToanLuongResultDto
                {
                    ThanhCong = true,
                    ThongBao = "Thanh toán lương thành công"
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return new ThanhToanLuongResultDto
                {
                    ThanhCong = false,
                    ThongBao = ex.Message
                };
            }
        }

        public async Task<ThongKeDto> LayThongKeAsync(int nam)
        {
            var doanhThuTheoThang = await _context.BaoCaoDoanhThuThang
                .Where(x => x.Nam == nam)
                .ToDictionaryAsync(x => x.Thang, x => x.TongDoanhThu);

            var chiPhiTheoThang = await _context.BaoCaoChiPhiThang
                .Where(x => x.Nam == nam)
                .ToDictionaryAsync(x => x.Thang, x => x.TongChiPhi);

            var ketQua = new ThongKeDto();

            for (int thang = 1; thang <= 12; thang++)
            {
                ketQua.NhanBieuDo.Add($"Tháng {thang}");
                ketQua.DuLieuDoanhThu.Add(doanhThuTheoThang.ContainsKey(thang) ? doanhThuTheoThang[thang] : 0);
                ketQua.DuLieuChiPhi.Add(chiPhiTheoThang.ContainsKey(thang) ? chiPhiTheoThang[thang] : 0);
            }

            return ketQua;
        }

    }
}
