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

        // API 1: Lấy toàn bộ danh sách nhân viên
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhanVien>>> GetNhanViens()
        {
            return await _context.NhanVien.OrderByDescending(x => x.MaNhanVien).ToListAsync();
        }

        // API 2: Thêm một nhân viên mới
        [HttpPost]
        public async Task<ActionResult<NhanVien>> PostNhanVien(NhanVien nhanVien)
        {
            try
            {
                _context.NhanVien.Add(nhanVien);
                await _context.SaveChangesAsync();
                return Ok(new { thongBao = "Thêm nhân viên thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { thongBao = "Lỗi: " + (ex.InnerException?.Message ?? ex.Message) });
            }
        }

        // API 3: Xóa nhân viên theo mã
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNhanVien(int id)
        {
            var nv = await _context.NhanVien.FindAsync(id);
            if (nv == null) return NotFound(new { thongBao = "Không tìm thấy nhân viên!" });

            try
            {
                _context.NhanVien.Remove(nv);
                await _context.SaveChangesAsync();
                return Ok(new { thongBao = "Đã xóa nhân viên thành công!" });
            }
            catch (Exception)
            {
               
                return BadRequest(new { thongBao = "Không thể xóa nhân viên này vì đã có lịch làm việc hoặc dữ liệu liên quan!" });
            }
        }

        // API 4: Cập nhật thông tin nhân viên
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