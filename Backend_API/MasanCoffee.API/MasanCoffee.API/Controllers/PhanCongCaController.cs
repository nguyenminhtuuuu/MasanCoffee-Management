using MasanCoffee.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasanCoffee.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhanCongCaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PhanCongCaController(ApplicationDbContext context)
        {
            _context = context;
        }

       
        [HttpGet]
        public async Task<IActionResult> GetLichPhanCong()
        {
            var lich = await _context.PhanCongCa
                .Include(p => p.NhanVien)
                .Select(p => new {
                    p.MaPhanCong,
                    p.NgayLam,
                    p.MaNhanVien,
                    
                    hoTenNhanVien = p.NhanVien.Ho + " " + p.NhanVien.Ten,
                    p.MaCa,
                    p.SoGioLam
                }).ToListAsync();

            return Ok(lich);
        }

        [HttpPost]
        public async Task<IActionResult> PostPhanCong(PhanCongCa pc)
        {
            try
            {
                _context.PhanCongCa.Add(pc);
                await _context.SaveChangesAsync();
                return Ok(new { thongBao = "Lưu lịch làm việc thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { thongBao = "Lỗi: " + (ex.InnerException?.Message ?? ex.Message) });
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhanCong(int id)
        {
            var pc = await _context.PhanCongCa.FindAsync(id);
            if (pc == null) return NotFound(new { thongBao = "Không tìm thấy lịch phân công này!" });

            _context.PhanCongCa.Remove(pc);
            await _context.SaveChangesAsync();
            return Ok(new { thongBao = "Đã xóa lịch phân công thành công!" });
        }
    }
}