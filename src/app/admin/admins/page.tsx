"use client";

import { useState, useEffect } from "react";

interface Admin {
  id: string;
  email: string;
  display_name: string;
  role: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<Admin | null>(null);

  // Form state
  const [formEmail, setFormEmail] = useState("");
  const [formName, setFormName] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState("admin");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/admins").then((r) => r.json()),
      fetch("/api/admin/me").then((r) => r.json()),
    ]).then(([adminsData, meData]) => {
      setAdmins(adminsData);
      setCurrentAdmin(meData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function resetForm() {
    setFormEmail("");
    setFormName("");
    setFormPassword("");
    setFormRole("admin");
    setFormError("");
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formEmail,
          display_name: formName,
          password: formPassword,
          role: formRole,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Gagal menambah admin");
        return;
      }

      setAdmins((prev) => [...prev, data]);
      resetForm();
      setShowForm(false);
      showToast("Admin berhasil ditambahkan");
    } catch {
      setFormError("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  async function handleRevokeAccess() {
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/admins/${confirmDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        showToast("Gagal mencabut akses");
        return;
      }

      setAdmins((prev) =>
        prev.map((a) => (a.id === confirmDelete.id ? { ...a, active: false } : a))
      );
      setConfirmDelete(null);
      showToast(`Akses ${confirmDelete.display_name} berhasil dicabut`);
    } catch {
      showToast("Terjadi kesalahan");
    }
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div>
      <h1 className="font-display font-bold text-[24px] md:text-[28px]">Kelola Admin</h1>
      <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>
        Tambah atau cabut akses admin panel
      </p>

      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-[10px] text-[13px] font-medium shadow-lg" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>
          {toast}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="card p-6 max-w-[400px] w-full mx-4">
            <h3 className="font-display font-semibold text-[16px]">Cabut Akses Admin?</h3>
            <p className="mt-2 text-[14px]" style={{ color: "var(--color-muted)" }}>
              Yakin mau cabut akses <strong style={{ color: "var(--color-text)" }}>{confirmDelete.display_name}</strong>? Admin ini tidak akan bisa login lagi.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 h-10 rounded-[10px] text-[13px] font-medium transition-colors"
                style={{ background: "var(--color-surface-2, #0D1117)", color: "var(--color-muted)" }}
              >
                Batal
              </button>
              <button
                onClick={handleRevokeAccess}
                className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold transition-colors"
                style={{ background: "#EF4444", color: "#fff" }}
              >
                Ya, Cabut Akses
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Admin Button + Form */}
      <div className="mt-6">
        {!showForm ? (
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="btn btn-primary h-10 px-4 text-[13px] font-semibold"
          >
            + Tambah Admin
          </button>
        ) : (
          <div className="card p-6 max-w-[500px]">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-[16px]">Tambah Admin Baru</h2>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="p-1.5 rounded-[8px] hover:bg-white/5 transition-colors" style={{ color: "var(--color-muted)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleAdd} className="mt-5 space-y-4">
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Email</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}
                  placeholder="admin@contoh.com"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Nama Tampil</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}
                  placeholder="Nama admin"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Password</label>
                <input
                  type="password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}
                  placeholder="Min. 6 karakter"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>Role</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full h-10 px-3 rounded-[10px] text-[14px] outline-none appearance-none"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-text)" }}
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              {formError && (
                <div className="px-3 py-2 rounded-[8px] text-[13px]" style={{ background: "rgba(239,68,68,.12)", color: "#F87171" }}>
                  {formError}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="h-10 px-5 rounded-[10px] text-[13px] font-medium transition-colors"
                  style={{ background: "var(--color-surface-2, #0D1117)", color: "var(--color-muted)" }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="h-10 px-6 rounded-[10px] text-[13px] font-semibold transition-opacity disabled:opacity-50"
                  style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}
                >
                  {saving ? "Menambahkan..." : "Tambah Admin"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Admins Table */}
      <div className="mt-6 card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-[14px]" style={{ color: "var(--color-muted)" }}>Loading...</p>
          </div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[14px]" style={{ color: "var(--color-muted)" }}>Belum ada admin</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Nama</th>
                  <th className="text-left px-5 py-3 font-medium hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>Email</th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell" style={{ color: "var(--color-muted)" }}>Role</th>
                  <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Status</th>
                  <th className="text-left px-5 py-3 font-medium hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>Dibuat</th>
                  <th className="text-right px-5 py-3 font-medium" style={{ color: "var(--color-muted)" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => {
                  const isSelf = currentAdmin?.id === admin.id;
                  return (
                    <tr key={admin.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{admin.display_name}</span>
                          {isSelf && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(43,196,160,.12)", color: "#2BC4A0" }}>Kamu</span>
                          )}
                        </div>
                        <p className="sm:hidden mt-0.5 text-[12px]" style={{ color: "var(--color-muted)" }}>{admin.email}</p>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>{admin.email}</td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium" style={{
                          background: admin.role === "super_admin" ? "rgba(99,102,241,.12)" : "rgba(239,163,38,.12)",
                          color: admin.role === "super_admin" ? "#818CF8" : "var(--color-primary)",
                        }}>
                          {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {admin.active ? (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: "rgba(43,196,160,.12)", color: "#2BC4A0" }}>Aktif</span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: "rgba(248,113,113,.12)", color: "#F87171" }}>Nonaktif</span>
                        )}
                      </td>
                      <td className="px-5 py-3 hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>{formatDate(admin.created_at)}</td>
                      <td className="px-5 py-3 text-right">
                        {!isSelf && admin.active && (
                          <button
                            onClick={() => setConfirmDelete(admin)}
                            className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium hover:bg-white/5 transition-colors"
                            style={{ color: "#F87171" }}
                          >
                            Cabut Akses
                          </button>
                        )}
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
