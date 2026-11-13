# Mr Thrifter

> **Buy, Rent, Exchange — Make Student Life More Affordable.**

ThriftOper adalah nama proyek kompetisi untuk **Mr Thrifter**, sebuah konsep *student marketplace* yang membantu mahasiswa membeli, menjual, menyewakan, dan menukarkan barang pre-loved kebutuhan kuliah maupun gaya hidup. Platform ini mendorong penggunaan barang yang lebih optimal dan membantu mahasiswa mengelola pengeluaran.

## 1. Identitas Tim

- **Nama aplikasi:** Mr Thrifter
- **Kompetisi:** Web Design COMMIT 2026
- **Tema:** Optimasi Keuangan dan Gaya Hidup
- **Nama tim:** `belum ada nama grup`

### Anggota dan pembagian peran

| No. | Nama anggota | Peran / tanggung jawab |
|---|---|---|
| 1 | `Samuel Lukas Pratama` 
| 2 | `Nadhifa Azka Sherin`
| 3 | `Livy Charista Darlene Ferdianto` 

## 2. Deskripsi Proyek

Mr Thrifter merupakan marketplace berbasis komunitas mahasiswa yang menyediakan tiga pilihan transaksi:

- **Jual/Beli (Buy & Sell):** mahasiswa dapat mempublikasikan barang pre-loved dan menghubungi penjual melalui WhatsApp.
- **Sewa (Rent & Lend):** pemilik dapat menawarkan barang dengan tarif per jam, hari, atau minggu; calon penyewa menghubungi pemilik untuk membahas periode dan ketersediaan.
- **Barter (Exchange):** pengguna dapat menawarkan barang dan menjelaskan barang yang diinginkan sebagai tukaran.
- **Smart Price Recommendation:** sistem rule-based menghitung rentang estimasi harga berdasarkan harga beli baru dan kondisi barang.
- **Discount System & Filter:** penjual dapat memasukkan harga diskon dan pembeli dapat memfilter barang berdasarkan ambang diskon.
- **Student Savings Calculator:** kalkulator simulasi selisih harga barang baru dan pre-loved.
- **Search & Filter:** pencarian nama/deskripsi, kategori, kondisi, lokasi, harga maksimum, jenis transaksi, dan diskon.

## 3. Teknologi

### Front-End
- HTML5 — struktur halaman dan form.
- CSS3 — desain responsif, CSS Variables, dan komponen UI.
- Vanilla JavaScript — filter, kalkulator, rekomendasi harga, WhatsApp, dan komunikasi REST API.
- `localStorage` — fallback penyimpanan lokal ketika backend tidak tersedia.

### Back-End
- Node.js — runtime JavaScript.
- Express.js — REST API.
- `cors` — mengizinkan frontend mengakses API dari origin berbeda.
- `express.json()` — membaca request JSON.
- `database.json` — penyimpanan data sederhana berbasis file JSON.

## 4. Struktur Folder

```text
mr-thrifter/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── database.json
└── README.md
```

## 5. Instalasi dan Menjalankan Proyek

### Prasyarat
- Browser modern (Chrome, Edge, Firefox, atau Safari).
- Node.js versi 18 atau lebih baru untuk menjalankan backend.
- npm (biasanya sudah termasuk dalam instalasi Node.js).

### A. Menjalankan Front-End saja

1. Unduh atau clone repository.
2. Buka folder proyek.
3. Jalankan `index.html` dengan Live Server di VS Code, atau gunakan server statis sederhana.
4. Alternatif melalui terminal, dari folder proyek jalankan:

   ```bash
   npx serve .
   ```

5. Buka alamat lokal yang ditampilkan oleh terminal.

Jika backend tidak berjalan, katalog menggunakan data awal dan `localStorage`. Data listing yang dibuat melalui mode fallback tersimpan pada browser/perangkat yang sama dan tidak otomatis tersinkronisasi dengan perangkat lain.

### B. Menjalankan Front-End + Back-End

1. Pastikan Node.js dan npm sudah terpasang.
2. Buka terminal di folder proyek.
3. Instal dependensi:

   ```bash
   npm install
   ```

4. Jalankan backend:

   ```bash
   npm start
   ```

5. Backend aktif pada `http://localhost:3000`.
6. Jalankan frontend menggunakan Live Server atau server statis pada terminal lain.
7. Buka halaman frontend di browser. Frontend akan mencoba mengambil data dari `http://localhost:3000/api/items`.

### Endpoint REST API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/items` | Mengambil seluruh listing |
| POST | `/api/items` | Menambahkan listing baru |
| DELETE | `/api/items/:id` | Menghapus listing berdasarkan ID |
| GET | `/api/health` | Memeriksa status server |

