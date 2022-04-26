let datosProfesores = [];

//Método que extrae de la base de datos los registros relacionados y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerDatosProfesores = async () => {
  try {
    let res = await fetch(
        "?controlador=TipoProfesor&accion=obtenerDatosProfesores"
      ),
      json = await res.json();

    if (!res.ok) throw { status: res.status, message: res.statusText };
    datosProfesores = json;
    
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    console.log(`Error ${err.status}: ${message}`);
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
};

//Método que calcula el tipo de profesor utilizando la formula de distancia eucladiana
const calcularProfesor = () => {

  let datos = [0,0,0,0,0,0,0,0];
  let distAnterior = 100;
  let distancia = 0;
  let index = 0;

  //En este punto se realiza el calculo de euclides, se recorre la  variable que almacena
  //el set de datos para poder realizar las formulas
  datosProfesores.forEach((element, i) =>{
    
    datos[0] = element.a;
    datos[3] = element.d;

    if (element.b === "F") datos[1] = 1;
    else if (element.b === "M") datos[1] = 2;
    else datos[1] = 3;

    /**************************************************************************************/

    if (element.c == "B") datos[2] = 1;
    else if (element.c == "I") datos[2] = 2;
    else datos[2] = 3;

    /**************************************************************************************/
    if (element.e == "DM") datos[4] = 1;
    else if (element.e == "ND") datos[4] = 2;
    else datos[4] = 3;

    /**************************************************************************************/
    if (element.f == "L") datos[5] = 1;
    else if (element.f == "A") datos[5] = 2;
    else datos[5] = 3;
  
    /**************************************************************************************/
    if (element.g == "N") datos[6] = 1;
    else if (element.g == "S") datos[6] = 2;
    else datos[6] = 3;

    /**************************************************************************************/
    if (element.h == "N") datos[7] = 1;
    else if (element.h == "S") datos[7] = 2;
    else datos[7] = 3;
    
    //se calcula la distancia utilizando la formula con la diferencia entre los valores
    //ingresados por el usuario y los valores del set de datos, la cual nos dará la distacia.
    distancia = calcularDistancia(datos)
    // Con la distancia calculada con la formula, se compara con los resultados anteriores para
    // determinar si se acerca más o es más similar a los valores del usuario, si es el caso,
    // la distancia actual es la nueva y se repite hasta que termine de recorrer los datos,
    // al final la distacia menor será la que represente la más similar al usuario.
    if (distancia < distAnterior) {
      distAnterior = distancia;
      index = i;
    }
  });
  //al tener la opción más similar, se imprime al usuario cuál es el tipo de profesor.
  document.getElementById("resultado").innerHTML =
        "Clase de Profesor: " + datosProfesores[index].class;
}

//Para legibilidad se creó esta función para separar la parte donde se realiza el calculo
const calcularDistancia = (datos) =>{
  //Se toman los valores que el usuario agregó en el formulario y se utilizan los necesarios
  const diferenciaA = datos[0] - parseInt(document.getElementById("a").value),
    diferenciaB = datos[1] - parseInt(document.getElementById("b").value),
    diferenciaC = datos[2] - parseInt(document.getElementById("c").value),
    diferenciaD = datos[3] - parseInt(document.getElementById("d").value),
    diferenciaE = datos[4] - parseInt(document.getElementById("e").value),
    diferenciaF = datos[5] - parseInt(document.getElementById("f").value),
    diferenciaG = datos[6] - parseInt(document.getElementById("g").value),
    diferenciaH = datos[7] - parseInt(document.getElementById("h").value);

    return Math.sqrt(
      Math.pow(diferenciaA, 2) +
        Math.pow(diferenciaB, 2) +
        Math.pow(diferenciaC, 2) +
        Math.pow(diferenciaD, 2) +
        Math.pow(diferenciaE, 2) +
        Math.pow(diferenciaF, 2) +
        Math.pow(diferenciaG, 2) +
        Math.pow(diferenciaH, 2)
    );
}

document.addEventListener("DOMContentLoaded", obtenerDatosProfesores);
document
  .querySelector("button")
  .addEventListener("click", () => calcularProfesor());