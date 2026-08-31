"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DUMMY_ORDER = {
  game: "Mobile Legends",
  item: "86 Diamond",
  price: 15000,
  fee: 500,
  payment: "QRIS",
  total: 15500,
};

const PAYMENT_METHODS = [
  { id: "qris", label: "QRIS", icon: "🔲" },
  { id: "gopay", label: "GoPay", icon: "💚" },
  { id: "dana", label: "DANA", icon: "💙" },
  { id: "ovo", label: "OVO", icon: "💜" },
  { id: "va", label: "Virtual Account", icon: "🏦" },
];

function CountdownTimer({ initialMinutes = 15 }: { initialMinutes?: number }) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <span className="font-display font-bold tabular-nums" style={{ color: seconds < 300 ? "#EF4444" : "var(--color-primary)" }}>
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </span>
  );
}

function QRISPaymentSection({ total }: { total: number }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"waiting" | "success">("waiting");

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(String(total)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [total]);

  const formatRupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

  return (
    <div className="card p-6 md:p-8">
      <h2 className="font-display font-bold text-[20px] md:text-[22px]">Scan QRIS untuk Bayar</h2>

      {/* Status indicator */}
      <div className="mt-4 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: status === "waiting" ? "var(--color-primary)" : "#22C55E" }} />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: status === "waiting" ? "var(--color-primary)" : "#22C55E" }} />
        </span>
        <span className="text-[14px]" style={{ color: "var(--color-muted)" }}>
          {status === "waiting" ? "Menunggu pembayaran..." : "Pembayaran Berhasil!"}
        </span>
      </div>

      {/* QR Code placeholder */}
      <div className="mt-6 flex justify-center">
        <div
          className="w-[240px] h-[240px] rounded-[16px] flex items-center justify-center"
          style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-line)" }}
        >
          <div className="flex flex-col items-center gap-3">
            {/* TODO: ganti src ini dengan QRIS gambar dari admin panel */}
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="3" height="3" />
              <line x1="21" y1="14" x2="21" y2="14.01" />
              <line x1="21" y1="21" x2="21" y2="21.01" />
              <line x1="14" y1="21" x2="14" y2="21.01" />
            </svg>
            <span className="text-[13px]" style={{ color: "var(--color-muted)" }}>QR Code</span>
          </div>
        </div>
      </div>

      {/* Total nominal */}
      <div className="mt-6 text-center">
        <p className="text-[14px]" style={{ color: "var(--color-muted)" }}>Nominal yang harus dibayar</p>
        <p className="font-display font-bold text-[28px] mt-1" style={{ color: "var(--color-primary)" }}>
          {formatRupiah(total)}
        </p>
        <button
          onClick={handleCopy}
          className="mt-2 text-[13px] px-3 py-1.5 rounded-[8px] transition-colors"
          style={{
            background: copied ? "rgba(34,197,94,.15)" : "var(--color-surface-2)",
            color: copied ? "#22C55E" : "var(--color-muted)",
            border: "1px solid var(--color-line)",
          }}
        >
          {copied ? "✓ Tersalin" : "Salin Nominal"}
        </button>
      </div>

      {/* Countdown */}
      <div className="mt-5 text-center">
        <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>
          Selesaikan pembayaran dalam <CountdownTimer initialMinutes={15} />
        </p>
      </div>

      {/* Instructions */}
      <div className="mt-6 space-y-3">
        <p className="text-[14px] font-medium" style={{ color: "var(--color-text)" }}>Cara bayar:</p>
        {["Buka e-wallet atau m-banking kamu", "Scan QR Code di atas", "Konfirmasi pembayaran sesuai nominal"].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold"
              style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}
            >
              {i + 1}
            </span>
            <span className="text-[14px] pt-0.5" style={{ color: "var(--color-muted)" }}>{step}</span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-7 space-y-3">
        <button className="btn btn-ghost w-full h-12 text-[15px]">Saya Sudah Bayar</button>
        <Link href="/" className="block text-center text-[13px] hover:underline" style={{ color: "var(--color-muted)" }}>
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}

function OrderSummary() {
  const formatRupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

  return (
    <div className="card p-6 md:p-7">
      <h2 className="font-display font-bold text-[18px] md:text-[20px]">Ringkasan pesanan</h2>

      <div className="mt-5 space-y-3">
        {[
          { label: "Game", value: DUMMY_ORDER.game },
          { label: "Item", value: DUMMY_ORDER.item },
          { label: "Pembayaran", value: DUMMY_ORDER.payment },
          { label: "Biaya layanan", value: formatRupiah(DUMMY_ORDER.fee) },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-[14px]">
            <span style={{ color: "var(--color-muted)" }}>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>

      <div className="my-5" style={{ borderTop: "1px solid var(--color-line)" }} />

      <div className="flex justify-between items-baseline">
        <span className="text-[14px]" style={{ color: "var(--color-muted)" }}>Total bayar</span>
        <span className="font-display font-bold text-[24px]" style={{ color: "var(--color-primary)" }}>
          {formatRupiah(DUMMY_ORDER.total)}
        </span>
      </div>

      <button className="btn btn-primary w-full h-12 text-[15px] mt-6">Beli Sekarang</button>

      <p className="mt-3 text-center text-[12px]" style={{ color: "#22C55E" }}>
        Pesanan siap — kamu akan diarahkan ke halaman pembayaran.
      </p>
    </div>
  );
}

function TrustFooter() {
  const items = [
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, text: "Transaksi Aman" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, text: "Otomatis 24 Jam" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>, text: "Bantuan Siap Membantu" },
  ];

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-6">
      {items.map((item) => (
        <div key={item.text} className="flex items-center gap-2">
          {item.icon}
          <span className="text-[13px]" style={{ color: "var(--color-muted)" }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="wrap py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="text-[13px] mb-6" style={{ color: "var(--color-muted)" }}>
            <Link href="/" className="hover:underline">Beranda</Link>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--color-text)" }}>Checkout</span>
          </nav>

          <h1 className="font-display font-bold text-[24px] md:text-[28px] mb-8">Pembayaran</h1>

          <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
            {/* Left: Payment section */}
            <QRISPaymentSection total={DUMMY_ORDER.total} />

            {/* Right: Order summary (sticky on desktop) */}
            <div className="lg:sticky lg:top-24">
              <OrderSummary />
              <TrustFooter />
            </div>
          </div>
        </div>
      </main>
      <Footer variant="game" />
    </>
  );
}
