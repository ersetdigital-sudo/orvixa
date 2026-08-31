"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Order {
  id: number;
  order_id: string;
  product_id: string;
  item_label: string;
  item_price: number;
  customer_fields: { label: string; value: string }[];
  payment_method: string;
  status: string;
  notes: string;
  created_at: string;
  products?: { name: string; src: string };
}

function money(n: number) { return "Rp" + n.toLocaleString("id-ID"); }
function timeAgo(date: string) {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}s lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}j lalu`;
  return `${Math.floor(diff / 86400)}h lalu`;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "rgba(251,191,36,.12)", text: "#FBBF24", label: "Pending" },
  processing: { bg: "rgba(99,102,241,.12)", text: "#818CF8", label: "Diproses" },
  completed: { bg: "rgba(43,196,160,.12)", text: "#2BC4A0", label: "Selesai" },
  failed: { bg: "rgba(239,68,68,.12)", text: "#F87171", label: "Gagal" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  useEffect(() => { fetchOrders(); }, []);

  function fetchOrders() {
    const url = filter === "all" ? "/api/orders" : `/api/orders?status=${filter}`;
    fetch(url).then(r => r.json()).then(data => { setOrders(data); setLoading(false); });
  }

  useEffect(() => { fetchOrders(); }, [filter]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  async function updateStatus(id: number, status: string) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "update_status", id, status }),
    });
    if (res.ok) {
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
      showToast(`Status diubah ke ${STATUS_COLORS[status]?.label || status}`);
      setDetailOrder(null);
    } else { showToast("Gagal update status"); }
  }

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    completed: orders.filter(o => o.status === "completed").length,
    failed: orders.filter(o => o.status === "failed").length,
  };

  return (
    <div>
      <h1 className="font-display font-bold text-[24px] md:text-[28px]">Kelola Pesanan</h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>{orders.length} pesanan tercatat</p>

      {toast && <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-[10px] text-[13px] font-medium shadow-lg" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>{toast}</div>}

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["pending", "processing", "completed", "failed"] as const).map(s => (
          <button key={s} onClick={() => setFilter(filter === s ? "all" : s)} className="card p-3 text-left transition-colors hover:border-white/20" style={filter === s ? { borderColor: STATUS_COLORS[s].text } : {}}>
            <p className="text-[20px] font-display font-bold" style={{ color: STATUS_COLORS[s].text }}>{stats[s]}</p>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--color-muted)" }}>{STATUS_COLORS[s].label}</p>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 overflow-y-auto py-10">
          <div className="card p-6 max-w-[500px] w-full mx-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-[16px]">Detail Pesanan</h3>
              <button onClick={() => setDetailOrder(null)} className="text-[20px] hover:opacity-70" style={{ color: "var(--color-muted)" }}>×</button>
            </div>
            <div className="mt-4 space-y-3 text-[14px]">
              <div className="flex justify-between"><span style={{ color: "var(--color-muted)" }}>Order ID</span><span className="font-medium">{detailOrder.order_id}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--color-muted)" }}>Game</span><span className="font-medium">{detailOrder.products?.name || detailOrder.product_id}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--color-muted)" }}>Item</span><span className="font-medium">{detailOrder.item_label}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--color-muted)" }}>Harga</span><span className="font-semibold" style={{ color: "var(--color-primary)" }}>{money(detailOrder.item_price)}</span></div>
              {detailOrder.customer_fields?.map((f, i) => (
                <div key={i} className="flex justify-between"><span style={{ color: "var(--color-muted)" }}>{f.label}</span><span className="font-medium">{f.value}</span></div>
              ))}
              <div className="flex justify-between"><span style={{ color: "var(--color-muted)" }}>Pembayaran</span><span className="font-medium">{detailOrder.payment_method || "—"}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--color-muted)" }}>Waktu</span><span className="font-medium">{new Date(detailOrder.created_at).toLocaleString("id-ID")}</span></div>
            </div>
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--color-line)" }}>
              <p className="text-[12px] mb-2" style={{ color: "var(--color-muted)" }}>Ubah Status:</p>
              <div className="flex flex-wrap gap-2">
                {(["pending", "processing", "completed", "failed"] as const).map(s => (
                  <button key={s} onClick={() => updateStatus(detailOrder.id, s)} className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors" style={detailOrder.status === s ? { background: STATUS_COLORS[s].bg, color: STATUS_COLORS[s].text, border: `1px solid ${STATUS_COLORS[s].text}` } : { border: "1px solid var(--color-line)", color: "var(--color-muted)" }}>
                    {STATUS_COLORS[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mt-4 card overflow-hidden">
        {loading ? (
          <div className="px-5 py-8 text-center text-[14px]" style={{ color: "var(--color-muted)" }}>Loading...</div>
        ) : orders.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-[16px] font-display font-semibold">Belum ada pesanan</p>
            <p className="mt-1 text-[13px]" style={{ color: "var(--color-muted)" }}>Pesanan baru akan muncul di sini setelah customer melakukan pembelian.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Order</th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell" style={{ color: "var(--color-muted)" }}>Game</th>
                  <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Item</th>
                  <th className="text-left px-5 py-3 font-medium hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>Harga</th>
                  <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Status</th>
                  <th className="text-left px-5 py-3 font-medium hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>Waktu</th>
                  <th className="text-right px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
                  return (
                    <tr key={order.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                      <td className="px-5 py-3">
                        <span className="font-medium text-[13px]">{order.order_id}</span>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell" style={{ color: "var(--color-muted)" }}>{order.products?.name || order.product_id}</td>
                      <td className="px-5 py-3">{order.item_label}</td>
                      <td className="px-5 py-3 hidden lg:table-cell font-medium" style={{ color: "var(--color-primary)" }}>{money(order.item_price)}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span>
                      </td>
                      <td className="px-5 py-3 hidden lg:table-cell text-[12px]" style={{ color: "var(--color-muted)" }}>{timeAgo(order.created_at)}</td>
                      <td className="px-5 py-3 text-right">
                        <button onClick={() => setDetailOrder(order)} className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium hover:bg-white/5" style={{ color: "var(--color-primary)" }}>Detail</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
