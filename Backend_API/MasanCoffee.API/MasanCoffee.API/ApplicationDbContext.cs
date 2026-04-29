using MasanCoffee.API.Models;   
using Microsoft.EntityFrameworkCore;


namespace MasanCoffee.API
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<BangLuong> BangLuong { get; set; }
        public DbSet<ChiPhi> ChiPhi { get; set; }
        public DbSet<CauHinhLuong> CauHinhLuong { get; set; }

        public DbSet<NguyenLieu> NguyenLieu { get; set; }
        public DbSet<NhanVien> NhanVien { get; set; }
        public DbSet<PhieuNhap> PhieuNhap { get; set; }
        public DbSet<ChiTietPhieuNhap> ChiTietPhieuNhap { get; set; }
        public DbSet<PhieuXuat> PhieuXuat { get; set; }
        public DbSet<ChiTietPhieuXuat> ChiTietPhieuXuat { get; set; }

        public DbSet<LichSuGiaoDichLuong> LichSuGiaoDichLuong { get; set; }
        public DbSet<BaoCaoDoanhThuThang> BaoCaoDoanhThuThang { get; set; }
        public DbSet<BaoCaoChiPhiThang> BaoCaoChiPhiThang { get; set; }


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

            modelBuilder.Entity<ChiPhi>()
                .HasOne(c => c.BangLuong)
                .WithMany()
                .HasForeignKey(c => c.MaBangLuong)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<BaoCaoDoanhThuThang>()
                .HasNoKey()
                .ToView("vw_BaoCaoDoanhThuThang");

            modelBuilder.Entity<BaoCaoChiPhiThang>()
                .HasNoKey()
                .ToView("vw_BaoCaoChiPhiThang");

            base.OnModelCreating(modelBuilder);
        }
        
    }
}
