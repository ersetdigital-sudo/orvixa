"use client";

import { useState } from "react";
import Image from "next/image";

interface PaymentMethod {
  id: string;
  name: string;
  type: "qris" | "ewallet" | "va";
  active: boolean;
  icon: string;
}

const INITIAL_METHODS: PaymentMethod[] = [
  { id: "qris", name: "QRIS", type: "qris", active: true, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { id: "gopay", name: "GoPay", type: "ewallet", active: true, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "ovo", name: "OVO", type: "ewallet", active: true, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "dana", name: "DANA", type: "ewallet", active: true, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "shopeepay", name: "ShopeePay", type: "ewallet", active: true, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "va-bca", name: "Virtual Account BCA", type: "va", active: true, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { id: "va-mandiri", name: "Virtual Account Mandiri", type: "va", active: true, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
];

export default function PaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>(INITIAL_METHODS);
  const [qrisUrl, setQrisUrl] = useState("https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg");
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");
  const [confirmQris, setConfirmQris] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function toggleMethod(id: string) {
    setMethods(methods.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));
    const method = methods.find((m) => m.id === id);
    showToast(`${method?.name} ${method?.active ? "dinonaktifkan" : "diaktifkan"}`);
  }

  async function handleQrisUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran file terlalu besar (maks 5MB)");
      return;
    }

    if (!file.type.startsWith("image/")) {
      showToast("Format file tidak didukung");
      return;
    }

    setConfirmQris(URL.createObjectURL(file));
  }

  async function confirmQrisUpload() {
    setConfirmQris(null);
    setUploading(true);
    try {
      const formData = new FormData();
      const input = document.querySelector<HTMLInputElement>('#qris-upload');
      const file = input?.files?.[0];
      if (!file) { setUploading(false); return; }

      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        setQrisUrl(data.url);
        showToast("QR Code berhasil diupdate");
      } else {
        showToast(data.error || "Upload gagal");
      }
    } catch {
      showToast("Gagal upload ke Cloudinary");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h1 className="font-display font-bold text-[24px] md:text-[28px]">Metode Pembayaran</h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>
        Kelola metode pembayaran yang tersedia untuk customer
      </p>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-[10px] text-[13px] font-medium shadow-lg" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
          {toast}
        </div>
      )}

      {/* Confirm QRIS Modal */}
      {confirmQris && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="card p-6 max-w-[400px] w-full mx-4">
            <h3 className="font-display font-semibold text-[16px]">Ganti QR Code?</h3>
            <p className="mt-2 text-[14px]" style={{ color: "var(--color-muted)" }}>
              QR Code lama akan digantikan dengan gambar baru.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-40 h-40 rounded-[10px] overflow-hidden" style={{ background: "var(--color-surface-2, #0D1117)" }}>
                <Image src={confirmQris} alt="Preview QR" width={160} height={160} className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setConfirmQris(null)} className="flex-1 h-10 rounded-[10px] text-[13px] font-medium" style={{ border: "1px solid var(--color-line)" }}>
                Batal
              </button>
              <button onClick={confirmQrisUpload} disabled={uploading} className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold disabled:opacity-50" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
                {uploading ? "Uploading..." : "Ya, Ganti"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QRIS Section */}
      <div className="mt-6 card p-5">
        <h2 className="font-display font-semibold text-[16px]">QR Code QRIS</h2>
        <p className="mt-1 text-[13px]" style={{ color: "var(--color-muted)" }}>
          Upload QR Code yang akan ditampilkan saat customer memilih pembayaran QRIS.
        </p>

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

      {/* Payment Methods List */}
      <div className="mt-6 card overflow-hidden">
        <div className="px-5 py-3 font-medium text-[14px]" style={{ borderBottom: "1px solid var(--color-line)", color: "var(--color-muted)" }}>
          Metode Pembayaran
        </div>
        <div>
          {methods.map((method) => (
            <div key={method.id} className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid var(--color-line)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] grid place-items-center" style={{ background: "var(--color-surface-2, #0D1117)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={method.icon} />
                  </svg>
                </div>
                <div>
                  <span className="text-[14px] font-medium">{method.name}</span>
                  <span className="ml-2 text-[11px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--color-surface-2, #0D1117)", color: "var(--color-muted)" }}>
                    {method.type === "qris" ? "QRIS" : method.type === "ewallet" ? "E-Wallet" : "VA"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleMethod(method.id)}
                className="relative w-11 h-6 rounded-full transition-colors"
                style={{ background: method.active ? "var(--color-primary)" : "var(--color-surface-2, #2A2E35)" }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                  style={{ left: method.active ? "22px" : "2px" }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
