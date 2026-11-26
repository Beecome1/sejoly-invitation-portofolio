class SejolyAudio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isPlaying = false;
  }

  connectedCallback() {
    const audioSrc = this.getAttribute("src") || "./assets/musik.mp3";
    // Ambil dua gambar berbeda (fallback ke atribut 'icon' jika salah satu tidak diisi)
    const fallbackIcon = this.getAttribute("icon") || "./assets/icon-pause.png";
    this.iconPause = this.getAttribute("icon-pause") || fallbackIcon;
    this.iconPlay = this.getAttribute("icon-play") || "./assets/icon-play.png";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 40;
          display: none;
        }
        :host(.visible) {
          display: block;
        }
        button {
          width: 30px;
          height: 30px;
          padding: 4px;
          border-radius: 9999px;
          border: 1px solid var(--audio-border, #000000);
          background: var(--audio-bg, rgba(255, 255, 240, 0.9));
          backdrop-filter: blur(6px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.2s ease, opacity 0.3s ease;
        }
        button:hover {
          transform: scale(1.06);
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          object-fit: cover;
          animation: spin-slow 8s linear infinite;
        }
        img.paused {
          animation-play-state: paused;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      </style>

      <audio id="bg-music" loop preload="auto">
        <source src="${audioSrc}" type="audio/mpeg" />
      </audio>

      <button id="btn-toggle" type="button" aria-label="Kontrol Musik Latar">
        <img id="icon-disc" src="${this.iconPause}" alt="Kontrol Musik" />
      </button>
    `;

    this.audio = this.shadowRoot.getElementById("bg-music");
    this.btnToggle = this.shadowRoot.getElementById("btn-toggle");
    this.iconDisc = this.shadowRoot.getElementById("icon-disc");

    this.btnToggle.addEventListener("click", () => this.toggle());
  }

  play() {
    if (!this.audio) return;
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.classList.add("visible");
        this.iconDisc.src = this.iconPause; // Tampilkan ikon Pause (piringan berputar)
        this.iconDisc.classList.remove("paused");
      })
      .catch(() => {
        this.isPlaying = false;
      });
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.iconDisc.src = this.iconPlay; // Ganti ke ikon Play saat dijeda
    this.iconDisc.classList.add("paused");
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}

customElements.define("sejoly-audio", SejolyAudio);
