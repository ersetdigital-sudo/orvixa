import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const plusJakarta = localFont({
  src: [
    { path: "../../public/fonts/plusjakartasans-regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/plusjakartasans-medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/plusjakartasans-semibold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/plusjakartasans-bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/plusjakartasans-extrabold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

const sora = localFont({
  src: [
    { path: "../../public/fonts/sora-wght--medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/sora-wght--semibold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/sora-wght--bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/sora-wght--extrabold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Top Up Game Murah & Terpercaya di Indonesia | ORVIXA GAMING",
  description:
    "ORVIXA GAMING adalah tempat top up game murah dan terpercaya: top up Mobile Legends, Free Fire, PUBG, Genshin, voucher game, dan produk digital. Proses instan 24 jam, pembayaran QRIS, e-wallet, dan Virtual Account.",
  keywords:
    "top up game, top up game murah, top up game terpercaya, top up diamond, voucher game, top up Mobile Legends, top up Free Fire, top up PUBG, top up Genshin, top up game Indonesia",
  openGraph: {
    type: "website",
    title: "ORVIXA GAMING — Top Up Game Murah & Terpercaya",
    description:
      "Top up diamond, voucher game, dan produk digital dengan proses instan 24 jam.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
