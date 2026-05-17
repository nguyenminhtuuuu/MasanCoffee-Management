using MasanCoffee.API.DTOs;
using MasanCoffee.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasanCoffee.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaiKhoanController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaiKhoanController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetDanhSach()
        {
            var list = _context.TaiKhoan
                .Include(t => t.NhanVien)
                .Include(t => t.VaiTro)
                .Select(t => new TaiKhoanDto
                {
                    TenDangNhap = t.TenDangNhap,
                    MaNhanVien = t.MaNhanVien,
                    HoTenNhanVien = $"{t.NhanVien.Ho} {t.NhanVien.Ten}",
                    VaiTro = t.VaiTro.TenVaiTro,
                    TrangThai = t.TrangThai
                }).ToList();

            return Ok(list);
        }

        // khoa, mo khoa tai khoan
        [HttpPut("trangThaiTaiKhoan/{tenDangNhap}")]
        public IActionResult TrangThaiTaiKhoan(string tenDangNhap)
        {
            var account = _context.TaiKhoan.FirstOrDefault(t => t.TenDangNhap == tenDangNhap);
            if (account == null)
                return NotFound(new { message = "Không tìm thấy tài khoản!" });

            // dao nguoc trang thai
            account.TrangThai = !account.TrangThai;
            _context.SaveChanges();

            return Ok(new { message = "Đã cập nhật trạng thái!" });
        }

        // them tai khoan 
        [HttpPost]
        public async Task<IActionResult> TaoTaiKhoan([FromBody] TaoTaiKhoanDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var nhanVien = await _context.NhanVien.FindAsync(request.MaNhanVien);
            var vaiTro = await _context.VaiTro.FindAsync(request.MaVaiTro);

            if (nhanVien == null || vaiTro == null)
                return NotFound("Không tìm thấy Nhân viên hoặc Vai trò");

            var taiKhoan = new TaiKhoan
            {
                TenDangNhap = request.TenDangNhap,
                MatKhau = request.MatKhau,
                TrangThai = request.TrangThai,
                MaNhanVien = request.MaNhanVien,
                MaVaiTro = request.MaVaiTro
            };

            _context.TaiKhoan.Add(taiKhoan);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}