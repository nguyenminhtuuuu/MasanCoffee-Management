create database MasanCoffeeDB
go

use MasanCoffeeDB
go


-- bang NhanVien
create table NhanVien(
	MaNhanVien int identity(1,1) primary key 
	, Ho nvarchar(50) not null
	, Ten nvarchar(50) not null
	, SoDienThoai varchar(15) not null 
	, DiaChi nvarchar(255)
	, ChucVu nvarchar(50)
	, GioiTinh nvarchar(5)
	, TrangThai bit default 1
	
)

-- bang VaiTro
create table VaiTro(
	MaVaiTro int identity(1,1) primary key
	, TenVaiTro nvarchar(50) unique not null
)

-- bang TaiKhoan
create table TaiKhoan(
	TenDangNhap varchar(50) primary key
	, MatKhau varchar(255) not null
	, TrangThai bit default 1
	, MaNhanVien int unique foreign key references NhanVien(MaNhanVien)
	, MaVaiTro int not null foreign key references VaiTro(MaVaiTro)
	
)

-- bang ChucNang
create table ChucNang(
	MaChucNang int identity(1,1) primary key
	, TenChucNang nvarchar(255) unique not null
)

--bang NguyenLieu
create table NguyenLieu(
	MaHang int identity(1,1) primary key
	, TenHang nvarchar(255) not null 
	, SoLuongTon int default 0 check (SoLuongTon >= 0)
	, MucToiThieu int default 10 check (MucToiThieu >= 0)
	, DonViTinh nvarchar(20) not null
)

-- bang CaLam
create table CaLam(
	MaCa int identity(1,1) primary key
	, GioBatDau time not null 
	, GioKetThuc time not null
	, constraint check_GioCaLam check (GioBatDau < GioKetThuc)
)

-- bang PhanCongCa
create table PhanCongCa(
	MaPhanCong int identity(1,1) primary key
	, NgayLam date
	, SoGioLam decimal(5,2)
	, MaNhanVien int foreign key references NhanVien(MaNhanVien)
	, MaCa int foreign key references CaLam(MaCa)
	constraint UQ_NhanVien_Ca_Ngay unique (MaNhanVien, MaCa, NgayLam) 
)

-- bang BangLuong
create table BangLuong(
	MaBangLuong int identity(1,1) primary key
	, ThangNam date not null
	, TongLuong decimal(18,2) default 0 check (TongLuong >= 0 )
	, TongGioLam decimal(10,2) default 0 check (TongGioLam >= 0)
	, MaNhanVien int foreign key references NhanVien(MaNhanVien)
)

-- bang PhieuXuat
create table PhieuXuat(
	MaPhieuXuat int identity(1,1) primary key
	, NgayXuat date default getdate()
	, MaNhanVien int foreign key references NhanVien(MaNhanVien)
)

-- bang PhieuNhap
create table PhieuNhap(
	MaPhieuNhap int identity(1,1) primary key
	, NgayNhap date default getdate()
	, TongTien decimal(18,2) default 0 check (TongTien >= 0)
	, MaNhanVien int foreign key references NhanVien(MaNhanVien)
)

-- bang ChiTietPhieuXuat
create table ChiTietPhieuXuat(
	MaPhieuXuat int foreign key references PhieuXuat(MaPhieuXuat)
	, MaHang int foreign key references NguyenLieu(MaHang)
	, SoLuong int not null check (SoLuong > 0)
	, primary key (MaPhieuXuat, MaHang)

)

-- bang ChiTietPhieuNhap
create table ChiTietPhieuNhap(
	MaPhieuNhap int foreign key references PhieuNhap(MaPhieuNhap)
	, MaHang int foreign key references NguyenLieu(MaHang)
	, SoLuong int not null check (SoLuong > 0)
	, DonGia decimal(18,2) not null check (DonGia >= 0)
	, primary key (MaPhieuNhap, MaHang)

)

-- bang VaiTro_ChucNang
create table VaiTro_ChucNang(
	MaVaiTro int foreign key references VaiTro(MaVaiTro)
	, MaChucNang int foreign key references ChucNang(MaChucNang)
	primary key (MaVaiTro, MaChucNang)
)

go

-- trigger khi xuat nguyen lieu
create trigger trg_ChiTietPhieuXuat_Insert
on ChiTietPhieuXuat
after insert
as
begin
	if exists(
		select 1
		from inserted i
		join NguyenLieu nl on i.MaHang = nl.MaHang
		where i.SoLuong > nl.SoLuongTon
	)

	begin
		raiserror (N'Số lượng xuất vượt quá số lượng tồn kho hiện tại!', 16,1)
		rollback transaction
		return
	end

	update nl
	set nl.SoLuongTon = nl.SoLuongTon - i.SoLuong
	from NguyenLieu nl
	join inserted i on nl.MaHang = i.MaHang
end
go


-- trigger tu dong hoa nhap kho va tinh tien
create trigger trg_ChiTietPhieuNhap_Insert
on ChiTietPhieuNhap
after insert
as
begin
	update nl
	set nl.SoLuongTon = nl.SoLuongTon + i.SoLuong
	from NguyenLieu nl
	join inserted i on nl.MaHang = i.MaHang

	update pn
	set pn.TongTien = pn.TongTien + (i.SoLuong * i.DonGia)
	from PhieuNhap pn
	join inserted i on pn.MaPhieuNhap = i.MaPhieuNhap
end
go

-- trigger tinh so gio lam viec
create trigger trg_PhanCongCa_TinhGioLam
on PhanCongCa
after insert, update
as
begin
	update pcc
	set pcc.SoGioLam = datediff(minute, cl.GioBatDau, cl.GioKetThuc) * 1.0/60
	from PhanCongCa pcc
	join inserted i on pcc.MaPhanCong = i.MaPhanCong
	join CaLam cl on i.MaCa = cl.MaCa
end
go


-- chen du lieu
INSERT INTO NguyenLieu (TenHang, SoLuongTon, MucToiThieu, DonViTinh)
VALUES 
(N'Cà phê Robusta hạt', 50, 10, N'Kg'),
(N'Cà phê Arabica hạt', 30, 5, N'Kg'),
(N'Sữa đặc Ngôi sao phương Nam', 24, 6, N'Hộp'),
(N'Sữa tươi tiệt trùng 1L', 12, 4, N'Hộp'),
(N'Đường trắng', 20, 5, N'Kg'),
(N'Bột Matcha nguyên chất', 2, 1, N'Kg'), -- Sắp hết hàng để test báo động
(N'Trà túi lọc Phúc Long', 10, 2, N'Hộp'),
(N'Syrup Vanila', 5, 2, N'Chai'),
(N'Đá viên tinh khiết', 100, 20, N'Bao'),
(N'Ly giấy Masan Coffee 12oz', 500, 100, N'Cái');