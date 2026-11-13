
/* =========================================================
   MR THRIFTER — FRONT-END APPLICATION LOGIC
   Frontend-only demo menggunakan localStorage.
   Tidak membutuhkan backend atau database eksternal.
   ========================================================= */

// Nomor WhatsApp demo.
const DEFAULT_WA_NUMBER = "6281234567890";

// Katalog awal untuk setiap pengunjung.
const seedItems = [
  { id: "seed-1", title: "Scientific Calculator Casio fx-991EX", type: "sale", category: "Elektronik", condition: "rarely", description: "Kalkulator original, semua tombol berfungsi, lengkap dengan hard case.", location: "Bulaksumur, Yogyakarta", seller: "Nadia Putri", phone: DEFAULT_WA_NUMBER, originalPrice: 350000, listedPrice: 235000, discountPrice: 220000, image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=700&q=80" },
  { id: "seed-2", title: "Textbook Introduction to Algorithms", type: "sale", category: "Buku", condition: "sometimes", description: "Buku referensi algoritma, halaman lengkap dengan sedikit highlight.", location: "Gejayan, Yogyakarta", seller: "Raka Aditya", phone: DEFAULT_WA_NUMBER, originalPrice: 280000, listedPrice: 145000, discountPrice: 125000, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80" },
  { id: "seed-3", title: "Kamera Mirrorless untuk Weekend", type: "rent", category: "Elektronik", condition: "rarely", description: "Kamera siap pakai untuk dokumentasi tugas dan kegiatan kampus.", location: "Sagan, Yogyakarta", seller: "Alya Rahma", phone: DEFAULT_WA_NUMBER, rentalPrice: 75000, rentalUnit: "day", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80" },
  { id: "seed-4", title: "Kemeja Flanel Oversized", type: "barter", category: "Fashion", condition: "rarely", description: "Ukuran M-L, warna earth tone, masih sangat layak pakai.", wantedItem: "Totebag kanvas atau buku fiksi", location: "Condongcatur, Yogyakarta", seller: "Dimas Fajar", phone: DEFAULT_WA_NUMBER, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80" },
  { id: "seed-5", title: "Drawing Tablet Huion H640P", type: "sale", category: "Perlengkapan Kuliah", condition: "rarely", description: "Cocok untuk desain dan catatan digital. Pen dan kabel tersedia.", location: "Kaliurang, Yogyakarta", seller: "Salsa N.", phone: DEFAULT_WA_NUMBER, originalPrice: 850000, listedPrice: 590000, image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=700&q=80" },
  { id: "seed-6", title: "Tripod Kamera 160 cm", type: "rent", category: "Elektronik", condition: "sometimes", description: "Tripod stabil, cocok untuk produksi video tugas kelompok.", location: "Pogung, Yogyakarta", seller: "Fikri Maulana", phone: DEFAULT_WA_NUMBER, rentalPrice: 20000, rentalUnit: "day", image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=700&q=80" },
  { id: "seed-7", title: "Backpack Canvas Daily", type: "sale", category: "Fashion", condition: "often", description: "Tas harian dengan kompartemen laptop. Ada tanda pemakaian wajar.", location: "Seturan, Yogyakarta", seller: "Mira A.", phone: DEFAULT_WA_NUMBER, originalPrice: 220000, listedPrice: 85000, discountPrice: 75000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80" },
  { id: "seed-8", title: "Buku Kalkulus Stewart", type: "barter", category: "Buku", condition: "sometimes", description: "Edisi lama, isi tetap lengkap dan cocok untuk belajar kalkulus.", wantedItem: "Buku fisika dasar atau novel", location: "Mrican, Yogyakarta", seller: "Kevin Pratama", phone: DEFAULT_WA_NUMBER, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80" }
];

// State aplikasi.
let items = [];
let activeType = "all";

const STORAGE_KEY = "mrThrifterItems";
const $ = (id) => document.getElementById(id);

// Format Rupiah.
function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

// Label kondisi barang.
function conditionLabel(condition) {
  const labels = {
    new: "New",
    rarely: "Jarang dipakai",
    sometimes: "Lumayan sering dipakai",
    often: "Sering dipakai"
  };
  return labels[condition] || "Kondisi belum diisi";
}

// Escape HTML untuk keamanan teks pengguna.
function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

// Mengambil data dari localStorage.
// Jika belum ada data, gunakan katalog demo.
function loadItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);
      items = Array.isArray(parsed) ? parsed : [...seedItems];
    } else {
      items = [...seedItems];
      saveLocalItems();
    }
  } catch (error) {
    console.error("Gagal membaca data lokal:", error);
    items = [...seedItems];
    saveLocalItems();
  }

  renderItems();
}

// Menyimpan data ke browser pengunjung.
function saveLocalItems() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    alert("Data tidak dapat disimpan. Periksa kapasitas penyimpanan browser.");
  }
}

// Membuat kartu produk.
function createProductCard(item) {
  const typeNames = {
    sale: "JUAL / BELI",
    rent: "SEWA",
    barter: "BARTER"
  };

  const badgeClass = {
    sale: "badge-sale",
    rent: "badge-rent",
    barter: "badge-barter"
  };

  const image = item.image ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80";

  const discount = item.type === "sale" && item.discountPrice && item.listedPrice
    ? Math.round((1 - Number(item.discountPrice) / Number(item.listedPrice)) * 100)
    : 0;

  let priceHTML = "";

  if (item.type === "sale") {
    const currentPrice = item.discountPrice || item.listedPrice;

    priceHTML = `
      <div class="product-price">
        ${item.discountPrice ? `<del>${formatRupiah(item.listedPrice)}</del>` : ""}
        ${formatRupiah(currentPrice)}
      </div>`;
  } else if (item.type === "rent") {
    const unit = {
      hour: "jam",
      day: "hari",
      week: "minggu"
    }[item.rentalUnit] || "hari";

    priceHTML = `
      <div class="product-price">
        ${formatRupiah(item.rentalPrice)}
        <small> / ${unit}</small>
      </div>`;
  } else {
    priceHTML = `
      <div class="product-wanted">
        ⇄ Ingin ditukar dengan:
        <strong>${escapeHTML(item.wantedItem || "Diskusikan dengan pemilik")}</strong>
      </div>`;
  }

  const actionLabel = item.type === "sale"
    ? "Tanya barang"
    : item.type === "rent"
      ? "Ajukan sewa"
      : "Tawarkan barter";

  return `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${escapeHTML(image)}"
          alt="${escapeHTML(item.title)}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80'"
        >

        <span class="type-badge ${badgeClass[item.type] || "badge-sale"}">
          ${typeNames[item.type] || "JUAL / BELI"}
        </span>

        ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ""}
      </div>

      <div class="product-body">
        <span class="product-category">${escapeHTML(item.category || "Lainnya")}</span>
        <h3 class="product-title">${escapeHTML(item.title)}</h3>
        <span class="product-condition">${conditionLabel(item.condition)}</span>

        ${priceHTML}

        <p class="product-location">
          ⌖ ${escapeHTML(item.location || "Lokasi belum diisi")}
        </p>

        <div class="product-footer">
          <span class="seller-name">
            by ${escapeHTML(item.seller || "Mahasiswa")}
          </span>

          <button
            class="whatsapp-button"
            type="button"
            data-contact-id="${escapeHTML(item.id)}"
          >
            ${actionLabel} ↗
          </button>

          <button
            class="delete-button"
            type="button"
            data-delete-id="${escapeHTML(item.id)}"
            aria-label="Hapus ${escapeHTML(item.title)}"
          >
            Hapus
          </button>
        </div>
      </div>
    </article>`;
}

// Menampilkan produk dengan filter.
function renderItems() {
  const keyword = $("searchInput").value.trim().toLowerCase();
  const category = $("categoryFilter").value;
  const condition = $("conditionFilter").value;
  const location = $("locationFilter").value.trim().toLowerCase();
  const maxPrice = Number($("maxPriceFilter").value);
  const minDiscount = Number($("discountFilter").value);

  const filtered = items.filter((item) => {
    const matchesType = activeType === "all" || item.type === activeType;

    const matchesSearch = !keyword ||
      `${item.title} ${item.description} ${item.category}`
        .toLowerCase().includes(keyword);

    const matchesCategory = category === "all" || item.category === category;
    const matchesCondition = condition === "all" || item.condition === condition;

    const matchesLocation = !location ||
      (item.location || "").toLowerCase().includes(location);

    const price = item.type === "rent"
      ? Number(item.rentalPrice)
      : Number(item.discountPrice || item.listedPrice || 0);

    const matchesPrice = !maxPrice || (price > 0 && price <= maxPrice);

    const discount = item.type === "sale" && item.discountPrice && item.listedPrice
      ? Math.round((1 - Number(item.discountPrice) / Number(item.listedPrice)) * 100)
      : 0;

    const matchesDiscount = minDiscount === 0 ||
      (item.type === "sale" && discount >= minDiscount);

    return matchesType &&
      matchesSearch &&
      matchesCategory &&
      matchesCondition &&
      matchesLocation &&
      matchesPrice &&
      matchesDiscount;
  });

  $("productGrid").innerHTML = filtered.map(createProductCard).join("");

  $("emptyState").classList.toggle("hidden", filtered.length > 0);
  $("productGrid").classList.toggle("hidden", filtered.length === 0);

  $("resultsLabel").textContent =
    `Menampilkan ${filtered.length} dari ${items.length} barang`;

  $("countAll").textContent = items.length;
}

// Kalkulator penghematan.
function calculateSavings() {
  const newPrice = Math.max(0, Number($("newPriceInput").value));
  const usedPrice = Math.max(0, Number($("usedPriceInput").value));

  const saving = Math.max(0, newPrice - usedPrice);
  const percent = newPrice > 0
    ? Math.round((saving / newPrice) * 100)
    : 0;

  $("savingAmount").textContent = formatRupiah(saving);
  $("savingPercent").textContent = `${percent}% lebih hemat`;
}

// Faktor rekomendasi harga.
const pricingFactors = {
  sale: {
    new: [0.90, 1.00],
    rarely: [0.65, 0.80],
    sometimes: [0.45, 0.60],
    often: [0.25, 0.40]
  },
  rent: {
    new: [0.15, 0.20],
    rarely: [0.15, 0.20],
    sometimes: [0.10, 0.15],
    often: [0.05, 0.10]
  }
};

// Rekomendasi harga jual dan sewa.
function updateRecommendation() {
  const type = $("listingType").value;
  const originalPrice = Number($("formOriginalPrice").value);
  const condition = $("listingCondition").value;

  const recommendation = $("recommendationBox");
  const text = $("recommendationText");

  if (type === "barter") {
    recommendation.classList.add("hidden");
    return;
  }

  recommendation.classList.remove("hidden");

  if (!originalPrice || originalPrice <= 0) {
    text.textContent = "Masukkan harga beli baru dan kondisi barang.";
    return;
  }

  const [lowFactor, highFactor] =
    pricingFactors[type][condition] || pricingFactors[type].rarely;

  const low = originalPrice * lowFactor;
  const high = originalPrice * highFactor;

  const typeLabel = type === "sale"
    ? "Rekomendasi harga jual"
    : "Estimasi tarif sewa";

  text.textContent =
    `${typeLabel}: ${formatRupiah(low)} – ${formatRupiah(high)}` +
    `${type === "rent" ? " / satuan sewa" : ""}`;
}

// Mengatur form sesuai jenis transaksi.
function updateAdaptiveForm() {
  const type = $("listingType").value;
  const isBarter = type === "barter";
  const isRent = type === "rent";

  $("priceFields").classList.toggle("hidden", isBarter);
  $("wantedItemField").classList.toggle("hidden", !isBarter);

  $("formOriginalPrice").required = !isBarter;
  $("formListedPrice").required = type === "sale";
  $("formRentalPrice").required = isRent;
  $("formDiscountPrice").required = false;

  $("newPriceField").classList.toggle("hidden", isBarter);
  $("salePriceField").classList.toggle("hidden", type !== "sale");
  $("discountPriceField").classList.toggle("hidden", type !== "sale");
  $("rentalPriceField").classList.toggle("hidden", !isRent);
  $("rentalUnitField").classList.toggle("hidden", !isRent);
  $("discountHint").classList.toggle("hidden", type !== "sale");

  updateRecommendation();
}

// Membuka dialog listing.
function openListingDialog() {
  $("formError").classList.add("hidden");
  $("listingDialog").showModal();
}

// Menampilkan pesan error.
function showFormError(message) {
  $("formError").textContent = message;
  $("formError").classList.remove("hidden");
}

// Menambahkan produk baru ke localStorage.
function createListing(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const type = formData.get("type");
  const listedPrice = Number(formData.get("listedPrice"));
  const discountPrice = Number(formData.get("discountPrice"));
  const originalPrice = Number(formData.get("originalPrice"));

  // Validasi harga diskon.
  if (
    type === "sale" &&
    discountPrice &&
    (discountPrice <= 0 || discountPrice >= listedPrice)
  ) {
    showFormError(
      "Harga diskon harus lebih dari Rp0 dan lebih rendah daripada harga normal."
    );
    return;
  }

  if (type !== "barter" && (!originalPrice || originalPrice <= 0)) {
    showFormError("Masukkan harga beli baru yang valid.");
    return;
  }

  if (type === "sale" && (!listedPrice || listedPrice <= 0)) {
    showFormError("Masukkan harga jual normal yang valid.");
    return;
  }

  if (
    type === "rent" &&
    (!Number(formData.get("rentalPrice")) ||
      Number(formData.get("rentalPrice")) <= 0)
  ) {
    showFormError("Masukkan tarif sewa yang valid.");
    return;
  }

  if (
    type === "barter" &&
    !String(formData.get("wantedItem") || "").trim()
  ) {
    showFormError("Tuliskan barang yang kamu inginkan sebagai tukaran.");
    return;
  }

  // Membuat objek produk baru.
  const newItem = {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: String(formData.get("title")).trim(),
    type,
    category: formData.get("category"),
    condition: formData.get("condition"),
    location: String(formData.get("location")).trim(),
    description: String(formData.get("description")).trim(),
    seller: String(formData.get("seller")).trim(),
    phone: String(formData.get("phone")).replace(/\D/g, ""),
    image: String(formData.get("image") || "").trim(),

    originalPrice: type === "barter" ? null : originalPrice,
    listedPrice: type === "sale" ? listedPrice : null,
    discountPrice:
      type === "sale" && discountPrice ? discountPrice : null,

    rentalPrice:
      type === "rent" ? Number(formData.get("rentalPrice")) : null,

    rentalUnit: type === "rent" ? formData.get("rentalUnit") : null,

    wantedItem:
      type === "barter"
        ? String(formData.get("wantedItem")).trim()
        : null,

    status: "Available",
    createdAt: new Date().toISOString()
  };

  // Tambahkan produk ke daftar dan simpan.
  items.unshift(newItem);
  saveLocalItems();

  // Perbarui tampilan.
  $("listingDialog").close();
  form.reset();

  updateAdaptiveForm();
  renderItems();

  $("explore").scrollIntoView({ behavior: "smooth" });
}

// Menghapus produk dari localStorage.
function deleteItem(itemId) {
  const selectedItem = items.find(
    (item) => String(item.id) === String(itemId)
  );

  if (!selectedItem) return;

  const confirmed = confirm(
    `Apakah kamu yakin ingin menghapus "${selectedItem.title}"?`
  );

  if (!confirmed) return;

  items = items.filter(
    (item) => String(item.id) !== String(itemId)
  );

  saveLocalItems();
  renderItems();
}

// Membuka WhatsApp.
function openWhatsApp(item) {
  const phone = String(item.phone || DEFAULT_WA_NUMBER).replace(/\D/g, "");

  let message = "";

  if (item.type === "sale") {
    message =
      `Halo ${item.seller || "Kak"}, saya tertarik membeli ${item.title}. ` +
      "Apakah barangnya masih tersedia?";
  } else if (item.type === "rent") {
    const unit = {
      hour: "jam",
      day: "hari",
      week: "minggu"
    }[item.rentalUnit] || "hari";

    message =
      `Halo ${item.seller || "Kak"}, saya ingin bertanya dan mengajukan sewa ` +
      `${item.title} dengan tarif ${formatRupiah(item.rentalPrice)} per ${unit}. ` +
      "Bagaimana ketersediaannya?";
  } else {
    message =
      `Halo ${item.seller || "Kak"}, saya tertarik barter untuk ${item.title}. ` +
      `Saya melihat kamu menginginkan ${item.wantedItem || "barang lain"}. ` +
      "Apakah kita bisa berdiskusi?";
  }

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

// Event listener setelah halaman selesai dimuat.
document.addEventListener("DOMContentLoaded", () => {

  // Tombol untuk membuka form listing.
  [
  "openListingTop",
  "openListingHero",
  "openListingCatalog",
  "openListingBottom"
].forEach((id) => {
  const button = $(id);

  if (button) {
    button.addEventListener("click", openListingDialog);
  }
});

  $("closeListing").addEventListener("click", () => {
    $("listingDialog").close();
  });

  $("cancelListing").addEventListener("click", () => {
    $("listingDialog").close();
  });

  // Tab jenis transaksi.
  document.querySelectorAll(".transaction-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeType = tab.dataset.type;

      document.querySelectorAll(".transaction-tab").forEach((button) => {
        const selected = button === tab;

        button.classList.toggle("active", selected);
        button.setAttribute("aria-selected", String(selected));
      });

      renderItems();
    });
  });

  // Filter dan pencarian.
  [
    "searchInput",
    "categoryFilter",
    "conditionFilter",
    "locationFilter",
    "maxPriceFilter",
    "discountFilter"
  ].forEach((id) => {
    $(id).addEventListener("input", renderItems);
    $(id).addEventListener("change", renderItems);
  });

  // Reset filter.
  function resetFilters() {
    activeType = "all";

    $("searchInput").value = "";
    $("categoryFilter").value = "all";
    $("conditionFilter").value = "all";
    $("locationFilter").value = "";
    $("maxPriceFilter").value = "";
    $("discountFilter").value = "0";

    document.querySelectorAll(".transaction-tab").forEach((tab) => {
      const selected = tab.dataset.type === "all";

      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });

    renderItems();
  }

  $("resetFilters").addEventListener("click", resetFilters);
  $("resetEmpty").addEventListener("click", resetFilters);

  // Kalkulator penghematan.
  $("newPriceInput").addEventListener("input", calculateSavings);
  $("usedPriceInput").addEventListener("input", calculateSavings);

  // Form adaptif.
  $("listingType").addEventListener("change", updateAdaptiveForm);
  $("listingCondition").addEventListener("change", updateRecommendation);
  $("formOriginalPrice").addEventListener("input", updateRecommendation);
  $("listingForm").addEventListener("submit", createListing);

  // Delegasi event untuk tombol WhatsApp dan hapus produk.
  $("productGrid").addEventListener("click", (event) => {

    const deleteButton = event.target.closest("[data-delete-id]");

    if (deleteButton) {
      deleteItem(deleteButton.dataset.deleteId);
      return;
    }

    const contactButton = event.target.closest("[data-contact-id]");

    if (contactButton) {
      const selectedItem = items.find(
        (item) => String(item.id) === contactButton.dataset.contactId
      );

      if (selectedItem) openWhatsApp(selectedItem);
    }
  });

  // Inisialisasi aplikasi.
  calculateSavings();
  updateAdaptiveForm();
  loadItems();
});
