using MasanCoffee.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasanCoffee.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NhanVienController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhanVien>>> GetNhanViens()
        {
            return await _context.NhanVien.OrderByDescending(x => x.MaNhanVien).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<NhanVien>> PostNhanVien(NhanVien nhanVien)
        {
            try
            {

                nhanVien.TrangThai = true;

                _context.NhanVien.Add(nhanVien);
                await _context.SaveChangesAsync();
                return Ok(new { thongBao = "Thêm nhân viên thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { thongBao = "Lỗi: " + (ex.InnerException?.Message ?? ex.Message) });
            }
        }

        [HttpPut("{id}/nghi-viec")]
        public async Task<IActionResult> ChoNghiViec(int id)
        {
            var nv = await _context.NhanVien.FindAsync(id);
            if (nv == null) return NotFound(new { thongBao = "Không tìm thấy nhân viên!" });

            nv.TrangThai = false;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { thongBao = "Đã cập nhật trạng thái nhân viên thành Nghỉ việc!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { thongBao = "Lỗi khi cập nhật trạng thái: " + (ex.InnerException?.Message ?? ex.Message) });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNhanVien(int id, NhanVien nhanVien)
        {
            if (id != nhanVien.MaNhanVien)
            {
                return BadRequest(new { thongBao = "ID nhân viên không khớp!" });
            }

            _context.Entry(nhanVien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.NhanVien.Any(e => e.MaNhanVien == id))
                {
                    return NotFound(new { thongBao = "Không tìm thấy nhân viên để cập nhật!" });
                }
                else { throw; }
            }
            catch (Exception ex)
            {
                return BadRequest(new { thongBao = "Lỗi cập nhật: " + (ex.InnerException?.Message ?? ex.Message) });
            }

            return Ok(new { thongBao = "Cập nhật nhân viên thành công!" });
        }
    }
}