using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class BangLuong
    {
        [Key]
        public int MaBangLuong { get; set; }

        public DateOnly ThangNam { get; set; }

        public decimal TongLuong { get; set; }

        public decimal TongGioLam { get; set; }

        public decimal HeSoLuong { get; set; }

        public decimal LuongCoBan { get; set; }

        public bool DaThanhToan { get; set; }

        public DateTime? NgayThanhToan { get; set; }

        public int MaNhanVien { get; set; }

        [ForeignKey("MaNhanVien")]
        public virtual NhanVien NhanVien { get; set; } = null!;
    }
}
