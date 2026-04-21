using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class ChiTietPhieuNhap
    {
        [Key]
        public int MaPhieuNhap { get; set; }
        [Key]
        public int MaHang {  get; set; }
        public int SoLuong { get; set; }
        public Decimal DonGia { get; set; }

        [ForeignKey("MaPhieuNhap")]
        public virtual PhieuNhap PhieuNhap { get; set; } = null!;
        [ForeignKey("MaHang")]
        public virtual NguyenLieu NguyenLieu { get; set; } = null!;
      
    }
}
