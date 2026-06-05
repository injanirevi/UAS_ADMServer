"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("hero--visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="floating-accent" style={{ top: "20%", left: "10%" }} />
      <div className="floating-accent floating-accent--alt" style={{ bottom: "10%", right: "15%" }} />

      <span className="hero-tagline">Architecting the Fashion Realm</span>
      <h1 className="hero-title">
        EKSPLORASI GAYA TANPA BATAS
        <br />
        <span className="hero-title--gradient">DI SETIAP MUSIM</span>
      </h1>
      <p className="hero-description">
        Injani's Fashion menghadirkan koleksi visioner untuk mengekspresikan jati diri Anda. Temukan inspirasi gaya dan tren mode terkini bersama kami.
      </p>
      <a href="#services" className="cta-button">
        JELAJAHI KOLEKSI
      </a>
    </section>
  );
}
