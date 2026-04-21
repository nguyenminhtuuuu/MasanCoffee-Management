using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class ChiTietPhieuXuat
    {
        public int MaPhieuXuat { get; set; }
        public int MaHang {  get; set; }
        public int SoLuong { get; set; }

        [ForeignKey("MaPhieuXuat")]
        public virtual PhieuXuat PhieuXuat { get; set; } = null!;
        [ForeignKey("MaHang")]
        public virtual NguyenLieu NguyenLieu { get; set; } = null!;
    }
}
