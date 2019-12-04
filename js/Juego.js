class Juego {

    constructor(cvs, cvsNext) {
        this.ctx = cvs.getContext("2d"); //Canvas
        this.ctxNext = cvsNext.getContext("2d"); //Canvas de next
        this._tablero = new Tablero(20, 10, 40, this.ctx); //20 filas, 10 colmnas y tamaño
        this._tableroNext = new Tablero(4, 4, 40, this.ctxNext); //20 filas, 10 colmnas y tamaño
        this._pieza = this.piezaAleatoria(); //1ª Pieza
        this._nextPieza = this.piezaAleatoria(); //Pieza que viene
        this.gameOver = false; //Aún no ha acabado
        this._comenzarCaer = Date.now(); //Empiza a caer ahora
        this._score = 0; //Puntuación
        this._velocidad = 1000; //velocidad de caida de las piezas
    }

    // devuelve una pieza aleatoria
    piezaAleatoria = () => {
        var pAleatoria = Math.floor(Math.random() * PIEZAS.length);
        return new Pieza(PIEZAS[pAleatoria][0], PIEZAS[pAleatoria][1], this._tablero, this._tableroNext);
        //Devuelve nombre y forma de la pieza random, instancia de clase pieza
    }

    get tablero() {
        return this._tablero;
    }

    get tableroNext() {
        return this._tableroNext;
    }

    get pieza() {
        return this._pieza;
    }
    set nextPieza(nextPieza) {
        this._nextPieza = nextPieza;
    }

    get score() {
        return this._score;
    }
    set score(score) {
        this._score = score;
    }

    get nextPieza() {
        return this._nextPieza;
    }
    set pieza(pieza) {
        this._pieza = pieza;
    }

    get comenzarCaer() {
        return this._comenzarCaer;
    }
    set comenzarCaer(comenzarCaer) {
        this._comenzarCaer = comenzarCaer;
    }

    get velocidad() {
        return this._velocidad;
    }
    set velocidad(velocidad) {
        this._velocidad = velocidad;
    }

    caer = () => {
        this._nextPieza.borraTableroNext(); //Borra y dibuja la pieza en el tablero next
        this._nextPieza.dibujarNext();
        let ahora = Date.now();
        let delta = ahora - this.comenzarCaer;
        if (delta > this.velocidad) {
            this.pieza.moverAbajo();
            this.comenzarCaer = Date.now();
        }
        if (!this.gameOver) {
            requestAnimationFrame(this.caer);
        }
    }

    control = (event) => {
        if (event.keyCode == 37) {
            this.pieza.moverIzquierda();
            this.comenzarCaer = Date.now();
        } else if (event.keyCode == 38) {
            this.pieza.rotar();
            this.comenzarCaer = Date.now();
        } else if (event.keyCode == 39) {
            this.pieza.moverDerecha();
            this.comenzarCaer = Date.now();
        } else if (event.keyCode == 40) {
            this.pieza.moverAbajo();
        }
    }

}