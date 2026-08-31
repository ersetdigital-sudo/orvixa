import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameDetailPage from "@/components/GameDetailPage";

export const metadata: Metadata = {
  title: "Top Up Mobile Legends Murah & Instan — Diamond | ORVIXA GAMING",
  description: "Top up Mobile Legends (Diamond) murah dan terpercaya di ORVIXA GAMING. Proses otomatis 24 jam, cukup masukkan User ID, bayar dengan QRIS, e-wallet, atau Virtual Account.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <GameDetailPage
          title="Mobile Legends: Bang Bang"
          description="Top up diamond Mobile Legends: Bang Bang langsung ke User ID kamu tanpa login."
          canonical="https://orvixagaming.net/mobile-legends"
          heroImage="/images/3f4dc619-cefc-4b2a-9dce-54e6ef9c20da.jpg"
          iconImage="/images/3f4dc619-cefc-4b2a-9dce-54e6ef9c20da.jpg"
          badge="Best Seller"
          gameName="Mobile Legends"
          publisher="Moonton"
          item="Diamond"
          startPrice="Rp3.000"
          fields={[
            { label: "User ID", placeholder: "Contoh: 123456789" },
            { label: "Zone ID", placeholder: "Contoh: 1234" },
          ]}
          fieldHelp="Zone ID ada di dalam kurung setelah User ID pada profil game kamu. Contoh: 123456789 (1234)."
          nominals={[
            { label: "5 Diamond", price: 3000 },
            { label: "12 Diamond", price: 4000 },
            { label: "19 Diamond", price: 6000 },
            { label: "28 Diamond", price: 8500 },
            { label: "44 Diamond", price: 13000 },
            { label: "59 Diamond", price: 17000 },
            { label: "85 Diamond", price: 24000 },
            { label: "170 Diamond", price: 47000 },
            { label: "240 Diamond", price: 66000 },
            { label: "296 Diamond", price: 81000 },
            { label: "568 Diamond", price: 154000 },
            { label: "875 Diamond", price: 229000 },
          ]}
          aboutText="Top up diamond Mobile Legends: Bang Bang langsung ke User ID kamu tanpa login. Cukup masukkan User ID dan Zone ID, pilih nominal diamond, lalu bayar — diamond masuk otomatis dalam hitungan detik."
          aboutSteps={[
            "Masukkan data akun Mobile Legends kamu dengan benar.",
            "Pilih nominal Diamond yang ingin dibeli.",
            "Pilih metode pembayaran favorit kamu.",
            "Klik Beli Sekarang dan selesaikan pembayaran.",
            "Diamond masuk otomatis ke akun, biasanya kurang dari 1 menit.",
          ]}
          summaryGame="Mobile Legends"
        />
      </main>
      <Footer variant="game" />
    </>
  );
}
