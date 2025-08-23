document.addEventListener("DOMContentLoaded", () => {
  // Toggle menú hamburguesa
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Animación de imágenes con IntersectionObserver
  const images = document.querySelectorAll(".hero-images img");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // se deja de observar una vez visible
      }
    });
  }, { threshold: 0.2 });

  images.forEach(img => observer.observe(img));
});




