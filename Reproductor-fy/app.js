const canciones = [
  {
    titulo: "Coqueta",
    artista: "Bocchi",
    archivo: "canciones/BOCCHI COQUETA.mp3",
    portada: "portadas/coqueta.webp"
  },
  {
    titulo: "Virtual Insanity",
    artista: "Jamiroquai",
    archivo: "canciones/Jamiroquai Virtual Insanity.mp3",
    portada: "portadas/virtual-insanity.webp"
  },
  {
    titulo: "Stay With Me",
    artista: "Miki Matsubara",
    archivo: "canciones/Miki Matsubara stay with me.mp3",
    portada: "portadas/stay-with-me.webp"
  },
  {
    titulo: "Hey Ya!",
    artista: "Outkast",
    archivo: "canciones/Outkast Hey Ya!.mp3",
    portada: "portadas/hey-ya.webp"
  },
  {
    titulo: "Happy",
    artista: "Pharrell Williams",
    archivo: "canciones/Pharrell Williams Happy.mp3",
    portada: "portadas/happy.webp"
  },
  {
    titulo: "Californication",
    artista: "Red Hot Chili Peppers",
    archivo: "canciones/Red Hot Chili Peppers Californication.mp3",
    portada: "portadas/californication.webp"
  },
  {
    titulo: "Alors on Danse",
    artista: "Stromae",
    archivo: "canciones/Stromae Alors on danse.mp3",
    portada: "portadas/alors-on-danse.webp"
  }
];

let cancionActual = 0;

// Login
const pantallaLogin = document.getElementById("pantalla-login");
const formularioLogin = document.getElementById("formulario-login");
const campoUsuario = document.getElementById("campo-usuario");
const campoContrasena = document.getElementById("campo-contrasena");
const mensajeError = document.getElementById("mensaje-error");

// Reproductor
const pantallaReproductor = document.getElementById("pantalla-reproductor");
const saludo = document.getElementById("saludo");
const botonSalir = document.getElementById("boton-salir");

const audio = document.getElementById("audio");
const portada = document.getElementById("portada");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");

const barraProgreso = document.getElementById("barra-progreso");
const tiempoActual = document.getElementById("tiempo-actual");
const duracion = document.getElementById("duracion");

const botonAnterior = document.getElementById("boton-anterior");
const botonReproducir = document.getElementById("boton-reproducir");
const botonPausar = document.getElementById("boton-pausar");
const botonSiguiente = document.getElementById("boton-siguiente");

const listaCanciones = document.getElementById("lista-canciones");

const USUARIO_CORRECTO = "usuario";
const CONTRASENA_CORRECTA = "1234";

function iniciarSesion(evento) {
  // Evita que el formulario recargue la página
  evento.preventDefault();

  const usuarioEscrito = campoUsuario.value.trim();
  const contrasenaEscrita = campoContrasena.value;

  if (usuarioEscrito === USUARIO_CORRECTO && contrasenaEscrita === CONTRASENA_CORRECTA) {
    // Datos correctos: escondemos el login y mostramos el reproductor
    mensajeError.textContent = "";
    pantallaLogin.classList.add("oculto");
    pantallaReproductor.classList.remove("oculto");
    saludo.textContent = "Hola, " + usuarioEscrito;
  } else {
    // Datos incorrectos: mostramos un mensaje
    mensajeError.textContent = "Usuario o contraseña incorrectos.";
    campoContrasena.value = "";
  }
}

function cerrarSesion() {
  pausar();
  campoUsuario.value = "";
  campoContrasena.value = "";
  pantallaReproductor.classList.add("oculto");
  pantallaLogin.classList.remove("oculto");
}


// -----------------------------------------------------
// 4. FUNCIONES DEL REPRODUCTOR
// -----------------------------------------------------

// Convierte segundos (ej. 125) a texto "2:05"
function formatearTiempo(segundos) {
  if (isNaN(segundos)) {
    return "0:00";
  }
  const minutos = Math.floor(segundos / 60);
  let resto = Math.floor(segundos % 60);
  if (resto < 10) {
    resto = "0" + resto;   // para que se vea 2:05 y no 2:5
  }
  return minutos + ":" + resto;
}

