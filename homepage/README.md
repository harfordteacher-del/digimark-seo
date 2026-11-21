# Homepage Dita: draf WordPress + Elementor Free

Paket ini memperbaiki struktur homepage, konten, navigasi, serta rancangan tampilan desktop/mobile. Target website tetap **ditafebiyanpratiwi.com di WordPress dan Hostinger**.

## Isi paket

- `elementor-homepage.json`: template halaman native Elementor, dengan Containers, Heading, Text Editor, Image, dan Button.
- `index.html`: preview referensi yang dihasilkan dari pohon komponen dan konten yang sama. Unduh folder ini lalu buka file tersebut di browser. Foto dan Google Fonts memerlukan internet.
- `content.json`: sumber teks, navigasi, dan metadata.
- `optional.css`: CSS tambahan untuk fokus keyboard, area tombol, dan jarak paragraf; semua selector dibatasi ke `.dfp-home`.
- `seo-settings.json`: nilai yang perlu dimasukkan ke Yoast setelah halaman siap.
- `tracking.optional.js`: event klik WhatsApp opsional; tidak terpasang otomatis dan tidak melaporkan klik sebagai lead.
- `checks.json`: hasil pemeriksaan struktur secara statis dan status konfigurasi kontak.
- `build.cjs`: generator tanpa dependensi tambahan, bila ingin membuat ulang paket.

**Status: draf, belum diterapkan ke website live.** Pemeriksaan statis tidak sama dengan keberhasilan impor atau hasil render WordPress. Impor, tampilan aktual, formulir, tracking GA4, dan Core Web Vitals belum diuji pada instalasi WordPress pemilik.

## Perubahan dari homepage sebelumnya

- Header berada terpisah dari hero; identitas header menggunakan nama Dita.
- Anchor navigasi mengarah ke bagian yang tersedia: `#layanan`, `#pengalaman`, `#tentang`, dan `#konsultasi`.
- Layanan freelance, kursus, dan konsultasi ditempatkan setelah hero.
- Heading utama menyebut digital marketing Medan, dan elemen H1 kosong dihilangkan.
- Struktur menggunakan satu H1, H2 untuk bagian, dan H3 untuk isi kartu.
- Empat gambar placeholder keahlian diganti dengan penjelasan pekerjaan yang ringkas.
- Tipografi memakai Plus Jakarta Sans dan Inter dengan body mobile 16–17 px serta label minimal 14 px.
- Warna navy, putih, dan gold mengikuti brief pemilik.
- Pengalaman proyek ditulis sebagai lingkup pekerjaan. Ranking, rating, hasil iklan, serta testimoni yang belum dibuktikan tidak ditambahkan.

## Sebelum mengimpor

1. Buat backup file dan database melalui fasilitas hosting yang tersedia. Pastikan Anda tahu cara memulihkannya.
2. Pastikan Elementor Free aktif. Paket tidak membutuhkan Elementor Pro atau widget add-on berbayar.
3. Selesaikan konfigurasi nomor WhatsApp. Lihat `contactConfigured` di `checks.json`. `publishReady` tetap `false` karena pemeriksaan WordPress serta persetujuan pemilik belum selesai.
4. Simpan homepage lama dan pengaturan halaman depan saat ini sebagai referensi. Jangan menghapus halaman lama.

## Mengimpor ke halaman draf

1. Di WordPress, buka **Templates → Saved Templates → Import Templates**, lalu pilih `elementor-homepage.json`. Letak menu dapat berbeda menurut versi Elementor. Alternatifnya, gunakan ikon folder pada editor Elementor, tab **My Templates**, lalu opsi impor.
2. Buat halaman baru bernama **Homepage Baru — Draf**. Simpan sebagai **Draft**.
3. Pada pengaturan halaman pilih **Elementor Canvas**. Paket mempunyai header/footer sendiri pada halaman ini, sehingga header Astra lama tidak menimpa hero. Pilihan Canvas berlaku pada halaman tersebut.
4. Buka **Edit with Elementor**, masukkan template dari **My Templates**, lalu periksa tiap bagian. Jangan menerapkan Site Settings atau mengubah global kit selama meninjau halaman draf.
5. Pada gambar, pilih kembali foto Dita dari Media Library bila perlu. Isi alt: **Dita Febiyan Pratiwi, Digital Marketing dan SEO Strategist di Medan**. Pastikan foto tampil tanpa gambar pengganti.
6. Jika jarak paragraf atau fokus tombol perlu diselaraskan, tambahkan `optional.css` melalui Additional CSS WordPress. CSS ini dibatasi ke halaman dengan kelas `.dfp-home`.
7. Gunakan preview halaman draf untuk memeriksa hasil. Preview HTML adalah referensi desain; tampilan impor dapat dipengaruhi theme, kit Elementor, font, dan versi plugin.

## Nomor WhatsApp

Nomor pemilik belum tersedia pada saat paket disusun. Paket yang belum dikonfigurasi menampilkan catatan draf di bagian konsultasi dan menggunakan anchor bagian tersebut untuk CTA awal. Tidak ada nomor contoh yang dipasang.

Setelah nomor dikonfirmasi, jalankan dari folder repo:

```bash
DFP_WHATSAPP=nomor_internasional_yang_sudah_dikonfirmasi node homepage/build.cjs
```

Nilai nomor menggunakan kode negara dan digit saja. Jangan menjalankan contoh di atas sebelum mengganti nilainya. Generator menolak nilai yang bukan nomor internasional berbentuk digit. Nomor publik akan terlihat di tautan WhatsApp, sesuai fungsi tombol website.

