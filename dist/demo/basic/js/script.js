document.addEventListener("DOMContentLoaded", () => {
  // 1. Pastikan saat refresh halaman selalu mulai dari atas dan terkunci
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  // Elemen DOM
  const body = document.body;
  const coverOverlay = document.getElementById("cover-overlay");
  const openBtn = document.getElementById("open-invitation-btn");
  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");

  // Pastikan audio reset saat halaman dimuat ulang
  bgMusic.pause();
  bgMusic.currentTime = 0;
  let isPlaying = false;

  // Opsional: Ambil nama tamu dari parameter URL (?to=Nama+Tamu) untuk kebutuhan demo
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("to");
  if (guestParam) {
    document.getElementById("guest-name").textContent = guestParam;
  }

  // 2. Fungsi Buka Undangan (Slide ke Atas + Unlock Scroll + Play Musik)
  openBtn.addEventListener("click", () => {
    // Tambahkan class Tailwind untuk animasi slide ke atas
    coverOverlay.classList.add("-translate-y-full");

    // Buka kunci scroll pada body
    body.classList.remove("overflow-hidden");

    // Tampilkan tombol kontrol musik melayang
    musicToggle.classList.remove("hidden");
    musicToggle.classList.add("flex");

    // Putar musik latar
    bgMusic
      .play()
      .then(() => {
        isPlaying = true;
        musicIcon.classList.add("animate-spin-slow");
      })
      .catch((error) => {
        console.warn(
          "Autoplay dicegah oleh browser atau file audio belum tersedia:",
          error,
        );
        isPlaying = false;
        musicIcon.classList.remove("animate-spin-slow");
      });

    // Hapus elemen cover dari interaksi pointer setelah animasi selesai (1000ms)
    setTimeout(() => {
      coverOverlay.classList.add("pointer-events-none");
    }, 1000);
  });

  // 3. Kontrol Play / Pause Musik Manual
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      musicIcon.classList.remove("animate-spin-slow");
      musicToggle.classList.add("opacity-60");
    } else {
      bgMusic.play();
      isPlaying = true;
      musicIcon.classList.add("animate-spin-slow");
      musicToggle.classList.remove("opacity-60");
    }
  });
});
