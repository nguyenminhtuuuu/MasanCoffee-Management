using System.ComponentModel.DataAnnotations;

namespace MasanCoffee.API.Models
{
	public class CauHinhLuong
	{
		[Key]
		public int MaCauHinhLuong { get; set; }

		public string ChucVu { get; set; } = string.Empty;

		public decimal LuongCoBan { get; set; }

		public decimal HeSoLuong { get; set; }
	}
}
