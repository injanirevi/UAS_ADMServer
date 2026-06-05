const SERVICES = [
  {
    icon: "👗",
    title: "Gaun Eksklusif",
    desc: "Koleksi gaun premium yang dirancang khusus untuk momen-momen istimewa dan elegan Anda.",
  },
  {
    icon: "👕",
    title: "Pakaian Kasual",
    desc: "Gaya kasual yang nyaman namun tetap modis untuk aktivitas sehari-hari yang dinamis.",
  },
  {
    icon: "💍",
    title: "Aksesoris Mewah",
    desc: "Perhiasan dan aksesoris pilihan yang menyempurnakan setiap detail penampilan Anda.",
  },
  {
    icon: "🧥",
    title: "Koleksi Musim Dingin",
    desc: "Tampil hangat dan menawan dengan jaket, mantel, dan syal rancangan desainer ternama.",
  },
  {
    icon: "👜",
    title: "Tas & Sepatu",
    desc: "Padu padan tas kulit dan sepatu trendi untuk melengkapi outfit fashion Anda.",
  },
  {
    icon: "✨",
    title: "Konsultasi Gaya",
    desc: "Dapatkan saran personal dari stylist profesional kami untuk menemukan jati diri fashion Anda.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="services">
      <h2 className="section-title">
        Koleksi <span className="text-gradient">Terbaru</span>
      </h2>
      <p className="section-subtitle">
        Kami menyediakan pilihan busana eksklusif untuk menyempurnakan gaya hidup Anda
      </p>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div className="card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="card-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="card-shine" />
          </div>
        ))}
      </div>
    </section>
  );
}
