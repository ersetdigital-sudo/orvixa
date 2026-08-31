import Link from "next/link";
import { supabase } from "@/lib/supabase";

async function getStats() {
  const [products, items, orders, payments, whatsapp] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("product_items").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("payment_methods").select("id", { count: "exact", head: true }),
    supabase.from("whatsapp_settings").select("id", { count: "exact", head: true }),
  ]);

  const recentOrders = await supabase
    .from("orders")
    .select("id, buyer_name, game_name, nominal, amount, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const pendingOrders = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");

  const paidOrders = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("status", "paid");

  const totalRevenue = await supabase
    .from("orders")
    .select("amount")
    .in("status", ["paid", "completed"]);

  const revenue = totalRevenue.data?.reduce((sum, o) => sum + (o.amount || 0), 0) || 0;

  return {
    products: products.count || 0,
    items: items.count || 0,
    orders: orders.count || 0,
    payments: payments.count || 0,
    whatsapp: whatsapp.count || 0,
    pendingOrders: pendingOrders.count || 0,
    paidOrders: paidOrders.count || 0,
    revenue,
    recentOrders: recentOrders.data || [],
  };
}

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    pending: { bg: "rgba(239,163,38,.12)", text: "var(--color-primary)" },
    paid: { bg: "rgba(43,196,160,.12)", text: "#2BC4A0" },
    completed: { bg: "rgba(43,196,160,.2)", text: "#2BC4A0" },
    expired: { bg: "rgba(248,113,113,.12)", text: "#F87171" },
    cancelled: { bg: "rgba(248,113,113,.12)", text: "#F87171" },
  };
  const c = colors[status] || colors.pending;
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: c.bg, color: c.text }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="font-display font-bold text-[24px] md:text-[28px]">Dashboard</h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>
        Ringkasan konten situs ORVIXA GAMING
      </p>

      {/* Main Stats */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="card p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center shrink-0" style={{ background: "rgba(239,163,38,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <p className="text-[22px] md:text-[24px] font-display font-bold">{stats.products}</p>
              <p className="text-[12px] md:text-[13px]" style={{ color: "var(--color-muted)" }}>Game</p>
            </div>
          </div>
        </div>

        <div className="card p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center shrink-0" style={{ background: "rgba(43,196,160,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2BC4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[22px] md:text-[24px] font-display font-bold">{stats.items}</p>
              <p className="text-[12px] md:text-[13px]" style={{ color: "var(--color-muted)" }}>Harga Aktif</p>
            </div>
          </div>
        </div>

        <div className="card p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center shrink-0" style={{ background: "rgba(99,102,241,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <p className="text-[22px] md:text-[24px] font-display font-bold">{stats.orders}</p>
              <p className="text-[12px] md:text-[13px]" style={{ color: "var(--color-muted)" }}>Total Pesanan</p>
            </div>
          </div>
        </div>

        <div className="card p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center shrink-0" style={{ background: "rgba(52,211,153,.12)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v1" />
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[22px] md:text-[24px] font-display font-bold">{formatRp(stats.revenue)}</p>
              <p className="text-[12px] md:text-[13px]" style={{ color: "var(--color-muted)" }}>Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-[8px] grid place-items-center shrink-0" style={{ background: "rgba(239,163,38,.12)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[18px] font-display font-bold">{stats.pendingOrders}</p>
            <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>Pending</p>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-[8px] grid place-items-center shrink-0" style={{ background: "rgba(43,196,160,.12)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2BC4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[18px] font-display font-bold">{stats.paidOrders}</p>
            <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>Terbayar</p>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-[8px] grid place-items-center shrink-0" style={{ background: "rgba(99,102,241,.12)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <p className="text-[18px] font-display font-bold">{stats.payments}</p>
            <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>Bayaran</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="font-display font-semibold text-[18px]">Aksi Cepat</h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/admin/orders" className="card p-4 hover:border-white/20 transition-colors group" style={{ textDecoration: "none" }}>
            <div className="w-9 h-9 rounded-[8px] grid place-items-center mb-2.5 group-hover:scale-110 transition-transform" style={{ background: "rgba(99,102,241,.12)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-[13px]">Pesanan</h3>
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-muted)" }}>Kelola semua pesanan</p>
          </Link>

          <Link href="/admin/products" className="card p-4 hover:border-white/20 transition-colors group" style={{ textDecoration: "none" }}>
            <div className="w-9 h-9 rounded-[8px] grid place-items-center mb-2.5 group-hover:scale-110 transition-transform" style={{ background: "rgba(239,163,38,.12)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="font-semibold text-[13px]">Kelola Produk</h3>
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-muted)" }}>Tambah, edit, hapus game</p>
          </Link>

          <Link href="/admin/product-items" className="card p-4 hover:border-white/20 transition-colors group" style={{ textDecoration: "none" }}>
            <div className="w-9 h-9 rounded-[8px] grid place-items-center mb-2.5 group-hover:scale-110 transition-transform" style={{ background: "rgba(43,196,160,.12)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2BC4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[13px]">Harga Produk</h3>
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-muted)" }}>Atur harga & nominal</p>
          </Link>

          <Link href="/admin/payments" className="card p-4 hover:border-white/20 transition-colors group" style={{ textDecoration: "none" }}>
            <div className="w-9 h-9 rounded-[8px] grid place-items-center mb-2.5 group-hover:scale-110 transition-transform" style={{ background: "rgba(52,211,153,.12)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[13px]">Pembayaran</h3>
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-muted)" }}>QRIS, e-wallet, VA</p>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-[18px]">Pesanan Terbaru</h2>
          <Link href="/admin/orders" className="text-[13px] font-medium hover:underline" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Lihat Semua</Link>
        </div>
        <div className="mt-4 card overflow-hidden">
          {stats.recentOrders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[14px]" style={{ color: "var(--color-muted)" }}>Belum ada pesanan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                    <th className="text-left px-4 py-2.5 font-medium" style={{ color: "var(--color-muted)" }}>Pembeli</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>Game</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell" style={{ color: "var(--color-muted)" }}>Nominal</th>
                    <th className="text-left px-4 py-2.5 font-medium" style={{ color: "var(--color-muted)" }}>Bayar</th>
                    <th className="text-left px-4 py-2.5 font-medium" style={{ color: "var(--color-muted)" }}>Status</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                      <td className="px-4 py-2.5">
                        <p className="font-medium">{order.buyer_name || "—"}</p>
                      </td>
                      <td className="px-4 py-2.5 hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>{order.game_name || "—"}</td>
                      <td className="px-4 py-2.5 hidden md:table-cell" style={{ color: "var(--color-muted)" }}>{order.nominal || "—"}</td>
                      <td className="px-4 py-2.5 font-medium">{order.amount ? formatRp(order.amount) : "—"}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={order.status || "pending"} /></td>
                      <td className="px-4 py-2.5 hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>{order.created_at ? formatDate(order.created_at) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
