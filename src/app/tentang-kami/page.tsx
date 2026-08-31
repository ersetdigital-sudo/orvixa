import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tentang Kami — ORVIXA GAMING",
  description: "Kenali ORVIXA GAMING, layanan top up game dan produk digital di Indonesia dengan proses otomatis, harga transparan, dan pembayaran lengkap.",
  openGraph: { title: "Tentang Kami — ORVIXA GAMING", description: "Layanan top up game dan produk digital di Indonesia.", url: "https://orvixagaming.net/tentang-kami" },
};

export default function TentangKamiPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="wrap max-w-[720px]">
          <h1 className="font-display font-bold text-[28px] md:text-[36px] leading-tight">
            Tentang <span style={{ color: "var(--color-primary)" }}>ORVIXA</span> GAMING
          </h1>

          <div className="mt-8 space-y-5 text-[15px] md:text-[16px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
            <p>
              Industri mobile gaming di Indonesia tumbuh lebih cepat dari yang banyak orang sadari. Dengan lebih dari 200 juta pemain aktif dan valuasi pasar yang menembus USD 2 miliar di tahun 2026, kebutuhan akan layanan top up yang cepat dan terpercaya bukan lagi sekadar kenyamanan — ini sudah jadi kebutuhan utama.
            </p>
            <p>
              Masalahnya, banyak pemain masih harus berurusan dengan proses yang ribet: harga yang tidak transparan, waktu tunggu yang tidak pasti, sampai rasa was-was apakah uang yang sudah dikirim benar-benar akan masuk ke akun game mereka. Belum lagi metode pembayaran yang terbatas — tidak semua orang punya kartu kredit, dan tidak semua platform menerima QRIS atau e-wallet yang sudah jadi andalan sebagian besar pengguna digital Indonesia.
            </p>
            <p>
              ORVIXA GAMING hadir dari frustrasi itu. Kami ingin pemain game di Indonesia punya tempat yang bisa diandalkan untuk top up — tanpa perlu login, tanpa perlu khawatir data bocor, dan tanpa perlu menunggu berjam-jam. Cukup pilih game, masukkan User ID, pilih nominal, bayar, dan diamond atau item langsung masuk. Semuanya diproses secara otomatis, 24 jam sehari, 7 hari seminggu.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-display font-bold text-[20px] md:text-[24px]">Kenapa Pilih ORVIXA?</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { icon: "⚡", title: "Proses Otomatis", desc: "Transaksi diproses instan tanpa perlu konfirmasi manual. Masukkan data, bayar, selesai." },
                { icon: "💰", title: "Harga Transparan", desc: "Harga yang kamu lihat adalah harga yang kamu bayar. Tidak ada biaya tersembunyi." },
                { icon: "🕐", title: "Layanan 24/7", desc: "Top up kapan saja — tengah malam atau pagi hari, sistem kami selalu aktif." },
                { icon: "🔒", title: "Transaksi Aman", desc: "Tidak perlu akun atau login. Data minimal, keamanan maksimal." },
              ].map((item, i) => (
                <div key={i} className="card p-5">
                  <div className="text-[24px]">{item.icon}</div>
                  <h3 className="mt-3 font-display font-semibold text-[15px]">{item.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 card p-6 text-center">
            <h2 className="font-display font-bold text-[18px] md:text-[20px]">Siap Top Up?</h2>
            <p className="mt-2 text-[14px]" style={{ color: "var(--color-muted)" }}>
              Pilih game favorit kamu dan mulai transaksi sekarang.
            </p>
            <Link href="/" className="btn btn-primary mt-4 inline-flex h-11 px-6 text-[14px] font-semibold">
              Top Up Sekarang
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
