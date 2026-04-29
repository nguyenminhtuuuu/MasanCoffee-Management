namespace MasanCoffee.API.DTOs
{
    public class ThanhToanLuongDto
    {
        public int MaBangLuong { get; set; }
        public string NguoiDuyet { get; set; } = string.Empty;
    }

    public class ThanhToanLuongResultDto
    {
        public bool ThanhCong { get; set; }
        public string ThongBao { get; set; } = string.Empty;
    }
}
