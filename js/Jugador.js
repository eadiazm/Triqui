export class Jugador {
    nombre = ''
    token = ''
    partidasGanadas = 0
    partidasPerdidas = 0
    partidasEmpatadas = 0
    esComputador = false

    constructor(nombre = 'Jugador', token = 'X') {
        this.nombre = nombre
        this.token = token
    }
}