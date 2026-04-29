namespace MasanCoffee.API.DTOs
{
    public class BangLuongDto
    {
        public int MaBangLuong { get; set; }
        public DateOnly ThangNam { get; set; }
        public int MaNhanVien { get; set; }
        public string HoTenNhanVien { get; set; } = string.Empty;
        public string ChucVu { get; set; } = string.Empty;
        public decimal TongGioLam { get; set; }
        public decimal HeSoLuong { get; set; }
        public decimal TongLuong { get; set; }
        public bool DaThanhToan { get; set; }
    }
}
