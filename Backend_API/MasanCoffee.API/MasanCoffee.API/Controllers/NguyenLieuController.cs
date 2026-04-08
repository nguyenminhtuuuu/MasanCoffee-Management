using MasanCoffee.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasanCoffee.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguyenLieuController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NguyenLieuController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetDanhSach()
        {
            var data = _context.NguyenLieu.ToList();
            return Ok(data);

        }
    }
}
