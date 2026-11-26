const formRsvp = document.getElementById("form-rsvp");
const daftarUcapan = document.getElementById("daftar-ucapan");

const ucapanAwal = [
  {
    nama: "Hendra Wijaya",
    status: "Hadir",
    pesan:
      "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair. Selamat menempuh hidup baru!",
  },
];

function renderUcapan(data) {
  daftarUcapan.innerHTML = data
    .map(
      (item) => `
      <div class="rounded-xl border border-gold/30 bg-ivory-dark p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-charcoal">${item.nama}</p>
          <span class="rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-medium text-gold-dark">${item.status}</span>
        </div>
        <p class="mt-2 text-xs leading-relaxed text-charcoal/80">${item.pesan}</p>
      </div>
    `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderUcapan(ucapanAwal);

  formRsvp.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("input-nama").value.trim();
    const status = document.getElementById("input-kehadiran").value;
    const pesan = document.getElementById("input-ucapan").value.trim();

    if (!nama || !pesan) return;

    ucapanAwal.unshift({ nama, status, pesan });
    renderUcapan(ucapanAwal);
    formRsvp.reset();
  });
});
