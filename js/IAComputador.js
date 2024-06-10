export class IAComputador {
    lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    positions = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
    ]

    constructor() {
    }

    NormalizarTablero(tablero) {
        let tableroNorm = []
        for (let fila of tablero) {
            tableroNorm = tableroNorm.concat(fila);
        }
        return tableroNorm
    }

    EncontrarMejorJugada(board) {

        let tablero = this.NormalizarTablero(board);

        let bestVal = -1000;
        let bestMove = -1;

        for (let i = 0; i < tablero.length; i++) {
            if (tablero[i] === '') {
                tablero[i] = 'O';
                let moveVal = this.Minimax(tablero, 0, false);
                tablero[i] = null;

                if (moveVal > bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }

        return this.positions[bestMove];
    }

    Minimax(tablero, depth, isMax) {
        const winner = this.CalcularGanador(tablero);

        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (tablero.every((cell) => cell !== '')) return 0;

        if (isMax) {
            let best = -1000;
            for (let i = 0; i < tablero.length; i++) {
                if (tablero[i] === '') {
                    tablero[i] = 'O';
                    best = Math.max(best, this.Minimax(tablero, depth + 1, !isMax));
                    tablero[i] = '';
                }
            }
            return best;
        } else {
            let best = 1000;
            for (let i = 0; i < tablero.length; i++) {
                if (tablero[i] === '') {
                    tablero[i] = 'X';
                    best = Math.min(best, this.Minimax(tablero, depth + 1, !isMax));
                    tablero[i] = '';
                }
            }
            return best;
        }

    }

    CalcularGanador(tablero) {
        for (let line of this.lines) {
            const [a, b, c] = line;
            if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                return tablero[a];
            }
        }
        return null;
    };
}