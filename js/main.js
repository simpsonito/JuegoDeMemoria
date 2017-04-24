/* Creado por Adib Abud el 22/01/15. */
var colores = ["0F0","00F","FF0","0FF","F00","F0F","F80","08F"];
var bloqueOriginal;
window.addEventListener("load", iniciar, false);
function iniciar(){
    bloqueOriginal = document.getElementById("bloqueCartas").innerHTML;
    //Retro
    var retroFinal = document.getElementById("retroFinal");
    retroFinal.addEventListener("click", quitarRetro, false);
    document.getElementById("botonCerrarRetro").addEventListener("click", quitarRetro, false);
    function quitarRetro(){
        document.getElementById("bloqueCartas").innerHTML = bloqueOriginal;
        retroFinal.style.display = "none";
        crearMemorama();
    }
    retroFinal.style.display = "none";
    crearMemorama();
    //Fin Retro
}
function crearMemorama(){
    var numCartasResueltas = 0;
    var cartaActiva = null;
    var audioBien = document.getElementById('audioRetroBien');
    var audioMal = document.getElementById('audioRetroMal');
    revolverCartas();
    activarCartas();
    function revolverCartas(){
        var lista = document.getElementById("Parte1");
        for (var i = lista.children.length; i >= 0; i--) {
            lista.appendChild(lista.children[Math.random() * i | 0]);
        }
        lista = document.getElementById("Parte2");
        for (var i = lista.children.length; i >= 0; i--) {
            lista.appendChild(lista.children[Math.random() * i | 0]);
        }
    }
    function obtenerCartas(){
        return document.body.querySelectorAll(".cuadrito");
    }
    function activarCartas(){
        Array.prototype.forEach.call(obtenerCartas(), function(elemento) {
            elemento.addEventListener("click", alClicCarta, false);
        });
    }
    function deactivarCartas(){
        Array.prototype.forEach.call(obtenerCartas(), function(elemento) {
            elemento.removeEventListener("click", alClicCarta);
        });
    }
    function alClicCarta(e){
        console.log("click: ", e.currentTarget.parentNode.getAttribute("data-respuesta"));
        invertirCarta(e.currentTarget);
        if(cartaActiva === null){
            cartaActiva = e.currentTarget;
            cartaActiva.removeEventListener("click", alClicCarta);
        } else {
            if(e.currentTarget.parentNode.getAttribute("data-respuesta") === cartaActiva.parentNode.getAttribute("data-respuesta")){
                console.log("son correctas");
                e.currentTarget.removeEventListener("click", alClicCarta);
                cartaActiva.removeEventListener("click", alClicCarta);
                cartaActiva.className = e.currentTarget.className = "cuadritoHecho abierto";
                cartaActiva.style.border = e.currentTarget.style.border = "2px solid #" + colores[numCartasResueltas++];
                cartaActiva = null;
                audioBien.play();
                if(obtenerCartas().length === 0){
                    document.getElementById("retroFinal").style.display = "";
                }
            } else {
                console.log("incorrectas");
                deactivarCartas();
                setTimeout(resetear2cartas, 1500, cartaActiva, e.currentTarget);
                cartaActiva = null;
                audioMal.play();
            }
        }
        function resetear2cartas(carta1, carta2){
            carta1.className = carta2.className = "cuadrito cerrado";
            activarCartas();
        }
        function invertirCarta(carta){
            if(carta.className == "cuadrito abierto"){
                carta.className = "cuadrito cerrado";
            } else if(carta.className == "cuadrito cerrado"){
                carta.className = "cuadrito abierto";
            }
        }

    }
}