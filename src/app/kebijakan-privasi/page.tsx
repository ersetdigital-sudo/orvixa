import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — ORVIXA GAMING",
  description: "Kebijakan privasi ORVIXA GAMING mengenai pengumpulan, penggunaan, dan perlindungan data pengguna.",
  openGraph: { title: "Kebijakan Privasi — ORVIXA GAMING", description: "Kebijakan privasi ORVIXA GAMING.", url: "https://orvixagaming.net/kebijakan-privasi" },
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="wrap max-w-[720px]">
          <h1 className="font-display font-bold text-[28px] md:text-[36px] leading-tight">
            Kebijakan Privasi
          </h1>
          <p className="mt-3 text-[14px]" style={{ color: "var(--color-muted)" }}>
            Terakhir diperbarui: Agustus 2026
          </p>

          <div className="mt-8 space-y-8 text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">1. Data Yang Kami Kumpulkan</h2>
              <p>
                ORVIXA GAMING dirancang untuk digunakan tanpa akun atau proses login. Kami hanya mengumpulkan data yang benar-benar diperlukan untuk memproses transaksi Anda, yaitu:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong>User ID game</strong> — diperlukan untuk mengirim item atau mata uang digital ke akun game Anda.</li>
                <li><strong>Informasi kontak</strong> — seperti alamat email atau nomor WhatsApp, yang digunakan untuk mengirim notifikasi status pesanan dan konfirmasi transaksi.</li>
                <li><strong>Data transaksi</strong> — informasi mengenai produk yang dibeli, nominal, dan metode pembayaran yang digunakan.</li>
                <li><strong>Data teknis</strong> — seperti alamat IP, jenis perangkat, dan browser yang digunakan saat mengakses situs, yang dikumpulkan secara otomatis untuk keperluan keamanan dan peningkatan layanan.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">2. Penggunaan Data</h2>
              <p>Data yang kami kumpulkan digunakan untuk:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Memproses pesanan dan mengirim item ke akun game Anda.</li>
                <li>Mengirim notifikasi status transaksi (berhasil, gagal, atau perlu tindakan lanjut).</li>
                <li>Menyediakan layanan pelanggan jika ada kendala dengan pesanan.</li>
                <li>Mendeteksi dan mencegah aktivitas penipuan atau penyalahgunaan.</li>
                <li>Meningkatkan kualitas layanan dan pengalaman pengguna di situs kami.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">3. Penyimpanan &amp; Keamanan Data</h2>
              <p>
                Kami menyimpan data transaksi hanya selama diperlukan untuk keperluan operasional dan kewajiban hukum. Data disimpan pada infrastruktur yang aman dengan enkripsi standar industri. Kami tidak menyimpan data pembayaran sensitif (seperti nomor kartu kredit) di server kami — semua proses pembayaran ditangani oleh payment gateway pihak ketiga yang sudah terverifikasi.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">4. Berbagi Data dengan Pihak Ketiga</h2>
              <p>
                Kami membagikan data Anda hanya kepada pihak yang benar-benar diperlukan untuk menjalankan layanan, termasuk:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong>Payment gateway</strong> — untuk memproses pembayaran Anda.</li>
                <li><strong>Sistem game</strong> — User ID game dikirim ke server game terkait untuk mengirim item yang dibeli.</li>
                <li><strong>Penyedia notifikasi</strong> — untuk mengirim status pesanan melalui email atau WhatsApp.</li>
              </ul>
              <p className="mt-3">
                Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda untuk keperluan pemasaran pihak ketiga.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">5. Hak Pengguna</h2>
              <p>Sebagai pengguna, Anda memiliki hak untuk:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Meminta informasi mengenai data apa saja yang kami simpan tentang Anda.</li>
                <li>Meminta penghapusan data pribadi Anda dari sistem kami, sejauh yang tidak bertentangan dengan kewajiban hukum atau operasional yang sedang berjalan.</li>
                <li>Menolak penggunaan data Anda untuk keperluan tertentu yang tidak berkaitan langsung dengan layanan.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">6. Cookie &amp; Teknologi Pelacakan</h2>
              <p>
                Situs kami menggunakan cookie untuk keperluan fungsional (seperti menjaga preferensi pengguna) dan analitik (untuk memahami bagaimana pengguna berinteraksi dengan situs). Anda dapat mengatur browser Anda untuk menolak cookie, namun beberapa fitur situs mungkin tidak berfungsi optimal.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">7. Perubahan Kebijakan</h2>
              <p>
                Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan akan dipublikasikan pada halaman ini beserta tanggal pembaruan terakhir. Pengguna disarankan untuk memeriksa halaman ini secara berkala.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-[18px] text-[var(--color-text)] mb-3">8. Hubungi Kami</h2>
              <p>
                Jika ada pertanyaan atau kekhawatiran mengenai kebijakan privasi ini, silakan hubungi kami melalui saluran dukungan pelanggan yang tersedia di situs ini.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
