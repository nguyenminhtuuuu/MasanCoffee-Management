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
        public IActionResult ThemTaiKhoan([FromBody] TaiKhoan request)
        {
            var exists = _context.TaiKhoan.Any(t => t.MaNhanVien == request.MaNhanVien || t.TenDangNhap == request.TenDangNhap);
            if (exists)
                return BadRequest(new { message = "Nhân viên đã có tài khoản hoặc Tên đăng nhập bị trùng!" });

            request.TrangThai = true; // tai khoan moi mac dinh la dang hoat dong
            _context.TaiKhoan.Add(request);
            _context.SaveChanges();

            return Ok(new { message = "Cấp tài khoản thành công!" });
        }
    }
}