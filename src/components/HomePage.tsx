"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SchemaJsonLd from "./SchemaJsonLd";

const BANNERS = [
  {
    href: "/#kategori",
    src: "/images/0359e223-1a2a-4d30-a972-74e18eac772e.jpg",
    alt: "Banner promo top up Free Fire diamond murah di ORVIXA GAMING",
    badge: "Cashback 10%",
    badgeStyle: { background: "var(--color-primary)", color: "var(--color-primary-ink)" },
    title: <>Top Up Free Fire<br className="hidden md:block" /> Diamond Masuk Instan</>,
    cta: "Top Up Sekarang",
  },
  {
    href: "/#kategori",
    src: "/images/9d156ca4-3382-4a7e-a550-235933435594.webp",
    alt: "Banner promo top up Call of Duty Mobile CP harga murah",
    badge: "Promo Mingguan",
    badgeStyle: { background: "rgba(43,196,160,.18)", color: "#5AE0BF", border: "1px solid rgba(43,196,160,.35)" },
    title: <>CP Call of Duty Mobile<br className="hidden md:block" /> Harga Terbaik</>,
    cta: "Beli Sekarang",
  },
  {
    href: "/#kategori",
    src: "/images/74278a92-7aac-4ca2-8993-d7d0cb14e6bf.jpg",
    alt: "Banner top up Honor of Kings token proses otomatis",
    badge: "Baru",
    badgeStyle: { background: "var(--color-primary)", color: "var(--color-primary-ink)" },
    title: <>Honor of Kings<br className="hidden md:block" /> Kini Tersedia</>,
    cta: "Lihat Nominal",
  },
  {
    href: "/#promo",
    src: "/images/6db90e0c-c014-4694-87f9-aa80ecb433a9.jpg",
    alt: "Banner promo top up Mobile Legends diamond terpercaya",
    badge: "Hemat",
    badgeStyle: { background: "var(--color-primary)", color: "var(--color-primary-ink)" },
    title: <>Diamond Mobile Legends<br className="hidden md:block" /> Mulai Rp3.000</>,
    cta: "Top Up Sekarang",
  },
];

