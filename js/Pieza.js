// las piezas y sus colores
const PIEZAS = [
    [Z, "orange"],
    [S, "cyan"],
    [T, "green"],
    [O, "grey"],
    [L, "purple"],
    [I, "red"],
    [J, "yellow"]
];

// La clase pieza
class Pieza {

    constructor(tetromino, color, tablero) {
        // propiedades numeroForma, tetrominioActual, posición x e y en el canvas 
        this._tetromino = tetromino;
        this._color = color;
        this._tablero = tablero;
        this._x = 3;
        this._y = -3;
        this.n = 0;
        this.activeTetromino = this._tetromino[this.n];
    }

    // rota la piezaentre las distintas formas del tetrominio
    // de debe controlar que si está muy cerca de las paredes algunas no pueden girar
    rotar = () => {
        this.n = (this.n + 1) % this._tetromino.length;
        if (!this.colision(0, 0, this._tetromino[this.n])) {
            this.borrar();
            this.activeTetromino = this._tetromino[this.n];
            this.dibujar();
        }
    }


    // rellena el tetromino de la pieza con su color en el canvas
    rellenar = (color) => {
        for (var f = 0; f < this.activeTetromino.length; f++) {
            for (var c = 0; c < this.activeTetromino.length; c++) {
                if (this.activeTetromino[f][c]) {
                    this._tablero.dibujarCasilla(this._x + c, this._y + f, color);
                }
            }
        }
    }

    // dibuja el color de una pieza
    dibujar = () => { this.rellenar(this._color); }

    // borra una pieza rellenandola de casillas blancas
    borrar = () => { this.rellenar("WHITE") }

    // mover abajo la pieza, si queda fijada, deberá obtener una nueva
    moverAbajo = () => {
        if (!this.colision(0, 1, this.activeTetromino)) {
            this.borrar();
            this._y++;
            this.dibujar();
        } else {
            this.fijar();
            juego.pieza = juego.piezaAleatoria();
        }
    }

    // mover derecha la pieza hasta chocar con la pared 
    moverDerecha = () => {
        if (!this.colision(1, 0, this.activeTetromino)) {
            this.borrar();
            this._x++;
            this.dibujar();
        }
    }

    // mover izquierda la pieza hasta chocar con la pared 
    moverIzquierda = () => {
        if (!this.colision(-1, 0, this.activeTetromino)) {
            this.borrar();
            this._x--;
            this.dibujar();
        }
    }

    // fijar pieza cuando choca con el suelo u otra pieza
    // hay que comprobar si se ha formado una o varias lineas para borrarlas 
    fijar = () => {
        for (var f = 0; f < this.activeTetromino.length; f++) {
            for (var c = 0; c < this.activeTetromino.length; c++) {
                if (!this.activeTetromino[f][c]) {
                    continue;
                }
                if (this._y + f < 0) {
                    juego.gameOver = true;
                    alert("Fin de juego");
                    break;
                }
                this._tablero.tablero[this._y + f][this._x + c] = this._color;
            }
        }
        for (var f = 0; f < this._tablero._filas; f++) {
            let isRowFull = true;
            for (var c = 0; c < this._tablero._columnas; c++) {
                isRowFull = isRowFull && (!this._tablero.esVacio(c, f));
            }
            if (isRowFull) {
                for (var y = f; y > 1; y--) {
                    for (var c = 0; c < this._tablero._columnas; c++) {
                        this._tablero.tablero[y][c] = this._tablero.tablero[y - 1][c];
                        this._tablero.tablero[8][10] = this._tablero.tablero[7][10];
                    }
                }
                for (var c = 0; c < this._tablero._columnas; c++) {
                    this._tablero.tablero[0][c] = "WHITE";
                }
            }
        }
        this._tablero.dibujarTablero();
    }

    // Comprueba si se produce una colisión de una pieza con el suelo u otra pieza 
    colision = (x, y, pieza) => {
        for (var f = 0; f < pieza.length; f++) {
            for (var c = 0; c < pieza.length; c++) {
                if (!pieza[f][c]) {
                    continue;
                }

                let nuevaX = this._x + c + x;
                let nuevaY = this._y + f + y;

                if (nuevaX < 0 || nuevaX >= this._tablero._columnas || nuevaY >= this._tablero._filas) { //Colisión con bordes
                    return true;
                }
                if (nuevaY < 0) {
                    continue;
                }
                if (!this._tablero.esVacio(nuevaX, nuevaY)) { //Colisión con pieza
                    return true;
                }
            }
        }
        return false;
    }

}