// ========================
// SCRIPT PRINCIPAL
// ========================
document.addEventListener("DOMContentLoaded", () => {

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
  const formLogin = document.getElementById("loginForm");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const carnet = document.getElementById("carnet").value;
      const password = document.getElementById("password").value;

      // Simulación de login
      if (carnet === "1234" && password === "1234") {
        localStorage.setItem("logueado", "true");
        localStorage.setItem("usuarioLogueado", carnet); // 🔥 guardamos el usuario
        alert("✅ Inicio de sesión correcto");
        window.location.href = "index.html"; 
      } else {
        alert("❌ Credenciales incorrectas");
      }
    });
  }

  // ========================
  // BOTÓN "VER MÁS"
  // ========================
  const toggleBtn = document.getElementById("toggleBtn");
  const extraText = document.getElementById("extraText");

  if (toggleBtn && extraText) {
    toggleBtn.addEventListener("click", () => {
      if (extraText.classList.contains("hidden")) {
        extraText.classList.remove("hidden");
        extraText.classList.add("visible-text");
        toggleBtn.textContent = "Ver menos";
      } else {
        extraText.classList.remove("visible-text");
        extraText.classList.add("hidden");
        toggleBtn.textContent = "Ver más"; 
      }
    });
  }

  // ========================
  // OPINIONES DE VIAJEROS
  // ========================
  const opinionForm = document.getElementById("opinionForm");
  const listaOpiniones = document.getElementById("listaOpiniones");

  if (opinionForm && listaOpiniones) {
    opinionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let rating = document.querySelector('input[name="rating"]:checked');
      let estrellas = rating ? rating.value : 0;
      let comentario = document.getElementById("comentario").value.trim();

      if (estrellas == 0 || comentario === "") {
        alert("Por favor selecciona una calificación y escribe un comentario.");
        return;
      }

      // Usuario logueado o invitado
      let usuario = localStorage.getItem("usuarioLogueado") || "Invitado";

      // Recuperar opiniones existentes
      let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

      // Agregar nueva opinión
      opiniones.push({
        usuario: usuario,
        rating: estrellas,
        comentario: comentario
      });

      // Guardar en localStorage
      localStorage.setItem("opiniones", JSON.stringify(opiniones));

      // Mostrar actualizadas
      mostrarOpiniones();
      opinionForm.reset();
    });

    // Mostrar opiniones guardadas
    function mostrarOpiniones() {
      listaOpiniones.innerHTML = "";
      let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

      opiniones.forEach(op => {
        let card = document.createElement("div");
        card.classList.add("opinion-card");
        card.innerHTML = `
          <div class="opinion-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="usuario">
          </div>
          <div class="opinion-content">
            <h4>${op.usuario}</h4>
            <div class="opinion-stars">${"★".repeat(op.rating)}${"☆".repeat(5 - op.rating)}</div>
            <p>${op.comentario}</p>
          </div>
        `;
        listaOpiniones.appendChild(card);
      });
    }

    // Mostrar al cargar la página
    mostrarOpiniones();
  }

});

document.getElementById("escripriv").addEventListener("click", function () {
  window.location.href = "contáctanos.html";
});