const GAMES = [
  { href: "/mobile-legends", src: "/images/3f4dc619-cefc-4b2a-9dce-54e6ef9c20da.jpg", alt: "Top up Mobile Legends diamond murah di ORVIXA GAMING", badge: "Best Seller", badgeStyle: { background: "var(--color-primary)", color: "var(--color-primary-ink)" }, name: "Mobile Legends", publisher: "Moonton", item: "Diamond", price: "Rp3.000", cat: "topup" },
  { href: "/free-fire", src: "/images/991b8eb7-cf5a-491a-9947-1a2ba05b45d3.jpg", alt: "Top up Free Fire diamond proses instan", badge: "Hot", badgeStyle: { background: "var(--color-primary)", color: "var(--color-primary-ink)" }, name: "Free Fire", publisher: "Garena", item: "Diamond", price: "Rp2.500", cat: "topup" },
  { href: "/pubg-mobile", src: "/images/173d0489-e4bc-41a4-80b4-24c25887d559.png", alt: "Top up PUBG Mobile UC harga murah", name: "PUBG Mobile", publisher: "Level Infinite", item: "UC", price: "Rp15.000", cat: "topup" },
  { href: "/genshin-impact", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788150221/rdbgqzffn1yqinzinjcd.png", alt: "Top up Genshin Impact Genesis Crystal", badge: "Populer", badgeStyle: { background: "rgba(43,196,160,.16)", color: "#5AE0BF", border: "1px solid rgba(43,196,160,.35)" }, name: "Genshin Impact", publisher: "HoYoverse", item: "Crystal", price: "Rp16.000", cat: "topup" },
  { href: "/magic-chess-go-go", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788148894/aj4q0rohtu1mfvalbtob.webp", alt: "Top up Magic Chess Go Go token murah", badge: "Baru", badgeStyle: { background: "rgba(43,196,160,.16)", color: "#5AE0BF", border: "1px solid rgba(43,196,160,.35)" }, name: "Magic Chess: Go Go", price: "Rp3.500", cat: "topup", contain: true },
  { href: "/call-of-duty-mobile", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg", alt: "Top up Call of Duty Mobile CP harga murah", badge: "Hot", badgeStyle: { background: "var(--color-primary)", color: "var(--color-primary-ink)" }, name: "Call of Duty Mobile", price: "Rp15.000", cat: "topup", contain: true },
];

const POPULAR_GAMES = [
  { href: "/mobile-legends", src: "/images/3f4dc619-cefc-4b2a-9dce-54e6ef9c20da.jpg", alt: "Top up Mobile Legends diamond", name: "Mobile Legends", publisher: "Moonton", gradient: "linear-gradient(135deg, #3b2060 0%, #1e2d5a 100%)" },
  { href: "/magic-chess-go-go", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788148894/aj4q0rohtu1mfvalbtob.webp", alt: "Top up Magic Chess Go Go token", name: "Magic Chess Go Go", publisher: "Vizta Games", gradient: "linear-gradient(135deg, #a07050 0%, #c09070 100%)" },
  { href: "/pubg-mobile", src: "/images/173d0489-e4bc-41a4-80b4-24c25887d559.png", alt: "Top up PUBG Mobile UC", name: "PUBG Mobile", publisher: "Tencent Games", gradient: "linear-gradient(135deg, #2050a0 0%, #3060c0 100%)" },
  { href: "/free-fire", src: "/images/991b8eb7-cf5a-491a-9947-1a2ba05b45d3.jpg", alt: "Top up Free Fire diamond", name: "Free Fire", publisher: "Garena", gradient: "linear-gradient(135deg, #803050 0%, #a04060 100%)" },
  { href: "/call-of-duty-mobile", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg", alt: "Top up Call of Duty Mobile CP", name: "Call of Duty Mobile", publisher: "Activision", gradient: "linear-gradient(135deg, #404030 0%, #505040 100%)" },
  { href: "/genshin-impact", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788150221/rdbgqzffn1yqinzinjcd.png", alt: "Top up Genshin Impact Crystal", name: "Genshin Impact", publisher: "HoYoverse", gradient: "linear-gradient(135deg, #2a4060 0%, #3a5080 100%)" },
];

const PAYMENTS = ["QRIS", "GoPay", "DANA", "OVO", "ShopeePay", "LinkAja", "Virtual Account", "Transfer Bank"];

export default function HomePage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  // Banner carousel
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function go(n: number) {
      const t = trackRef.current;
      if (!t) return;
      const idx = ((n % BANNERS.length) + BANNERS.length) % BANNERS.length;
      setCurrentSlide(idx);
      const child = t.children[idx] as HTMLElement;
      t.scrollTo({ left: child.offsetLeft - t.offsetLeft, behavior: "smooth" });
    }

    function restart() {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => go(currentSlide + 1), 5000);
    }

    restart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentSlide]);

  return (
    <>
      <SchemaJsonLd />
      {/* HERO BANNER CAROUSEL */}
      <section className="relative" aria-label="Banner promo">
        <div className="wrap pt-5 md:pt-7">
          <div className="relative">
            <div ref={trackRef} className="banner-track">
              {BANNERS.map((b, i) => (
                <Link key={i} href={b.href} className="banner-slide">
                  <Image src={b.src} alt={b.alt} width={1200} height={514} priority={i === 0} />
                  <div className="banner-shade" />
                  <div className="banner-copy">
                    <span className="badge" style={b.badgeStyle}>{b.badge}</span>
                    <h2 className="font-display font-extrabold text-[20px] md:text-[34px] mt-3 leading-tight">{b.title}</h2>
                    <span className="btn btn-primary h-10 md:h-11 px-5 mt-4 text-[14px]">{b.cta}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-3.5">
              {BANNERS.map((_, i) => (
                <button key={i} className="banner-dot" aria-current={i === currentSlide ? "true" : "false"} onClick={() => setCurrentSlide(i)} />
              ))}
            </div>
          </div>

          <div className="mt-7 md:mt-9 grid lg:grid-cols-[1fr_auto] lg:gap-8 items-start">
            {/* Kiri: Heading + Deskripsi + CTA */}
            <div>
              <h1 className="font-display font-extrabold leading-[1.1] text-[26px] md:text-[36px] max-w-[620px]">
                Top up game murah dan terpercaya, masuk dalam hitungan detik.
              </h1>
              <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed max-w-[600px]" style={{ color: "#C2CBD5" }}>
                Top up diamond Mobile Legends, Free Fire, PUBG, Genshin, voucher game, dan produk digital lainnya — proses otomatis 24 jam dengan pembayaran QRIS, e-wallet, dan Virtual Account.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/#kategori" className="btn btn-primary h-12 px-6 text-[15px]">Top Up Sekarang</Link>
                <Link href="/#promo" className="btn btn-ghost h-12 px-6 text-[15px]">Lihat Promo</Link>
              </div>
            </div>

            {/* Kanan: Trust Stats */}
            <div className="mt-6 lg:mt-0 grid grid-cols-2 gap-x-6 gap-y-4 lg:gap-x-8 lg:gap-y-5 pt-2">
              {/* 1 */}
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <div>
                  <p className="font-display font-bold text-[20px] md:text-[22px] leading-none" style={{ color: "var(--color-primary)" }}>10.000+</p>
                  <p className="text-[13px] mt-1 leading-snug" style={{ color: "var(--color-muted)" }}>Transaksi Berhasil</p>
                </div>
              </div>
              {/* 2 */}
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <div>
                  <p className="font-display font-bold text-[20px] md:text-[22px] leading-none" style={{ color: "var(--color-primary)" }}>&lt; 1 Menit</p>
                  <p className="text-[13px] mt-1 leading-snug" style={{ color: "var(--color-muted)" }}>Proses Otomatis</p>
                </div>
              </div>
              {/* 3 */}
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                <div>
                  <p className="font-display font-bold text-[20px] md:text-[22px] leading-none" style={{ color: "var(--color-primary)" }}>4.9</p>
                  <p className="text-[13px] mt-1 leading-snug" style={{ color: "var(--color-muted)" }}>Rating Pengguna</p>
                </div>
              </div>
              {/* 4 */}
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                <div>
                  <p className="font-display font-bold text-[20px] md:text-[22px] leading-none" style={{ color: "var(--color-primary)" }}>24/7</p>
                  <p className="text-[13px] mt-1 leading-snug" style={{ color: "var(--color-muted)" }}>Support Siaga</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORI POPULER */}
      <section id="kategori" className="pt-14 md:pt-20">
        <div className="wrap">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="eyebrow">Pilih cepat</p>
              <h2 className="font-display font-bold text-[24px] md:text-[30px] mt-1.5">Kategori Populer</h2>
            </div>
            <Link href="#" className="btn btn-ghost h-10 px-4 text-sm">Lihat Semua</Link>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 md:gap-4">
            {GAMES.map((g, i) => (
              <Link key={i} href={g.href} className="game-card">
                <Image loading="lazy" className={`thumb ${g.contain ? "thumb-contain" : ""}`} src={g.src} alt={g.alt} width={400} height={250} />
                {g.badge && <span className="badge absolute top-2.5 left-2.5" style={g.badgeStyle}>{g.badge}</span>}
                <div className="p-3">
                  <h3 className="font-display font-semibold text-[14px] leading-tight">{g.name}</h3>
                  <p className="text-[12px] mt-1.5" style={{ color: "var(--color-muted)" }}>
                    Mulai <span style={{ color: "var(--color-primary)" }} className="font-semibold">{g.price}</span>
                  </p>
                </div>
                <div className="cta"><span className="btn btn-primary w-full h-9 text-[13px]">Top Up</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="pt-14 md:pt-20">
        <div className="wrap">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative overflow-hidden rounded-[16px] p-7 md:p-10" style={{ background: "linear-gradient(120deg,#1B140A 0%,#131A23 62%)", border: "1px solid rgba(239,163,38,.22)" }}>
              <p className="eyebrow" style={{ color: "var(--color-primary)" }}>Promo Spesial ORVIXA GAMING</p>
              <h2 className="font-display font-bold text-[24px] md:text-[32px] mt-2 leading-tight max-w-[520px]">Cashback 10% untuk transaksi pertama bulan ini</h2>
              <p className="mt-3 text-[15px] max-w-[520px]" style={{ color: "#C2CBD5" }}>Berlaku untuk semua produk top up game dan voucher, dengan pembayaran QRIS atau e-wallet. Kuota promo terbatas setiap harinya.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/#kategori" className="btn btn-primary h-11 px-5 text-[15px]">Top Up Sekarang</Link>
                <Link href="#" className="btn btn-ghost h-11 px-5 text-[15px]">Lihat Semua Promo</Link>
              </div>
            </div>
            <div className="card p-7 flex flex-col justify-center">
              <h3 className="font-display font-semibold text-[18px]">Kode promo mingguan</h3>
              <p className="mt-2 text-[14px]" style={{ color: "var(--color-muted)" }}>Masukkan kode saat checkout untuk potongan tambahan pada produk pilihan.</p>
              <div className="mt-5 flex items-center justify-between px-4 h-12 rounded-[10px]" style={{ background: "var(--color-surface-2)", border: "1px dashed rgba(239,163,38,.4)" }}>
                <span className="font-display font-bold tracking-wider" style={{ color: "var(--color-primary)" }}>ORVIXAHEMAT</span>
                <span className="text-[12px]" style={{ color: "var(--color-muted)" }}>Salin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="pt-14 md:pt-20">
        <div className="wrap">
          <p className="eyebrow">Keunggulan</p>
          <h2 className="font-display font-bold text-[24px] md:text-[30px] mt-1.5">Kenapa Pilih ORVIXA GAMING?</h2>
          <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card p-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EFA326" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" /></svg>
              <h3 className="font-display font-semibold text-[17px] mt-4">Proses Instan</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Pesanan diproses otomatis oleh sistem, jadi diamond atau voucher masuk tanpa perlu menunggu operator online.</p>
            </div>
            <div className="card p-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EFA326" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 20 6v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
              <h3 className="font-display font-semibold text-[17px] mt-4">Transaksi Aman</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Pembayaran diproses lewat payment gateway resmi dan setiap pesanan punya nomor invoice yang bisa kamu cek ulang.</p>
            </div>
            <div className="card p-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EFA326" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 1 18 0v5a3 3 0 0 1-3 3h-3" /><rect x="3" y="12" width="4" height="6" rx="1.5" /><rect x="17" y="12" width="4" height="6" rx="1.5" /></svg>
              <h3 className="font-display font-semibold text-[17px] mt-4">Layanan 24/7</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Ada kendala saat top up? Tim CS siap membantu lewat chat kapan pun, termasuk akhir pekan dan hari libur.</p>
            </div>
            <div className="card p-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EFA326" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 6.5c-1-1.2-2.8-2-5-2-2.8 0-4.5 1.2-4.5 3.2 0 4.6 10 2.6 10 7.4 0 2.1-2 3.4-5 3.4-2.4 0-4.3-.8-5.5-2.2" /></svg>
              <h3 className="font-display font-semibold text-[17px] mt-4">Harga Kompetitif</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Harga ditampilkan apa adanya sebelum checkout, tanpa biaya tersembunyi yang baru muncul di akhir transaksi.</p>
            </div>
            <div className="card p-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EFA326" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 10h19" /></svg>
              <h3 className="font-display font-semibold text-[17px] mt-4">Pembayaran Lengkap</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Bayar pakai QRIS, e-wallet, atau transfer bank lewat Virtual Account — pilih yang paling gampang buat kamu.</p>
            </div>
            <div className="card p-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EFA326" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="1.6" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" /></svg>
              <h3 className="font-display font-semibold text-[17px] mt-4">Produk Lengkap</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Dari top up game mobile, voucher digital, sampai produk entertainment — semuanya ada di satu tempat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="bantuan" className="pt-14 md:pt-20">
        <div className="wrap">
          <p className="eyebrow">Panduan singkat</p>
          <h2 className="font-display font-bold text-[24px] md:text-[30px] mt-1.5">Cara Top Up</h2>
          <p className="mt-2 text-[15px] max-w-[560px]" style={{ color: "var(--color-muted)" }}>Lima langkah, tanpa perlu registrasi. Rata-rata transaksi selesai kurang dari satu menit.</p>
          <ol className="mt-7 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <li className="card p-5"><span className="step-num">1</span><h3 className="font-display font-semibold text-[15px] mt-3.5">Pilih Game</h3><p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Cari lewat search atau kategori populer.</p></li>
            <li className="card p-5"><span className="step-num">2</span><h3 className="font-display font-semibold text-[15px] mt-3.5">Masukkan User ID</h3><p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Nickname otomatis tampil sebagai konfirmasi.</p></li>
            <li className="card p-5"><span className="step-num">3</span><h3 className="font-display font-semibold text-[15px] mt-3.5">Pilih Nominal</h3><p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Harga final terlihat sebelum bayar.</p></li>
            <li className="card p-5"><span className="step-num">4</span><h3 className="font-display font-semibold text-[15px] mt-3.5">Pilih Pembayaran</h3><p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>QRIS, e-wallet, atau Virtual Account.</p></li>
            <li className="card p-5"><span className="step-num">5</span><h3 className="font-display font-semibold text-[15px] mt-3.5">Selesai</h3><p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Item masuk otomatis ke akun gamemu.</p></li>
          </ol>
        </div>
      </section>

      {/* GAME POPULER / DISCOVERY */}
      <section id="voucher" className="pt-14 md:pt-20">
        <div className="wrap">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Discovery</p>
              <h2 className="font-display font-bold text-[24px] md:text-[30px] mt-1.5">Top Up Game Terlaris</h2>
              <p className="mt-2 text-[14px]" style={{ color: "var(--color-muted)" }}>Berikut adalah beberapa produk yang paling populer saat ini</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {POPULAR_GAMES.map((g, i) => (
              <Link
                key={i}
                href={g.href}
                className="flex items-center gap-4 p-3 pr-6 rounded-[16px] transition-all hover:brightness-110"
                style={{ background: g.gradient }}
              >
                <Image
                  loading="lazy"
                  className="w-[76px] h-[76px] rounded-[12px] object-cover shrink-0"
                  src={g.src}
                  alt={g.alt}
                  width={76}
                  height={76}
                />
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-[15px] text-white leading-tight">{g.name}</h3>
                  <p className="text-[13px] mt-1 text-white/60">{g.publisher}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-10">
            <Link href="#" className="card p-6 flex items-center gap-5 hover:border-white/20 transition" style={{ textDecoration: "none" }}>
              <Image src="/images/57c2ec4b-c6a1-4aba-a8c2-c0687a0b7555.jpg" alt="Voucher digital dan gift card game" width={92} height={92} className="w-[92px] h-[92px] object-cover rounded-[10px]" />
              <div>
                <h3 className="font-display font-semibold text-[18px]">Voucher Digital</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Gift card dan kode voucher game yang dikirim langsung ke email atau akunmu.</p>
                <span className="inline-block mt-3 text-[13px] font-semibold" style={{ color: "var(--color-primary)" }}>Lihat Semua →</span>
              </div>
            </Link>
            <Link href="#" className="card p-6 flex items-center gap-5 hover:border-white/20 transition" style={{ textDecoration: "none" }}>
              <Image src="/images/86614f37-478c-4b9b-948e-bd12c9fb5f78.jpg" alt="Produk entertainment dan langganan digital" width={92} height={92} className="w-[92px] h-[92px] object-cover rounded-[10px]" />
              <div>
                <h3 className="font-display font-semibold text-[18px]">Entertainment</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Produk hiburan digital untuk melengkapi kebutuhan harianmu selain game.</p>
                <span className="inline-block mt-3 text-[13px] font-semibold" style={{ color: "var(--color-primary)" }}>Lihat Semua →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section className="pt-14 md:pt-20">
        <div className="wrap">
          <p className="eyebrow">Pembayaran</p>
          <h2 className="font-display font-bold text-[24px] md:text-[30px] mt-1.5">Metode Pembayaran</h2>
          <p className="mt-2 text-[15px] max-w-[560px]" style={{ color: "var(--color-muted)" }}>Pilih metode yang paling kamu percaya. Semua pembayaran diproses lewat penyedia resmi.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PAYMENTS.map((p) => (
              <div key={p} className="pay">{p}</div>
            ))}
          </div>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="card p-5"><h3 className="font-display font-semibold text-[15px]">Garansi uang kembali</h3><p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Dana dikembalikan penuh jika pesanan gagal diproses.</p></div>
            <div className="card p-5"><h3 className="font-display font-semibold text-[15px]">Invoice untuk tiap pesanan</h3><p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Status transaksi bisa dicek kapan saja lewat nomor invoice.</p></div>
            <div className="card p-5"><h3 className="font-display font-semibold text-[15px]">Data akun tidak disimpan</h3><p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Top up cukup dengan User ID — kami tidak meminta password akun game.</p></div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="pt-14 md:pt-20">
        <div className="wrap">
          <div className="rounded-[16px] px-7 py-9 md:px-10 md:py-11 flex flex-col md:flex-row md:items-center gap-6 justify-between" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>
            <div>
              <h2 className="font-display font-bold text-[22px] md:text-[26px] leading-tight">Siap lanjut main tanpa nunggu lama?</h2>
              <p className="mt-2 text-[15px]" style={{ color: "var(--color-muted)" }}>Cari gamemu, masukkan User ID, dan selesaikan pembayaran dalam hitungan menit.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/#kategori" className="btn btn-primary h-12 px-6">Top Up Sekarang</Link>
              <Link href="#" className="btn btn-ghost h-12 px-6">Cek Pesanan</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
