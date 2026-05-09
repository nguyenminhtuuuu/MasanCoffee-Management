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
                   
                    gioBatDau = p.MaCa == 1 ? "08:00:00" : (p.MaCa == 2 ? "12:00:00" : "17:00:00"),
                    gioKetThuc = p.MaCa == 1 ? "12:00:00" : (p.MaCa == 2 ? "17:00:00" : "22:00:00"),
                    p.SoGioLam
                })
                .OrderByDescending(p => p.NgayLam)
                .ToListAsync();

            return Ok(lich);
        }

        [HttpPost]
        public async Task<IActionResult> PostPhanCong(PhanCongCa pc)
        {
            try
            {
                
                bool biTrungLich = await _context.PhanCongCa.AnyAsync(x =>
                    x.NgayLam.Date == pc.NgayLam.Date &&
                    x.MaNhanVien == pc.MaNhanVien &&
                    x.MaCa == pc.MaCa);

                if (biTrungLich)
                {
                    return Conflict(new { thongBao = "Nhân viên này đã được phân vào ca này trong ngày hôm nay rồi!" });
                }

                var phanCongMoi = new PhanCongCa
                {
                    NgayLam = pc.NgayLam.Date, 
                    MaNhanVien = pc.MaNhanVien,
                    MaCa = pc.MaCa,
                    SoGioLam = pc.SoGioLam
                };

                _context.PhanCongCa.Add(phanCongMoi);
                await _context.SaveChangesAsync(); 

                return Ok(new { thongBao = "Lưu lịch làm việc thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { thongBao = "Lỗi hệ thống: " + (ex.InnerException?.Message ?? ex.Message) });
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