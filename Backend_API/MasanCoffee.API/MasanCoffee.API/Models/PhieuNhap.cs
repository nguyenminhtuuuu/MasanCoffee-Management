using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class PhieuNhap
    {
        [Key]
        public int MaPhieuNhap { get; set; }
        public DateOnly NgayNhap { get; set; }
        public Decimal TongTien { get; set; }
        public int MaNhanVien { get; set; } //Foreign key
        [ForeignKey("MaNhanVien")]
        public virtual NhanVien NhanVien { get; set; } = null!;
        public virtual ICollection<ChiTietPhieuNhap> ChiTietPhieuNhaps { get; set; } = new List<ChiTietPhieuNhap>();
    }
}
