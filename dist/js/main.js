// 1. Toggle Mobile Hamburger Menu & Indikator Tab Aktif
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main section[id]');

let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenu.classList.remove('grid-rows-[0fr]', 'opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('grid-rows-[1fr]', 'opacity-100', 'pointer-events-auto');
  } else {
    mobileMenu.classList.remove('grid-rows-[1fr]', 'opacity-100', 'pointer-events-auto');
    mobileMenu.classList.add('grid-rows-[0fr]', 'opacity-0', 'pointer-events-none');
  }

  iconOpen.classList.toggle('hidden', isMenuOpen);
  iconClose.classList.toggle('hidden', !isMenuOpen);
  menuBtn.setAttribute('aria-expanded', String(isMenuOpen));
}

// Fungsi untuk memberi warna aktif pada link yang dipilih
function setActiveLink(targetHref) {
  navItems.forEach(item => {
    if (item.getAttribute('href') === targetHref) {
      item.classList.add('text-white', 'bg-black/25', 'font-bold');
      item.classList.remove('text-stone-700');
    } else {
      item.classList.remove('text-white', 'bg-black/25', 'font-bold');
      item.classList.add('text-stone-700');
    }
  });
}

if (menuBtn) {
  menuBtn.addEventListener('click', toggleMenu);
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Tandai link yang diklik sebagai aktif
    setActiveLink(link.getAttribute('href'));

    // Tutup dropdown setelah diklik
    if (isMenuOpen) {
      toggleMenu();
    }
  });
});

// Bonus: Otomatis sinkronkan warna menu aktif saat user scroll halaman
window.addEventListener('scroll', () => {
  let currentSection = '';
  const scrollPos = window.scrollY + 120; // Offset tinggi navbar

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      currentSection = `#${section.getAttribute('id')}`;
    }
  });

  if (currentSection) {
    setActiveLink(currentSection);
  }
});

// =========================================================================
// 3 & 4. SLIDER KATALOG FISIK (CROSS-DISSOLVE 3 DETIK) + LIGHTBOX SWIPE
// =========================================================================
const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeLightboxBtn = document.getElementById('close-lightbox');
const lightboxPrevBtn = document.getElementById('lightbox-prev');
const lightboxNextBtn = document.getElementById('lightbox-next');
const lightboxSwipeArea = document.getElementById('lightbox-swipe-area');

let currentGallery = [];
let lightboxIndex = 0;

function renderLightboxSlide() {
  if (!currentGallery.length || !lightboxImg) return;
  const activeItem = currentGallery[lightboxIndex];

  lightboxImg.src = activeItem.src;
  lightboxImg.alt = activeItem.alt || 'Pratinjau Desain';

  if (lightboxCaption) lightboxCaption.textContent = activeItem.alt || '';
  if (lightboxCounter) lightboxCounter.textContent = `${lightboxIndex + 1} / ${currentGallery.length}`;
}

function openLightbox(galleryItems, startIndex = 0) {
  if (!lightbox || !galleryItems.length) return;
  currentGallery = galleryItems;
  lightboxIndex = startIndex;

  renderLightboxSlide();
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.classList.add('overflow-hidden');
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
}

function nextLightboxSlide() {
  if (!currentGallery.length) return;
  lightboxIndex = (lightboxIndex + 1) % currentGallery.length;
  renderLightboxSlide();
}

function prevLightboxSlide() {
  if (!currentGallery.length) return;
  lightboxIndex = (lightboxIndex - 1 + currentGallery.length) % currentGallery.length;
  renderLightboxSlide();
}

// Inisialisasi setiap kartu di Katalog Undangan Fisik
const fisikSliders = document.querySelectorAll('.fisik-slider');

fisikSliders.forEach((slider, sliderIndex) => {
  const track = slider.querySelector('.slider-track');
  const slides = track ? track.querySelectorAll('img') : [];
  const prevBtn = slider.querySelector('.prev-slide');
  const nextBtn = slider.querySelector('.next-slide');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateDissolve(isManual = false) {
    slides.forEach((img, index) => {
      if (isManual) {
        img.style.transition = 'none';
        img.classList.remove('duration-[3000ms]', 'transition-opacity');
      }

      if (index === currentIndex) {
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
      } else {
        img.classList.remove('opacity-100');
        img.classList.add('opacity-0');
      }
    });
  }

  function nextSlide(isManual = false) {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateDissolve(isManual);
  }

  function prevSlide(isManual = false) {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateDissolve(isManual);
  }

  // Jalankan auto-slide dengan dissolve 3 detik
  let autoSlideTimer = setInterval(() => nextSlide(false), 4500 + sliderIndex * 500);

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Tombol navigasi kanan kartu
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Mencegah Lightbox terbuka saat klik panah
      stopAutoSlide();
      nextSlide(true);
    });
  }

  // Tombol navigasi kiri kartu
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Mencegah Lightbox terbuka saat klik panah
      stopAutoSlide();
      prevSlide(true);
    });
  }

 // Klik area gambar untuk membuka Lightbox khusus milik <img> yang sedang aktif
  track.addEventListener('click', () => {
    const activeImg = slides[currentIndex];
    if (!activeImg) return;

    const customGalleryAttr = activeImg.getAttribute('data-gallery');
    let galleryData = [];

    if (customGalleryAttr) {
      try {
        galleryData = JSON.parse(customGalleryAttr);
      } catch (err) {
        console.error('Format JSON data-gallery pada tag img tidak valid:', err);
      }
    }

    // Jika tag <img> tersebut tidak diberi data-gallery, tampilkan gambar itu sendiri
    if (!galleryData.length) {
      galleryData = [{ src: activeImg.src, alt: activeImg.alt }];
    }

    openLightbox(galleryData, 0);
  });
});

// Event kontrol di dalam modal Lightbox
if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightboxSlide);
if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightboxSlide);
if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);

// Gestur swipe layar sentuh di dalam Lightbox
let touchStartX = 0;
let touchEndX = 0;

if (lightboxSwipeArea) {
  lightboxSwipeArea.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxSwipeArea.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 40) {
      if (swipeDistance < 0) {
        nextLightboxSlide();
      } else {
        prevLightboxSlide();
      }
    }
  }, { passive: true });
}