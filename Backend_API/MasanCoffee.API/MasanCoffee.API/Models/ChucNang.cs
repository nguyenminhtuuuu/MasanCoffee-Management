using System.ComponentModel.DataAnnotations;

namespace MasanCoffee.API.Models
{
    public class ChucNang
    {
        [Key]
        public int MaChucNang { get; set; }
        public string TenChucNang { get; set; } = string.Empty;
    }
}
