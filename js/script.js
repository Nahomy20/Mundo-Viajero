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
  // VALIDACIÓN CARNET EN TIEMPO REAL FORMATO XX-XXXXX-X
  // ========================
  const carnetInput = document.getElementById("carnet");
  const carnetError = document.getElementById("carnetError");

  if (carnetInput) {
    carnetInput.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");

      if (valor.length > 2 && valor.length <= 7) {
        valor = valor.slice(0, 2) + "-" + valor.slice(2);
      } else if (valor.length > 7) {
        valor = valor.slice(0, 2) + "-" + valor.slice(2, 7) + "-" + valor.slice(7, 8);
      }

      this.value = valor;

      if (valor.length < 10) {
        carnetError.style.display = "block";
        carnetError.textContent = "El carnet debe tener el formato XX-XXXXX-X";
      } else {
        carnetError.style.display = "none";
      }
    });
  }

  // ========================
  // VALIDACIÓN CORREO EN TIEMPO REAL
  // ========================
  const correoInput = document.getElementById("correo");
  const correoError = document.getElementById("correoError");
  if (correoInput) {
    correoInput.addEventListener("input", function () {
      if (!this.value.includes("@")) {
        correoError.style.display = "block";
        correoError.textContent = "Correo inválido, debe contener @";
      } else {
        correoError.style.display = "none";
      }
    });
  }

  // ========================
  // VALIDACIÓN CONTRASEÑA EN TIEMPO REAL
  // ========================
  const password = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");
  if (password) {
    password.addEventListener("input", () => {
      if (password.value.length > 5) {
        passwordError.style.display = "block";
        passwordError.textContent = "La contraseña no puede exceder los 5 caracteres";
      } else {
        passwordError.style.display = "none";
      }
    });
  }

  // ========================
  // LOGIN - MENSAJE AL DAR ACCEDER + REDIRECCIÓN
  // ========================
  const formLogin = document.getElementById("loginForm");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const correo = document.getElementById("correo");
      const carnet = document.getElementById("carnet");
      const password = document.getElementById("password");

      // Limpiar mensaje previo
      const mensajePrevio = document.querySelector(".form-message");
      if (mensajePrevio) mensajePrevio.remove();

      let valido = true;

      // Validar formato correo
      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correoRegex.test(correo.value)) {
        correoError.style.display = "block";
        correoError.textContent = "Correo inválido, debe contener @ y dominio";
        valido = false;
      } else {
        correoError.style.display = "none";
      }

      // ✅ Solo se considera login correcto si el correo existe (formato válido)
      if (valido) {
        const mensaje = document.createElement("div");
        mensaje.className = "form-message";
        mensaje.style.padding = "10px";
        mensaje.style.marginBottom = "10px";
        mensaje.style.textAlign = "center";

        mensaje.textContent = "¡Credenciales correctas!";
        mensaje.style.color = "green";
        formLogin.prepend(mensaje);

        localStorage.setItem("logueado", "true");
        localStorage.setItem("usuarioLogueado", carnet.value || correo.value || "Usuario");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
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
      extraText.classList.toggle("hidden");
      extraText.classList.toggle("visible-text");
      toggleBtn.textContent = extraText.classList.contains("hidden") ? "Ver más" : "Ver menos";
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

      let usuario = localStorage.getItem("usuarioLogueado") || "Invitado";

      let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
      opiniones.push({ usuario: usuario, rating: estrellas, comentario: comentario });
      localStorage.setItem("opiniones", JSON.stringify(opiniones));

      mostrarOpiniones();
      opinionForm.reset();
    });

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

    mostrarOpiniones();
  }

  // ========================
  // BOTÓN REDIRECCIÓN CONTACTO
  // ========================
  const escripriv = document.getElementById("escripriv");
  if (escripriv) {
    escripriv.addEventListener("click", function () {
      window.location.href = "contáctanos.html";
    });
  }

  // ========================
  // USUARIO EN HEADER (como Facebook)
  // ========================
  const userContainer = document.getElementById("userContainer");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const userMenu = document.getElementById("userMenu");
  const logoutBtn = document.getElementById("logoutBtn");

  // Mostrar usuario si está logueado
  function mostrarUsuario(nombre) {
    if (userContainer && usernameDisplay) {
      usernameDisplay.textContent = nombre;
      userContainer.style.display = "flex";
    }
  }

  // Recuperar sesión
  const usuarioGuardado = localStorage.getItem("usuarioLogueado");
  if (usuarioGuardado && localStorage.getItem("logueado") === "true") {
    mostrarUsuario(usuarioGuardado);
  }

  // Abrir menú al hacer clic en el contenedor
  if (userContainer) {
    userContainer.addEventListener("click", () => {
      userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("logueado");
      localStorage.removeItem("usuarioLogueado");
      userContainer.style.display = "none";
      userMenu.style.display = "none";
      alert("Sesión cerrada.");
      window.location.href = "login.html";
    });
  }

});


 // ========================
  // MODAL DE IMÁGENES (ZOOM)
  // ========================
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".clickable-img, .zoom-img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    });
  });

  closeBtn.onclick = () => modal.style.display = "none";
  modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };


   // ========================
  // CARRITO DE COMPRAS
  // ========================
  window.carrito = [];
  window.total = 0;

  window.añadirAlCarrito = function(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;

    const lista = document.getElementById('listaCarrito');
    const totalSpan = document.getElementById('totalCarrito');

    lista.innerHTML = '';
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
      lista.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
  };

