export const DATA_UNDANGAN = {
  panggilan: "Fatimah & Ahmad",
  tanggalUtama: "Sabtu, 09 Januari 2027",
  targetCountdown: "2027-01-09T09:00:00+07:00",
  gambar: {
    sampul: "./assets/img/foto-sampul.webp",
    hero: "./assets/img/hero-image.webp",
  },
  wanita: {
    nama: "Fatimah Putri",
    foto: "./assets/img/foto-mempelai-wanita.webp",
    ortu: "Putri Pertama dari Bapak Ridwan Kamil dan Ibu Siti Aminah",
    igUsername: "@fatimahpputri",
    igUrl: "https://instagram.com/fatimahapputri",
  },

  pria: {
    nama: "Ahmad Fauzan",
    foto: "./assets/img/foto-mempelai-wanita.webp",
    ortu: "Putra Kedua dari Bapak H. Abdullah & Ibu Hj. Khadijah",
    igUsername: "@fatimahazzahra",
    igUrl: "https://instagram.com/ahmadfauzan",
  },
  acara: {
    akadWaktu: "Sabtu, 09 Januari 2027 • 09.00 WIB",
    akadLokasi: "Hotel Santika Premiere Slipi, Jakarta",
    resepsiWaktu: "Sabtu, 09 Januari 2027 • 11.00 - 14.00 WIB",
    resepsiLokasi: "Hotel Santika Premiere Slipi, Jakarta",
  },

  lokasi: {
    namaTempat: "Hotel Santika Premiere Slipi, Jakarta",
    alamat:
      "Jl. K.S. Tubun No.7, RT.1/RW.7, Slipi, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11410",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1222073449103!2d106.992416!3d-6.247622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c2d8f8b5b5b%3A0x5b5b5b5b5b5b5b5b!2sBekasi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    linkArah: "https://maps.app.goo.gl/contohLinkLokasi",
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

  // Data Lokasi Maps
  if (DATA_UNDANGAN.lokasi) {
    setText("lokasi-nama-tempat", DATA_UNDANGAN.lokasi.namaTempat);
    setText("lokasi-alamat-lengkap", DATA_UNDANGAN.lokasi.alamat);

    const iframeMaps = document.getElementById("maps-embed");
    if (iframeMaps && DATA_UNDANGAN.lokasi.embedUrl) {
      iframeMaps.src = DATA_UNDANGAN.lokasi.embedUrl;
    }

    const linkMaps = document.getElementById("maps-link-arah");
    if (linkMaps && DATA_UNDANGAN.lokasi.linkArah) {
      linkMaps.href = DATA_UNDANGAN.lokasi.linkArah;
    }
  }

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
