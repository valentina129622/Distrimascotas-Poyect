/* =========================
   INVENTARIO - DISTRIMASCOTAS
========================= */

let productos = JSON.parse(localStorage.getItem("inventario")) || [];
let indiceEditar = null;
let imagenBase64 = "";
let imagenActual = "";

/* =========================
   INICIO
========================= */
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
    actualizarKPIs();
});

/* =========================
   MODALES
========================= */
function abrirModalAgregar() {
    indiceEditar = null;
    document.getElementById("tituloModal").innerText = "Agregar producto";
    limpiarFormulario();
    document.getElementById("modalProducto").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modalProducto").style.display = "none";
}

function mostrarAlerta(texto) {
    document.getElementById("textoAlerta").innerText = texto;
    document.getElementById("modalAlerta").style.display = "flex";
}

function cerrarAlerta() {
    document.getElementById("modalAlerta").style.display = "none";
}

/* =========================
   CRUD PRODUCTOS
========================= */
function guardarProducto() {
    const producto = document.getElementById("producto").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const stockValue = document.getElementById("stock").value;
    const precioValue = document.getElementById("precio").value;

    const stock = Number(stockValue);
    const precio = Number(precioValue);

    // 🔒 VALIDACIÓN REAL
    if (
        producto === "" ||
        categoria === "" ||
        stockValue === "" ||
        precioValue === "" ||
        isNaN(stock) ||
        isNaN(precio)
    ) {
        mostrarAlerta("Complete todos los campos");
        return;
    }

    let imagenFinal = "";

    // AGREGAR
    if (indiceEditar === null) {
        if (!imagenBase64) {
            mostrarAlerta("Debe seleccionar una imagen");
            return;
        }
        imagenFinal = imagenBase64;
    }
    // EDITAR
    else {
        imagenFinal = imagenBase64 || imagenActual;
    }

    const nuevoProducto = {
        producto,
        categoria,
        stock,
        precio,
        imagen: imagenFinal
    };


    if (indiceEditar === null) {
        productos.push(nuevoProducto);
        mostrarAlerta("El producto se agregó correctamente!");
    } else {
        productos[indiceEditar] = nuevoProducto;
        mostrarAlerta("El producto se actualizó correctamente!");
    }

    localStorage.setItem("inventario", JSON.stringify(productos));
    cerrarModal();
    mostrarProductos(productos);
    actualizarKPIs();
}

function editarProducto(index) {
    const p = productos[index];
    indiceEditar = index;

    document.getElementById("tituloModal").innerText = "Actualizar producto";
    document.getElementById("producto").value = p.producto;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("stock").value = p.stock;
    document.getElementById("precio").value = p.precio;

    // 👇 guardamos la imagen existente
    imagenActual = p.imagen;
    imagenBase64 = "";

    // el input file SIEMPRE vacío
    document.getElementById("imagen").value = "";

    document.getElementById("modalProducto").style.display = "flex";
}


function eliminarProducto(index) {
    const confirmar = confirm(
        "¿Está seguro de que desea eliminar este producto?\nEsta acción no se puede deshacer."
    );

    if (!confirmar) return;

    productos.splice(index, 1);
    localStorage.setItem("inventario", JSON.stringify(productos));

    mostrarProductos(productos);
    actualizarKPIs();
    mostrarAlerta("El producto se eliminó correctamente!");
}

/* =========================
   TABLA
========================= */
function mostrarProductos(lista) {
    const tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";

    lista.forEach((p, index) => {
        const estado = p.stock <= 5 ? "Bajo stock" : "Disponible";
        const claseEstado = p.stock <= 5 ? "estado-bajo" : "estado-ok";

        const fila = `
      <tr>
        <td><img src="${p.imagen}" class="img-tabla"></td>
        <td>${p.producto}</td>
        <td>${p.categoria}</td>
        <td>${p.stock}</td>
        <td>$ ${p.precio.toLocaleString()}</td>
        <td class="${claseEstado}">${estado}</td>
        <td>
          <button class="btn-icon" onclick="editarProducto(${index})">
            <img src="imagenes/icons/editar.png" alt="Editar"></button>
    <button class="btn-icon" onclick="eliminarProducto(${index})">
      <img src="imagenes/icons/eliminar.png" alt="Eliminar">
    </button>
        </td>
      </tr>
    `;
        tabla.innerHTML += fila;
    });
}

/* =========================
   BUSCADOR
========================= */
function buscarProducto(valor) {
    const texto = valor.toLowerCase();
    const filtrados = productos.filter(p =>
        p.producto.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
}

/* =========================
   KPIs
========================= */
function actualizarKPIs() {
    document.getElementById("totalProductos").innerText = productos.length;

    const bajoStock = productos.filter(p => p.stock <= 5).length;
    document.getElementById("bajoStock").innerText = bajoStock;

    const valorTotal = productos.reduce(
        (total, p) => total + p.stock * p.precio,
        0
    );

    document.getElementById("valorInventario").innerText =
        "$" + valorTotal.toLocaleString();
}

/* =========================
   UTILIDADES
========================= */
function limpiarFormulario() {
    document.getElementById("producto").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("precio").value = "";

    imagenBase64 = "";
    imagenActual = "";
    document.getElementById("imagen").value = "";
}


document.getElementById("imagen").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        imagenBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
});

// CERRAR SESIÓN
function cerrarSesion() {
  window.location.href = "index.html";
}
