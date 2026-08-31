"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(10,14,18,.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      {/* Top info bar - desktop */}
      <div
        className="hidden md:block"
        style={{
          borderBottom: "1px solid var(--color-line)",
          background: "var(--color-bg-2)",
        }}
      >
        <div
          className="wrap flex items-center justify-between h-9 text-[12px]"
          style={{ color: "var(--color-muted)" }}
        >
          <div className="flex items-center gap-6">
            <span>Garansi Uang Kembali</span>
            <span style={{ color: "var(--color-line-strong)" }}>|</span>
            <span>Layanan 24/7</span>
            <span style={{ color: "var(--color-line-strong)" }}>|</span>
            <span>Transaksi Aman</span>
          </div>
          <span>Order tanpa ribet — tidak perlu login untuk top up</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="wrap flex items-center gap-4 h-[64px]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="ORVIXA GAMING beranda">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 2 29 9v14L16 30 3 23V9L16 2Z" stroke="#EFA326" strokeWidth="1.7" fill="rgba(239,163,38,.10)" />
            <path d="M10.5 11.5 16 21l5.5-9.5" stroke="#F3F0EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display font-extrabold text-[17px] leading-none">
            ORVIXA<span style={{ color: "var(--color-primary)" }}>.</span>
          </span>
        </Link>

        {/* Search - desktop */}
        <form
          className="hidden md:flex flex-1 max-w-[420px] items-center gap-2 px-3 h-10 rounded-[10px]"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
          role="search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93A0AE" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            type="search"
            placeholder="Cari game, item, atau voucher..."
            aria-label="Cari game, item, atau voucher"
            className="bg-transparent w-full text-sm outline-none"
            style={{ color: "var(--color-text)" }}
          />
        </form>

        {/* Nav links - desktop */}
        <nav
          className="hidden lg:flex items-center gap-6 text-[14px] font-medium ml-auto"
          style={{ color: "#C9D2DB" }}
          aria-label="Navigasi utama"
        >
          <Link href="/" className="hover:text-white">Beranda</Link>
          <Link href="/#kategori" className="hover:text-white">Top Up Game</Link>
          <Link href="/#voucher" className="hover:text-white">Voucher</Link>
          <Link href="/#bantuan" className="hover:text-white">Bantuan</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2 -mr-2"
          aria-label="Buka menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F3F0EA" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {/* Mobile search */}
      <div className="md:hidden wrap pb-3">
        <form
          className="flex items-center gap-2 px-3 h-10 rounded-[10px]"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
          role="search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93A0AE" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            type="search"
            placeholder="Cari game, item, atau voucher..."
            aria-label="Cari game"
            className="bg-transparent w-full text-sm outline-none"
            style={{ color: "var(--color-text)" }}
          />
        </form>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div style={{ borderTop: "1px solid var(--color-line)", background: "var(--color-bg-2)" }}>
          <nav className="wrap py-3 flex flex-col text-[15px]" aria-label="Navigasi mobile">
            <Link href="/" className="py-2.5">Beranda</Link>
            <Link href="/#kategori" className="py-2.5">Top Up Game</Link>
            <Link href="/#voucher" className="py-2.5">Voucher</Link>
            <Link href="/#bantuan" className="py-2.5">Bantuan</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
