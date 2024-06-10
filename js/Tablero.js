import { Jugador } from "./Jugador.js";

export class Tablero {

    jugadorActual = new Jugador();
    hayGanador = false;
    hayEmpate = false;

    constructor(jugador1, jugador2) {

        this.jugador1 = jugador1
        this.jugador2 = jugador2

        this.jugadorActual = jugador1

        //Iniciar el tablero
        this.tablero = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
    }

    /**
     * indica si el tablero ya tiene un ganador
     * @returns true si el tablero ya tiene un ganador
     */
    ObtenerHayGanador() {
        return this.hayGanador;
    }

    /**
     * indica si el tablero quedó en empate
     * @returns true si el tablero quedó empatado
     */
    ObtenerHayEmpate() {
        return this.hayEmpate;
    }

    /**
     * Retorna el jugador actual
     * @returns Retorna el jugador actual
     */
    ObtenerJugadorActual() {
        return this.jugadorActual;
    }

    /**
     * Pone el token en la fila y columna de la matriz.
     * @param {*} fila : Indica la fila en la que se va a poner el token
     * @param {*} col : Indica la columna en la que se va a poner el token
     * @returns Diferentes mensajes dependiendo del estado actual del tablero
     */
    PonerToken(fila, col) {

        if (this.hayGanador) {
            throw new Error('Este tablero ya tiene un ganador. Inicie una nueva partida.')
        }

        if (this.validarTableroLleno()) {
            throw new Error('Este tablero ya está cerrado y no tuvo ganador.')
        }

        if (this.tablero[fila][col] !== '') {
            throw new Error('Casilla ya usada')
        }

        this.tablero[fila][col] = this.jugadorActual.token

        let msg = this.ValidarGanador()

        if (this.hayGanador) {
            return msg
        }

        if (this.validarTableroLleno()) {
            this.jugador1.partidasEmpatadas++
            this.jugador2.partidasEmpatadas++
            this.hayEmpate = true
        }

        this.CambiarJugador()

    }

    ObtenerPosicionVacia() {
        const celdasVacias = this.ObtenerCeldasVacias()

        if (celdasVacias.length === 0) {
            return
        }

        const randomIndice = Math.floor(Math.random() * celdasVacias.length);
        const { fila, col } = celdasVacias[randomIndice];

        return { fila, col }
    }

    ObtenerCeldasVacias() {
        const celdasVacias = [];

        for (let fila = 0; fila < 3; fila++) {
            for (let col = 0; col < 3; col++) {
                if (this.tablero[fila][col] === '') {
                    celdasVacias.push({ fila, col });
                }
            }
        }

        return celdasVacias;
    }

    /**
     * Retorna un texto indicando el ganador de la partida
     * @returns Texto indicando el ganador de la partida
     */
    ValidarGanador() {

        this.hayGanador = this.ValidarGanadorPorJugador(this.jugador1.token)
        if (this.hayGanador) {
            this.jugador1.partidasGanadas++
            this.jugador2.partidasPerdidas++
            return `Ganador jugador ${this.jugador1.nombre}`
        }

        this.hayGanador = this.ValidarGanadorPorJugador(this.jugador2.token)
        if (this.hayGanador) {
            this.jugador2.partidasGanadas++
            this.jugador1.partidasPerdidas++
            return `Ganador jugador ${this.jugador2.nombre}`
        }

    }

    /**
     * Valida que ya esté lleno el tablero
     * @returns true si el tablero esta lleno
     */
    validarTableroLleno() {

        for (let fila = 0; fila <= 2; fila++) {
            for (let col = 0; col <= 2; col++) {
                if (this.tablero[fila][col] === '') {
                    return false
                }
            }
        }

        return true

    }

    /**
     * Valida si el jugador que se pasa como parámetro ha ganado la partida
     * @param {*} jugador : Jugador actual
     * @returns true si el judador actual ha ganado la partida
     */
    ValidarGanadorPorJugador(token) {

        const lines = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        //recorrer por fila
        return lines.some(([a, b, c]) =>
            this.tablero[a[0]][a[1]] === token &&
            this.tablero[a[0]][a[1]] === this.tablero[b[0]][b[1]] &&
            this.tablero[a[0]][a[1]] === this.tablero[c[0]][c[1]]
        );
    }

    /**
     * Hace un switch del jugador actual
     */
    CambiarJugador() {
        if (this.jugadorActual === this.jugador1) {
            this.jugadorActual = this.jugador2
        } else {
            this.jugadorActual = this.jugador1
        }
    }
}