"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2" },
  { label: "Kelola Produk", href: "/admin/products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { label: "Metode Pembayaran", href: "/admin/payments", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { label: "WhatsApp", href: "/admin/whatsapp", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r transition-all duration-200 ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
        style={{ background: "var(--color-surface)", borderColor: "var(--color-line)" }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-4 border-b" style={{ borderColor: "var(--color-line)" }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 2 29 9v14L16 30 3 23V9L16 2Z" stroke="#EFA326" strokeWidth="1.7" fill="rgba(239,163,38,.10)" />
            <path d="M10.5 11.5 16 21l5.5-9.5" stroke="#F3F0EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {!collapsed && (
            <span className="font-display font-extrabold text-[15px]">
              ORVIXA<span style={{ color: "var(--color-primary)" }}>.</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors ${
                isActive(item.href)
                  ? "text-white"
                  : "hover:bg-white/5"
              }`}
              style={
                isActive(item.href)
                  ? { background: "var(--color-primary)", color: "var(--color-primary-ink)" }
                  : { color: "var(--color-muted)" }
              }
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="p-2 border-t" style={{ borderColor: "var(--color-line)" }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] text-[13px] transition-colors hover:bg-white/5"
            style={{ color: "var(--color-muted)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${collapsed ? "rotate-180" : ""}`}>
              <path d="M15 19l-7-7 7-7" />
            </svg>
            {!collapsed && <span>Tutup Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-200 ${collapsed ? "ml-[68px]" : "ml-[240px]"}`}>
        <div className="p-6 md:p-8 max-w-[1200px]">{children}</div>
      </main>
    </div>
  );
}
