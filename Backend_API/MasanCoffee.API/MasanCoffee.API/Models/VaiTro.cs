using System.ComponentModel.DataAnnotations;

namespace MasanCoffee.API.Models
{
    public class VaiTro
    {
        [Key]
        public int MaVaiTro { get; set; }
        public string TenVaiTro { get; set; } = string.Empty;
    }
}
