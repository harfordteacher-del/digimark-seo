# Digital Marketing & SEO Medan

Ruang kerja AI untuk membantu pengembangan ditafebiyanpratiwi.com: SEO, strategi konten, copywriting, dan optimasi konversi.

## Skill yang terpasang

| Skill | Kegunaan |
| --- | --- |
| `seo-audit` | Audit technical SEO, on-page, indexing, dan SEO lokal |
| `content-strategy` | Pemetaan topik, keyword, dan kalender konten |
| `copywriting` | Copy homepage dan landing page layanan |
| `cro` | Evaluasi CTA, formulir, dan alur konversi |
| `schema` | Pemilihan serta validasi structured data |

Kelima skill tersimpan di `.agents/skills/`, lengkap dengan seluruh file referensi dan evals dari masing-masing folder upstream. Panduan SEO lokal tersedia di `.agents/skills/seo-audit/references/local-seo.md`.

## Cara menggunakan di Codex

1. Hubungkan atau buka repo ini sebagai lingkungan kerja Codex.
2. Mulai tugas baru dengan repo ini agar daftar skill dapat dimuat.
3. Sebutkan skill dan tugasnya secara eksplisit. Contoh:

> Gunakan $seo-audit untuk mengaudit https://ditafebiyanpratiwi.com. Fokus keyword digital marketing Medan. Sertakan bukti, prioritas perbaikan, dan batasan data.

> Gunakan $content-strategy untuk menyusun kalender konten 30 hari bagi jasa digital marketing, kursus, dan konsultasi di Medan. Pisahkan rencana artikel dan halaman layanan. Jangan mengarang volume pencarian.

> Gunakan $copywriting dan $cro untuk menyusun homepage Elementor Free dengan CTA konsultasi WhatsApp. Baca .agents/product-marketing.md terlebih dahulu.

> Gunakan $schema untuk meninjau schema Yoast dan merekomendasikan Person, Service, serta BreadcrumbList jika sesuai. Periksa dukungan Google terkini dan hindari duplikasi.

Jika skill belum tampil, mulai sesi baru di repo ini. Sebagai alternatif, minta agen membaca file `SKILL.md` yang dituju secara eksplisit.

## Konteks website

- Brand: Dita Febiyan Pratiwi.
- Website: https://ditafebiyanpratiwi.com.
- Bahasa: Indonesia; target utama Medan, Sumatera Utara.
- Platform: WordPress, Elementor Free, Hostinger.
- Tujuan: inquiry layanan freelance, minat kursus, dan konsultasi.
- Konteks lebih lengkap: [.agents/product-marketing.md](.agents/product-marketing.md).

Repo ini berisi instruksi kerja AI, bukan plugin WordPress dan belum berisi source code website. Pemasangan skill tidak menghubungkan akun WordPress, GA4, GSC, atau akun iklan secara otomatis. Perubahan website live mengikuti otorisasi pemilik.

## Biaya dan sumber

File skill berlisensi MIT dan tidak memerlukan pembelian lisensi. Kuota AI serta biaya alat atau API pihak ketiga terpisah. Mulai dengan halaman publik dan ekspor data dari alat gratis atau akun yang sudah dimiliki; fitur berbayar bersifat opsional.

Sumber: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), dipin ke [commit 5b2b400](https://github.com/coreyhaines31/marketingskills/commit/5b2b400eec1e7e1cec76245a715d0b0d4fd2a9c1). File upstream disalin tanpa modifikasi.

- [Lisensi upstream](.agents/skills/marketingskills.LICENSE)
- [Daftar sumber dan checksum Git](.agents/skills/SOURCES.json)

Skill lain yang disebut pada bagian Related Skills belum ikut dipasang. Pasang hanya bila diperlukan untuk tugas berikutnya.
