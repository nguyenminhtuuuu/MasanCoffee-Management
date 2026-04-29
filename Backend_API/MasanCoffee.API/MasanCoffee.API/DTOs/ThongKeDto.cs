namespace MasanCoffee.API.DTOs
{
    public class ThongKeDto
    {
        public List<string> NhanBieuDo { get; set; } = new();
        public List<decimal> DuLieuDoanhThu { get; set; } = new();
        public List<decimal> DuLieuChiPhi { get; set; } = new();
    }
}
