"use client";

import { useState } from "react";
import Image from "next/image";

interface Game {
  id: string;
  name: string;
  publisher: string;
  src: string;
  badge: string;
  price: string;
}

const INITIAL_GAMES: Game[] = [
  { id: "mobile-legends", name: "Mobile Legends", publisher: "Moonton", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151577/jlxfpwi1pkxmesccscp1.png", badge: "Best Seller", price: "Rp3.000" },
  { id: "free-fire", name: "Free Fire", publisher: "Garena", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151808/fceguvbxqtm2hqlotcro.png", badge: "Hot", price: "Rp2.500" },
  { id: "pubg-mobile", name: "PUBG Mobile", publisher: "Level Infinite", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151891/mngzis7bhlj3rihx5pee.png", badge: "", price: "Rp15.000" },
  { id: "genshin-impact", name: "Genshin Impact", publisher: "HoYoverse", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788150221/rdbgqzffn1yqinzinjcd.png", badge: "Populer", price: "Rp16.000" },
  { id: "magic-chess-go-go", name: "Magic Chess: Go Go", publisher: "Moonton", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788148894/aj4q0rohtu1mfvalbtob.webp", badge: "", price: "Rp5.000" },
  { id: "call-of-duty-mobile", name: "Call of Duty Mobile", publisher: "Activision", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg", badge: "", price: "Rp10.000" },
];

export default function ProductsPage() {
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [editing, setEditing] = useState<Game | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function handleUpload(file: File): Promise<string | null> {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) return data.url;
      showToast(data.error || "Upload gagal");
      return null;
    } catch {
      showToast("Gagal upload gambar");
      return null;
    } finally {
      setUploading(false);
    }
  }

  function handleSave(game: Game) {
    if (editing) {
      setGames(games.map((g) => (g.id === editing.id ? game : g)));
      showToast(`${game.name} berhasil diupdate`);
    } else {
      setGames([...games, { ...game, id: game.name.toLowerCase().replace(/[^a-z0-9]/g, "-") }]);
      showToast(`${game.name} berhasil ditambahkan`);
    }
    setEditing(null);
    setIsAdding(false);
  }

  function handleDelete(id: string) {
    const game = games.find((g) => g.id === id);
    setGames(games.filter((g) => g.id !== id));
    setConfirmDelete(null);
    showToast(`${game?.name} berhasil dihapus`);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-[24px] md:text-[28px]">Kelola Produk</h1>
          <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>{games.length} game aktif</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditing(null); }}
          className="btn btn-primary h-10 px-4 text-[13px] font-semibold"
        >
          + Tambah Game
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-[10px] text-[13px] font-medium shadow-lg" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
          {toast}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="card p-6 max-w-[360px] w-full mx-4">
            <h3 className="font-display font-semibold text-[16px]">Hapus Game?</h3>
            <p className="mt-2 text-[14px]" style={{ color: "var(--color-muted)" }}>
              Game ini akan dihapus dari situs. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 h-10 rounded-[10px] text-[13px] font-medium" style={{ border: "1px solid var(--color-line)" }}>
                Batal
              </button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 h-10 rounded-[10px] text-[13px] font-medium" style={{ background: "#EF4444", color: "white" }}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {(editing || isAdding) && (
        <FormModal
          game={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsAdding(false); }}
          onUpload={handleUpload}
          uploading={uploading}
        />
      )}

      {/* Table */}
      <div className="mt-6 card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Game</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell" style={{ color: "var(--color-muted)" }}>Publisher</th>
                <th className="text-left px-5 py-3 font-medium hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>Badge</th>
                <th className="text-left px-5 py-3 font-medium hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>Harga</th>
                <th className="text-right px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[8px] overflow-hidden shrink-0" style={{ background: "var(--color-surface-2, #0D1117)" }}>
                        <Image src={game.src} alt={game.name} width={40} height={40} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-medium">{game.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell" style={{ color: "var(--color-muted)" }}>{game.publisher}</td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    {game.badge ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: "rgba(239,163,38,.12)", color: "var(--color-primary)" }}>
                        {game.badge}
                      </span>
                    ) : (
                      <span className="text-[12px]" style={{ color: "var(--color-muted)" }}>—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>{game.price}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditing(game); setIsAdding(false); }}
                        className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium hover:bg-white/5 transition-colors"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmDelete(game.id)}
                        className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium hover:bg-white/5 transition-colors"
                        style={{ color: "#F87171" }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FormModal({
  game,
  onSave,
  onCancel,
  onUpload,
  uploading,
}: {
  game: Game | null;
  onSave: (game: Game) => void;
  onCancel: () => void;
  onUpload: (file: File) => Promise<string | null>;
  uploading: boolean;
}) {
  const [name, setName] = useState(game?.name || "");
  const [publisher, setPublisher] = useState(game?.publisher || "");
  const [src, setSrc] = useState(game?.src || "");
  const [badge, setBadge] = useState(game?.badge || "");
  const [price, setPrice] = useState(game?.price || "");
  const [preview, setPreview] = useState(game?.src || "");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await onUpload(file);
    if (url) {
      setSrc(url);
      setPreview(url);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !src) return;
    onSave({
      id: game?.id || name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name,
      publisher,
      src,
      badge,
      price,
    });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 overflow-y-auto py-10">
      <div className="card p-6 max-w-[500px] w-full mx-4">
        <h3 className="font-display font-semibold text-[18px]">{game ? "Edit Game" : "Tambah Game Baru"}</h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Nama Game *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }} />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Publisher</label>
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }} />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Gambar Thumbnail *</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-[13px] file:mr-3 file:py-2 file:px-3 file:rounded-[8px] file:border-0 file:text-[13px] file:font-medium file:cursor-pointer" style={{ color: "var(--color-muted)" }} />
            {uploading && <p className="mt-1 text-[12px]" style={{ color: "var(--color-primary)" }}>Uploading...</p>}
            {preview && (
              <div className="mt-2 w-16 h-16 rounded-[8px] overflow-hidden" style={{ background: "var(--color-surface-2, #0D1117)" }}>
                <Image src={preview} alt="Preview" width={64} height={64} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Badge</label>
            <select value={badge} onChange={(e) => setBadge(e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}>
              <option value="">Tidak ada</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Hot">Hot</option>
              <option value="Populer">Populer</option>
              <option value="Baru">Baru</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Harga Mulai</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Rp3.000" className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onCancel} className="flex-1 h-10 rounded-[10px] text-[13px] font-medium" style={{ border: "1px solid var(--color-line)" }}>
              Batal
            </button>
            <button type="submit" disabled={uploading} className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold disabled:opacity-50" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
