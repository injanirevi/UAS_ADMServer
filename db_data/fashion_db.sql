-- Database: dbcompro_2388010009

CREATE DATABASE IF NOT EXISTS dbcompro_2388010009;
USE dbcompro_2388010009;

-- Table structure for table `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin (password: admin123)
-- bcrypt hash of 'admin123' is usually something like '$2y$10$...'
-- Note: Replace with actual bcrypt hash used in your app if different,
-- For NextAuth with bcrypt, '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa' is 'admin123'
INSERT INTO `users` (`username`, `password`, `role`) VALUES
('admin', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'admin');


-- Table structure for table `berita` (used for Tren Fashion)
CREATE TABLE IF NOT EXISTS `berita` (
  `id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text,
  `konten` longtext,
  `image` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `berita` (`judul`, `slug`, `excerpt`, `konten`, `is_published`) VALUES
('Tren Warna Musim Panas 2026', 'tren-warna-musim-panas-2026', 'Warna pastel dan krem kembali mendominasi fashion jalanan tahun ini.', 'Konten lengkap tentang warna pastel...', 1),
('Gaya Vintage Kembali Hits', 'gaya-vintage-kembali-hits', 'Pakaian era 80-an dengan sentuhan modern.', 'Konten lengkap tentang gaya vintage...', 1);


-- Table structure for table `layanan` (used for Koleksi / Layanan)
CREATE TABLE IF NOT EXISTS `layanan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `deskripsi` text,
  `urutan` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `layanan` (`nama`, `icon`, `deskripsi`, `urutan`) VALUES
('Koleksi Gaun', 'DressIcon', 'Eksplorasi koleksi gaun elegan kami.', 1),
('Aksesoris Eksklusif', 'WatchIcon', 'Lengkapi gaya Anda dengan aksesoris premium.', 2);


-- Table structure for table `kontak`
CREATE TABLE IF NOT EXISTS `kontak` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subjek` varchar(255) DEFAULT NULL,
  `pesan` text NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

