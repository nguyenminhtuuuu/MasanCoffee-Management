using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class ChiPhi
    {
        [Key]
        public int MaChiPhi { get; set; }

        public DateOnly NgayChiPhi { get; set; }

        public string LoaiChiPhi { get; set; } = string.Empty;

        public string NoiDung { get; set; } = string.Empty;

        public decimal SoTien { get; set; }

        public int? MaBangLuong { get; set; }

        [ForeignKey("MaBangLuong")]
        public virtual BangLuong? BangLuong { get; set; }
    }
}
