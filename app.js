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

function formatearTiempo(segundos) {
  if (isNaN(segundos)) {
    return "0:00";
  }
  const minutos = Math.floor(segundos / 60);
  let resto = Math.floor(segundos % 60);
  if (resto < 10) {
    resto = "0" + resto;
  }
  return minutos + ":" + resto;
}

function cargarCancion(indice) {
  cancionActual = indice;
  const cancion = canciones[indice];

  audio.src = cancion.archivo;
  portada.src = cancion.portada;
  portada.alt = "Portada de " + cancion.titulo;
  titulo.textContent = cancion.titulo;
  artista.textContent = cancion.artista;

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
  if (nuevoIndice >= canciones.length) {
    nuevoIndice = 0;
  }
  cargarCancion(nuevoIndice);
  reproducir();
}

function cancionAnterior() {
  let nuevoIndice = cancionActual - 1;
  if (nuevoIndice < 0) {
    nuevoIndice = canciones.length - 1;
  }
  cargarCancion(nuevoIndice);
  reproducir();
}

function actualizarProgreso() {
  tiempoActual.textContent = formatearTiempo(audio.currentTime);

  if (audio.duration > 0) {
    barraProgreso.value = (audio.currentTime / audio.duration) * 100;
    pintarBarra();
  }
}

function pintarBarra() {
  const porcentaje = barraProgreso.value;
  barraProgreso.style.background =
    "linear-gradient(to right, #1d1d1b " + porcentaje + "%, #e2dedb " + porcentaje + "%)";
}

function moverProgreso() {
  if (audio.duration > 0) {
    audio.currentTime = (barraProgreso.value / 100) * audio.duration;
  }
  pintarBarra();
}

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

    elemento.addEventListener("click", function () {
      cargarCancion(i);
      reproducir();
    });

    listaCanciones.appendChild(elemento);
  }
}

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

botonReproducir.addEventListener("click", reproducir);
botonPausar.addEventListener("click", pausar);
botonSiguiente.addEventListener("click", siguienteCancion);
botonAnterior.addEventListener("click", cancionAnterior);

barraProgreso.addEventListener("input", moverProgreso);

audio.addEventListener("timeupdate", actualizarProgreso);

audio.addEventListener("loadedmetadata", function () {
  duracion.textContent = formatearTiempo(audio.duration);
});

audio.addEventListener("ended", siguienteCancion);

crearLista();
cargarCancion(0);
