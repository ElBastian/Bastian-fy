# Plan del proyecto

## Requisitos
- [x] Solo las canciones que están en la carpeta `canciones/`
- [x] Mostrar portada, título y artista
- [x] Botones: reproducir, pausar, anterior, siguiente
- [x] Mostrar tiempo actual y duración
- [x] Barra de progreso
- [x] Cambiar automáticamente a la siguiente canción al terminar
- [x] Lista de canciones y poder elegir una
- [x] Diseño para celular y computadora
- [x] Login (usuario: `usuario`, contraseña: `1234`)

## Pasos que se siguieron
1. **HTML** (`index.html`): dos pantallas, login y reproductor. El reproductor empieza oculto.
2. **CSS** (`styles.css`): colores de `Design.md`. Primero la versión de celular y con `@media (min-width: 900px)` la de computadora.
3. **JavaScript** (`app.js`):
   1. Arreglo `canciones` con los datos de cada canción.
   2. Login: compara lo escrito con `usuario` / `1234`.
   3. `cargarCancion()` pone portada, título, artista y audio.
   4. `reproducir()`, `pausar()`, `siguienteCancion()`, `cancionAnterior()`.
   5. Eventos del audio: `timeupdate` (progreso), `loadedmetadata` (duración), `ended` (siguiente).
   6. `crearLista()` arma la lista y marca la canción que suena.
4. **Portadas**: imágenes propias en `portadas/` (se pueden cambiar por otras).

## Ideas para después
- Botón de volumen.
- Modo aleatorio y repetir.
- Buscar canciones en la lista.
