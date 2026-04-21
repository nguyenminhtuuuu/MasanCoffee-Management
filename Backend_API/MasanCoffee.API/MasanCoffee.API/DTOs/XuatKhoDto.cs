using MasanCoffee.API.Models;

namespace MasanCoffee.API.DTOs
{
    public class XuatKhoDto
    {
        public int MaNhanVien { get; set; }
        public List<ChiTietXuatKhoDto> ChiTietXuat { get; set; } = new();
    }

    public class ChiTietXuatKhoDto
    {
        public int MaHang { get; set; }
        public int SoLuong { get; set; }
    }
}
