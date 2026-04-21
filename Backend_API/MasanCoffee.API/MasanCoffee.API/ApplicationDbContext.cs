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
        public DbSet<NhanVien> NhanVien { get; set; }
        public DbSet<PhieuNhap> PhieuNhap { get; set; }
        public DbSet<ChiTietPhieuNhap> ChiTietPhieuNhap { get; set; }
        public DbSet<PhieuXuat> PhieuXuat { get; set; }
        public DbSet<ChiTietPhieuXuat> ChiTietPhieuXuat { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChiTietPhieuNhap>()
                .HasKey(x => new { x.MaPhieuNhap, x.MaHang }); // xu ly Composite Key

            modelBuilder.Entity<ChiTietPhieuXuat>()
                .HasKey(x => new { x.MaPhieuXuat, x.MaHang }); // xu ly Composite Key

            modelBuilder.Entity<PhieuNhap>()
                .HasOne(p => p.NhanVien)
                .WithMany(n => n.PhieuNhaps)
                .HasForeignKey(p => p.MaNhanVien);

            modelBuilder.Entity<PhieuXuat>()
                .HasOne(p => p.NhanVien)
                .WithMany(n => n.PhieuXuats)
                .HasForeignKey(p => p.MaNhanVien);

            base.OnModelCreating(modelBuilder);
        }
        
    }
}
