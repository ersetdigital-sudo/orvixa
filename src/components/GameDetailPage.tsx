"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GameThumbnail from "./GameThumbnail";

interface Field {
  label: string;
  placeholder: string;
}

interface Nominal {
  label: string;
  price: number;
}

interface GameDetailProps {
  title: string;
  description: string;
  canonical: string;
  heroImage: string;
  iconImage: string;
  badge: string;
  gameName: string;
  publisher: string;
  item: string;
  startPrice: string;
  fields: Field[];
  fieldHelp: string;
  nominals: Nominal[];
  aboutText: string;
  aboutSteps: string[];
  summaryGame: string;
}

const PAYMENTS = [
  { label: "QRIS", fee: 0 },
  { label: "DANA", fee: 0 },
  { label: "GoPay", fee: 0 },
  { label: "OVO", fee: 0 },
  { label: "ShopeePay", fee: 0 },
  { label: "Virtual Account", fee: 4000 },
];

const OTHER_GAMES = [
  { href: "/mobile-legends", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151577/jlxfpwi1pkxmesccscp1.png", alt: "Top up Mobile Legends", name: "Mobile Legends", publisher: "Moonton", item: "Diamond" },
  { href: "/free-fire", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151808/fceguvbxqtm2hqlotcro.png", alt: "Top up Free Fire", name: "Free Fire", publisher: "Garena", item: "Diamond" },
  { href: "/pubg-mobile", src: "/images/173d0489-e4bc-41a4-80b4-24c25887d559.png", alt: "Top up PUBG Mobile", name: "PUBG Mobile", publisher: "Tencent", item: "UC" },
  { href: "/genshin-impact", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788150221/rdbgqzffn1yqinzinjcd.png", alt: "Top up Genshin Impact", name: "Genshin Impact", publisher: "HoYoverse", item: "Genesis Crystal" },
  { href: "/magic-chess-go-go", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788148894/aj4q0rohtu1mfvalbtob.webp", alt: "Top up Magic Chess: Go Go", name: "Magic Chess: Go Go", publisher: "Moonton", item: "Token" },
  { href: "/call-of-duty-mobile", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg", alt: "Top up Call of Duty Mobile", name: "Call of Duty Mobile", publisher: "Activision", item: "CP" },
];

function money(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

export default function GameDetailPage(props: GameDetailProps) {
  const [selectedNom, setSelectedNom] = useState(0);
  const [selectedPay, setSelectedPay] = useState(0);
  const [fieldValues, setFieldValues] = useState<string[]>(props.fields.map(() => ""));
  const [fieldErrors, setFieldErrors] = useState<boolean[]>(props.fields.map(() => false));
  const [buyMsg, setBuyMsg] = useState("Pastikan data akun sudah benar sebelum membayar.");
  const [buyMsgColor, setBuyMsgColor] = useState("var(--color-muted)");

  const price = props.nominals[selectedNom].price;
  const fee = PAYMENTS[selectedPay].fee;

  function handleBuy() {
    const errors = fieldValues.map((v) => !v.trim());
    setFieldErrors(errors);
    const hasError = errors.some(Boolean);
    if (hasError) {
      setBuyMsg("Lengkapi dulu data akun kamu di langkah 1.");
      setBuyMsgColor("#E5533D");
    } else {
      setBuyMsg("Pesanan siap — kamu akan diarahkan ke halaman pembayaran.");
      setBuyMsgColor("#5AE0BF");
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ borderBottom: "1px solid var(--color-line)" }}>
        <Image src={props.heroImage} alt="" aria-hidden="true" fill className="hero-art" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(10,14,18,.72),rgba(10,14,18,.96))" }} />
        <div className="wrap relative py-8 md:py-12">
          <nav className="text-[12.5px] flex items-center gap-2 flex-wrap" style={{ color: "var(--color-muted)" }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Beranda</Link><span>/</span>
            <Link href="/#kategori" className="hover:text-white">Top Up Game</Link><span>/</span>
            <span style={{ color: "var(--color-text)" }}>{props.gameName}</span>
          </nav>
          <div className="mt-5 flex gap-4 md:gap-6 items-start">
            <GameThumbnail src={props.iconImage} alt={`Top up ${props.gameName} ${props.item} di ORVIXA GAMING`} size="md" style={{ border: "1px solid var(--color-line-strong)" }} />
            <div className="min-w-0">
              <span className="badge" style={{ background: "var(--color-primary)", color: "var(--color-primary-ink)" }}>{props.badge}</span>
              <h1 className="font-display font-extrabold text-[24px] md:text-[38px] leading-tight mt-2.5">{props.title}</h1>
              <p className="text-[14px] md:text-[15px] mt-1.5" style={{ color: "var(--color-muted)" }}>{props.publisher} · {props.item}</p>
              <div className="mt-3.5 flex flex-wrap gap-2 text-[12px]" style={{ color: "#C9D2DB" }}>
                <span className="px-2.5 py-1.5 rounded-[8px]" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>Proses otomatis</span>
                <span className="px-2.5 py-1.5 rounded-[8px]" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>Layanan 24 jam</span>
                <span className="px-2.5 py-1.5 rounded-[8px]" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>Tanpa login akun</span>
                <span className="px-2.5 py-1.5 rounded-[8px]" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>Mulai {props.startPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section className="pt-8 md:pt-10">
        <div className="wrap grid lg:grid-cols-[1fr_340px] gap-5 items-start">
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="sect">
              <div className="flex items-center gap-2.5"><span className="step-num">1</span><h2 className="font-display font-bold text-[16px] md:text-[18px]">Masukkan data akun</h2></div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3.5">
                {props.fields.map((f, i) => (
                  <div key={i}>
                    <label className="text-[13px] font-semibold">{f.label}</label>
                    <input
                      className="fld mt-2 order-field"
                      placeholder={f.placeholder}
                      autoComplete="off"
                      value={fieldValues[i]}
                      onChange={(e) => {
                        const next = [...fieldValues];
                        next[i] = e.target.value;
                        setFieldValues(next);
                        const nextErr = [...fieldErrors];
                        nextErr[i] = false;
                        setFieldErrors(nextErr);
                      }}
                      style={{ borderColor: fieldErrors[i] ? "#E5533D" : undefined }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{props.fieldHelp}</p>
            </div>

            {/* Step 2 */}
            <div className="sect">
              <div className="flex items-center gap-2.5"><span className="step-num">2</span><h2 className="font-display font-bold text-[16px] md:text-[18px]">Pilih nominal</h2></div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5" role="radiogroup" aria-label="Pilih nominal">
                {props.nominals.map((n, i) => (
                  <button key={i} className="nom" role="radio" aria-checked={i === selectedNom ? "true" : "false"} onClick={() => setSelectedNom(i)}>
                    <span className="n">{n.label}</span>
                    <span className="p">{money(n.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="sect">
              <div className="flex items-center gap-2.5"><span className="step-num">3</span><h2 className="font-display font-bold text-[16px] md:text-[18px]">Metode pembayaran</h2></div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5" role="radiogroup" aria-label="Metode pembayaran">
                {PAYMENTS.map((p, i) => (
                  <button key={i} className="pm" role="radio" aria-checked={i === selectedPay ? "true" : "false"} onClick={() => setSelectedPay(i)}>
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
                    {p.label}
                    <span className="ml-auto text-[11.5px] font-medium" style={{ color: "var(--color-muted)" }}>
                      {p.fee === 0 ? "Gratis" : `+${money(p.fee)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="sect">
              <h2 className="font-display font-bold text-[16px] md:text-[18px]">Tentang top up {props.gameName}</h2>
              <p className="mt-2.5 text-[14px] leading-relaxed" style={{ color: "#C2CBD5" }}>{props.aboutText}</p>
              <div className="rule my-5" />
              <h3 className="font-display font-semibold text-[15px]">Cara top up {props.gameName} di ORVIXA</h3>
              <ol className="mt-3 space-y-2.5 text-[13.5px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {props.aboutSteps.map((s, i) => (
                  <li key={i}>{i + 1}. {s}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Summary */}
          <aside className="sticky-buy">
            <div className="sect">
              <h2 className="font-display font-bold text-[16px]">Ringkasan pesanan</h2>
              <div className="mt-4 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between gap-3"><span style={{ color: "var(--color-muted)" }}>Game</span><span className="font-semibold text-right">{props.summaryGame}</span></div>
                <div className="flex justify-between gap-3"><span style={{ color: "var(--color-muted)" }}>Item</span><span className="font-semibold text-right">{props.nominals[selectedNom].label}</span></div>
                <div className="flex justify-between gap-3"><span style={{ color: "var(--color-muted)" }}>Pembayaran</span><span className="font-semibold text-right">{PAYMENTS[selectedPay].label}</span></div>
                <div className="flex justify-between gap-3"><span style={{ color: "var(--color-muted)" }}>Biaya layanan</span><span className="font-semibold text-right">{money(fee)}</span></div>
              </div>
              <div className="rule my-4" />
              <div className="flex items-end justify-between">
                <span className="text-[13px]" style={{ color: "var(--color-muted)" }}>Total bayar</span>
                <span className="font-display font-extrabold text-[22px]" style={{ color: "var(--color-primary)" }}>{money(price + fee)}</span>
              </div>
              <button className="btn btn-primary w-full h-12 mt-4 text-[15px]" onClick={handleBuy}>Beli Sekarang</button>
              <p className="mt-2.5 text-[12.5px] text-center" style={{ color: buyMsgColor }}>{buyMsg}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* GAME LAIN */}
      <section className="pt-12 md:pt-16">
        <div className="wrap">
          <h2 className="font-display font-bold text-[20px] md:text-[24px]">Game lainnya</h2>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {OTHER_GAMES.map((g, i) => (
              <Link key={i} href={g.href} className="game-card">
                <GameThumbnail src={g.src} alt={g.alt} size="lg" />
                <div className="p-3">
                  <h3 className="font-display font-semibold text-[13.5px] leading-tight">{g.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
