document.addEventListener('DOMContentLoaded', function cargarDatos() {
    // La URL apunta directamente al archivo en tu repositorio de GitHub
    const urlArchivo = 'https://raw.githubusercontent.com/SaimusGaming/SaimusGaming.github.io/main/data/pastebin-data.txt';

    fetch(urlArchivo)
    .then(response => response.text())
    .then(data => {
        let jugadores = data.split('\n').map((linea) => {
            const [nombre, puntosTexto] = linea.split(' - ');
            const puntos = parseInt(puntosTexto, 10);
            return { nombre: nombre.trim(), puntos };
        }).filter(jugador => jugador.puntos); // Asegurarse de que cada jugador tiene puntos asociados

        // Ordena los jugadores por sus puntos, de mayor a menor
        jugadores.sort((a, b) => b.puntos - a.puntos);

        // Actualiza la lista de jugadores en la página web
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
