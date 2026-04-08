using MasanCoffee.API.Models;   
using Microsoft.EntityFrameworkCore;


namespace MasanCoffee.API
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<NguyenLieu> NguyenLieu { get; set; }
    }
}
