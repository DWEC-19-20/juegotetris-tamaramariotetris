const VACANT = "white";

class Tablero {
    constructor(filas, columnas, tamañoCuadrado, ctx) {
        this.F = filas;
        this.C = columnas;
        this.TC = tamañoCuadrado;
        this.CX = ctx;
        this._board = [];
        // inicializa el tablero todos los elementos de color WHITE
        for (var r = 0; r < this.F; r++) {
            this._board[r] = [];
            for (var c = 0; c < this.C; c++) {
                this._board[r][c] = VACANT;
            }
        }
    }

    // Dibuja una casilla en el canvas del color recibido
    dibujarCasilla = (x, y, color) => { //y fila, x columna
        this.CX.fillStyle = color;
        this.CX.fillRect(x * this.TC, y * this.TC, this.TC, this.TC);
        this.CX.strokeStyle = "BLACK";
        this.CX.strokeRect(x * this.TC, y * this.TC, this.TC, this.TC);
    }

    // dibujar en el canvas según los colores del tablero
    dibujarTablero = () => {
        for (var r = 0; r < this.F; r++) {
            for (var c = 0; c < this.C; c++) {
                this.dibujarCasilla(c, r, this._board[r][c]); //Le pasa columna, fila y color
            }
        }
    };

    get filas() {
        return this.F;
    }
    set filas(fila) {
        this.F = fila;
    }

    get columnas() {
        return this.C;
    }
    set columnas(columna) {
        this.C = columna;
    }

    get board() {
        return this._board;
    }
    set board(board) {
        this._board = board;
    }

    //Devuelve el color del tablero en la casilla indicada
    getCasilla = (f, c) => {
        return this._board[f][c];
    }

    //Cambiar el color del tablero en la casilla indicada
    setCasilla = (f, c, color) => {
        this._board[f][c] = color;
    }

}