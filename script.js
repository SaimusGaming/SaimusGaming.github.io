document.addEventListener('DOMContentLoaded', function cargarDatos() {
    // Asume que el acceso CORS ya está habilitado por el usuario a través de CORS Anywhere o similar.
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const urlPastebin = 'https://pastebin.com/raw/2VRaccd2';

    fetch(proxyUrl + urlPastebin)
    .then(response => response.text())
    .then(data => {
        let jugadores = data.split('\n').map((linea) => {
            const [nombre, puntosTexto] = linea.split(' - ');
            const puntos = parseInt(puntosTexto, 10);
            return { nombre: nombre.trim(), puntos };
        }).filter(jugador => jugador !== null);

        jugadores.sort((a, b) => b.puntos - a.puntos);
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
