/* =========================
   CLIENTES Y FIDELIZACIÓN
   DISTRIMASCOTAS
========================= */

let clientes = JSON.parse(localStorage.getItem("clientes")) || {};

/* =========================
   REGISTRAR CLIENTE
========================= */
function registrarCliente() {

    const nombre = document.getElementById("nombre").value.trim();
    const tipoCliente = document.getElementById("tipoCliente").value;
    const tienda = document.getElementById("tienda").value.trim();
    const identificacion = document.getElementById("identificacion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();

    if (
        !nombre ||
        !tienda ||
        !identificacion ||
        !telefono ||
        !correo
    ) {
        alert("Completa todos los campos");
        return;
    }

    if (clientes[nombre]) {
        alert("El cliente ya existe");
        return;
    }

    clientes[nombre] = {
        tipoCliente,
        identificacion,
        tienda,
        telefono,
        correo,
        ventas: 0
    };

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    actualizarTablaClientes();
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

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    actualizarTablaVentas();

    mostrarModal(
        "Venta registrada exitosamente"
    );
}

/* =========================
   TABLA CLIENTES
========================= */
function actualizarTablaClientes() {

    const tabla =
        document.getElementById("tablaClientes");

    tabla.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Tienda</th>
            <th>Teléfono</th>
            <th>Correo</th>
        </tr>
    `;

    for (const nombre in clientes) {

        const c = clientes[nombre];

        const fila = tabla.insertRow();

        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${c.tipoCliente || "Minorista"}</td>
            <td>${c.tienda}</td>
            <td>${c.telefono}</td>
            <td>${c.correo}</td>
        `;
    }
}

/* =========================
   TABLA FIDELIZACIÓN
========================= */
function actualizarTablaVentas() {

    const tabla =
        document.getElementById("tablaVentas");

    if (!tabla) return;

    tabla.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Tienda</th>
            <th>Ventas</th>
            <th>Nivel</th>
        </tr>
    `;

    for (const nombre in clientes) {

        const c = clientes[nombre];

        let nivel = "Bronce";

        if (c.ventas >= 5) {
            nivel = "Plata";
        }

        if (c.ventas >= 10) {
            nivel = "Oro";
        }

        const fila = tabla.insertRow();

        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${c.tienda}</td>
            <td>${c.ventas}</td>
            <td>${nivel}</td>
        `;
    }
}

/* =========================
   LIMPIAR FORMULARIO
========================= */
function limpiarFormulario() {

    document.getElementById("nombre").value = "";
    document.getElementById("tipoCliente").value = "Minorista";
    document.getElementById("tienda").value = "";
    document.getElementById("identificacion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
}

/* =========================
   MODAL
========================= */
function mostrarModal(texto) {

    document.getElementById(
        "modalTexto"
    ).innerText = texto;

    document.getElementById(
        "modal"
    ).style.display = "flex";
}

function cerrarModal() {

    document.getElementById(
        "modal"
    ).style.display = "none";
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
document.addEventListener(
    "DOMContentLoaded",
    () => {

        actualizarTablaClientes();
        actualizarTablaVentas();

    }
);