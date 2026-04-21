using MasanCoffee.API.DTOs;
using MasanCoffee.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace MasanCoffee.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoController : Controller
    {
        private readonly KhoService _khoService;

        public KhoController(KhoService khoService)
        {
            _khoService = khoService;
        }
        [HttpGet("layDSTonKho")]
        public async Task<IActionResult> GetTonKho()
        {
            var result = await _khoService.LayTonKho();

            return Ok(result);
        }
        [HttpPost("nhap")]
        public async Task<IActionResult> NhapKho(
            [FromBody] NhapKhoDto model)
        {
            var result = await _khoService.NhapKho(model);

            return Ok(result);
        }
        [HttpPost("xuat")]
        public async Task<IActionResult> XuatKho([FromBody] XuatKhoDto model)
        {
            var result = await _khoService.XuatKho(model);

            return Ok(result);
        }

    }
}
