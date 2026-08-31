import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — ORVIXA GAMING",
  description: "Syarat dan ketentuan layanan top up game dan produk digital di ORVIXA GAMING.",
  openGraph: { title: "Syarat & Ketentuan — ORVIXA GAMING", description: "Syarat dan ketentuan layanan ORVIXA GAMING.", url: "https://orvixagaming.net/syarat-ketentuan" },
};

export default function SyaratKetentuanPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="wrap max-w-[720px]">
          <h1 className="font-display font-bold text-[28px] md:text-[36px] leading-tight">
            Syarat &amp; Ketentuan
          </h1>
          <p className="mt-3 text-[14px]" style={{ color: "var(--color-muted)" }}>
            Terakhir diperbarui: Agustus 2026
          </p>

          <div className="mt-8 space-y-8 text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">1. Definisi Layanan</h2>
              <p>
                ORVIXA GAMING adalah platform penyedia layanan pengisian ulang (top up) mata uang digital dan item dalam game, serta produk digital lainnya. Layanan yang tersedia meliputi top up untuk Mobile Legends, Free Fire, PUBG Mobile, Genshin Impact, Magic Chess: Go Go, Call of Duty Mobile, serta produk digital lainnya yang dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">2. Ketentuan Pemesanan</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Pengguna wajib memastikan data yang diisi saat pemesanan sudah benar, termasuk namun tidak terbatas pada User ID game, server, dan nominal yang dipilih.</li>
                <li>ORVIXA GAMING tidak bertanggung jawab atas kesalahan input data yang dilakukan oleh pengguna. Pesanan yang sudah diproses ke sistem game tidak dapat dibatalkan atau dikembalikan.</li>
                <li>Pengguna disarankan untuk melakukan pengecekan ulang sebelum melakukan pembayaran.</li>
                <li>Harga yang tercantum pada situs sudah termasuk pajak yang berlaku dan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">3. Pembayaran &amp; Proses</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Pembayaran dapat dilakukan melalui berbagai metode yang tersedia, termasuk QRIS, e-wallet, transfer bank, dan metode lainnya yang ditampilkan pada halaman checkout.</li>
                <li>Pesanan akan diproses secara otomatis setelah pembayaran berhasil dikonfirmasi oleh sistem. Waktu proses biasanya kurang dari 1 menit, namun dapat berbeda tergantung kondisi tertentu.</li>
                <li>Pengguna akan menerima notifikasi atau bukti transaksi setelah proses selesai.</li>
                <li>ORVIXA GAMING berhak menolak atau membatalkan pesanan yang mencurigakan atau melanggar ketentuan yang berlaku.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">4. Kebijakan Pembatalan &amp; Refund</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Karena produk digital bersifat langsung terkirim (instant delivery), pembatalan tidak dapat dilakukan setelah pembayaran berhasil dan pesanan mulai diproses.</li>
                <li>Pengajuan refund hanya dapat dilakukan jika terjadi kegagalan sistem di pihak ORVIXA GAMING yang mengakibatkan item tidak masuk ke akun game, meskipun pembayaran sudah berhasil.</li>
                <li>Pengajuan refund harus dilakukan dalam waktu 1×24 jam setelah transaksi melalui saluran dukungan pelanggan yang tersedia.</li>
                <li>Refund tidak berlaku untuk kesalahan input data dari pengguna (salah ID, salah server, salah nominal).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">5. Batasan Tanggung Jawab</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>ORVIXA GAMING tidak bertanggung jawab atas kerugian yang timbul akibat kesalahan input data oleh pengguna.</li>
                <li>ORVIXA GAMING tidak bertanggung jawab atas perubahan kebijakan dari pihak pengembang game yang berdampak pada item atau mata uang digital yang sudah dibeli.</li>
                <li>ORVIXA GAMING berusaha memberikan layanan terbaik, namun tidak menjamin ketersediaan item atau nominal tertentu karena bergantung pada pihak ketiga (payment gateway dan sistem game).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">6. Perubahan Syarat &amp; Ketentuan</h2>
              <p>
                ORVIXA GAMING berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Perubahan akan berlaku efektif setelah dipublikasikan pada halaman ini. Pengguna disarankan untuk memeriksa halaman ini secara berkala.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">7. Hubungi Kami</h2>
              <p>
                Jika ada pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui saluran dukungan pelanggan yang tersedia di situs ini.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
