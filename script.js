document.addEventListener('DOMContentLoaded', function cargarDatos() {
    const urlData = 'data/pastebin-data.json'; // Ajusta esta ruta según la ubicación del archivo en tu repositorio

    fetch(urlData)
    .then(response => response.json())
    .then(data => {
        // Asumiendo que el archivo JSON contiene una lista de líneas como en tu Pastebin original
        let jugadores = data.map((linea) => {
            const [nombre, puntosTexto] = linea.split(' - ');
            const puntos = parseInt(puntosTexto, 10);
            return { nombre: nombre.trim(), puntos };
        }).filter(jugador => jugador !== null);

        // Ordena los jugadores por puntos de manera descendente
        jugadores.sort((a, b) => b.puntos - a.puntos);

        // Asigna las posiciones correctas después de ordenar
        jugadores = jugadores.map((jugador, index) => ({ ...jugador, posicion: index + 1 }));

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
    })
    .catch(error => console.error('Error al cargar la lista de jugadores:', error));
});
