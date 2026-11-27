import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

class SejolyRsvp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.listData = [];
    this.isEditing = false;
  }

  connectedCallback() {
    // Ambil konfigurasi dari atribut HTML (atau pakai default jika tidak diisi)
    const supabaseUrl =
      this.getAttribute("supabase-url") ||
      "https://PROJECT_ID_ANDA.supabase.co";
    const supabaseKey = this.getAttribute("supabase-key") || "ANON_KEY_ANDA";
    this.tableName = this.getAttribute("table") || "rsvp";
    this.clientSlug =
      this.getAttribute("client-id") || window.location.pathname;

    // Inisialisasi Supabase
    this.supabase = createClient(supabaseUrl, supabaseKey);

    // Kunci penyimpanan lokal spesifik per klien
    this.storageKey = `sejoly_rsvp_${this.clientSlug}`;

    this.renderComponent();
    this.initLogic();
  }

  renderComponent() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: inherit;
          color: var(--rsvp-text, #2C2C2C);
          --primary: var(--rsvp-primary, #C5A059);
          --primary-dark: var(--rsvp-primary-dark, #9E7B36);
          --bg-card: var(--rsvp-card, #FFFFF0);
          --bg-soft: var(--rsvp-soft, #F7F3E8);
          --border-color: var(--rsvp-border, rgba(197, 160, 89, 0.4));
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .wrapper {
          max-width: 36rem;
          margin: 0 auto;
          text-align: left;
        }

        /* Statistik Kehadiran */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .stat-box-hadir, .stat-box-tidak-hadir {
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .stat-box-hadir {
          background: #DAF6DE;
        }
        
        .stat-box-tidak-hadir {
          background: #FFC0C0;
          
        }

        .stat-number-hadir, .stat-number-tidak-hadir {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.2;
        }

         .stat-number-hadir {
           color: #00BA50;
         }

        .stat-number-tidak-hadir {
         color: #DE0D22;
        }

        .stat-label-hadir, .stat-label-tidak-hadir  {
          font-size: 0.75rem;
          font-weight: 600;
          color: black;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.75;
          margin-top: 0.25rem;
        }
        
       

        /* Form & Status Box */
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1.25rem;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .form-group {
          margin-bottom: 1rem;
        }

        label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
          opacity: 0.85;
        }

        input, select, textarea {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          color: #2C2C2C;
          font-family: inherit;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }

        input:focus, select:focus, textarea:focus {
          border-color: var(--primary);
        }

        .btn-primary {
          width: 100%;
          padding: 0.8rem 1.25rem;
          border: none;
          border-radius: 0.75rem;
          background: var(--primary);
          color: black;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--primary-dark);
        }

        .btn-primary:active:not(:disabled) {
          transform: scale(0.98);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Kotak Status Tercatat */
        .status-box {
          text-align: center;
          padding: 1.75rem 1.25rem;
        }

        .status-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-dark);
        }

        .status-desc {
          font-size: 0.8rem;
          line-height: 1.5;
          margin-top: 0.5rem;
          opacity: 0.85;
        }

        .btn-edit {
          margin-top: 1rem;
          padding: 0.55rem 1.1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--primary);
          background: transparent;
          color: var(--primary-dark);
          font-family: inherit;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-edit:hover {
          background: var(--primary);
          color: #FFFFFF;
        }

        .hidden {
          display: none !important;
        }

        /* Daftar Ucapan */
        .ucapan-list {
          margin-top: 1.75rem;
          max-height: 22rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-right: 0.25rem;
        }

        .ucapan-item {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1rem;
        }

        .ucapan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }

        .ucapan-nama {
          font-size: 0.85rem;
          font-weight: 700;
        }

        .badge {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          background: rgba(197, 160, 89, 0.15);
          color: var(--primary-dark);
          white-space: nowrap;
        }

        .badge.tidak-hadir {
          background: rgba(100, 100, 100, 0.12);
          color: #555555;
        }

        .ucapan-teks {
          font-size: 0.8rem;
          line-height: 1.5;
          opacity: 0.85;
          white-space: pre-line;
        }

        .empty-text {
          text-align: center;
          font-size: 0.8rem;
          opacity: 0.65;
          padding: 1rem 0;
        }
      </style>

      <div class="wrapper">
        <!-- 1. STATISTIK TOTAL KEHADIRAN -->
        <div class="stats-grid">
          <div class="stat-box-hadir">
            <div id="count-hadir" class="stat-number-hadir">0</div>
            <div class="stat-label-hadir">Hadir</div>
          </div>
          <div class="stat-box-tidak-hadir">
            <div id="count-tidak-hadir" class="stat-number-tidak-hadir">0</div>
            <div class="stat-label-tidak-hadir">Tidak Hadir</div>
          </div>
        </div>

        <!-- 2. KOTAK STATUS TERKIRIM (MUNCUL SETELAH SUBMIT) -->
        <div id="status-box" class="card status-box hidden">
          <div class="status-title">Konfirmasi Tercatat</div>
          <p id="ringkasan-text" class="status-desc"></p>
          <button type="button" id="btn-ubah" class="btn-edit">Ubah Konfirmasi</button>
        </div>

        <!-- 3. FORM INPUT RSVP & UCAPAN -->
        <form id="form-rsvp" class="card">
          <div class="form-group">
            <label for="input-nama">Nama</label>
            <input type="text" id="input-nama" placeholder="Masukkan nama Anda" required />
          </div>

          <div class="form-group">
            <label for="input-kehadiran">Konfirmasi Kehadiran</label>
            <select id="input-kehadiran" required>
            <option value="" disabled selected hidden>Pilih Respon Anda</option>
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>

          <div class="form-group">
            <label for="input-ucapan">Ucapan & Doa Restu</label>
            <textarea id="input-ucapan" rows="3" placeholder="Tuliskan doa dan ucapan untuk kedua mempelai..." required></textarea>
          </div>

          <button type="submit" id="btn-submit" class="btn-primary">Kirim Konfirmasi & Ucapan</button>
        </form>

        <!-- 4. DAFTAR UCAPAN TAMU -->
        <div id="ucapan-list" class="ucapan-list">
          <p class="empty-text">Memuat ucapan...</p>
        </div>
      </div>
    `;
  }

  initLogic() {
    this.form = this.shadowRoot.getElementById("form-rsvp");
    this.statusBox = this.shadowRoot.getElementById("status-box");
    this.ringkasanText = this.shadowRoot.getElementById("ringkasan-text");
    this.btnUbah = this.shadowRoot.getElementById("btn-ubah");
    this.btnSubmit = this.shadowRoot.getElementById("btn-submit");

    this.inputNama = this.shadowRoot.getElementById("input-nama");
    this.inputKehadiran = this.shadowRoot.getElementById("input-kehadiran");
    this.inputUcapan = this.shadowRoot.getElementById("input-ucapan");

    this.countHadirEl = this.shadowRoot.getElementById("count-hadir");
    this.countTidakHadirEl =
      this.shadowRoot.getElementById("count-tidak-hadir");
    this.ucapanListEl = this.shadowRoot.getElementById("ucapan-list");

    // Isi otomatis nama dari parameter URL (?to=)
    const namaUrl = new URLSearchParams(window.location.search).get("to");
    if (namaUrl) {
      this.inputNama.value = namaUrl.trim();
    }

    // Cek apakah user sudah pernah mengirim konfirmasi sebelumnya
    const savedData = this.getSavedData();
    if (savedData && savedData.id) {
      this.showLockedState(savedData);
    }

    // Event Tombol Ubah Konfirmasi
    this.btnUbah.addEventListener("click", () => this.enterEditMode());

    // Event Submit Form
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Muat data awal dari Supabase
    this.fetchData();
  }

  getSavedData() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey));
    } catch {
      return null;
    }
  }

  showLockedState(data) {
    this.isEditing = false;
    this.ringkasanText.innerHTML = `Terima kasih <strong>${this.escapeHtml(data.nama)}</strong>, status kehadiran Anda saat ini: <strong>${this.escapeHtml(data.kehadiran)}</strong>.`;
    this.form.classList.add("hidden");
    this.statusBox.classList.remove("hidden");
    this.updateStatsAndList();
  }

  enterEditMode() {
    const savedData = this.getSavedData();
    if (!savedData) return;

    // Aktifkan mode edit: kontribusi angka user ini otomatis dikurangi dari tampilan total
    this.isEditing = true;

    this.inputNama.value = savedData.nama || "";
    this.inputKehadiran.value = savedData.kehadiran || "Hadir";
    this.inputUcapan.value = savedData.ucapan || "";
    this.btnSubmit.textContent = "Simpan Perubahan";

    this.statusBox.classList.add("hidden");
    this.form.classList.remove("hidden");

    // Hitung ulang statistik (otomatis mengurangi 1 dari status sebelumnya milik user ini)
    this.updateStatsAndList();
  }

  async fetchData() {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("client_id", this.clientSlug)
        .order("created_at", { ascending: false });

      if (error) throw error;
      this.listData = data || [];
      this.updateStatsAndList();
    } catch (err) {
      console.error("Gagal memuat data RSVP:", err);
      this.ucapanListEl.innerHTML = `<p class="empty-text">Gagal memuat ucapan. Periksa koneksi internet.</p>`;
    }
  }

  updateStatsAndList() {
    const savedData = this.getSavedData();

    // Hitung total Hadir & Tidak Hadir dari database
    let totalHadir = 0;
    let totalTidakHadir = 0;

    this.listData.forEach((item) => {
      // Jika user sedang dalam mode "Ubah Konfirmasi", kecualikan data lama miliknya dari hitungan
      // sehingga angka Hadir / Tidak Hadir otomatis terkurangi sampai dia menyimpan perubahan baru
      if (this.isEditing && savedData && item.id === savedData.id) {
        return;
      }

      if (item.kehadiran === "Hadir") {
        totalHadir += 1;
      } else if (item.kehadiran === "Tidak Hadir") {
        totalTidakHadir += 1;
      }
    });

    this.countHadirEl.textContent = totalHadir;
    this.countTidakHadirEl.textContent = totalTidakHadir;

    // Render daftar kartu ucapan
    if (this.listData.length === 0) {
      this.ucapanListEl.innerHTML = `<p class="empty-text">Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu!</p>`;
      return;
    }

    this.ucapanListEl.innerHTML = this.listData
      .map((item) => {
        const isTidakHadir = item.kehadiran !== "Hadir";
        return `
          <div class="ucapan-item">
            <div class="ucapan-header">
              <span class="ucapan-nama">${this.escapeHtml(item.nama)}</span>
              <span class="badge ${isTidakHadir ? "tidak-hadir" : ""}">${this.escapeHtml(item.kehadiran)}</span>
            </div>
            <p class="ucapan-teks">${this.escapeHtml(item.ucapan)}</p>
          </div>
        `;
      })
      .join("");
  }

  async handleSubmit(e) {
    e.preventDefault();

    const savedData = this.getSavedData();
    const hasExistingRecord = Boolean(savedData && savedData.id);

    this.btnSubmit.disabled = true;
    this.btnSubmit.textContent = hasExistingRecord
      ? "Menyimpan..."
      : "Mengirim...";

    const payload = {
      client_id: this.clientSlug,
      nama: this.inputNama.value.trim(),
      kehadiran: this.inputKehadiran.value,
      ucapan: this.inputUcapan.value.trim(),
    };

    try {
      let recordId = savedData?.id;

      if (hasExistingRecord) {
        // UPDATE baris milik user yang sudah ada
        const { error } = await this.supabase
          .from(this.tableName)
          .update(payload)
          .eq("id", recordId);

        if (error) throw error;
      } else {
        // INSERT baru & ambil ID-nya
        const { data, error } = await this.supabase
          .from(this.tableName)
          .insert([payload])
          .select("id")
          .single();

        if (error) throw error;
        recordId = data.id;
      }

      const updatedLocal = { id: recordId, ...payload };
      localStorage.setItem(this.storageKey, JSON.stringify(updatedLocal));

      // Muat ulang data dari server dan kunci kembali form
      await this.fetchData();
      this.showLockedState(updatedLocal);
    } catch (err) {
      console.error("Gagal menyimpan RSVP:", err);
      alert("Gagal menyimpan konfirmasi. Silakan coba lagi.");
    } finally {
      this.btnSubmit.disabled = false;
      this.btnSubmit.textContent = hasExistingRecord
        ? "Simpan Perubahan"
        : "Kirim Konfirmasi & Ucapan";
    }
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

customElements.define("sejoly-rsvp", SejolyRsvp);