Contoh request POST:

```json
{
  "title": "Kalkulator scientific",
  "type": "sale",
  "category": "Elektronik",
  "condition": "rarely",
  "location": "Area kampus",
  "seller": "Nama Mahasiswa",
  "phone": "62812xxxxxxxx",
  "listedPrice": 150000
}
```

## 6. Website Deployment

- **Live website:** `[Masukkan URL website yang sudah di-deploy]`
- **Repository GitHub:** `https://github.com/livycharista-eng/Mr-thrifter`

> Catatan: frontend statis dapat di-deploy pada layanan hosting statis. Agar fitur sinkronisasi data berjalan untuk semua pengguna, backend juga harus di-deploy pada server yang dapat diakses publik dan nilai `API_URL` di `script.js` perlu disesuaikan dengan URL backend tersebut. `localStorage` hanya menjadi fallback lokal pada browser pengguna.

## 7. Penggunaan AI, Starter Code, dan Aset Pihak Ketiga

### Penggunaan AI
AI (ChatGPT dan Gemini) digunakan sebagai alat bantu dalam proses pengembangan, khususnya untuk:
- Membantu menyusun struktur awal HTML, CSS, dan JavaScript.
- Membantu merancang alur logika filter, kalkulator, rekomendasi harga, dan integrasi REST API.

Seluruh kode dan hasil implementasi tetap ditinjau, diuji, dan dipahami oleh anggota tim sebelum dipresentasikan dan dikumpulkan. Penggunaan AI tidak dimaksudkan untuk menggantikan proses validasi dan tanggung jawab tim atas hasil akhir.

### Starter code
- Proyek ini menggunakan struktur HTML, CSS, dan JavaScript mandiri.
- Backend menggunakan pola REST API sederhana dengan Express.js.
- Tidak menggunakan template marketplace komersial sebagai starter code. 

### Aset pihak ketiga
- **Font:** [Google Fonts](https://fonts.google.com/) — DM Sans dan Manrope.
- **Foto demo:** [Unsplash](https://unsplash.com/) — gambar produk/ilustrasi pada katalog dan hero. Ganti dengan foto produk asli atau aset yang memiliki izin penggunaan sebelum peluncuran final.
- **Ikon:** simbol sederhana berbasis karakter Unicode dan CSS; tidak menggunakan library ikon eksternal pada versi ini.

## 8. Petunjuk Tambahan dan Keterbatasan

- Nomor WhatsApp pada `script.js` dan data demo harus diganti dengan nomor kontak yang benar. Data seed memakai nomor contoh dan bukan kontak penjual sungguhan.
- Transaksi, pembayaran, dan diskusi detail diarahkan ke WhatsApp. Aplikasi belum memiliki payment gateway otomatis atau real-time chat internal.
- Form rental pada versi demo mencatat listing dan mengarahkan calon penyewa ke WhatsApp; kalender ketersediaan dan persetujuan rental terstruktur belum tersedia.
- Barter mengarahkan pengguna untuk mendiskusikan penawaran melalui WhatsApp; sistem accept/reject dan riwayat barter belum diimplementasikan.
- Login, verifikasi mahasiswa, profil pengguna persisten, rating, favorit, dan riwayat aktivitas belum tersedia pada MVP front-end ini.
- Backend menggunakan file JSON untuk demonstrasi lokal. Untuk produksi dengan banyak pengguna, gunakan database persisten seperti PostgreSQL/SQLite, autentikasi, validasi keamanan, pembatasan akses, dan backup.
- `localStorage` adalah fallback per browser, bukan database bersama.
- Rekomendasi harga merupakan perhitungan rule-based dari persentase asumsi. Hasilnya bukan penilaian harga pasar dan parameter perlu diuji berdasarkan kategori barang serta data pembanding.
- Foto dari URL eksternal memerlukan koneksi internet. Untuk deployment final, gunakan aset milik tim atau sumber yang lisensinya telah diperiksa.
- Fitur hapus tersedia pada endpoint API, tetapi antarmuka katalog demo tidak menyediakan tombol hapus publik agar pengunjung tidak dapat menghapus listing sembarang. Pengelolaan listing pengguna memerlukan autentikasi dan otorisasi.

## 9. Lisensi dan Kontribusi

Proyek ini dibuat untuk kebutuhan pembelajaran dan kompetisi Web Design COMMIT 2026. Tambahkan informasi lisensi sesuai ketentuan kompetisi dan keputusan tim sebelum repository dipublikasikan.
