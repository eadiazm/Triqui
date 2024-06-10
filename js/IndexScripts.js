import { IAComputador } from "./IAComputador.js";
import { Jugador } from "./Jugador.js";
import { ManejoMensajes } from "./ManejoMensajes.js";
import { Tablero } from "./Tablero.js";

let jugador1 = new Jugador('Jugador 1', 'X')
let jugador2 = new Jugador('Jugador 2', 'O')

let juego = new Tablero(jugador1, jugador2);
let jugadorInicial = juego.ObtenerJugadorActual();

let ia = null;

document.getElementById('txtJugador1').value = jugador1.nombre
document.getElementById('txtJugador2').value = jugador2.nombre

//asingar el nombre a los objetos jugador
document.getElementById('txtJugador1').addEventListener('input', function () {
    AsignarNombreAJugador('txtJugador1', jugador1)
});
document.getElementById('txtJugador2').addEventListener('input', function () {
    AsignarNombreAJugador('txtJugador2', jugador2)
});

//asigna el nombre del objeto jugador que está en el txt
function AsignarNombreAJugador(txt, jugador) {
    var jugadorNombre = document.getElementById(txt).value;
    jugador.nombre = jugadorNombre
}

// Selecciona todas las celdas de la tabla
const cells = document.querySelectorAll('.triqui-board td');

// Itera sobre cada celda de la tabla y añade un event listener para el evento 'click'
cells.forEach(cell => {
    cell.addEventListener('click', (event) => {
        ClickCelda(event)
    });
});

/**
 * Operación a realizar al dar click en una celda del triqui
 * @param {*} celda : Celda en la que se hace click
 */
function ClickCelda(celda) {
    const clickedCell = celda.target;
    const clickedRow = clickedCell.parentNode

    const fila = clickedRow.id
    const col = clickedCell.id

    let jugadorActual = juego.ObtenerJugadorActual()
    let token = jugadorActual.token

    juego.PonerToken(fila, col)

    if (clickedCell.textContent === '') {
        clickedCell.textContent = token;
    }

    if (juego.ObtenerHayGanador()) {
        ManejoMensajes.showSuccessMessage(`${jugadorActual.nombre} ha ganado`)
        RefrescarEstadisticas()
    }

    if (juego.ObtenerHayEmpate()) {
        ManejoMensajes.showSuccessMessage(`La partida ha quedado empatada`)
        RefrescarEstadisticas()
    }


    ValidarJugadaComputador();
}

// Mapa de IDs a funciones click de controles en el html
const actionMap = {
    'btnRestart': IniciarNuevaPartida,
    'btnStatistics': SwitchEstadisticas,
    'chk-vscomputador': SwitchJugarVsPc
};

// Manejo del click de los botones
document.addEventListener('click', (e) => {
    const clickedObj = e.target;
    const action = actionMap[clickedObj.id];
    if (action) {
        action(clickedObj);
    }
});

function ValidarJugadaComputador() {
    if (juego.ObtenerJugadorActual() === jugador2 && jugador2.esComputador) {

        let posicion = ia.EncontrarMejorJugada(juego.tablero);

        if (!posicion) {
            return
        }

        //levantar evento click en la celda que ocupe la posicion
        const celdaAleatorea = document.querySelector(`tr[id="${posicion[0]}"] td[id="${posicion[1]}"]`);

        const event = new Event('click');
        celdaAleatorea.dispatchEvent(event);
    }
}

/**
 * Inicia una nueva partida
 */
function IniciarNuevaPartida() {

    juego = new Tablero(jugador1, jugador2);

    cells.forEach(cell => {
        cell.textContent = ''
    });

    OcultaMensajes()

    if (jugadorInicial === juego.ObtenerJugadorActual()) {
        juego.CambiarJugador()
    }

    jugadorInicial = juego.ObtenerJugadorActual()

    ValidarJugadaComputador()
}

/**
 * Muestra u oculta el div de los datos del jugador 2
 * @param {*} chk : Checkbox que muestra u oculta el div del jugador 2
 */
function SwitchJugarVsPc(chk) {
    let txtJugador2 = document.getElementById('txtJugador2')
    let jugador2Data = document.getElementById('div-jugador2')

    if (chk.checked) {
        txtJugador2.textContent = 'computador'
        jugador2Data.style.display = 'none'
        jugador2.esComputador = true
        ia = new IAComputador()
    } else {
        txtJugador2.textContent = 'Jugador 2'
        jugador2Data.style.display = ''
        jugador2.esComputador = false
    }

    jugador2.nombre = txtJugador2.textContent
    IniciarNuevaPartida()
    RefrescarEstadisticas()
}

//ocultar los mensajes den pantalla
function OcultaMensajes() {
    ManejoMensajes.hideErrorMessage()
    ManejoMensajes.hideSuccessMessage()
}

/**
 * Refresca los datos de las estadísticas
 */
function RefrescarEstadisticas() {

    const cells = document.querySelectorAll('.triqui-statistics td');

    cells[0].textContent = jugador1.nombre
    cells[1].textContent = jugador1.partidasGanadas
    cells[2].textContent = jugador1.partidasPerdidas
    cells[3].textContent = jugador1.partidasEmpatadas

    cells[4].textContent = jugador2.nombre
    cells[5].textContent = jugador2.partidasGanadas
    cells[6].textContent = jugador2.partidasPerdidas
    cells[7].textContent = jugador2.partidasEmpatadas

}

/**
 * Oculta o muestra las estadísticas
 * @param {*} btn Botón que muestra u oculta las estadísticas
 */
function SwitchEstadisticas(btn) {

    let statistics = document.getElementById('statistics-log')

    if (statistics.style.display === 'none' || statistics.style.display === '') {
        statistics.style.display = 'block';
        btn.textContent = "Ocultar estadísticas"
    } else {
        statistics.style.display = 'none';
        btn.textContent = "Mostrar estadísticas"
    }

    RefrescarEstadisticas()

}
