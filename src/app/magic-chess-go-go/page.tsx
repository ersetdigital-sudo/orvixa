import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameDetailPage from "@/components/GameDetailPage";

export const metadata: Metadata = {
  title: "Top Up Magic Chess: Go Go Murah & Instan — Token | ORVIXA GAMING",
  description: "Top up Magic Chess: Go Go (Token) murah dan terpercaya di ORVIXA GAMING. Proses otomatis 24 jam, cukup masukkan User ID, bayar dengan QRIS, e-wallet, atau Virtual Account.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <GameDetailPage
          title="Magic Chess: Go Go"
          description="Top up Magic Chess: Go Go dari Moonton."
          canonical="https://orvixagaming.net/magic-chess-go-go"
          heroImage="https://res.cloudinary.com/dqjh7utdb/image/upload/v1788148894/aj4q0rohtu1mfvalbtob.webp"
          iconImage="https://res.cloudinary.com/dqjh7utdb/image/upload/v1788148894/aj4q0rohtu1mfvalbtob.webp"
          badge="Baru"
          gameName="Magic Chess: Go Go"
          publisher="Moonton"
          item="Token"
          startPrice="Rp3.500"
          fields={[
            { label: "User ID", placeholder: "Contoh: 123456789" },
            { label: "Zone ID", placeholder: "Contoh: 1234" },
          ]}
          fieldHelp="Buka profil di dalam game untuk melihat User ID dan Zone ID kamu."
          nominals={[
            { label: "10 Token", price: 3500 },
            { label: "25 Token", price: 8000 },
            { label: "50 Token", price: 15500 },
            { label: "110 Token", price: 33000 },
            { label: "240 Token", price: 70000 },
            { label: "500 Token", price: 145000 },
            { label: "1000 Token", price: 285000 },
            { label: "Magic Pass", price: 49000 },
            { label: "Weekly Pass", price: 27000 },
          ]}
          aboutText="Top up Magic Chess: Go Go dari Moonton. Masukkan User ID dan Zone ID kamu, pilih nominal token atau pass, lalu bayar — pesanan diproses otomatis tanpa perlu login akun."
          aboutSteps={[
            "Masukkan data akun Magic Chess: Go Go kamu dengan benar.",
            "Pilih nominal Token yang ingin dibeli.",
            "Pilih metode pembayaran favorit kamu.",
            "Klik Beli Sekarang dan selesaikan pembayaran.",
            "Token masuk otomatis ke akun, biasanya kurang dari 1 menit.",
          ]}
          summaryGame="Magic Chess: Go Go"
        />
      </main>
      <Footer variant="game" />
    </>
  );
}
