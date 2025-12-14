/* =========================
   VENTAS Y FIDELIZACIÓN
   DISTRIMASCOTAS
========================= */

// MODELO DE DATOS UNIFICADO
// clientes = {
//   "Kevin": {
//     tienda: "Paticas Spa",
//     telefono: "311...",
//     correo: "kevin@gmail.com",
//     ventas: 2
//   }
// }

let clientes = JSON.parse(localStorage.getItem("clientes")) || {};

/* =========================
   REGISTRAR CLIENTE
========================= */
function registrarCliente() {
  const nombre = document.getElementById("nombre").value.trim();
  const tienda = document.getElementById("tienda").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (!nombre || !tienda || !telefono || !correo) {
    alert("Completa todos los campos del cliente");
    return;
  }

  if (clientes[nombre]) {
    alert("El cliente ya existe");
    return;
  }

  clientes[nombre] = {
    tienda,
    telefono,
    correo,
    ventas: 0
  };

  localStorage.setItem("clientes", JSON.stringify(clientes));

  actualizarTablaClientes();
  actualizarTablaVentas();
  mostrarModal("Cliente registrado exitosamente");
  limpiarFormulario();
}

/* =========================
   REGISTRAR VENTA
========================= */
function registrarVenta() {
  const nombre = document.getElementById("nombre").value.trim();

  if (!clientes[nombre]) {
    alert("Primero debes registrar el cliente");
    return;
  }

  clientes[nombre].ventas++;

  localStorage.setItem("clientes", JSON.stringify(clientes));

  actualizarTablaVentas();
  mostrarModal("Venta registrada exitosamente");
}

/* =========================
   TABLA CLIENTES
========================= */
function actualizarTablaClientes() {
  const tabla = document.getElementById("tablaClientes");

  tabla.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Tienda</th>
      <th>Contacto</th>
      <th>Correo</th>
    </tr>
  `;

  for (const nombre in clientes) {
    const c = clientes[nombre];
    const fila = tabla.insertRow();
    fila.innerHTML = `
      <td>${nombre}</td>
      <td>${c.tienda}</td>
      <td>${c.telefono}</td>
      <td>${c.correo}</td>
    `;
  }
}

/* =========================
   TABLA VENTAS
========================= */
function actualizarTablaVentas() {
  const tabla = document.getElementById("tablaVentas");

  tabla.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Tienda</th>
      <th>Ventas</th>
      <th>Fidelidad</th>
    </tr>
  `;

  for (const nombre in clientes) {
    const c = clientes[nombre];
    const estrellas = "⭐".repeat(Math.min(c.ventas, 5));

    const fila = tabla.insertRow();
    fila.innerHTML = `
      <td>${nombre}</td>
      <td>${c.tienda}</td>
      <td>${c.ventas}</td>
      <td>${estrellas}</td>
    `;
  }
}

/* =========================
   LIMPIAR FORMULARIO
========================= */
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("tienda").value = "";
  document.getElementById("identificacion").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
}

/* =========================
   MODAL
========================= */
function mostrarModal(texto) {
  document.getElementById("modalTexto").innerText = texto;
  document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

/* =========================
   CERRAR SESIÓN
========================= */
function cerrarSesion() {
  window.location.href = "index.html";
}

/* =========================
   CARGA INICIAL
========================= */
document.addEventListener("DOMContentLoaded", () => {
  actualizarTablaClientes();
  actualizarTablaVentas();
});
