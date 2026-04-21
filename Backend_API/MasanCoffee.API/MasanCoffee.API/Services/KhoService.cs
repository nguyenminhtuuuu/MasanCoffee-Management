using MasanCoffee.API.DTOs;
using MasanCoffee.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace MasanCoffee.API.Services
{
    public class KhoService
    {
        private readonly ApplicationDbContext _context;

        public KhoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<object> LayTonKho()
        {
            var ds = await _context.NguyenLieu.Select(x => new TonKhoDto
            {
                MaHang = x.MaHang,
                TenHang = x.TenHang,
                SoLuongTon = x.SoLuongTon,
                CanhBao = (x.SoLuongTon < x.MucToiThieu) ? "(Sắp) hết hàng" : "Đủ hàng"
            }).ToListAsync();

            return new
            {
                success = true,
                message = "Lấy danh sách tồn kho thành công",
                data = ds
            };
            
        }

        public async Task<object> NhapKho(NhapKhoDto model)
        {
            using var transaction =
                await _context.Database.BeginTransactionAsync();

            try
            {
                decimal tongTien = 0;
                foreach (var x in model.ChiTiet)
                {
                    var thanhTien = x.SoLuong * x.DonGia;

                    Console.WriteLine(thanhTien);

                    tongTien += thanhTien;
                }

                Console.WriteLine("Tong = " + tongTien);

                var phieuNhap = new PhieuNhap
                {
                    NgayNhap = DateOnly.FromDateTime(DateTime.Now),
                    TongTien = tongTien,
                    MaNhanVien = model.MaNhanVien
                };

                _context.PhieuNhap.Add(phieuNhap);
                await _context.SaveChangesAsync();

                foreach (var item in model.ChiTiet)
                {
                    var ct = new ChiTietPhieuNhap
                    {
                        MaPhieuNhap = phieuNhap.MaPhieuNhap,
                        MaHang = item.MaHang,
                        SoLuong = item.SoLuong,
                        DonGia = item.DonGia
                    };

                    _context.ChiTietPhieuNhap.Add(ct);

                    var hang = await _context.NguyenLieu.FirstOrDefaultAsync(x => x.MaHang == item.MaHang);

                    if (hang == null)
                        throw new Exception(
                            $"Không tìm thấy hàng mã {item.MaHang}");

                    hang.SoLuongTon += item.SoLuong;
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return new
                {
                    success = true,
                    message = "Nhập kho thành công",
                    maPhieuNhap = phieuNhap.MaPhieuNhap
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return new
                {
                    success = false,
                    message = ex.InnerException?.Message ?? ex.Message
                }; ;
            }
        }

        public async Task<object> XuatKho (XuatKhoDto model)
        {

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {

                // luu phieu xuat
                var phieuXuat = new PhieuXuat
                {
                    MaNhanVien = model.MaNhanVien,
                    NgayXuat = DateOnly.FromDateTime(DateTime.Now)
                };
                _context.PhieuXuat.Add(phieuXuat);
                await _context.SaveChangesAsync();

                // luu chi tiet phieu xuat
                foreach (var x in model.ChiTietXuat)
                {
                    var ct_xuat = new ChiTietPhieuXuat
                    {
                        MaPhieuXuat = phieuXuat.MaPhieuXuat,
                        MaHang = x.MaHang,
                        SoLuong = x.SoLuong
                    };
                    _context.ChiTietPhieuXuat.Add(ct_xuat);

                    var hang = await _context.NguyenLieu.FirstOrDefaultAsync(y => y.MaHang == x.MaHang);

                    if (hang == null) throw new Exception(
                            $"Không tìm thấy hàng mã {x.MaHang}");

                    if (hang.SoLuongTon < x.SoLuong)
                    {
                        throw new Exception("Kho không đủ hàng!");
                    }

                    hang.SoLuongTon -= x.SoLuong;
                }
                await _context.SaveChangesAsync(); 
                await transaction.CommitAsync();

                return new
                {
                    success = true,
                    message = "Xuất kho thành công",
                    maPhieuXuat = phieuXuat.MaPhieuXuat
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return new
                {
                    success = false,
                    message = ex.InnerException?.Message ?? ex.Message
                }; ;

            }
        }


    }
}
