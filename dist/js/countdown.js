class SejolyCountdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const targetDateString = this.getAttribute("date");
    const targetDate = new Date(targetDateString).getTime();

    if (isNaN(targetDate)) {
      this.shadowRoot.innerHTML = `<p style="color:#d9534f; font-size:12px; text-align:center;">Format tanggal tidak valid. Gunakan: YYYY-MM-DDTHH:MM:SS</p>`;
      return;
    }

    // Kustomisasi warna opsional lewat atribut HTML (Default: Netral Elegan)
    const accentColor = this.getAttribute("color") || "#3f3a34";
    const labelColor = this.getAttribute("label-color") || "#000000";
    const bgColor = this.getAttribute("bg-color") || "#ffffff";
    const borderColor = this.getAttribute("border-color") || "#000000";

    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    font-family: inherit;
                }

                .countdown-grid {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    max-width: 360px;
                    margin: 0 auto;
                }

                .card {
                    flex: 1;
                    background: ${bgColor};
                    border: 1px solid ${borderColor};
                    border-radius: 26px;
                    padding: 14px 8px;
                    text-align: center;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.06);
                    transition: transform 0.25s ease;
                }

                .card:hover {
                    transform: translateY(-2px);
                }

                .number {
                    display: block;
                    font-size: 1.65rem;
                    font-weight: 600;
                    line-height: 1.1;
                    color: ${accentColor};
                    font-variant-numeric: tabular-nums;
                    letter-spacing: -0.02em;
                }

                .divider {
                    width: 16px;
                    height: 1px;
                    background: ${borderColor};
                    margin: 6px auto;
                }

                .label {
                    display: block;
                    font-size: 0.65rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: ${labelColor};
                }

                /* Penyesuaian layar HP kecil */
                @media (max-width: 360px) {
                    .countdown-grid {
                        gap: 8px;
                    }
                    .card {
                        border-radius: 12px;
                        padding: 12px 4px;
                    }
                    .number {
                        font-size: 1.35rem;
                    }
                    .label {
                        font-size: 0.6rem;
                        letter-spacing: 0.08em;
                    }
                }
            </style>

            <div class="countdown-grid">
                <div class="card">
                    <span class="number" id="days">00</span>
                    <div class="divider"></div>
                    <span class="label">Hari</span>
                </div>
                <div class="card">
                    <span class="number" id="hours">00</span>
                    <div class="divider"></div>
                    <span class="label">Jam</span>
                </div>
                <div class="card">
                    <span class="number" id="minutes">00</span>
                    <div class="divider"></div>
                    <span class="label">Menit</span>
                </div>
                <div class="card">
                    <span class="number" id="seconds">00</span>
                    <div class="divider"></div>
                    <span class="label">Detik</span>
                </div>
            </div>
        `;

    const daysEl = this.shadowRoot.getElementById("days");
    const hoursEl = this.shadowRoot.getElementById("hours");
    const minutesEl = this.shadowRoot.getElementById("minutes");
    const secondsEl = this.shadowRoot.getElementById("seconds");
    const format = (n) => String(n).padStart(2, "0");

    const update = () => {
      const distance = targetDate - new Date().getTime();

      if (distance <= 0) {
        clearInterval(this.timer);
        daysEl.textContent =
          hoursEl.textContent =
          minutesEl.textContent =
          secondsEl.textContent =
            "00";
        return;
      }

      daysEl.textContent = format(Math.floor(distance / (1000 * 60 * 60 * 24)));
      hoursEl.textContent = format(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      minutesEl.textContent = format(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      );
      secondsEl.textContent = format(
        Math.floor((distance % (1000 * 60)) / 1000),
      );
    };

    update();
    this.timer = setInterval(update, 1000);
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }
}

customElements.define("sejoly-countdown", SejolyCountdown);
