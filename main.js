// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;


// Apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// Generacion de numero aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random() -0.5});
console.log(numeros);

//Funciones
function contarTiempo(){
  tiempoRegresivoId = setInterval(()=>{
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if(timer === 0) {
      clearInterval (tiempoRegresivoId);
      bloquearTarjetas();
    }
  },1000);
}

function bloquearTarjetas(){
  for (let i = 0; i <= 15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./Imagenes/${numeros[i]}.png" alt="">`;
    tarjetaBloqueada.disabled = true;
  }
}

// Funcion principal
function destapar(id) {

  if(temporizador === false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log (tarjetasDestapadas);

  if (tarjetasDestapadas === 1) {
    // Mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id]
    tarjeta1.innerHTML = `<img src="./Imagenes/${primerResultado}.png" alt="">`;
    //Deshabilitar primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas === 2) {
    // Mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./Imagenes/${segundoResultado}.png" alt="">`;
    //Deshabilitar segundo boton
    tarjeta2.disabled = true;

    // Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      // Poner en 0 el contador de tarjetas destapadas
      tarjetasDestapadas = 0;

      // Aumentar Aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if(aciertos === 8){
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 👍`
        mostrarTiempo.innerHTML = `Bien Guacho Solo tardaste ${timerInicial - timer} segundos`
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🖕`
      }

    } else {
      // mostrar momentaneamente valores y volver a destapar
      setTimeout(()=>{
        tarjeta1.innerHTML = ` `;
        tarjeta2.innerHTML = ` `;
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      },800);




    }
  }

}
