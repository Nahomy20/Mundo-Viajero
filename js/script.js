// Toggle menú hamburguesa
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Animaciones de entrada para imágenes
const images = document.querySelectorAll(".hero-images img");

window.addEventListener("scroll", () => {
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      img.classList.add("visible");
    }
  });
});
