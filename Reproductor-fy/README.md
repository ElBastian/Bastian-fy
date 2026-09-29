# Bastian-fy
Reproductor de música hecho con HTML, CSS y JavaScript básico.

## Cómo abrirlo
1. Descomprime la carpeta.
2. Abre `index.html` en el navegador (doble clic), o mejor con la extensión **Live Server** de VS Code.
3. Inicia sesión:
   - **Usuario:** `usuario`
   - **Contraseña:** `1234`

## Qué hace
- Login con usuario y contraseña.
- Muestra portada, título y artista de la canción.
- Botones de reproducir, pausar, anterior y siguiente.
- Tiempo actual, duración y barra de progreso (se puede mover para adelantar).
- Al terminar una canción pasa sola a la siguiente (y después de la última vuelve a la primera).
- Lista de canciones: al hacer clic en una, se reproduce.
- Se adapta a celular (una columna) y computadora (dos columnas).

## Carpetas
```
Reproductor-fy/
├── index.html      → estructura de la página (login + reproductor)
├── styles.css      → colores, tamaños y versión celular/computadora
├── app.js          → lógica: login, lista y controles
├── canciones/      → los archivos .mp3
├── portadas/       → una imagen por canción
├── Design.md       → guía de diseño (colores y tipografía)
├── PLAN.md         → plan del proyecto
├── CLAUDE.md       → notas para asistentes de IA
└── SKILLs.md       → conceptos que se practican
```

## Cómo agregar una canción
1. Copia el `.mp3` a `canciones/`.
2. Copia su portada (`.jpg`, `.png` o `.webp`) a `portadas/`.
3. En `app.js`, dentro de `const canciones = [ ... ]`, agrega un bloque:
```js
{
  titulo: "Nombre de la canción",
  artista: "Nombre del artista",
  archivo: "canciones/archivo.mp3",
  portada: "portadas/imagen.jpg"
},
```
