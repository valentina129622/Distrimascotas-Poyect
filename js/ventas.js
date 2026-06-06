let clientes = JSON.parse(localStorage.getItem("clientes")) || {};

/* =========================
   REGISTRAR VENTA
========================= */
function registrarVenta() {

    const nombre =
        document.getElementById("nombre").value.trim();

    if (!clientes[nombre]) {

        alert(
            "El cliente no existe. Debe registrarlo primero."
        );

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

    document.getElementById("nombre").value = "";
}

/* =========================
   TABLA VENTAS
========================= */
function actualizarTablaVentas() {

    const tabla =
        document.getElementById("tablaVentas");

    tabla.innerHTML = `
        <tr>
            <th>Cliente</th>
            <th>Tienda</th>
            <th>Ventas</th>
            <th>Nivel Fidelización</th>
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

    window.location.href =
        "index.html";
}

/* =========================
   INICIO
========================= */
document.addEventListener(
    "DOMContentLoaded",
    () => {
        actualizarTablaVentas();
    }
);