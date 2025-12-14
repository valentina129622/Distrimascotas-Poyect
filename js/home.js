// BUSCAR PRODUCTOS
function buscarProducto() {
  const input = document.getElementById("buscarProducto").value.toLowerCase();
  const productos = document.querySelectorAll(".producto");

  productos.forEach(producto => {
    const texto = producto.innerText.toLowerCase();
    producto.style.display = texto.includes(input) ? "block" : "none";
  });
}

// CERRAR SESIÓN
function cerrarSesion() {
  window.location.href = "index.html";
}

function cargarCatalogo() {
  const catalogo = document.getElementById("listaProductos"); // 👈 FIX AQUÍ
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

  catalogo.innerHTML = "";

  if (inventario.length === 0) {
    catalogo.innerHTML = "<p>No hay productos en inventario</p>";
    return;
  }

  inventario.forEach(p => {
    if (p.stock <= 0) return;

    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${p.imagen}">
      <p>${p.producto}</p>
      <span>$ ${p.precio.toLocaleString()}</span>
    `;

    catalogo.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCatalogo();
});

window.addEventListener("storage", () => {
  cargarCatalogo();
});
