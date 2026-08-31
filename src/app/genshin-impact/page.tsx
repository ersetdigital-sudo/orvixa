import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameDetailPage from "@/components/GameDetailPage";

export const metadata: Metadata = {
  title: "Top Up Genshin Impact Murah & Instan — Genesis Crystal | ORVIXA GAMING",
  description: "Top up Genshin Impact (Genesis Crystal) murah dan terpercaya di ORVIXA GAMING. Proses otomatis 24 jam, cukup masukkan User ID, bayar dengan QRIS, e-wallet, atau Virtual Account.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <GameDetailPage
          title="Genshin Impact"
          description="Top up Genesis Crystal dan Blessing of the Welkin Moon Genshin Impact."
          canonical="https://orvixagaming.net/genshin-impact"
          heroImage="https://res.cloudinary.com/dqjh7utdb/image/upload/v1788150221/rdbgqzffn1yqinzinjcd.png"
          iconImage="https://res.cloudinary.com/dqjh7utdb/image/upload/v1788150221/rdbgqzffn1yqinzinjcd.png"
          badge="Populer"
          gameName="Genshin Impact"
          publisher="HoYoverse"
          item="Genesis Crystal"
          startPrice="Rp16.000"
          fields={[
            { label: "UID", placeholder: "Contoh: 812345678" },
            { label: "Server", placeholder: "Asia / America / Europe / TW-HK-MO" },
          ]}
          fieldHelp="UID ada di pojok kanan bawah layar saat kamu berada di dalam game."
          nominals={[
            { label: "60 Genesis Crystal", price: 16000 },
            { label: "300 + 30 Crystal", price: 79000 },
            { label: "980 + 110 Crystal", price: 249000 },
            { label: "1980 + 260 Crystal", price: 479000 },
            { label: "3280 + 600 Crystal", price: 799000 },
            { label: "6480 + 1600 Crystal", price: 1599000 },
            { label: "Blessing of the Welkin Moon", price: 79000 },
            { label: "Bundle Welkin x2", price: 155000 },
          ]}
          aboutText="Top up Genesis Crystal dan Blessing of the Welkin Moon Genshin Impact. Masukkan UID dan pilih server kamu, lalu pilih nominal Crystal yang diinginkan."
          aboutSteps={[
            "Masukkan data akun Genshin Impact kamu dengan benar.",
            "Pilih nominal Genesis Crystal yang ingin dibeli.",
            "Pilih metode pembayaran favorit kamu.",
            "Klik Beli Sekarang dan selesaikan pembayaran.",
            "Genesis Crystal masuk otomatis ke akun, biasanya kurang dari 1 menit.",
          ]}
          summaryGame="Genshin Impact"
        />
      </main>
      <Footer variant="game" />
    </>
  );
}
