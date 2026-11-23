// =========================================================
// LÓGICA INTERACTIVA - LUCY LASHES
// =========================================================

// Formateador de pesos argentinos (ej: 25000 -> "$25.000")
function formatearPesos(numero) {
  return "$" + numero.toLocaleString("es-AR");
}

// 1. Dibujar las tarjetas de servicios en pantalla (sin botón de elección)
function renderizarServicios(filtro = "todos") {
  const contenedor = document.getElementById("contenedor-servicios");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  const filtrados = SERVICIOS_LUCY.filter((servicio) => {
    if (filtro === "todos") return true;
    return servicio.categoriaPrecio === filtro;
  });

  filtrados.forEach((servicio) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "card-servicio";

    tarjeta.innerHTML = `
      <div>
        <h3>${servicio.nombre}</h3>
        <div class="precio-tag">${formatearPesos(servicio.precio)}</div>
        <p class="meta-servicio">⏳ Duración: ${servicio.duracion}</p>
        <p>${servicio.descripcion}</p>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}

// 2. Cargar opciones en el desplegable del formulario (si está visible)
function cargarSelectServicios() {
  const select = document.getElementById("select-servicio");
  if (!select) return;
  select.innerHTML = "";

  SERVICIOS_LUCY.forEach((servicio) => {
    const opcion = document.createElement("option");
    opcion.value = servicio.id;
    opcion.textContent = `${servicio.nombre} — ${formatearPesos(servicio.precio)}`;
    select.appendChild(opcion);
  });
}

// Al tocar "Elegir este servicio" en una tarjeta (por si se reactiva en el futuro)
function seleccionarServicioParaReserva(idServicio) {
  const select = document.getElementById("select-servicio");
  if (select) {
    select.value = idServicio;
  }
  actualizarResumenTurno();
  document.getElementById("reservar").scrollIntoView({ behavior: "smooth" });
}

// 3. Actualizar el cuadro de resumen con la seña ($10.000)
function actualizarResumenTurno() {
  const resumen = document.getElementById("resumen-turno");
  if (!resumen) return;

  const selectServicio = document.getElementById("select-servicio");

  if (selectServicio) {
    const idSeleccionado = selectServicio.value;
    const servicio = SERVICIOS_LUCY.find((s) => s.id === idSeleccionado) || SERVICIOS_LUCY[0];
    const saldoRestante = servicio.precio - CONFIG_LUCY.senaMonto;

    resumen.innerHTML = `
      <p><strong>Servicio:</strong> ${servicio.nombre}</p>
      <p><strong>Valor total:</strong> ${formatearPesos(servicio.precio)}</p>
      <p><strong>Seña para reservar:</strong> ${formatearPesos(CONFIG_LUCY.senaMonto)}</p>
      <p><strong>Resta abonar el día del turno:</strong> ${formatearPesos(saldoRestante)}</p>
    `;
  } else {
    resumen.innerHTML = `
      <p><strong>Seña para reservar tu turno:</strong> ${formatearPesos(CONFIG_LUCY.senaMonto)}</p>
      <p>El saldo restante según el servicio elegido se abona el día de la cita.</p>
    `;
  }
}

// 4. Dibujar la galería de fotos y videos
function renderizarGaleria() {
  const contenedor = document.getElementById("contenedor-galeria");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  GALERIA_LUCY.forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "item-galeria";

    if (item.tipo === "imagen") {
      figure.innerHTML = `
        <img src="${item.archivo}" alt="${item.titulo}" loading="lazy" />
        <figcaption>${item.titulo}</figcaption>
      `;
    } else {
      figure.innerHTML = `
        <video src="${item.archivo}" controls muted playsinline preload="metadata"></video>
        <figcaption>${item.titulo}</figcaption>
      `;
    }

    contenedor.appendChild(figure);
  });
}

// 5. Configurar botones de filtro por precio (si están visibles)
function inicializarFiltros() {
  const botones = document.querySelectorAll(".filtro-btn");
  if (!botones.length) return;

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      botones.forEach((b) => b.classList.remove("activo"));
      boton.classList.add("activo");
      renderizarServicios(boton.dataset.filtro);
    });
  });
}

// 6. Botones para copiar Alias y CVU al portapapeles
function inicializarBotonesCopiar() {
  const botones = document.querySelectorAll(".btn-copiar");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const texto = boton.dataset.copiar;
      navigator.clipboard.writeText(texto).then(() => {
        const original = boton.textContent;
        boton.textContent = "¡Copiado!";
        setTimeout(() => (boton.textContent = original), 1800);
      });
    });
  });
}

// 7. Enviar el pedido armado a WhatsApp
function inicializarFormularioReserva() {
  const form = document.getElementById("form-reserva");
  if (!form) return;

  const selectServicio = document.getElementById("select-servicio");
  if (selectServicio) {
    selectServicio.addEventListener("change", actualizarResumenTurno);
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("nombre-clienta").value.trim();
    const fecha = document.getElementById("fecha-turno").value;
    const hora = document.getElementById("franja-horaria").value;
    const pago = document.getElementById("metodo-pago").value;
    const notas = document.getElementById("notas-adicionales").value.trim();

    const selectDiseno = document.getElementById("select-diseno");

    // Armamos el mensaje prolijo para WhatsApp
    let mensaje = `¡Hola Lucy! 💖 Quiero reservar un turno en *Lucy Lashes*:\n\n`;
    mensaje += `👤 *Nombre:* ${nombre}\n`;

    if (selectServicio) {
      const servicio = SERVICIOS_LUCY.find((s) => s.id === selectServicio.value);
      if (servicio) {
        const saldo = servicio.precio - CONFIG_LUCY.senaMonto;
        mensaje += `✨ *Servicio:* ${servicio.nombre} (${formatearPesos(servicio.precio)})\n`;
        if (selectDiseno) {
          mensaje += `👁️ *Diseño:* ${selectDiseno.value}\n`;
        }
        mensaje += `💰 *Saldo el día del turno:* ${formatearPesos(saldo)}\n`;
      }
    }

    mensaje += `📅 *Fecha preferida:* ${fecha}\n`;
    mensaje += `🕒 *Horario:* ${hora}\n`;
    mensaje += `💳 *Seña (${formatearPesos(CONFIG_LUCY.senaMonto)}):* ${pago}\n`;
    if (notas) {
      mensaje += `📝 *Notas:* ${notas}\n`;
    }
    mensaje += `\n(Recuerdo asistir sin rímel a la cita ✨)`;

    const urlWhatsApp = `https://wa.me/${CONFIG_LUCY.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, "_blank");
  });
}

// Inicialización cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
  // Evitar seleccionar fechas pasadas en el calendario
  const inputFecha = document.getElementById("fecha-turno");
  if (inputFecha) {
    const hoy = new Date().toISOString().split("T")[0];
    inputFecha.min = hoy;
  }

  renderizarServicios();
  cargarSelectServicios();
  actualizarResumenTurno();
  renderizarGaleria();
  inicializarFiltros();
  inicializarBotonesCopiar();
  inicializarFormularioReserva();
});