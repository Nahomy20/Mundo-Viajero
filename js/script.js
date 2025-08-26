// ========================
// TOGGLE MENÚ HAMBURGUESA
// ========================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ========================
// ANIMACIONES DE IMÁGENES
// ========================
const images = document.querySelectorAll(".hero-images img");

window.addEventListener("scroll", () => {
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      img.classList.add("visible");
    }
  });
});

// ========================
// LOGIN - ALERTA + REDIRECCIÓN
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita recarga
      alert("✅ Has accedido exitosamente.");
      window.location.href = "galeria.html"; // Redirige
    });
  }
});
