"use client";

import Link from "next/link";

interface FooterProps {
  variant?: "home" | "game";
}

export default function Footer({ variant = "home" }: FooterProps) {
  return (
    <footer className="mt-16 md:mt-24 hairline-top" style={{ background: "var(--color-bg-2)" }}>
      <div className={`wrap py-12 grid gap-10 ${variant === "home" ? "md:grid-cols-[1.4fr_1fr_1fr_1fr]" : "md:grid-cols-[1.4fr_1fr_1fr]"}`}>
        <div>
          <div className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 2 29 9v14L16 30 3 23V9L16 2Z" stroke="#EFA326" strokeWidth="1.7" fill="rgba(239,163,38,.10)" />
              <path d="M10.5 11.5 16 21l5.5-9.5" stroke="#F3F0EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display font-extrabold text-[16px]">
              ORVIXA<span style={{ color: "var(--color-primary)" }}>.</span>
            </span>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed max-w-[320px]" style={{ color: "var(--color-muted)" }}>
            ORVIXA GAMING adalah layanan top up game dan produk digital di Indonesia dengan proses otomatis, harga transparan, dan pembayaran lengkap.
          </p>
          {variant === "home" && (
            <>
              <form className="mt-5 flex gap-2 max-w-[320px]" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email kamu"
                  aria-label="Email newsletter"
                  className="flex-1 h-11 px-3 rounded-[10px] text-sm outline-none"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}
                />
                <button className="btn btn-primary h-11 px-4 text-sm">Langganan</button>
              </form>
              <div className="mt-5 flex gap-3" aria-label="Media sosial">
                <a href="#" aria-label="Instagram" className="w-9 h-9 grid place-items-center rounded-[9px]" style={{ border: "1px solid var(--color-line)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C9D2DB" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" />
                  </svg>
                </a>
                <a href="#" aria-label="TikTok" className="w-9 h-9 grid place-items-center rounded-[9px]" style={{ border: "1px solid var(--color-line)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C9D2DB" strokeWidth="1.8" strokeLinejoin="round">
                    <path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46" />
                    <path d="M14 6.5c.9 1.6 2.4 2.6 4.5 2.7" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="w-9 h-9 grid place-items-center rounded-[9px]" style={{ border: "1px solid var(--color-line)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C9D2DB" strokeWidth="1.8">
                    <path d="M14.5 8.5H17M14.5 21V9.5c0-1.7 1-2.5 2.5-2.5M9 12.5h6" />
                  </svg>
                </a>
                <a href="#" aria-label="Discord" className="w-9 h-9 grid place-items-center rounded-[9px]" style={{ border: "1px solid var(--color-line)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C9D2DB" strokeWidth="1.8" strokeLinejoin="round">
                    <path d="M8 6.5C10 6 14 6 16 6.5c2 2.5 3 6 2.8 10-1.4 1-2.9 1.7-4.3 2l-1-1.6M8 6.5C6 9 5 12.5 5.2 16.5c1.4 1 2.9 1.7 4.3 2l1-1.6" />
                    <circle cx="9.5" cy="13" r="1.2" />
                    <circle cx="14.5" cy="13" r="1.2" />
                  </svg>
                </a>
              </div>
            </>
          )}
        </div>

        <div>
          <h3 className="font-display font-semibold text-[15px]">
            {variant === "home" ? "Produk" : "Game Populer"}
          </h3>
          <ul className="mt-4 space-y-2.5 text-[14px]" style={{ color: "var(--color-muted)" }}>
            {variant === "home" ? (
              <>
                <li><Link href="/#kategori" className="hover:text-white">Top Up Game</Link></li>
                <li><Link href="/#voucher" className="hover:text-white">Voucher</Link></li>
                <li><Link href="/#kategori" className="hover:text-white">Steam Game</Link></li>
                <li><Link href="/#voucher" className="hover:text-white">Entertainment</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/mobile-legends" className="hover:text-white">Mobile Legends</Link></li>
                <li><Link href="/free-fire" className="hover:text-white">Free Fire</Link></li>
                <li><Link href="/pubg-mobile" className="hover:text-white">PUBG Mobile</Link></li>
                <li><Link href="/genshin-impact" className="hover:text-white">Genshin Impact</Link></li>
                <li><Link href="/magic-chess-go-go" className="hover:text-white">Magic Chess: Go Go</Link></li>
                <li><Link href="/call-of-duty-mobile" className="hover:text-white">Call of Duty Mobile</Link></li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-[15px]">
            {variant === "home" ? "Informasi" : "Bantuan"}
          </h3>
          <ul className="mt-4 space-y-2.5 text-[14px]" style={{ color: "var(--color-muted)" }}>
            {variant === "home" ? (
              <>
                <li><Link href="#" className="hover:text-white">Tentang Kami</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="/#promo" className="hover:text-white">Promo</Link></li>
                <li><Link href="#" className="hover:text-white">Syarat &amp; Ketentuan</Link></li>
                <li><Link href="#" className="hover:text-white">Kebijakan Privasi</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/#bantuan" className="hover:text-white">Cara Top Up</Link></li>
                <li><Link href="#" className="hover:text-white">Cek Pesanan</Link></li>
                <li><Link href="#" className="hover:text-white">Hubungi Kami</Link></li>
                <li><Link href="#" className="hover:text-white">Syarat &amp; Ketentuan</Link></li>
              </>
            )}
          </ul>
        </div>

        {variant === "home" && (
          <div>
            <h3 className="font-display font-semibold text-[15px]">Bantuan</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]" style={{ color: "var(--color-muted)" }}>
              <li><Link href="#" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/#bantuan" className="hover:text-white">Cara Top Up</Link></li>
              <li><Link href="#" className="hover:text-white">Hubungi Kami</Link></li>
              <li><Link href="#" className="hover:text-white">Cek Pesanan</Link></li>
            </ul>
          </div>
        )}
      </div>

      <div className="hairline-top">
        <div className="wrap py-5 flex flex-col sm:flex-row gap-2 justify-between text-[13px]" style={{ color: "var(--color-muted)" }}>
          <span>&copy; 2026 ORVIXA GAMING. Seluruh hak cipta dilindungi.</span>
          <span>Top up game murah &amp; terpercaya di Indonesia.</span>
        </div>
      </div>
    </footer>
  );
}
