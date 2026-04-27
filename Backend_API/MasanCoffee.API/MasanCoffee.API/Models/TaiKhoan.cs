using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class TaiKhoan
    {
        [Key]
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
        public bool TrangThai { get; set; }
        public int MaNhanVien { get; set; }
        public int MaVaiTro { get; set; }

        [ForeignKey("MaNhanVien")]
        public NhanVien NhanVien { get; set; }

        [ForeignKey("MaVaiTro")]
        public VaiTro VaiTro { get; set; }
    }
}
