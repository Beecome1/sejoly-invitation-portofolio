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

  // 4. Countdown Timer Logic
  // Format tanggal target: YYYY-MM-DDTHH:mm:ss
  const targetDate = new Date("2026-12-12T09:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  };

  // Jalankan langsung sekali agar tidak menunggu 1 detik pertama
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
});
