document.addEventListener("DOMContentLoaded", () => {
  // Kompatibilitas otomatis jika masih ada class .reveal lama
  document.querySelectorAll(".reveal").forEach((el) => {
    if (!el.hasAttribute("data-anim")) {
      el.setAttribute("data-anim", "fade-up");
    }
  });

  const animatedElements = document.querySelectorAll("[data-anim]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute("data-delay");

          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }

          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  animatedElements.forEach((el) => observer.observe(el));
});
