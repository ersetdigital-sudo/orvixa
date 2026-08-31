import Link from "next/link";

const GAMES = [
  "Mobile Legends",
  "Free Fire",
  "PUBG Mobile",
  "Genshin Impact",
  "Magic Chess: Go Go",
  "Call of Duty Mobile",
];

const PAYMENT_METHODS = ["QRIS", "GoPay", "OVO", "DANA", "ShopeePay", "Virtual Account"];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display font-bold text-[24px] md:text-[28px]">Dashboard</h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>
        Ringkasan konten situs ORVIXA GAMING
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center" style={{ background: "rgba(239,163,38,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <p className="text-[24px] font-display font-bold">{GAMES.length}</p>
              <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>Produk Aktif</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center" style={{ background: "rgba(43,196,160,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2BC4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-[24px] font-display font-bold">{PAYMENT_METHODS.length}</p>
              <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>Metode Pembayaran</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center" style={{ background: "rgba(99,102,241,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="text-[24px] font-display font-bold">1</p>
              <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>WhatsApp Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="font-display font-semibold text-[18px]">Aksi Cepat</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/products"
            className="card p-5 hover:border-white/20 transition-colors"
            style={{ textDecoration: "none" }}
          >
            <div className="w-10 h-10 rounded-[10px] grid place-items-center mb-3" style={{ background: "rgba(239,163,38,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-[15px]">Kelola Produk</h3>
            <p className="mt-1 text-[13px]" style={{ color: "var(--color-muted)" }}>Tambah, edit, atau hapus game</p>
          </Link>

          <Link
            href="/admin/payments"
            className="card p-5 hover:border-white/20 transition-colors"
            style={{ textDecoration: "none" }}
          >
            <div className="w-10 h-10 rounded-[10px] grid place-items-center mb-3" style={{ background: "rgba(43,196,160,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2BC4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-[15px]">Metode Pembayaran</h3>
            <p className="mt-1 text-[13px]" style={{ color: "var(--color-muted)" }}>Kelola QRIS, e-wallet, VA</p>
          </Link>

          <Link
            href="/admin/whatsapp"
            className="card p-5 hover:border-white/20 transition-colors"
            style={{ textDecoration: "none" }}
          >
            <div className="w-10 h-10 rounded-[10px] grid place-items-center mb-3" style={{ background: "rgba(99,102,241,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-[15px]">WhatsApp</h3>
            <p className="mt-1 text-[13px]" style={{ color: "var(--color-muted)" }}>Atur nomor CS WhatsApp</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
