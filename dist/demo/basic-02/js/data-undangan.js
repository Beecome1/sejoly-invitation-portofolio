export const DATA_UNDANGAN = {
  panggilan: "Fatimah & Ahmad",
  tanggalUtama: "Sabtu, 09 Januari 2027",
  targetCountdown: "2027-01-09T09:00:00+07:00",
  gambar: {
    sampul: "./assets/img/foto-sample.webp",
    hero: "./assets/img/hero-image.webp",
  },
  wanita: {
    nama: "Fatimah Putri",
    foto: "./assets/img/foto-sample.webp",
    ortu: "Putri Pertama dari Bapak Ridwan Kamil dan Ibu Siti Aminah",
    igUsername: "@fatimahpputri",
    igUrl: "https://instagram.com/fatimahapputri",
  },

  pria: {
    nama: "Ahmad Fauzan",
    foto: "./assets/img/foto-sample.webp",
    ortu: "Putra Kedua dari Bapak H. Abdullah & Ibu Hj. Khadijah",
    igUsername: "@fatimahazzahra",
    igUrl: "https://instagram.com/ahmadfauzan",
  },
  acara: {
    akadWaktu: "Sabtu, 09 Januari 2027 • 09.00 WIB",
    akadLokasi: "Masjid Agung Al-Barkah, Bekasi",
    resepsiWaktu: "Sabtu, 09 Januari 2027 • 11.00 - 14.00 WIB",
    resepsiLokasi: "Grand Ballroom Hotel Horison, Bekasi",
  },
  amplop: [
    {
      bank: "Bank Syariah Indonesia (BSI)",
      norek: "7123456789",
      atasNama: "a.n. Ahmad Fauzan",
    },
    {
      bank: "Bank BCA",
      norek: "8890123456",
      atasNama: "a.n. Fatimah Az-Zahra",
    },
  ],
};
function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined) {
    el.textContent = value;
  }
}

function renderData() {
  // Teks Utama
  document.getElementById("sampul-nama-mempelai").textContent =
    DATA_UNDANGAN.panggilan;
  document.getElementById("hero-nama-mempelai").textContent =
    DATA_UNDANGAN.panggilan;
  document.getElementById("penutup-nama-mempelai").textContent =
    DATA_UNDANGAN.panggilan;
  document.getElementById("hero-tanggal").textContent =
    DATA_UNDANGAN.tanggalUtama;

  // Gambar Sampul & Background Hero
  const imgSampul = document.getElementById("foto-sampul");
  if (imgSampul) {
    imgSampul.src = DATA_UNDANGAN.gambar.sampul;
    imgSampul.alt = `Foto Sampul ${DATA_UNDANGAN.panggilan}`;
  }

  const imgHero = document.getElementById("foto-hero");
  if (imgHero) {
    imgHero.src = DATA_UNDANGAN.gambar.hero;
    imgHero.alt = `Background ${DATA_UNDANGAN.panggilan}`;
  }

  // Data & Foto Mempelai Pria
  const imgPria = document.getElementById("foto-pria");
  if (imgPria) {
    imgPria.src = DATA_UNDANGAN.pria.foto;
    imgPria.alt = DATA_UNDANGAN.pria.nama;
  }
  document.getElementById("nama-pria").textContent = DATA_UNDANGAN.pria.nama;
  document.getElementById("ortu-pria").textContent = DATA_UNDANGAN.pria.ortu;
  // Instagram Mempelai Pria
  const igPria = document.getElementById("ig-pria");
  const igPriaText = document.getElementById("ig-pria-text");
  if (igPria) igPria.href = DATA_UNDANGAN.pria.igUrl;
  if (igPriaText) igPriaText.textContent = DATA_UNDANGAN.pria.igUsername;

  // Data & Foto Mempelai Wanita
  const imgWanita = document.getElementById("foto-wanita");
  if (imgWanita) {
    imgWanita.src = DATA_UNDANGAN.wanita.foto;
    imgWanita.alt = DATA_UNDANGAN.wanita.nama;
  }
  document.getElementById("nama-wanita").textContent =
    DATA_UNDANGAN.wanita.nama;
  document.getElementById("ortu-wanita").textContent =
    DATA_UNDANGAN.wanita.ortu;
  // Instagram Mempelai Wanita
  const igWanita = document.getElementById("ig-wanita");
  const igWanitaText = document.getElementById("ig-wanita-text");
  if (igWanita) igWanita.href = DATA_UNDANGAN.wanita.igUrl;
  if (igWanitaText) igWanitaText.textContent = DATA_UNDANGAN.wanita.igUsername;

  // Data Jadwal Akad & Resepsi
  setText("akad-tanggal", DATA_UNDANGAN.acara.akadTanggal);
  setText("akad-waktu", DATA_UNDANGAN.acara.akadWaktu);
  setText("akad-lokasi", DATA_UNDANGAN.acara.akadLokasi);
  setText("resepsi-tanggal", DATA_UNDANGAN.acara.resepsiTanggal);
  setText("resepsi-waktu", DATA_UNDANGAN.acara.resepsiWaktu);
  setText("resepsi-lokasi", DATA_UNDANGAN.acara.resepsiLokasi);

  // Data Amplop Digital
  DATA_UNDANGAN.amplop.forEach((item, index) => {
    const num = index + 1;
    const elBank = document.getElementById(`bank-${num}-nama`);
    const elNorek = document.getElementById(`bank-${num}-norek`);
    const elAn = document.getElementById(`bank-${num}-an`);
    if (elBank) elBank.textContent = item.bank;
    if (elNorek) elNorek.textContent = item.norek;
    if (elAn) elAn.textContent = item.atasNama;
  });
}

document.addEventListener("DOMContentLoaded", renderData);
