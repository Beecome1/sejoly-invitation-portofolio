export function ambilNamaTamu() {
  const params = new URLSearchParams(window.location.search);
  const tamu = params.get("to");
  if (tamu) {
    const elTamu = document.getElementById("nama-tamu");
    if (elTamu) elTamu.textContent = tamu;

    const inputNama = document.getElementById("input-nama");
    if (inputNama) inputNama.value = tamu;
  }
}

export function initBukaUndangan() {
  const btnBuka = document.getElementById("btn-buka-undangan");
  const sampul = document.getElementById("section-sampul");
  const body = document.body;

  if (!btnBuka || !sampul) return;

  btnBuka.addEventListener("click", () => {
    // 1. Buka layar sampul & buka kunci scroll
    sampul.classList.add(
      "-translate-y-full",
      "opacity-0",
      "pointer-events-none",
    );
    body.classList.remove("overflow-hidden");

    // 2. Jalankan audio secara aman
    try {
      const playerAudio = document.querySelector("sejoly-audio");
      if (playerAudio && typeof playerAudio.play === "function") {
        playerAudio.play();
      }
    } catch (err) {
      console.warn("Audio belum siap diputar:", err);
    }
  });
}

export function initAmplopDigital() {
  const btnToggle = document.getElementById("btn-toggle-amplop");
  const wadahAmplop = document.getElementById("wadah-amplop");
  const tombolCopy = document.querySelectorAll(".btn-copy");

  if (btnToggle && wadahAmplop) {
    btnToggle.addEventListener("click", () => {
      wadahAmplop.classList.toggle("hidden");
    });
  }

  tombolCopy.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-copy-target");
      const teksNorek = document.getElementById(targetId)?.textContent.trim();
      if (!teksNorek) return;

      try {
        await navigator.clipboard.writeText(teksNorek);
        const teksAsli = btn.textContent;
        btn.textContent = "✓ Berhasil Disalin";
        btn.classList.replace("bg-gold", "bg-emerald-700");

        setTimeout(() => {
          btn.textContent = teksAsli;
          btn.classList.replace("bg-emerald-700", "bg-gold");
        }, 2000);
      } catch {
        alert("Gagal menyalin nomor rekening: " + teksNorek);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBukaUndangan();
  ambilNamaTamu();
  initAmplopDigital();
});
