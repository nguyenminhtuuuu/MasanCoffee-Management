using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasanCoffee.API.Models
{
    public class PhanCongCa
    {
        [Key]
        public int MaPhanCong { get; set; } 

        [Required]
        public DateTime NgayLam { get; set; }

        [Required]
        public int MaNhanVien { get; set; }

        [Required]
        public int MaCa { get; set; }

        public decimal SoGioLam { get; set; }

        
        [ForeignKey("MaNhanVien")]
        public virtual NhanVien? NhanVien { get; set; }
    }
}