const menuButton = document.getElementById("menu-button");
const mainNav = document.getElementById("main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
    mainNav.classList.toggle("open", !open);
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    });
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

if (lightbox && lightboxImage && lightboxCaption && lightbox.showModal) {
  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector("img");
      if (!image) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = card.dataset.caption || image.alt;
      lightbox.showModal();
    });
  });
  lightboxClose.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
    lightboxCaption.textContent = "";
  });
}

if ("IntersectionObserver" in window) {
  const targets = document.querySelectorAll("[data-reveal]");
  targets.forEach((target) => target.classList.add("reveal"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -28px 0px" });
  targets.forEach((target) => observer.observe(target));
}
