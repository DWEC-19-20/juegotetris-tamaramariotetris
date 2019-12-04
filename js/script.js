const cvs = document.getElementById("tetris");
const cvsNext = document.getElementById("nextPieza"); 
var sco = document.getElementById("score"); 
var juego = new Juego(cvs, cvsNext);
document.addEventListener("keydown", juego.control);
juego.tablero.dibujarTablero();
juego.caer();