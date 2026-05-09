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
            return await _context.NhanVien
              .Where(x => x.TrangThai == true) 
              .OrderByDescending(x => x.MaNhanVien)
              .ToListAsync();
        }

        // API 2: Thêm một nhân viên mới
        [HttpPost]
        public async Task<ActionResult<NhanVien>> PostNhanVien(NhanVien nhanVien)
        {
            try
            {
                nhanVien.TrangThai = true; 
                _context.NhanVien.Add(nhanVien);
                await _context.SaveChangesAsync();

              
                return Ok(nhanVien);
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
                nv.TrangThai = false;
                _context.Entry(nv).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { thongBao = "Nhân viên đã nghỉ việc (Xóa mềm thành công)!" });
            }
            catch (Exception)
            {
                return BadRequest(new { thongBao = "Không thể xử lý yêu cầu!" });
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

            var existingNv = await _context.NhanVien.FindAsync(id);
            if (existingNv == null)
            {
                return NotFound(new { thongBao = "Không tìm thấy nhân viên!" });
            }

            existingNv.Ho = nhanVien.Ho;
            existingNv.Ten = nhanVien.Ten;
            existingNv.SoDienThoai = nhanVien.SoDienThoai;
            existingNv.DiaChi = nhanVien.DiaChi;
            existingNv.ChucVu = nhanVien.ChucVu;
            existingNv.GioiTinh = nhanVien.GioiTinh;
            existingNv.TrangThai = nhanVien.TrangThai;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { thongBao = "Cập nhật thông tin nhân viên thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { thongBao = "Lỗi khi lưu dữ liệu: " + (ex.InnerException?.Message ?? ex.Message) });
            }
        }
    }
}