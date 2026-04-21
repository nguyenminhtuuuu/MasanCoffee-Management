using MasanCoffee.API.Models;

namespace MasanCoffee.API.DTOs
{
    public class NhapKhoDto
    {
        public int MaNhanVien { get; set; }
        public List<ChiTietNhapKhoDto> ChiTiet { get; set; } = new();
    }

    public class ChiTietNhapKhoDto
    {
        public int MaHang {  get; set; }
        public int SoLuong { get; set; }
        public Decimal DonGia { get; set; }
    }
}
