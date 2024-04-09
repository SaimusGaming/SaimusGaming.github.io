function cargarDatos() {
    // Verifica si el usuario ya habilitó el acceso CORS
    if (localStorage.getItem('corsHabilitado')) {
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
            lista.style.display = ''; // Asegura que la lista esté visible
            lista.innerHTML = ''; // Limpiamos la lista antes de añadir elementos ordenados

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

        // Oculta el botón después de cargar los datos
        document.getElementById('botonCors').style.display = 'none';
    }
}

// Función para manejar el clic en el botón de habilitar CORS
function habilitarCORS() {
    const urlCorsAnywhere = 'https://cors-anywhere.herokuapp.com/corsdemo';
    window.open(urlCorsAnywhere, '_blank').focus();
    
    // Guarda un indicador en localStorage una vez que el usuario intenta habilitar CORS
    localStorage.setItem('corsHabilitado', 'true');
    
    // Cambia el texto del botón e invita al usuario a recargar la página
    const botonCors = document.getElementById('botonCors');
    botonCors.textContent = "Por favor, recarga la página";
    botonCors.onclick = function() { location.reload(); }; // Cambia el evento onclick para recargar la página
}

document.addEventListener('DOMContentLoaded', function() {
    cargarDatos(); // Carga inicial de datos
    // Si el acceso CORS ya fue habilitado, actualiza los datos cada 10 segundos
    if (localStorage.getItem('corsHabilitado')) {
        setInterval(cargarDatos, 10000);
    }
});
