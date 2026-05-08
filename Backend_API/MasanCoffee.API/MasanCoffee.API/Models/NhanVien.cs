using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.Security;

namespace MasanCoffee.API.Models
{
    public class NhanVien
    {
        [Key]
        public int MaNhanVien { get; set; }
        public required string Ho { get; set; }
        public required string Ten { get; set; }
        public string DiaChi { get; set; } = string.Empty;
        public string ChucVu { get; set; } = string.Empty;
        public required string SoDienThoai { get; set; }
        public string GioiTinh {  get; set; } = string.Empty;
        public bool TrangThai { get; set; }

        public virtual ICollection<PhanCongCa>? PhanCongCas { get; set; }
        public virtual ICollection<PhieuNhap> PhieuNhaps { get; set; } = new List<PhieuNhap>();
        public virtual ICollection<PhieuXuat> PhieuXuats { get; set; } = new List<PhieuXuat>();

    }
}
