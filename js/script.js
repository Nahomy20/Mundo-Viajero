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
const form = document.getElementById("opinionForm");
  const listaOpiniones = document.getElementById("listaOpiniones");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita recargar la página

    // Obtener calificación seleccionada
    let rating = document.querySelector('input[name="rating"]:checked');
    let estrellas = rating ? rating.value : 0;

    // Obtener comentario
    let comentario = document.getElementById("comentario").value;

    if (estrellas == 0 || comentario.trim() === "") {
      alert("Por favor selecciona una calificación y escribe un comentario.");
      return;
    }

    // Crear nueva opinión
    let opinionDiv = document.createElement("div");
    opinionDiv.innerHTML = `<p><strong>${"★".repeat(estrellas)}</strong> - ${comentario}</p><hr>`;

    // Agregar la opinión al final de la lista
    listaOpiniones.appendChild(opinionDiv);

    // Reiniciar formulario
    form.reset();
  });