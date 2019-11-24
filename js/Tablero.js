class Tablero {
    constructor(filas, columnas, tamañoCuadrado, ctx) {
        // inicializa el tablero todos los elementos de color WHITE
        this._filas = filas;
        this._columnas = columnas;
        this.TC = tamañoCuadrado;
        this.ctx = ctx;
        this.tablero = [];
        for (var f = 0; f < this._filas; f++) {
            this.tablero[f] = [];
            for (var c = 0; c < this._columnas; c++) {
                this.tablero[f][c] = "WHITE";
            }
        }
    }

    // Es vacio si tiene el color WHITE
    esVacio = (x, y) => {
        if (this.tablero[y][x] == "WHITE") {
            return true;
        } else {
            return false;
        }
    }

    // Dibuja un en el canvas del color recibido
    dibujarCasilla = (x, y, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.TC, y * this.TC, this.TC, this.TC);
        this.ctx.strokeStyle = "BLACK";
        this.ctx.strokeRect(x * this.TC, y * this.TC, this.TC, this.TC);
    }

    // dibujar en el canvas según los colores del tablaro
    dibujarTablero = () => {
        for (var f = 0; f < this._filas; f++) {
            for (var c = 0; c < this._columnas; c++) {
                this.dibujarCasilla(c, f, this.tablero[f][c]);
            }
        }

    };

    /*get filas() { return this._filas }

    set filas(fila) { this._filas = fila }

    get columnas() { return this._columnas }

    set columnas(columna) { this._columnas = columna }*/

    //Devuelve el color del tablero en la casilla indicada
    getCasilla = (f, c) => {

    }

    //Cambiar el color del tablero en la casilla indicada
    setCasilla = (f, c, color) => {

    }

    // Eliminamos las filas que estén completas e incrementamos la puntuación
    eliminarFilasCompletas = () => {}

}