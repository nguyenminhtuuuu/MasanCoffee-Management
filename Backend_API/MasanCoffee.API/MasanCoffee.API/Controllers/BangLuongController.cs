using MasanCoffee.API.DTOs;
using MasanCoffee.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace MasanCoffee.API.Controllers
{
    [Route("api/bang-luong")]
    [ApiController]
    public class BangLuongController : ControllerBase
    {
        private readonly KeToanService _keToanService;

        public BangLuongController(KeToanService keToanService)
        {
            _keToanService = keToanService;
        }

        [HttpGet]
        public async Task<IActionResult> LayBangLuong([FromQuery] int thang, [FromQuery] int nam)
        {
            if (thang < 1 || thang > 12 || nam < 2000)
            {
                return BadRequest(new
                {
                    thanhCong = false,
                    thongBao = "Tham số tháng hoặc năm không hợp lệ"
                });
            }

            var result = await _keToanService.LayBangLuongAsync(thang, nam);
            return Ok(result);
        }

        [HttpPost("thanh-toan")]
        public async Task<IActionResult> ThanhToanLuong([FromBody] ThanhToanLuongDto model)
        {
            if (model.MaBangLuong <= 0)
            {
                return BadRequest(new
                {
                    thanhCong = false,
                    thongBao = "Mã bảng lương không hợp lệ"
                });
            }

            if (string.IsNullOrWhiteSpace(model.NguoiDuyet))
            {
                return BadRequest(new
                {
                    thanhCong = false,
                    thongBao = "Người duyệt không được để trống"
                });
            }

            var result = await _keToanService.ThanhToanLuongAsync(model);
            if (!result.ThanhCong)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

    }
}
