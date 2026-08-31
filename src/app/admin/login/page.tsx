"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Login gagal");
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-bg)" }}>
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2 29 9v14L16 30 3 23V9L16 2Z" stroke="#EFA326" strokeWidth="1.7" fill="rgba(239,163,38,.10)" />
              <path d="M10.5 11.5 16 21l5.5-9.5" stroke="#F3F0EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display font-extrabold text-[20px]">
              ORVIXA<span style={{ color: "var(--color-primary)" }}>.</span>
            </span>
          </div>
          <h1 className="font-display font-bold text-[22px]">Admin Dashboard</h1>
          <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>Masuk untuk mengelola konten situs</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-3 rounded-[10px] text-[14px] outline-none transition-colors"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}
              placeholder="admin@orvixagaming.net"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-11 px-3 rounded-[10px] text-[14px] outline-none transition-colors"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}
              placeholder="Masukkan password"
            />
          </div>

          {error && (
            <div className="px-3 py-2 rounded-[8px] text-[13px]" style={{ background: "rgba(239,68,68,.12)", color: "#F87171", border: "1px solid rgba(239,68,68,.25)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-[10px] text-[14px] font-semibold transition-opacity disabled:opacity-50"
            style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
