document.addEventListener('DOMContentLoaded', function cargarDatos() {
    const urlArchivo = 'https://raw.githubusercontent.com/SaimusGaming/SaimusGaming.github.io/main/data/pastebin-data.txt';
    let jugadoresTotales = []; // Almacena todos los jugadores

    function actualizarDatos() {
        fetch(urlArchivo)
        .then(response => response.text())
        .then(data => {
            jugadoresTotales = data.split('\n').map((linea, index) => {
                const [nombre, puntosTexto] = linea.split(' - ');
                const puntos = parseInt(puntosTexto, 10);
                return { nombre: nombre.trim(), puntos };
            }).filter(jugador => jugador.puntos); // Asegurarse de que cada jugador tiene puntos asociados

            // Ordena los jugadores por sus puntos, de mayor a menor
            jugadoresTotales.sort((a, b) => b.puntos - a.puntos);

            // Asigna la posición correcta después de ordenar
            jugadoresTotales.forEach((jugador, index) => {
                jugador.posicion = index + 1;
            });

            mostrarJugadores(jugadoresTotales.slice(0, 10)); // Muestra solo los primeros 10 por defecto
        })
        .catch(error => console.error('Error al cargar la lista de jugadores:', error));
    }

    function mostrarJugadores(jugadores) {
        const lista = document.getElementById('jugadoresLista');
        lista.innerHTML = ''; // Limpia la lista antes de añadir elementos ordenados

        jugadores.forEach(jugador => {
            const item = document.createElement('li');
            item.className = 'jugador';
            item.innerHTML = `
                <div class="posicion">${jugador.posicion}º</div>
                <div class="nombre">${jugador.nombre}</div>
                <div class="puntos">${jugador.puntos} Puntos</div>
            `;
            lista.appendChild(item);
        });
    }

    document.getElementById('buscadorJugador').addEventListener('input', function(e) {
        const textoBusqueda = e.target.value.toLowerCase();
        const jugadoresFiltrados = textoBusqueda ? 
          jugadoresTotales.filter(jugador => jugador.nombre.toLowerCase().includes(textoBusqueda)) : 
          jugadoresTotales.slice(0, 10);
        mostrarJugadores(jugadoresFiltrados);
    });

    actualizarDatos(); // Llama a actualizarDatos() inmediatamente al cargar la página
    setInterval(actualizarDatos, 600000); // Actualiza los datos cada 10 minutos (600000 milisegundos)
});
