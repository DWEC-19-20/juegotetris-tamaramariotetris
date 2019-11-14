class Tablero {
    constructor(filas, columnas, tamañoCuadrado, ctx) {
         // inicializa el tablero todos los elementos de color WHITE
        this.fila = filas;
        this.columna = columnas;
        this.TC = tamañoCuadrado;
        this.ctx = ctx;
        this.tablero = [];
    }

    // Es vacio si tiene el color WHITE
    esVacio = (x, y) => {}

    // Dibuja un en el canvas del color recibido
    dibujarCasilla = (x, y, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.TC, y * this.TC, this.TC, this.TC);
        this.ctx.strokeStyle = "BLACK";
        this.ctx.strokeRect(x * this.TC, y * this.TC, this.TC, this.TC);
    }

    // dibujar en el canvas según los colores del tablaro
    dibujarTablero = () => {

        for (var i=0;i<this.fila;i++){
            this.tablero[i] = [];
            for (var j=0;j<this.columna;j++){
                this.tablero[i][j] = "WHITE";
            }
        }

        for (var i=0;i<this.fila;i++){
            for (var j=0;j<this.columna;j++){
                this.dibujarCasilla(j,i,this.tablero[i][j]);
            }
        }

    };

    get filas() { return this.filas }

    set filas(fila) { this.filas = fila}

    get columnas() { return this.columnas }

    set columnas(columna) { this.columnas = columna}

    //Devuelve el color del tablero en la casilla indicada
    getCasilla = (f, c) => {

    }

    //Cambiar el color del tablero en la casilla indicada
    setCasilla = (f, c, color) => {

    }

    // Eliminamos las filas que estén completas e incrementamos la puntuación
    eliminarFilasCompletas = () => {}

}