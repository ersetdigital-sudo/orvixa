"use client";

import { useState } from "react";

export default function WhatsAppPage() {
  const [number, setNumber] = useState("6281234567890");
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function validateNumber(num: string): boolean {
    const cleaned = num.replace(/[^0-9]/g, "");
    return /^62\d{9,13}$/.test(cleaned);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = number.replace(/[^0-9]/g, "");

    if (!validateNumber(cleaned)) {
      showToast("Format nomor tidak valid (harus mulai 62, 10-15 digit)");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: cleaned }),
      });

      if (res.ok) {
        showToast("Nomor WhatsApp berhasil disimpan");
      } else {
        showToast("Gagal menyimpan");
      }
    } catch {
      showToast("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  const cleaned = number.replace(/[^0-9]/g, "");
  const isValid = validateNumber(cleaned);
  const displayNumber = cleaned.length > 4
    ? `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}${cleaned.length > 10 ? "-" + cleaned.slice(10) : ""}`
    : cleaned;

  return (
    <div>
      <h1 className="font-display font-bold text-[24px] md:text-[28px]">Pengaturan WhatsApp</h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>
        Atur nomor WhatsApp Customer Service yang ditampilkan di situs
      </p>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-[10px] text-[13px] font-medium shadow-lg" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
          {toast}
        </div>
      )}

      <div className="mt-6 card p-6 max-w-[500px]">
        <h2 className="font-display font-semibold text-[16px]">Nomor WhatsApp CS</h2>
        <p className="mt-1 text-[13px]" style={{ color: "var(--color-muted)" }}>
          Nomor ini akan digunakan untuk tombol WhatsApp di situs publik.
        </p>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Nomor WhatsApp</label>
            <div className="flex items-center gap-2">
              <span className="text-[14px] px-3 h-10 grid place-items-center rounded-[10px] shrink-0" style={{ background: "var(--color-surface-2, #0D1117)", color: "var(--color-muted)" }}>+62</span>
              <input
                type="tel"
                value={number.replace(/^62/, "")}
                onChange={(e) => setNumber("62" + e.target.value.replace(/^62/, "").replace(/[^0-9]/g, ""))}
                placeholder="81234567890"
                className="flex-1 h-10 px-3 rounded-[10px] text-[14px] outline-none"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="p-3 rounded-[10px]" style={{ background: "var(--color-surface-2, #0D1117)" }}>
            <p className="text-[12px] mb-1.5" style={{ color: "var(--color-muted)" }}>Preview:</p>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-[14px] font-medium" style={{ color: isValid ? "#25D366" : "var(--color-muted)" }}>
                {isValid ? displayNumber : "Format nomor tidak valid"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || !isValid}
            className="h-10 px-6 rounded-[10px] text-[13px] font-semibold transition-opacity disabled:opacity-50"
            style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>

      {/* Info */}
      <div className="mt-6 card p-5 max-w-[500px]">
        <h3 className="font-display font-semibold text-[14px]">Catatan</h3>
        <ul className="mt-2 space-y-1.5 text-[13px]" style={{ color: "var(--color-muted)" }}>
          <li className="flex gap-2">
            <span style={{ color: "var(--color-primary)" }}>•</span>
            Nomor harus dalam format internasional (dimulai 62 untuk Indonesia)
          </li>
          <li className="flex gap-2">
            <span style={{ color: "var(--color-primary)" }}>•</span>
            Nomor ini akan ditampilkan di tombol WhatsApp di situs publik
          </li>
          <li className="flex gap-2">
            <span style={{ color: "var(--color-primary)" }}>•</span>
            Pastikan nomor aktif dan bisa menerima pesan WhatsApp
          </li>
        </ul>
      </div>
    </div>
  );
}
