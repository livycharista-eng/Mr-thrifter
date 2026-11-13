// =========================================================
// MR THRIFTER — EXPRESS REST API
// Backend ringan menggunakan Express dan file JSON sebagai
// penyimpanan lokal, sehingga tidak memerlukan database eksternal.
// =========================================================

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_FILE = path.join(__dirname, "database.json");

// Middleware CORS mengizinkan frontend dari origin berbeda mengakses API.
// express.json() membaca request body berformat JSON.
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname)));

// Membaca database. Jika file belum ada atau rusak, gunakan array kosong.
function readDatabase() {
  try {
    if (!fs.existsSync(DATABASE_FILE)) {
      fs.writeFileSync(DATABASE_FILE, JSON.stringify([], null, 2));
    }
    const rawData = fs.readFileSync(DATABASE_FILE, "utf8");
    const parsed = JSON.parse(rawData || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Gagal membaca database.json:", error.message);
    return [];
  }
}

// Menulis seluruh data ke file JSON secara sinkron agar operasi sederhana konsisten.
function writeDatabase(items) {
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(items, null, 2), "utf8");
}

// Memvalidasi data minimum sebelum listing disimpan.
function validateItem(item) {
  if (!item || typeof item !== "object") return "Body harus berupa object JSON.";
  if (!String(item.title || "").trim()) return "Nama barang wajib diisi.";
  if (!["sale", "rent", "barter"].includes(item.type)) return "Jenis transaksi tidak valid.";
  if (!String(item.seller || "").trim()) return "Nama penjual wajib diisi.";
  if (!String(item.location || "").trim()) return "Lokasi barang wajib diisi.";
  if (item.type === "sale") {
    if (!(Number(item.listedPrice) > 0)) return "Harga jual harus lebih dari nol.";
    if (item.discountPrice && !(Number(item.discountPrice) > 0 && Number(item.discountPrice) < Number(item.listedPrice))) {
      return "Harga diskon harus positif dan di bawah harga normal.";
    }
  }
  if (item.type === "rent" && !(Number(item.rentalPrice) > 0)) return "Tarif sewa harus lebih dari nol.";
  if (item.type === "barter" && !String(item.wantedItem || "").trim()) return "Barang yang diinginkan wajib diisi untuk barter.";
  return null;
}

// GET /api/items — mengirim seluruh listing yang tersimpan.
app.get("/api/items", (req, res) => {
  res.json(readDatabase());
});

// POST /api/items — menambahkan listing baru ke database.json.
app.post("/api/items", (req, res) => {
  const validationError = validateItem(req.body);
  if (validationError) return res.status(400).json({ error: validationError });

  const items = readDatabase();
  const newItem = {
    ...req.body,
    id: req.body.id || `item-${Date.now()}`,
    status: req.body.status || "Available",
    createdAt: req.body.createdAt || new Date().toISOString()
  };

  items.unshift(newItem);
  try {
    writeDatabase(items);
    return res.status(201).json(newItem);
  } catch (error) {
    console.error("Gagal menyimpan listing:", error.message);
    return res.status(500).json({ error: "Listing gagal disimpan ke database." });
  }
});

// DELETE /api/items/:id — menghapus listing berdasarkan ID.
app.delete("/api/items/:id", (req, res) => {
  const items = readDatabase();
  const filteredItems = items.filter((item) => String(item.id) !== String(req.params.id));

  if (filteredItems.length === items.length) {
    return res.status(404).json({ error: "Barang tidak ditemukan." });
  }

  try {
    writeDatabase(filteredItems);
    return res.json({ message: "Barang berhasil dihapus." });
  } catch (error) {
    console.error("Gagal menghapus listing:", error.message);
    return res.status(500).json({ error: "Barang gagal dihapus." });
  }
});

// Endpoint status sederhana untuk memeriksa apakah backend hidup.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Mr Thrifter API" });
});

// Menjalankan server pada port lokal (untuk development lokal)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Mr Thrifter API berjalan di http://localhost:${PORT}`);
  });
}

// WAJIB ADA: Mengekspor app agar dapat dijalankan sebagai Serverless Function di Vercel
module.exports = app;
