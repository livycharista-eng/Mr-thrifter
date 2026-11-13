# Mr Thrifter

> **Buy, Rent, Exchange — Make Student Life More Affordable.**

Mr Thrifter adalah sebuah konsep *student marketplace* yang membantu mahasiswa membeli, menjual, menyewakan, dan menukarkan barang pre-loved kebutuhan kuliah maupun gaya hidup. Platform ini mendorong penggunaan barang yang lebih optimal dan membantu mahasiswa mengelola pengeluaran.

## 1. Identitas Tim

- **Nama aplikasi:** Mr Thrifter
- **Kompetisi:** Web Design COMMIT 2026
- **Tema:** Optimasi Keuangan dan Gaya Hidup
- **Nama tim:** `belum ada nama grup`

### Anggota dan pembagian peran

| No. | Nama anggota |
|---|---|
| 1 | Samuel Lukas Pratama |
| 2 | Nadhifa Azka Sherin |
| 3 | Livy Charista Darlene Ferdianto |

## 2. Deskripsi Proyek

Mr Thrifter merupakan marketplace berbasis komunitas mahasiswa yang menyediakan tiga pilihan transaksi:

- **Jual/Beli (Buy & Sell):** mahasiswa dapat mempublikasikan barang pre-loved dan menghubungi penjual melalui WhatsApp.
- **Sewa (Rent & Lend):** pemilik dapat menawarkan barang dengan tarif per jam, hari, atau minggu; calon penyewa menghubungi pemilik untuk membahas periode dan ketersediaan.
- **Barter (Exchange):** pengguna dapat menawarkan barang dan menjelaskan barang yang diinginkan sebagai tukaran.
- **Smart Price Recommendation:** sistem *rule-based* menghitung rentang estimasi harga berdasarkan harga beli baru dan kondisi barang.
- **Discount System & Filter:** penjual dapat memasukkan harga diskon dan pembeli dapat memfilter barang berdasarkan ambang diskon.
- **Student Savings Calculator:** kalkulator simulasi selisih harga barang baru dan pre-loved.
- **Search & Filter:** pencarian nama/deskripsi, kategori, kondisi, lokasi, harga maksimum, jenis transaksi, dan diskon.

## 3. Teknologi

### Front-End

- HTML5 — struktur halaman dan form.
- CSS3 — desain responsif, CSS Variables, dan komponen UI.
- Vanilla JavaScript — pengelolaan listing, filter, kalkulator, rekomendasi harga, validasi form, dan integrasi WhatsApp.
- `localStorage` — penyimpanan data listing secara lokal pada browser pengguna.

**Catatan:** Versi final proyek menggunakan pendekatan frontend-only. Tidak menggunakan backend maupun database eksternal.

## 4. Struktur Folder

```text
mr-thrifter/
├── index.html
├── style.css
├── script.js
└── README.md
```

### Deskripsi File

- `index.html` — struktur halaman website, termasuk marketplace, kalkulator penghematan, dan form penambahan listing.
- `style.css` — mengatur tampilan, layout, komponen UI, dan responsivitas website.
- `script.js` — mengelola data produk, pencarian, filter, validasi form, kalkulator, rekomendasi harga, penyimpanan lokal, dan kontak WhatsApp.
- `README.md` — dokumentasi proyek.

## 5. Instalasi dan Menjalankan Proyek

### Prasyarat

- Browser modern (Chrome, Edge, Firefox, atau Safari).
- Visual Studio Code (opsional).
- Ekstensi Live Server (opsional).

### Menjalankan Proyek

1. Unduh atau clone repository:

   ```bash
   git clone https://github.com/livycharista-eng/Mr-thrifter.git
   ```

2. Buka folder proyek:

   ```bash
   cd Mr-thrifter
   ```

3. Buka folder tersebut menggunakan Visual Studio Code.
4. Jalankan file `index.html` menggunakan Live Server atau buka langsung melalui browser.
5. Website siap digunakan.

Tidak diperlukan instalasi dependensi, backend server, maupun konfigurasi database.

## 6. Website Deployment

- **Live website:** https://mr-thrifter-psi.vercel.app/
- **Repository GitHub:** https://github.com/livycharista-eng/Mr-thrifter

Website di-deploy menggunakan Vercel sebagai aplikasi frontend statis.

Konfigurasi deployment:
- **Framework Preset:** Other
- **Build Command:** Tidak diperlukan.
- **Output Directory:** `.`

Karena menggunakan `localStorage`, data listing disimpan pada browser masing-masing pengguna dan tidak otomatis tersinkronisasi dengan pengguna lain atau perangkat berbeda.

## 7. Penggunaan AI, Starter Code, dan Aset Pihak Ketiga

### Penggunaan AI

AI (ChatGPT dan Gemini) digunakan sebagai alat bantu dalam proses pengembangan, khususnya untuk:
- Membantu menyusun dan memperbaiki struktur HTML, CSS, dan JavaScript.
- Membantu merancang alur logika filter, kalkulator, dan rekomendasi harga.
- Membantu melakukan pemeriksaan dan perbaikan kode serta dokumentasi proyek.

Seluruh kode dan hasil implementasi tetap ditinjau, diuji, dan dipahami oleh anggota tim sebelum dipresentasikan dan dikumpulkan. Penggunaan AI tidak dimaksudkan untuk menggantikan proses validasi dan tanggung jawab tim atas hasil akhir.

### Starter Code

- Proyek ini menggunakan struktur HTML, CSS, dan JavaScript mandiri.
- Tidak menggunakan template marketplace komersial sebagai starter code.

### Aset Pihak Ketiga

- **Font:** [Google Fonts](https://fonts.google.com/) — DM Sans dan Manrope.
- **Foto demo:** [Unsplash](https://unsplash.com/) — gambar produk/ilustrasi pada katalog dan hero. Ganti dengan foto produk asli atau aset yang memiliki izin penggunaan sebelum peluncuran final.
- **Ikon:** simbol sederhana berbasis karakter Unicode dan CSS; tidak menggunakan library ikon eksternal pada versi ini.

## 
