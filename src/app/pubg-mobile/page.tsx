import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameDetailPage from "@/components/GameDetailPage";

export const metadata: Metadata = {
  title: "Top Up PUBG Mobile Murah & Instan — UC | ORVIXA GAMING",
  description: "Top up PUBG Mobile (UC) murah dan terpercaya di ORVIXA GAMING. Proses otomatis 24 jam, cukup masukkan User ID, bayar dengan QRIS, e-wallet, atau Virtual Account.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <GameDetailPage
          title="PUBG Mobile"
          description="Top up UC PUBG Mobile resmi dengan harga bersaing."
          canonical="https://orvixagaming.net/pubg-mobile"
          heroImage="https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151891/mngzis7bhlj3rihx5pee.png"
          iconImage="https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151891/mngzis7bhlj3rihx5pee.png"
          badge="Populer"
          gameName="PUBG Mobile"
          publisher="Tencent"
          item="UC"
          startPrice="Rp15.000"
          fields={[
            { label: "User ID", placeholder: "Contoh: 5123456789" },
          ]}
          fieldHelp="Character ID ada di menu Profile PUBG Mobile, di bawah foto profil kamu."
          nominals={[
            { label: "60 UC", price: 15000 },
            { label: "120 UC", price: 29000 },
            { label: "180 UC", price: 43000 },
            { label: "325 UC", price: 71000 },
            { label: "385 UC", price: 84000 },
            { label: "660 UC", price: 140000 },
            { label: "720 UC", price: 152000 },
            { label: "985 UC", price: 210000 },
            { label: "1800 UC", price: 349000 },
            { label: "3850 UC", price: 699000 },
            { label: "8100 UC", price: 1399000 },
            { label: "16000 UC", price: 2699000 },
          ]}
          aboutText="Top up UC PUBG Mobile resmi dengan harga bersaing. Cukup masukkan Character ID, pilih paket UC, dan bayar lewat QRIS atau e-wallet — UC masuk otomatis 24 jam."
          aboutSteps={[
            "Masukkan data akun PUBG Mobile kamu dengan benar.",
            "Pilih nominal UC yang ingin dibeli.",
            "Pilih metode pembayaran favorit kamu.",
            "Klik Beli Sekarang dan selesaikan pembayaran.",
            "UC masuk otomatis ke akun, biasanya kurang dari 1 menit.",
          ]}
          summaryGame="PUBG Mobile"
        />
      </main>
      <Footer variant="game" />
    </>
  );
}
