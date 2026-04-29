using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class VaiTro_ChucNang
    {
        public int MaVaiTro { get; set; }
        public int MaChucNang { get; set; }

        [ForeignKey("MaVaiTro")]
        public VaiTro VaiTro { get; set; }

        [ForeignKey("MaChucNang")]
        public ChucNang ChucNang { get; set; }

    }
}
