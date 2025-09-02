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
  // ========================
// OPINIONES DE VIAJEROS (CON BOTÓN ELIMINAR)
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

        opiniones.forEach((op, index) => {
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
                    <button class="btn-eliminar" title="Eliminar opinión">🗑️</button>
                </div>
            `;

            // Evento para eliminar la opinión
            card.querySelector(".btn-eliminar").addEventListener("click", () => {
                eliminarOpinion(index);
            });

            listaOpiniones.appendChild(card);
        });
    }

    function eliminarOpinion(index) {
        let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
        opiniones.splice(index, 1); // Elimina solo la seleccionada
        localStorage.setItem("opiniones", JSON.stringify(opiniones));
        mostrarOpiniones(); // Recarga la lista actualizada
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

window.añadirAlCarrito = function(producto, precio) {
  window.carrito.push({ producto, precio });
  actualizarCarrito();
};

function actualizarCarrito() {
  const lista = document.getElementById('listaCarrito');
  const totalSpan = document.getElementById('totalCarrito');

  lista.innerHTML = '';
  window.total = 0;

  window.carrito.forEach((item, index) => {
    window.total += item.precio;

    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.justifyContent = 'space-between';
    li.style.marginBottom = '10px';
    li.style.padding = '10px 15px';
    li.style.borderRadius = '12px';
    li.style.backgroundColor = '#f9f9f9';
    li.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    li.style.transition = 'all 0.3s';
    li.onmouseover = () => { li.style.transform = 'scale(1.02)'; };
    li.onmouseout = () => { li.style.transform = 'scale(1)'; };

    const spanProducto = document.createElement('span');
    spanProducto.textContent = `${item.producto} - $${item.precio.toFixed(2)}`;
    spanProducto.style.fontWeight = '500';
    spanProducto.style.fontSize = '16px';

    const btnEliminar = document.createElement('button');
    btnEliminar.innerHTML = '🗑️'; // Solo el icono
    btnEliminar.style.padding = '0';
    btnEliminar.style.fontSize = '20px';
    btnEliminar.style.cursor = 'pointer';
    btnEliminar.style.border = 'none';
    btnEliminar.style.background = 'none'; // Sin fondo
    btnEliminar.style.color = '#ff4d4f';
    btnEliminar.style.transition = 'all 0.3s';
    btnEliminar.onmouseover = function() {
      btnEliminar.style.transform = 'scale(1.3)';
    };
    btnEliminar.onmouseout = function() {
      btnEliminar.style.transform = 'scale(1)';
    };
    btnEliminar.onclick = function() {
      eliminarDelCarrito(index);
    };

    li.appendChild(spanProducto);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  totalSpan.textContent = window.total.toFixed(2);
}

function eliminarDelCarrito(index) {
  window.carrito.splice(index, 1);
  actualizarCarrito();
}



window.enviarFactura = function() {
  if (!window.carrito || window.carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  // ====== Configuración de Estilos ======
  const colorPrimario = "#1f4068"; // Azul oscuro
  const colorSecundario = "#666666"; // Gris
  const xIzquierda = 40;
  const xDerecha = 420;
  let y = 40;

  // ====== Logo (derecha) ======
  try {
    doc.addImage("img/logo.png", "PNG", 450, 25, 90, 90);
  } catch (e) {
    // Si no se carga la imagen, no interrumpe el flujo
  }

  // ====== Título "FACTURA" ======
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colorPrimario);
  doc.text("FACTURA", xIzquierda, y + 20);

  // ====== Datos de la Empresa (izquierda) ======
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text("Mundo Viajero Nicaragua", xIzquierda, y + 45);
  doc.text("Carretera Central, Managua", xIzquierda, y + 60);
  doc.text("Tel: +505 8888 8888 · info@mundoviajero.ni", xIzquierda, y + 75);

  // ====== Sección "FACTURAR A" y "ENVIAR A" ======
  const inicioBloquesY = y + 105;
  doc.setFontSize(11);
  doc.setTextColor(colorPrimario);
  doc.setFont("helvetica", "bold");
  doc.text("FACTURAR A", xIzquierda, inicioBloquesY);
  doc.text("ENVIAR A", xIzquierda + 180, inicioBloquesY);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  // Datos de ejemplo — puedes reemplazar por datos reales si los tienes
  const cliente = { nombre: "*****", direccion: "Dirección del cliente", ciudad: "Ciudad" };
  doc.setTextColor(0, 0, 0);
  doc.text(cliente.nombre, xIzquierda, inicioBloquesY + 18);
  doc.text(cliente.direccion, xIzquierda, inicioBloquesY + 33);
  doc.text(cliente.ciudad, xIzquierda, inicioBloquesY + 48);

  doc.text(cliente.nombre, xIzquierda + 180, inicioBloquesY + 18);
  doc.text("*****", xIzquierda + 180, inicioBloquesY + 33);
  doc.text("*****", xIzquierda + 180, inicioBloquesY + 48);

  // ====== Columna derecha: Nº de factura, fecha, pedido ======
  doc.setFontSize(10);
  doc.setTextColor(colorPrimario);
  doc.setFont("helvetica", "bold");
  doc.text("N° DE FACTURA", xDerecha, inicioBloquesY);
  doc.text("FECHA", xDerecha, inicioBloquesY + 30);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  // Generar Nº de factura y fecha
  const facturaNum = "ES-" + new Date().getFullYear().toString().slice(-2) + "-" + (Math.floor(Math.random() * 900) + 100);
  doc.text(facturaNum, xDerecha + 110, inicioBloquesY);
  doc.text(new Date().toLocaleDateString(), xDerecha + 110, inicioBloquesY + 30);

  // ====== Línea separadora ======
  let lineY = inicioBloquesY + 70;
  doc.setDrawColor(200);
  doc.setLineWidth(1);
  doc.line(xIzquierda, lineY, 550, lineY);

  // ====== Tabla de Productos ======
  let tablaY = lineY + 20;
  const colQtyX = xIzquierda;
  const colDescX = xIzquierda + 60;
  const colUnitX = xIzquierda + 380;
  const colImportX = xIzquierda + 470;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colorPrimario);
  doc.text("CANT.", colQtyX, tablaY);
  doc.text("DESCRIPCIÓN", colDescX, tablaY);
  doc.text("PRECIO UNITARIO", colUnitX, tablaY, { align: "right" });
  doc.text("IMPORTE", colImportX, tablaY, { align: "right" });

  // Línea bajo cabecera
  doc.setDrawColor(colorPrimario);
  doc.setLineWidth(1.5);
  doc.line(xIzquierda, tablaY + 6, 550, tablaY + 6);

  // Filas de productos
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  let yFila = tablaY + 24;

  // Aseguramos que sumamos los precios correctamente (cálculo paso a paso)
  let subtotal = 0;
  window.carrito.forEach((item, idx) => {
    const cantidad = item.cantidad || 1; // si no usas cantidad, toma 1
    const unit = Number(item.precio);
    const importe = +(cantidad * unit); // multiplicación cuidadosa

    // Descripción posible largo — ajustamos
    const descLines = doc.splitTextToSize(item.producto || item.nombre || "Producto", 300);
    doc.text(String(cantidad), colQtyX, yFila);
    doc.text(descLines, colDescX, yFila);
    doc.text(unit.toFixed(2), colUnitX, yFila, { align: "right" });
    doc.text(importe.toFixed(2), colImportX, yFila, { align: "right" });

    // Ajusta yFila según líneas usadas en descripción
    yFila += (descLines.length * 12) + 8;

    subtotal = +(subtotal + importe); // suma paso a paso
  });

  // ====== Resumen: Subtotal / IVA / TOTAL ======
  const ivaRate = 0.15; // ejemplo: 15% — cámbialo a 0.21 si deseas 21%
  const ivaAmount = +(subtotal * ivaRate);
  const total = +(subtotal + ivaAmount);

  // Posición para el bloque de totales (alineado a la derecha)
  let totalsY = yFila + 10;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text("Subtotal", colUnitX, totalsY, { align: "right" });
  doc.text(subtotal.toFixed(2), colImportX, totalsY, { align: "right" });

  doc.text("IVA " + (ivaRate * 100).toFixed(0) + "%", colUnitX, totalsY + 16, { align: "right" });
  doc.text(ivaAmount.toFixed(2), colImportX, totalsY + 16, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(colorPrimario);
  doc.text("TOTAL", colUnitX, totalsY + 40, { align: "right" });
  doc.text(total.toFixed(2), colImportX, totalsY + 40, { align: "right" });

  // ====== Firma (derecha) ======
  try {
    doc.addImage("img/firma.png", "PNG", 360, totalsY + 60, 150, 60);
  } catch (e) {
    // Si no existe imagen, no pasa nada
  }

 

  // ====== Guardar PDF ======
  doc.save("Factura_MundoViajero.pdf");

  // ====== Limpiar carrito y formulario ======
  window.carrito = [];
  window.total = 0;
  document.getElementById("clienteNombre").value = "";
  document.getElementById("clienteDireccion").value = "";
  document.getElementById("clienteCiudad").value = "";
};

document.addEventListener("DOMContentLoaded", () => {
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");

  listaCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar-item")) {
      const item = e.target.parentElement;
      item.remove(); // Elimina el producto de la lista

      actualizarTotal();
    }
  });

  function actualizarTotal() {
    let total = 0;
    const items = listaCarrito.querySelectorAll("li");
    items.forEach((item) => {
      const precioTexto = item.textContent.match(/\$(\d+(\.\d+)?)/);
      if (precioTexto) {
        total += parseFloat(precioTexto[1]);
      }
    });
    totalElemento.textContent = "Total: $" + total.toFixed(2);
  }
});


