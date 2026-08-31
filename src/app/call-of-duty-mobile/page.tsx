import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameDetailPage from "@/components/GameDetailPage";

export const metadata: Metadata = {
  title: "Top Up Call of Duty Mobile Murah & Instan — CP | ORVIXA GAMING",
  description: "Top up Call of Duty Mobile (CP) murah dan terpercaya di ORVIXA GAMING. Proses otomatis 24 jam, cukup masukkan User ID, bayar dengan QRIS, e-wallet, atau Virtual Account.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <GameDetailPage
          title="Call of Duty: Mobile"
          description="Top up CP (COD Points) Call of Duty: Mobile dengan harga terbaik."
          canonical="https://orvixagaming.net/call-of-duty-mobile"
          heroImage="https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg"
          iconImage="https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg"
          badge="Hot"
          gameName="Call of Duty Mobile"
          publisher="Activision"
          item="CP"
          startPrice="Rp16.000"
          fields={[
            { label: "Open ID", placeholder: "Contoh: 1234567890123456" },
          ]}
          fieldHelp="Open ID bisa dilihat di menu Settings > Account > COPY OPEN ID di dalam game."
          nominals={[
            { label: "80 CP", price: 16000 },
            { label: "160 CP", price: 31000 },
            { label: "240 CP", price: 46000 },
            { label: "420 CP", price: 78000 },
            { label: "880 CP", price: 157000 },
            { label: "1760 CP", price: 309000 },
            { label: "2400 CP", price: 419000 },
            { label: "5000 CP", price: 849000 },
            { label: "Battle Pass", price: 99000 },
          ]}
          aboutText="Top up CP (COD Points) Call of Duty: Mobile dengan harga terbaik. Masukkan Open ID akun kamu, pilih paket CP, dan selesaikan pembayaran — CP masuk otomatis."
          aboutSteps={[
            "Masukkan data akun Call of Duty Mobile kamu dengan benar.",
            "Pilih nominal CP yang ingin dibeli.",
            "Pilih metode pembayaran favorit kamu.",
            "Klik Beli Sekarang dan selesaikan pembayaran.",
            "CP masuk otomatis ke akun, biasanya kurang dari 1 menit.",
          ]}
          summaryGame="Call of Duty Mobile"
        />
      </main>
      <Footer variant="game" />
    </>
  );
}