Generator membuat ulang seluruh link CTA layanan, hero, dan konsultasi. Tautan membuka WhatsApp dengan pesan awal yang bisa diedit pengunjung; pesan tidak dikirim otomatis. Bagian `contactConfigured` berubah menjadi `true` setelah nomor terisi. `publishReady` tetap `false` sampai pemeriksaan WordPress dan persetujuan pemilik selesai.

## SEO di Yoast

Masukkan nilai dari `seo-settings.json` setelah halaman final:

- SEO title: **Digital Marketing Medan | Dita Febiyan Pratiwi**.
- Meta description: **Jasa digital marketing Medan bersama Dita Febiyan Pratiwi. Bahas kebutuhan SEO, Google Ads, Meta Ads, optimasi website, kursus, dan konsultasi bisnis Anda.**
- Homepage canonical final: `https://ditafebiyanpratiwi.com/`.
- Open Graph image: foto Dita yang digunakan pada halaman.

Preview HTML sengaja menggunakan `noindex,nofollow`; file itu bukan halaman produksi. Template Elementor tidak mengimpor metadata Yoast, canonical, robots, sitemap, atau konfigurasi WordPress secara otomatis. Halaman draf harus tetap draf selama peninjauan.

Yoast sudah menghasilkan schema pada website sebelumnya. Periksa ulang sebelum menambahkan Person, Service, atau BreadcrumbList; hindari duplikasi identitas. Jangan menambahkan rating, alamat kantor, atau capaian yang belum terverifikasi. Pemetaan keyword merupakan arahan brief pemilik, belum hasil riset volume atau evaluasi SERP terbaru.

Homepage menjadi pengantar layanan. Buat halaman khusus jasa SEO, Google Ads, Meta Ads, kursus, dan konsultasi sebagai pekerjaan lanjutan; setelah URL tersedia, ganti CTA terkait dengan URL yang benar. Jangan menautkan ke halaman yang belum ada.

## Checklist uji WordPress sebelum publikasi

- [ ] Nomor WhatsApp benar; semua CTA membuka nomor dan pesan yang sesuai.
- [ ] Kontak draf sudah hilang; tidak ada placeholder atau catatan internal yang tampil.
- [ ] Header tidak menimpa hero; navigasi menuju bagian yang benar.
- [ ] Halaman diperiksa pada 1440, 1024, 768, dan 390 px, termasuk perangkat nyata jika tersedia.
- [ ] Tidak ada overflow horizontal, teks terpotong, tombol bertabrakan, atau gambar hilang.
- [ ] Fokus keyboard terlihat; urutan konten serta heading mudah diikuti.
- [ ] Hanya ada satu H1; judul kartu menggunakan H3.
- [ ] Informasi profil, lingkup pekerjaan, dan penggunaan nama proyek disetujui pemilik.
- [ ] Title, description, canonical, robots, dan Open Graph diperiksa pada URL final.
- [ ] Schema yang dirender diperiksa; tidak ada duplikasi atau data fiktif.
- [ ] PageSpeed dan Core Web Vitals diukur pada halaman final; belum ada skor performa yang dijanjikan.
- [ ] Backup tersedia sebelum mengganti pengaturan halaman depan.

Setelah pemilik menyetujui halaman, terapkan sebagai homepage melalui pengaturan Reading WordPress yang sesuai. Jangan menghapus homepage lama. Bersihkan cache halaman yang berubah dan uji kembali URL root, menu, kontak, serta metadata.

## Tracking opsional

`tracking.optional.js` hanya melakukan push event `whatsapp_click` ke `dataLayer` bila `window.dfpAnalyticsConsent === true`. Pengaturan tersebut harus mengikuti mekanisme persetujuan yang berlaku; file ini bukan consent manager. Tidak ada nomor telepon, isi pesan, atau identitas pengunjung yang dimasukkan ke payload.

Pasang satu kali melalui mekanisme script yang Anda kelola, lalu buat trigger/tag GA4 yang sesuai di GTM. Kode tidak memuat GTM atau GA4 secara otomatis. Uji di Preview/DebugView setelah consent. Klik WhatsApp tidak boleh dilaporkan sebagai percakapan, lead berkualitas, atau penjualan yang sudah terkonfirmasi.

## Memperbarui konten

Setelah impor, konten dan style dapat diubah melalui widget Elementor. Tidak perlu mengedit kode untuk mengganti teks, foto, atau tombol.

Untuk pembaruan berbasis repo, ubah `content.json` dan jalankan generator dengan nomor kontak yang telah dikonfirmasi. Setelah hasil diimpor ulang, ulangi pengujian. Jaga backup agar perubahan manual di Elementor tidak tertimpa tanpa sengaja.

## Referensi implementasi

- [Elementor container source](https://github.com/elementor/elementor/blob/main/includes/elements/container.php).
- [Elementor basic Button widget](https://github.com/elementor/elementor/blob/main/includes/widgets/button.php).
- [Elementor Image widget](https://github.com/elementor/elementor/blob/main/includes/widgets/image.php).
- Konteks brand: `../.agents/product-marketing.md`.

Skill `copywriting` dan `cro` digunakan untuk menyusun alur pengunjung, memperjelas penawaran, dan membatasi klaim pada informasi pemilik. Prinsip `seo-audit` digunakan untuk struktur heading, anchor, konten lokal, serta pemisahan temuan dari data yang belum tersedia.
