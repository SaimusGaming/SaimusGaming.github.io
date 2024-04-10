document.addEventListener('DOMContentLoaded', function cargarDatos() {
    const urlArchivo = 'https://raw.githubusercontent.com/SaimusGaming/SaimusGaming.github.io/main/data/pastebin-data.txt';
    let jugadoresTotales = []; // Almacena todos los jugadores

    function actualizarDatos() {
        fetch(urlArchivo)
        .then(response => response.text())
        .then(data => {
            jugadoresTotales = data.split('\n').map((linea) => {
                const [nombre, puntosTexto] = linea.split(' - ');
                const puntos = parseInt(puntosTexto, 10);
                return { 
                    nombre: nombre.trim(), 
                    puntos,
                    urlImagen: 'https://raw.githubusercontent.com/SaimusGaming/SaimusGaming.github.io/main/Imagenes/BARRA%20NOMBRES.png'
                };
            }).filter(jugador => jugador.puntos); // Asegurarse de que cada jugador tiene puntos asociados

            // Ordena los jugadores por sus puntos, de mayor a menor
            jugadoresTotales.sort((a, b) => b.puntos - a.puntos);

            mostrarJugadores(jugadoresTotales.slice(0, 10)); // Muestra solo los primeros 10 por defecto
        })
        .catch(error => console.error('Error al cargar la lista de jugadores:', error));
    }

    function mostrarJugadores(jugadores, mostrarTodos = true) {
        const lista = document.getElementById('jugadoresLista');
        lista.innerHTML = ''; // Limpia la lista antes de añadir elementos ordenados
    
        jugadores.forEach(jugador => {
            // Determina la URL de la imagen de la posición basada en la posición original del jugador
            let posicionOriginal = jugadoresTotales.findIndex(j => j.nombre === jugador.nombre) + 1;
            let urlImagenPosicion = posicionOriginal <= 10 ? `https://raw.githubusercontent.com/SaimusGaming/SaimusGaming.github.io/main/Imagenes/${posicionOriginal}.png` : 'https://raw.githubusercontent.com/SaimusGaming/SaimusGaming.github.io/main/Imagenes/RESTO.png';
    
            const item = document.createElement('li');
            item.className = 'jugador';
            item.innerHTML = `
                <div class="banner-jugador" style="background-image: url('${jugador.urlImagen}');">
                    <img src="${urlImagenPosicion}" alt="Posición" class="imagen-posicion">
                    <div class="detalle-jugador">
                        <div class="nombre">${jugador.nombre}</div>
                        <div class="puntos">${jugador.puntos} Puntos</div>
                    </div>
                </div>
            `;
            lista.appendChild(item);
        });
    }
    
    document.getElementById('buscadorJugador').addEventListener('input', function(e) {
        const textoBusqueda = e.target.value.toLowerCase();
        if (textoBusqueda) {
            // Si hay texto de búsqueda, filtrar y mostrar todos los jugadores que coincidan.
            const jugadoresFiltrados = jugadoresTotales.filter(jugador => jugador.nombre.toLowerCase().includes(textoBusqueda));
            mostrarJugadores(jugadoresFiltrados);
        } else {
            // Si no hay texto de búsqueda, mostrar solo los 10 primeros jugadores de la lista original.
            mostrarJugadores(jugadoresTotales.slice(0, 10));
        }
    });

    actualizarDatos(); // Llama a actualizarDatos() inmediatamente al cargar la página
    setInterval(actualizarDatos, 600000); // Actualiza los datos cada 10 minutos (600000 milisegundos)
});
