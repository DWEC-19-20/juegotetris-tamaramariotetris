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
        this.tetromino = tetromino;
        this.color = color;
        this.tablero = tablero;
        this.x=-3;
        this.y=Math.floor(Math.random()*7);
        this.n=0;
        this.activeTetromino=this.tetromino[this.n];
    }

    // rota la piezaentre las distintas formas del tetrominio
    // de debe controlar que si está muy cerca de las paredes algunas no pueden girar
    rotar = () => {

        this.n++;
        if (this.n==this.tetromino.length){
            this.n=0;
        }
        this.borrar();
        this.activeTetromino=this.tetromino[this.n];
        this.dibujar();
        caer();
    }


    // rellena el tetromino de la pieza con su color en el canvas
    rellenar = (color) => {
        
        for (var i=0;i<this.activeTetromino.length;i++){
            for (var j=0;j<this.activeTetromino.length;j++){
                if(this.activeTetromino[i][j]){
                    this.tablero.dibujarCasilla(this.y+i,this.x+j,color);
                }
            }
        }
    }

    // dibuja el color de una pieza
    dibujar = () => {this.rellenar(this.color);}
            
    // borra una pieza rellenandola de casillas blancas
    borrar = () => {this.rellenar("white")}

    // mover abajo la pieza, si queda fijada, deberá obtener una nueva
    moverAbajo = () => {
        this.borrar();
        this.x++;
        this.dibujar();
    }

    // mover derecha la pieza hasta chocar con la pared 
    moverDerecha = () => {
        this.borrar();
        this.y++;
        this.dibujar();
        caer();
    }

    // mover izquierda la pieza hasta chocar con la pared 
    moverIzquierda = () => {
        this.borrar();
        this.y--;
        this.dibujar();
        caer();
    }

    // fijar pieza cuando choca con el suelo u otra pieza
    // hay que comprobar si se ha formado una o varias lineas para borrarlas 
    fijar = () => {}

    // Comprueba si se produce una colisión de una pieza con el suelo u otra pieza 
    colision = (x, y, pieza) => {}

}