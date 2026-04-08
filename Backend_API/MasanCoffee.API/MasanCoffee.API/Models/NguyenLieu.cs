using System.ComponentModel.DataAnnotations;
namespace MasanCoffee.API.Models
{
    public class NguyenLieu
    {
        [Key]
        public int MaHang { get; set; }
        public string TenHang { get; set; }
        public int SoLuongTon { get; set; }
        public int MucToiThieu { get; set; }
        public string DonViTinh { get; set; } 

    }
}
