import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="logo">Injani's Fashion</Link>
          <p className="footer-tagline">Architecting the Fashion Realm</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Menu</h4>
            <Link href="/#hero">Beranda</Link>
            <Link href="/#services">Koleksi Terbaru</Link>
            <Link href="/berita">Tren Fashion</Link>
            <Link href="/#vision">Fashion Jadul</Link>
          </div>
          <div className="footer-col">
            <h4>Koleksi</h4>
            <span>Gaun Eksklusif</span>
            <span>Pakaian Kasual</span>
            <span>Aksesoris Mewah</span>
            <span>Koleksi Musim Dingin</span>
          </div>
          <div className="footer-col">
            <h4>Kontak</h4>
            <span>info@injanisfashion.id</span>
            <span>+62 812 3456 7890</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Injani's Fashion</p>
        <p className="footer-credit">Project by Revi Injani</p>
      </div>
    </footer>
  );
}