// Muestra en pantalla la canción número "indice"
function cargarCancion(indice) {
  cancionActual = indice;
  const cancion = canciones[indice];

  audio.src = cancion.archivo;
  portada.src = cancion.portada;
  portada.alt = "Portada de " + cancion.titulo;
  titulo.textContent = cancion.titulo;
  artista.textContent = cancion.artista;

  // Reiniciamos la barra y los tiempos
  barraProgreso.value = 0;
  pintarBarra();
  tiempoActual.textContent = "0:00";
  duracion.textContent = "0:00";

  marcarCancionEnLista();
}

function reproducir() {
  audio.play();
  botonReproducir.classList.add("oculto");
  botonPausar.classList.remove("oculto");
}

function pausar() {
  audio.pause();
  botonPausar.classList.add("oculto");
  botonReproducir.classList.remove("oculto");
}

function siguienteCancion() {
  let nuevoIndice = cancionActual + 1;
  // Si pasamos la última, regresamos a la primera
  if (nuevoIndice >= canciones.length) {
    nuevoIndice = 0;
  }
  cargarCancion(nuevoIndice);
  reproducir();
}

function cancionAnterior() {
  let nuevoIndice = cancionActual - 1;
  // Si estamos en la primera, vamos a la última
  if (nuevoIndice < 0) {
    nuevoIndice = canciones.length - 1;
  }
  cargarCancion(nuevoIndice);
  reproducir();
}

// Se ejecuta muchas veces por segundo mientras suena la canción
function actualizarProgreso() {
  tiempoActual.textContent = formatearTiempo(audio.currentTime);

  if (audio.duration > 0) {
    // Porcentaje que ya sonó (de 0 a 100)
    barraProgreso.value = (audio.currentTime / audio.duration) * 100;
    pintarBarra();
  }
}

// Pinta de negro la parte de la barra que ya sonó
function pintarBarra() {
  const porcentaje = barraProgreso.value;
  barraProgreso.style.background =
    "linear-gradient(to right, #1d1d1b " + porcentaje + "%, #e2dedb " + porcentaje + "%)";
}

// Cuando el usuario mueve la barra, adelantamos o regresamos la canción
function moverProgreso() {
  if (audio.duration > 0) {
    audio.currentTime = (barraProgreso.value / 100) * audio.duration;
  }
  pintarBarra();
}

// Crea la lista de canciones en el HTML
function crearLista() {
  for (let i = 0; i < canciones.length; i++) {
    const cancion = canciones[i];

    const elemento = document.createElement("li");
    elemento.innerHTML =
      '<span class="numero">' + (i + 1) + '</span>' +
      '<img class="mini-portada" src="' + cancion.portada + '" alt="">' +
      '<div class="datos">' +
        '<strong>' + cancion.titulo + '</strong>' +
        '<span>' + cancion.artista + '</span>' +
      '</div>';

    // Al hacer clic en una canción, se carga y se reproduce
    elemento.addEventListener("click", function () {
      cargarCancion(i);
      reproducir();
    });

    listaCanciones.appendChild(elemento);
  }
}

// Resalta en la lista la canción que está seleccionada
function marcarCancionEnLista() {
  const elementos = listaCanciones.children;
  for (let i = 0; i < elementos.length; i++) {
    if (i === cancionActual) {
      elementos[i].classList.add("activa");
    } else {
      elementos[i].classList.remove("activa");
    }
  }
}


// -----------------------------------------------------
// 5. EVENTOS
// Aquí conectamos los botones con las funciones
// -----------------------------------------------------

// Login
formularioLogin.addEventListener("submit", iniciarSesion);
botonSalir.addEventListener("click", cerrarSesion);

// Botones del reproductor
botonReproducir.addEventListener("click", reproducir);
botonPausar.addEventListener("click", pausar);
botonSiguiente.addEventListener("click", siguienteCancion);
botonAnterior.addEventListener("click", cancionAnterior);

// Barra de progreso
barraProgreso.addEventListener("input", moverProgreso);

// Eventos del audio
audio.addEventListener("timeupdate", actualizarProgreso);

// Cuando ya se sabe cuánto dura la canción, la mostramos
audio.addEventListener("loadedmetadata", function () {
  duracion.textContent = formatearTiempo(audio.duration);
});

// Cuando termina una canción, pasa sola a la siguiente
audio.addEventListener("ended", siguienteCancion);


// -----------------------------------------------------
// AL ABRIR LA PÁGINA
// -----------------------------------------------------
crearLista();
cargarCancion(0);
