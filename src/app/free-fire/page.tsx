import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameDetailPage from "@/components/GameDetailPage";

export const metadata: Metadata = {
  title: "Top Up Free Fire Murah & Instan — Diamond | ORVIXA GAMING",
  description: "Top up Free Fire (Diamond) murah dan terpercaya di ORVIXA GAMING. Proses otomatis 24 jam, cukup masukkan User ID, bayar dengan QRIS, e-wallet, atau Virtual Account.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <GameDetailPage
          title="Free Fire"
          description="Top up diamond Free Fire murah dan proses instan."
          canonical="https://orvixagaming.net/free-fire"
          heroImage="/images/991b8eb7-cf5a-491a-9947-1a2ba05b45d3.jpg"
          iconImage="/images/991b8eb7-cf5a-491a-9947-1a2ba05b45d3.jpg"
          badge="Hot"
          gameName="Free Fire"
          publisher="Garena"
          item="Diamond"
          startPrice="Rp2.500"
          fields={[
            { label: "User ID", placeholder: "Contoh: 1234567890" },
          ]}
          fieldHelp="User ID Free Fire bisa dilihat di halaman profil, tepat di bawah nama karakter kamu."
          nominals={[
            { label: "5 Diamond", price: 2500 },
            { label: "12 Diamond", price: 3500 },
            { label: "50 Diamond", price: 7500 },
            { label: "70 Diamond", price: 10000 },
            { label: "100 Diamond", price: 14000 },
            { label: "140 Diamond", price: 19000 },
            { label: "210 Diamond", price: 28000 },
            { label: "355 Diamond", price: 47000 },
            { label: "720 Diamond", price: 94000 },
            { label: "1450 Diamond", price: 186000 },
            { label: "Member Mingguan", price: 29000 },
            { label: "Member Bulanan", price: 149000 },
          ]}
          aboutText="Top up diamond Free Fire murah dan proses instan. Masukkan User ID Free Fire kamu, pilih nominal diamond, selesaikan pembayaran, dan diamond langsung masuk ke akun."
          aboutSteps={[
            "Masukkan data akun Free Fire kamu dengan benar.",
            "Pilih nominal Diamond yang ingin dibeli.",
            "Pilih metode pembayaran favorit kamu.",
            "Klik Beli Sekarang dan selesaikan pembayaran.",
            "Diamond masuk otomatis ke akun, biasanya kurang dari 1 menit.",
          ]}
          summaryGame="Free Fire"
        />
      </main>
      <Footer variant="game" />
    </>
  );
}
