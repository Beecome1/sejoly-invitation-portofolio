// undangan-animasi.js
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. LOGIKA COVER & TOMBOL BUKA UNDANGAN
  // ==========================================
  const cover = document.querySelector("[data-cover]");
  const tombolBuka = document.querySelector("[data-buka-undangan]");

  // Jika template memiliki cover, kunci scroll saat pertama kali dibuka
  if (cover) {
    document.body.style.overflow = "hidden";
  }

  if (cover && tombolBuka) {
    tombolBuka.addEventListener("click", () => {
      // Ambil jenis efek buka (default: slide-up)
      const efekBuka = cover.getAttribute("data-cover") || "slide-up";
      const durasiBuka =
        parseInt(cover.getAttribute("data-durasi-buka")) || 4000;

      let keyframesCover = [];

      switch (efekBuka) {
        // Cover terangkat ke atas seperti tirai (Paling populer)
        case "slide-up":
          keyframesCover = [
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-100%)", opacity: 0.8 },
          ];
          break;

        // Cover memudar perlahan
        case "fade-out":
          keyframesCover = [{ opacity: 1 }, { opacity: 0 }];
          break;

        // Cover membesar lalu menghilang (Efek sinematik)
        case "zoom-out":
          keyframesCover = [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(1.2)", opacity: 0 },
          ];
          break;
      }

      // Jalankan animasi menutup cover
      const animasiCover = cover.animate(keyframesCover, {
        duration: durasiBuka,
        easing: "cubic-bezier(0.77, 0, 0.175, 1)",
        fill: "forwards",
      });

      // Setelah animasi cover selesai:
      animasiCover.onfinish = () => {
        cover.style.display = "none"; // Sembunyikan cover sepenuhnya
        document.body.style.overflowY = "auto"; // Aktifkan kembali scroll ke bawah
        document.body.style.overflowX = "hidden";
      };

      // Opsional: Putar musik otomatis jika ada elemen <audio id="musik-undangan">
      const musik = document.getElementById("musik-undangan");
      if (musik) {
        musik.play().catch(() => {
          // Mencegah error jika browser memblokir autoplay
        });
      }
    });
  }

  // ==========================================
  // 2. LOGIKA ANIMASI SCROLL (KODE SEBELUMNYA)
  // ==========================================
  const elemenAnimasi = document.querySelectorAll("[data-animasi]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const jenis = el.getAttribute("data-animasi");
          const durasi = parseInt(el.getAttribute("data-durasi")) || 4000;
          const delay = parseInt(el.getAttribute("data-delay")) || 0;

          jalankanAnimasiUndangan(el, jenis, durasi, delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 },
  );

  elemenAnimasi.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
});

function jalankanAnimasiUndangan(elemen, jenis, durasi, delay) {
  let keyframes = [];

  switch (jenis) {
    case "fade-up":
      keyframes = [
        { opacity: 0, transform: "translateY(40px)" },
        { opacity: 1, transform: "translateY(0)" },
      ];
      break;
    case "fade-down":
      keyframes = [
        { opacity: 0, transform: "translateY(-40px)" },
        { opacity: 1, transform: "translateY(0)" },
      ];
      break;
    case "slide-right":
      keyframes = [
        { opacity: 0, transform: "translateX(-50px)" },
        { opacity: 1, transform: "translateX(0)" },
      ];
      break;
    case "slide-left":
      keyframes = [
        { opacity: 0, transform: "translateX(50px)" },
        { opacity: 1, transform: "translateX(0)" },
      ];
      break;
    case "zoom-in":
      keyframes = [
        { opacity: 0, transform: "scale(0.85)" },
        { opacity: 1, transform: "scale(1)" },
      ];
      break;
    case "zoom-out":
      keyframes = [
        { opacity: 0, transform: "scale(1.15)" },
        { opacity: 1, transform: "scale(1)" },
      ];
      break;
    default:
      keyframes = [{ opacity: 0 }, { opacity: 1 }];
  }

  elemen.animate(keyframes, {
    duration: durasi,
    delay: delay,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "forwards",
  });
}
