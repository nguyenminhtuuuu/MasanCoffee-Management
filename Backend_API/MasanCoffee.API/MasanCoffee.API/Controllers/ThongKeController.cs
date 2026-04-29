using MasanCoffee.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace MasanCoffee.API.Controllers
{
    [Route("api/thong-ke")]
    [ApiController]
    public class ThongKeController : ControllerBase
    {
        private readonly KeToanService _keToanService;

        public ThongKeController(KeToanService keToanService)
        {
            _keToanService = keToanService;
        }

        [HttpGet]
        public async Task<IActionResult> LayThongKe([FromQuery] int nam)
        {
            if (nam < 2000)
            {
                return BadRequest(new
                {
                    thanhCong = false,
                    thongBao = "Năm không hợp lệ"
                });
            }

            var result = await _keToanService.LayThongKeAsync(nam);
            return Ok(result);
        }
    }
}
