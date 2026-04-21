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

INSERT INTO NhanVien
(Ho, Ten, SoDienThoai, DiaChi, ChucVu, GioiTinh, TrangThai)
VALUES
(N'Nguyễn', N'An', '0901234567', N'TP.HCM', N'Quản lý', N'Nam', 1),
(N'Trần', N'Nhi', '0902345678', N'Bình Dương', N'Nhân viên kho', N'Nữ', 1),
(N'Lê', N'Minh', '0903456789', N'Đồng Nai', N'Thu ngân', N'Nam', 1),
(N'Phạm', N'Hà', '0904567890', N'TP.HCM', N'Pha chế', N'Nữ', 1),
(N'Hoàng', N'Long', '0905678901', N'Bình Phước', N'Nhân viên kho', N'Nam', 1),
(N'Đặng', N'Thảo', '0906789012', N'Tây Ninh', N'Pha chế', N'Nữ', 1),
(N'Võ', N'Khang', '0907890123', N'TP.HCM', N'Pha chế', N'Nam', 1),
(N'Bùi', N'Lan', '0908901234', N'Bình Dương', N'Kế toán', N'Nữ', 1);

INSERT INTO PhieuNhap (NgayNhap, MaNhanVien)
VALUES
('2025-10-10', 2),
('2025-12-01', 2 ),
('2026-01-14', 5),
('2026-02-16', 5),
('2026-03-18', 2);

INSERT INTO ChiTietPhieuNhap (MaPhieuNhap, MaHang, SoLuong, DonGia)
VALUES
-- Phiếu nhập 1
(1, 1, 20, 110000),   -- Cà phê Robusta
(1, 3, 10, 25000),    -- Sữa đặc
(1, 5, 15, 18000),    -- Đường trắng

-- Phiếu nhập 2
(2, 2, 12, 145000),   -- Cà phê Arabica
(2, 6, 5, 320000),    -- Matcha
(2, 8, 8, 95000),     -- Syrup Vanila

-- Phiếu nhập 3
(3, 4, 10, 32000),    -- Sữa tươi
(3, 7, 6, 45000),     -- Trà túi lọc
(3, 10, 200, 1500),   -- Ly giấy

-- Phiếu nhập 4
(4, 9, 30, 12000),    -- Đá viên
(4, 5, 10, 18000),    -- Đường trắng
(4, 3, 12, 25000),    -- Sữa đặc

-- Phiếu nhập 5
(5, 1, 15, 112000),   -- Robusta
(5, 2, 10, 148000),   -- Arabica
(5, 8, 5, 95000);     -- Syrup

UPDATE pn
SET TongTien = x.Tong
FROM PhieuNhap pn
JOIN (
    SELECT MaPhieuNhap, SUM(SoLuong * DonGia) AS Tong
    FROM ChiTietPhieuNhap
    GROUP BY MaPhieuNhap
) x ON pn.MaPhieuNhap = x.MaPhieuNhap;


