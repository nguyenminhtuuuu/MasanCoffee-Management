using MasanCoffee.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasanCoffee.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DangNhapController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DangNhapController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] DangNhapDto request)
        {
            // join voi: NhanVien, VaiTro
            var user = _context.TaiKhoan
                .Include(t => t.NhanVien) // join NhanVien 
                .Include(t => t.VaiTro) // join VaiTro
                .FirstOrDefault(t => t.TenDangNhap == request.TenDangNhap && t.MatKhau == request.MatKhau);

            if (user == null)
                return BadRequest(new { thanhCong = false, thongBao = "Sai tên đăng nhập hoặc mật khẩu!" });

            if (!user.TrangThai)
                return BadRequest(new { thanhCong = false, thongBao = "Tài khoản đã bị khóa!" });

            // lay chuc nang theo vai tro
            var quyenList = _context.VaiTro_ChucNang
                .Where(vc => vc.MaVaiTro == user.MaVaiTro)
                .Select(vc => vc.ChucNang.TenChucNang)
                .ToList();

            return Ok(new
            {
                thanhCong = true,
                thongBao = "Đăng nhập thành công",
                duLieu = new
                {
                    token = "token-tam-thoi", // JWT fake
                    thongTinUser = new
                    {
                        tenDangNhap = user.TenDangNhap,
                        hoTen = $"{user.NhanVien.Ho} {user.NhanVien.Ten}",
                        vaiTro = user.VaiTro.TenVaiTro
                    },
                    quyenTruyCap = quyenList
                }
            });
        }
    }
}