using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class LichSuGiaoDichLuong
    {
        [Key]
        public int MaGiaoDich { get; set; }

        public int MaBangLuong { get; set; }

        public int MaNhanVien { get; set; }

        public string NguoiDuyet { get; set; } = string.Empty;

        public decimal TongTien { get; set; }

        public DateTime ThoiGianGiaoDich { get; set; }

        public string? GhiChu { get; set; }

        [ForeignKey("MaBangLuong")]
        public virtual BangLuong BangLuong { get; set; } = null!;
    }
}
