"use client";

import { useState, useEffect } from "react";

interface Product { id: string; name: string; }
interface ProductItem { id: number; product_id: string; label: string; price: number; active: boolean; sort_order: number; }

function money(n: number) { return "Rp" + n.toLocaleString("id-ID"); }

export default function ProductItemsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<ProductItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProductItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(r => r.json()),
      fetch("/api/product-items").then(r => r.json()),
    ]).then(([prods, its]) => { setProducts(prods); setItems(its); setLoading(false); });
  }, []);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const filtered = filter === "all" ? items : items.filter(i => i.product_id === filter);
  const grouped = filtered.reduce<Record<string, ProductItem[]>>((acc, item) => {
    (acc[item.product_id] = acc[item.product_id] || []).push(item);
    return acc;
  }, {});

  async function handleSave(item: ProductItem) {
    const res = await fetch("/api/product-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (res.ok) {
      const updated = await res.json();
      if (editing) {
        setItems(items.map(i => i.id === editing.id ? updated : i));
        showToast("Item berhasil diupdate");
      } else {
        setItems([...items, updated]);
        showToast("Item berhasil ditambahkan");
      }
      setEditing(null); setIsAdding(false);
    } else { showToast("Gagal menyimpan"); }
  }

  async function handleDelete(id: number) {
    const res = await fetch("/api/product-items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) { setItems(items.filter(i => i.id !== id)); showToast("Item berhasil dihapus"); }
    setConfirmDelete(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-[24px] md:text-[28px]">Kelola Harga Produk</h1>
          <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>{items.length} item aktif</p>
        </div>
        <button onClick={() => { setIsAdding(true); setEditing(null); }} className="btn btn-primary h-10 px-4 text-[13px] font-semibold">+ Tambah Item</button>
      </div>

      {toast && <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-[10px] text-[13px] font-medium shadow-lg" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>{toast}</div>}

      {confirmDelete !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="card p-6 max-w-[360px] w-full mx-4">
            <h3 className="font-display font-semibold text-[16px]">Hapus Item?</h3>
            <p className="mt-2 text-[14px]" style={{ color: "var(--color-muted)" }}>Item ini akan dihapus dari daftar harga.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 h-10 rounded-[10px] text-[13px] font-medium" style={{ border: "1px solid var(--color-line)" }}>Batal</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 h-10 rounded-[10px] text-[13px] font-medium" style={{ background: "#EF4444", color: "white" }}>Hapus</button>
            </div>
          </div>
        </div>
      )}

      {(editing || isAdding) && (
        <FormModal item={editing} products={products} onSave={handleSave} onCancel={() => { setEditing(null); setIsAdding(false); }} />
      )}

      {/* Filter */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setFilter("all")} className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${filter === "all" ? "text-white" : ""}`} style={filter === "all" ? { background: "var(--color-primary)", color: "var(--color-primary-ink)" } : { border: "1px solid var(--color-line)", color: "var(--color-muted)" }}>Semua</button>
        {products.map(p => (
          <button key={p.id} onClick={() => setFilter(p.id)} className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors`} style={filter === p.id ? { background: "var(--color-primary)", color: "var(--color-primary-ink)" } : { border: "1px solid var(--color-line)", color: "var(--color-muted)" }}>{p.name}</button>
        ))}
      </div>

      {/* Items grouped by game */}
      <div className="mt-4 space-y-4">
        {Object.entries(grouped).map(([productId, gameItems]) => {
          const product = products.find(p => p.id === productId);
          return (
            <div key={productId} className="card overflow-hidden">
              <div className="px-5 py-3 font-display font-semibold text-[14px]" style={{ borderBottom: "1px solid var(--color-line)" }}>
                {product?.name || productId} <span className="font-normal text-[12px]" style={{ color: "var(--color-muted)" }}>({gameItems.length} item)</span>
              </div>
              {gameItems.map(item => (
                <div key={item.id} className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <div>
                    <span className="text-[14px] font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-semibold" style={{ color: "var(--color-primary)" }}>{money(item.price)}</span>
                    <button onClick={() => { setEditing(item); setIsAdding(false); }} className="px-2.5 py-1 rounded-[6px] text-[11px] font-medium hover:bg-white/5" style={{ color: "var(--color-primary)" }}>Edit</button>
                    <button onClick={() => setConfirmDelete(item.id)} className="px-2.5 py-1 rounded-[6px] text-[11px] font-medium hover:bg-white/5" style={{ color: "#F87171" }}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormModal({ item, products, onSave, onCancel }: { item: ProductItem | null; products: Product[]; onSave: (item: ProductItem) => void; onCancel: () => void; }) {
  const [productId, setProductId] = useState(item?.product_id || products[0]?.id || "");
  const [label, setLabel] = useState(item?.label || "");
  const [price, setPrice] = useState(item?.price?.toString() || "");
  const [sortOrder, setSortOrder] = useState(item?.sort_order?.toString() || "0");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!label || !price) return;
    onSave({
      id: item?.id || 0,
      product_id: productId,
      label,
      price: parseInt(price),
      active: true,
      sort_order: parseInt(sortOrder) || 0,
    });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 overflow-y-auto py-10">
      <div className="card p-6 max-w-[440px] w-full mx-4">
        <h3 className="font-display font-semibold text-[18px]">{item ? "Edit Item" : "Tambah Item Baru"}</h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Game *</label>
            <select value={productId} onChange={e => setProductId(e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Label Item *</label>
            <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Contoh: 5 Diamond" required className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Harga (Rp) *</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }} />
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Urutan</label>
              <input type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onCancel} className="flex-1 h-10 rounded-[10px] text-[13px] font-medium" style={{ border: "1px solid var(--color-line)" }}>Batal</button>
            <button type="submit" className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
