class Usuario {
  constructor(nombre, correo, password) {
    this.nombre = nombre;
    this.correo = correo;
    this.password = password;
  }
}

/* =========================
   UTILIDADES
========================= */

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/* =========================
   LOGIN
========================= */

function login() {

  const usuario =
    document.getElementById("usuario").value.trim();

  const password =
    document.getElementById("password").value.trim();

  if (!usuario || !password) {
    alert("Debe ingresar usuario y contraseña");
    return;
  }

  if (usuario === "admin" && password === "1234") {
    window.location.href = "home.html";
    return;
  }

  const usuarios = obtenerUsuarios();

  const valido = usuarios.find(
    u =>
      (u.nombre === usuario ||
        u.correo === usuario) &&
      u.password === password
  );

  if (valido) {
    window.location.href = "home.html";
  } else {
    document
      .getElementById("modalError")
      .classList.remove("hidden");
  }
}

/* =========================
   MODAL ERROR
========================= */

function cerrarModal() {
  document
    .getElementById("modalError")
    .classList.add("hidden");
}

/* =========================
   REGISTRO
========================= */

function abrirRegistro() {
  document
    .getElementById("modalRegistro")
    .classList.remove("hidden");
}

function cerrarRegistro() {
  document
    .getElementById("modalRegistro")
    .classList.add("hidden");
}

function registrarUsuario() {

  const nombre =
    document.getElementById("regNombre").value.trim();

  const correo =
    document.getElementById("regCorreo").value.trim();

  const password =
    document.getElementById("regPassword").value.trim();

  if (!nombre || !correo || !password) {
    alert("Complete todos los campos");
    return;
  }

  const regexCorreo =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexCorreo.test(correo)) {
    alert("Ingrese un correo válido");
    return;
  }

  if (password.length < 6) {
    alert(
      "La contraseña debe tener mínimo 6 caracteres"
    );
    return;
  }

  const usuarios = obtenerUsuarios();

  if (
    usuarios.find(
      u => u.correo === correo
    )
  ) {
    alert("El usuario ya existe");
    return;
  }

  usuarios.push(
    new Usuario(
      nombre,
      correo,
      password
    )
  );

  guardarUsuarios(usuarios);

  document
    .getElementById("modalRegistro")
    .classList.add("hidden");

  document
    .getElementById("modalRegistroExito")
    .classList.remove("hidden");
}

/* =========================
   REGISTRO EXITOSO
========================= */

function cerrarRegistroExito() {
  document
    .getElementById("modalRegistroExito")
    .classList.add("hidden");
}

/* =========================
   RECUPERAR CONTRASEÑA
========================= */

function abrirOlvido() {
  document
    .getElementById("modalOlvido")
    .classList.remove("hidden");
}

function cerrarOlvido() {
  document
    .getElementById("modalOlvido")
    .classList.add("hidden");
}

function enviarRecuperacion() {

  const correo =
    document
      .getElementById("correoOlvido")
      .value.trim();

  if (!correo) {
    alert("Ingrese un correo");
    return;
  }

  const usuarios = obtenerUsuarios();

  const existe = usuarios.find(
    u => u.correo === correo
  );

  if (!existe) {
    alert(
      "No existe una cuenta asociada a este correo"
    );
    return;
  }

  document
    .getElementById("modalOlvido")
    .classList.add("hidden");

  document
    .getElementById("modalConfirmacion")
    .classList.remove("hidden");
}

/* =========================
   CONFIRMACIÓN
========================= */

function cerrarConfirmacion() {
  document
    .getElementById("modalConfirmacion")
    .classList.add("hidden");
}

/* =========================
   CERRAR SESIÓN
========================= */

function cerrarSesion() {
  window.location.href = "index.html";
}