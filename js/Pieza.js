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

    constructor(tetromino, color, tablero, tableroNext) {
        // propiedades numeroForma, tetrominioActual, posición x e y en el canvas
        this._tetromino = tetromino;
        this.tetrominoN = 0; 
        this.tetrominioActual = this._tetromino[this.tetrominoN];
        this._color = color;
        this._tablero = tablero;
        this._tableroNext = tableroNext; 
        this._x = 3;
        if (this._color == "grey") { 
            this._y = -3;
        } else {
            this._y = -2;
        }
    }

    // rota la piezaentre las distintas formas del tetrominio
    // de debe controlar que si está muy cerca de las paredes algunas no pueden girar
    rotar = () => {
        this.tetrominoN = (this.tetrominoN + 1) % this._tetromino.length;
        var newTetromino = this._tetromino[this.tetrominoN];
        //Patada, no va bien...
        /*if(this.colision(this._x, this._y, newTetromino)){
            if(this._x > (this._tablero.C/2)){
                this.borrar();
                if(this._color == "red"){
                    this._x += 2;
                }else{
                    this._x--;
                }
            }
            if(this._x < (this._tablero.C/2)){
                this.borrar();
                if(this._color == "red"){
                    this._x += 2;
                }else{
                    this._x++;
                }
            }
        }*/
        if (!this.colision(this._x, this._y, newTetromino)) {
            this.borrar();
            this.tetrominioActual = newTetromino;
            this.dibujar();
            errorAposta();
        }
    }

    // dibuja el color de una pieza
    dibujar = () => {
        for (var r = 0; r < this.tetrominioActual.length; r++) {
            for (var c = 0; c < this.tetrominioActual.length; c++) {
                if (this.tetrominioActual[r][c]) {
                    this._tablero.dibujarCasilla(this._x + c, this._y + r, this._color);
                }
            }
        }
    }

    // dibuja el color de la siguiente pieza en el tablero de la siguiente pieza
    dibujarNext = () => {
        var y = 0;
        if (this._color != "grey") {
            y = 1;
        }
        for (var r = 0; r < this.tetrominioActual.length; r++) {
            for (var c = 0; c < this.tetrominioActual.length; c++) {
                if (this.tetrominioActual[r][c]) {
                    this._tableroNext.dibujarCasilla(c, r + y, this._color);
                }
            }
        }
    }

    // borra una pieza rellenandola de casillas blancas
    borrar = () => {
        for (var r = 0; r < this.tetrominioActual.length; r++) {
            for (var c = 0; c < this.tetrominioActual.length; c++) {
                if (this.tetrominioActual[r][c]) {
                    this._tablero.dibujarCasilla(this._x + c, this._y + r, VACANT);
                }
            }
        }
    }

    // borra el tablero de la siguiente pieza
    borraTableroNext = () => {
        for (var r = 0; r < this._tableroNext.filas; r++) {
            for (var c = 0; c < this._tableroNext.columnas; c++) {
                this._tableroNext.dibujarCasilla(c, r, VACANT);
            }
        }
    }

    // mover abajo la pieza, si queda fijada, deberá obtener una nueva
    moverAbajo = () => {
        var newY = this._y;
        newY++; 
        if (!this.colision(this._x, newY, this.tetrominioActual)) {
            this.borrar();
            this._y++;
            this.dibujar();
        } else {
            this.fijar();
            juego.pieza = juego.nextPieza; 
            juego.nextPieza = juego.piezaAleatoria(); 
        }
    }

    // mover derecha la pieza hasta chocar con la pared
    moverDerecha = () => {
        var newX = this._x;
        newX++;
        if (!this.colision(newX, this._y, this.tetrominioActual)) {
            this.borrar();
            this._x++;
            this.dibujar();
            errorAposta();
        }
    }

    // mover izquierda la pieza hasta chocar con la pared
    moverIzquierda = () => {
        var newX = this._x;
        newX--;
        if (!this.colision(newX, this._y, this.tetrominioActual)) {
            this.borrar();
            this._x--;
            this.dibujar();
            errorAposta();
        }
    }

    // fijar pieza cuando choca con el suelo u otra pieza
    // hay que comprobar si se ha formado una o varias lineas para borrarlas
    fijar = () => {
        for (var r = 0; r < this.tetrominioActual.length; r++) {
            for (var c = 0; c < this.tetrominioActual.length; c++) {
                if (!this.tetrominioActual[r][c]) {
                    continue;
                }
                if (this._y + r < 0) {
                    juego.gameOver = true;
                    alert("Fin de juego");
                    break;
                }
                this._tablero.board[this._y + r][this._x + c] = this._color;
            }
        }
        for (var r = 0; r < this._tablero.F; r++) {
            let isRowFull = true;
            for (var c = 0; c < this._tablero.C; c++) {
                isRowFull = isRowFull && (this._tablero.board[r][c] != VACANT);
            }
            if (isRowFull) {
                for (var y = r; y > 1; y--) {
                    for (var c = 0; c < this._tablero.C; c++) {
                        this._tablero.board[y][c] = this._tablero.board[y - 1][c];
                        this._tablero.board[8][10] = this._tablero.board[7][10];
                    }
                }
                for (var c = 0; c < this._tablero.C; c++) {
                    this._tablero.board[0][c] = VACANT;
                }

                juego.score += 10;
                sco.innerHTML = juego.score; //variable global que hace referenia al div de la puntuación
                switch (true) {
                    case juego.score >= 10 && juego.score < 20:
                        juego.velocidad = 900;
                        break;
                    case juego.score >= 20 && juego.score < 30:
                        juego.velocidad = 800;
                        break;
                    case juego.score >= 30 && juego.score < 40:
                        juego.velocidad = 600;
                        break;
                    case juego.score >= 40 && juego.score < 50:
                        juego.velocidad = 500;
                        break;
                    case juego.score >= 50 && juego.score < 60:
                        juego.velocidad = 400;
                        break;
                    case juego.score >= 60 && juego.score < 70:
                        juego.velocidad = 300;
                        break;
                    case juego.score >= 70 && juego.score < 80:
                        juego.velocidad = 200;
                        break;
                    case juego.score >= 80 && juego.score < 90:
                        juego.velocidad = 100;
                        break;
                    case juego.score >= 90 && juego.score < 100:
                        juego.velocidad = 75;
                        break;
                    case juego.score >= 100:
                        juego.velocidad = 50;
                        break;
                }
            }
        }
        this._tablero.dibujarTablero();
    }

    // Comprueba si se produce una colisión de una pieza con el suelo u otra pieza
    colision = (x, y, pieza) => {
        var nX; //Columna 
        var nY; //Fila
        for (var r = 0; r < pieza.length; r++) {
            for (var c = 0; c < pieza.length; c++) {
                if (pieza[r][c]) { 
                    nX = x + c; 
                    nY = y + r;
                } else {
                    nX = x;
                    nY = y;
                }
                if (!pieza[r][c]) {
                    continue;
                }
                if (nX < 0 || nX >= this._tablero.C || nY >= this._tablero.F) { 
                    return true;
                }
                if (nY < 0) {
                    continue;
                }
                if (this._tablero.board[nY][nX] != VACANT) {
                    return true;
                }
            }
        }
    }
}