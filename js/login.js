class Usuario {
  constructor(nombre, correo, password) {
    this.nombre = nombre;
    this.correo = correo;
    this.password = password;
  }
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function login() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (usuario === "admin" && password === "1234") {
    window.location.href = "home.html";
    return;
  }

  const usuarios = obtenerUsuarios();
  const valido = usuarios.find(
    u => (u.nombre === usuario || u.correo === usuario) && u.password === password
  );

  if (valido) {
    window.location.href = "home.html";
  } else {
    document.getElementById("modalError").classList.remove("hidden");
  }
}

function cerrarModal() {
  document.getElementById("modalError").classList.add("hidden");
}

function abrirRegistro() {
  document.getElementById("modalRegistro").classList.remove("hidden");
}

function registrarUsuario() {
  const nombre = document.getElementById("regNombre").value;
  const correo = document.getElementById("regCorreo").value;
  const password = document.getElementById("regPassword").value;

  if (!nombre || !correo || !password) return alert("Complete todos los campos");

  const usuarios = obtenerUsuarios();
  if (usuarios.find(u => u.correo === correo)) {
    return alert("El usuario ya existe");
  }

  usuarios.push(new Usuario(nombre, correo, password));
  guardarUsuarios(usuarios);

  document.getElementById("modalRegistro").classList.add("hidden");
  document.getElementById("modalRegistroExito").classList.remove("hidden");
}

function cerrarRegistroExito() {
  document.getElementById("modalRegistroExito").classList.add("hidden");
}

function abrirOlvido() {
  document.getElementById("modalOlvido").classList.remove("hidden");
}

function enviarRecuperacion() {
  document.getElementById("modalOlvido").classList.add("hidden");
  document.getElementById("modalConfirmacion").classList.remove("hidden");
}

function cerrarConfirmacion() {
  document.getElementById("modalConfirmacion").classList.add("hidden");
}

// CERRAR SESIÓN
function cerrarSesion() {
  window.location.href = "index.html";
}
