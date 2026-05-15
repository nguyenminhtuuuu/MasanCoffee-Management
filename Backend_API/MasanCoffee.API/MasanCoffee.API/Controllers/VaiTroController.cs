using MasanCoffee.API.DTOs;
using MasanCoffee.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasanCoffee.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VaiTroController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VaiTroController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VaiTro>>> GetVaiTros()
        {
            // Trả về danh sách Vai Trò từ SQL
            return await _context.VaiTro.ToListAsync();
        }
    }
}