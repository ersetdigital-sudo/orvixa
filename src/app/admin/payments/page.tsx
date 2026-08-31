"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  active: boolean;
}

export default function PaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [qrisUrl, setQrisUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");
  const [confirmQris, setConfirmQris] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/payments")
      .then((r) => r.json())
      .then((data) => {
        setMethods(data.methods || []);
        setQrisUrl(data.qris?.image_url || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function toggleMethod(id: string) {
    const method = methods.find((m) => m.id === id);
    if (!method) return;
    const newActive = !method.active;

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "toggle", id, active: newActive }),
      });
      if (res.ok) {
        setMethods(methods.map((m) => (m.id === id ? { ...m, active: newActive } : m)));
        showToast(`${method.name} ${newActive ? "diaktifkan" : "dinonaktifkan"}`);
      }
    } catch {
      showToast("Gagal update");
    }
  }

  async function handleQrisUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast("Ukuran file terlalu besar (maks 5MB)"); return; }
    if (!file.type.startsWith("image/")) { showToast("Format file tidak didukung"); return; }
    setConfirmQris(URL.createObjectURL(file));
  }

  async function confirmQrisUpload() {
    setConfirmQris(null);
    setUploading(true);
    try {
      const input = document.querySelector<HTMLInputElement>('#qris-upload');
      const file = input?.files?.[0];
      if (!file) { setUploading(false); return; }

      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) { showToast(uploadData.error || "Upload gagal"); setUploading(false); return; }

      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "update_qris", image_url: uploadData.url }),
      });

      if (res.ok) {
        setQrisUrl(uploadData.url);
        showToast("QR Code berhasil diupdate");
      } else {
        showToast("Gagal simpan QR");
      }
    } catch {
      showToast("Gagal upload");
    } finally {
      setUploading(false);
    }
  }

  const typeLabel = (t: string) => t === "qris" ? "QRIS" : t === "ewallet" ? "E-Wallet" : "VA";

  return (
    <div>
      <h1 className="font-display font-bold text-[24px] md:text-[28px]">Metode Pembayaran</h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>
        Kelola metode pembayaran yang tersedia untuk customer
      </p>

      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-[10px] text-[13px] font-medium shadow-lg" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
          {toast}
        </div>
      )}

      {confirmQris && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="card p-6 max-w-[400px] w-full mx-4">
            <h3 className="font-display font-semibold text-[16px]">Ganti QR Code?</h3>
            <p className="mt-2 text-[14px]" style={{ color: "var(--color-muted)" }}>QR Code lama akan digantikan dengan gambar baru.</p>
            <div className="mt-4 flex justify-center">
              <div className="w-40 h-40 rounded-[10px] overflow-hidden" style={{ background: "var(--color-surface-2, #0D1117)" }}>
                <Image src={confirmQris} alt="Preview QR" width={160} height={160} className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setConfirmQris(null)} className="flex-1 h-10 rounded-[10px] text-[13px] font-medium" style={{ border: "1px solid var(--color-line)" }}>Batal</button>
              <button onClick={confirmQrisUpload} disabled={uploading} className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold disabled:opacity-50" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
                {uploading ? "Uploading..." : "Ya, Ganti"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 card p-5">
        <h2 className="font-display font-semibold text-[16px]">QR Code QRIS</h2>
        <p className="mt-1 text-[13px]" style={{ color: "var(--color-muted)" }}>Upload QR Code yang akan ditampilkan saat customer memilih pembayaran QRIS.</p>
        <div className="mt-4 flex flex-col sm:flex-row items-start gap-5">
          <div className="w-40 h-40 rounded-[10px] overflow-hidden shrink-0" style={{ background: "var(--color-surface-2, #0D1117)" }}>
            {qrisUrl ? (
              <Image src={qrisUrl} alt="QRIS" width={160} height={160} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full grid place-items-center text-[12px]" style={{ color: "var(--color-muted)" }}>Belum ada QR</div>
            )}
          </div>
          <div>
            <p className="text-[13px] font-medium" style={{ color: "var(--color-muted)" }}>QR Code Aktif Saat Ini</p>
            <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-medium cursor-pointer transition-colors hover:brightness-110" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
              {uploading ? "Uploading..." : "Upload QR Baru"}
              <input id="qris-upload" type="file" accept="image/*" onChange={handleQrisUpload} className="hidden" disabled={uploading} />
            </label>
            <p className="mt-2 text-[11px]" style={{ color: "var(--color-muted)" }}>Format: JPG/PNG, maks 5MB</p>
          </div>
        </div>
      </div>

      <div className="mt-6 card overflow-hidden">
        <div className="px-5 py-3 font-medium text-[14px]" style={{ borderBottom: "1px solid var(--color-line)", color: "var(--color-muted)" }}>
          Metode Pembayaran
        </div>
        {loading ? (
          <div className="px-5 py-8 text-center text-[14px]" style={{ color: "var(--color-muted)" }}>Loading...</div>
        ) : (
          methods.map((method) => (
            <div key={method.id} className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid var(--color-line)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] grid place-items-center" style={{ background: "var(--color-surface-2, #0D1117)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[14px] font-medium">{method.name}</span>
                  <span className="ml-2 text-[11px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--color-surface-2, #0D1117)", color: "var(--color-muted)" }}>
                    {typeLabel(method.type)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleMethod(method.id)}
                className="relative w-11 h-6 rounded-full transition-colors"
                style={{ background: method.active ? "var(--color-primary)" : "var(--color-surface-2, #2A2E35)" }}
              >
                <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform" style={{ left: method.active ? "22px" : "2px" }} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
