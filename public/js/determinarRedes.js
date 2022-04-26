let datosRedes = [];

//Método que extrae de la base de datos los registros relacionados y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerDatosRedes = async () => {
  try {
    let res = await fetch(
        "?controlador=ClasificacionRedes&accion=obtenerDatosRedes"
      ),
      json = await res.json();
    if (!res.ok) throw { status: res.status, message: res.statusText };
    datosRedes = json;
    console.log(res);
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    console.log(`Error ${err.status}: ${message}`);
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
};

//Método que calcula el tipo de red utilizando la formula de distancia eucladiana
const calcularRedes = () => {
  let distanciaAnterior = 100;
  let distancia = 0;
  let capacidad = 0;
  let costo = 0;
  let index = 0;

  //En este punto se realiza el calculo de euclides, se recorre la  variable que almacena
  //el set de datos para poder realizar las formulas
  datosRedes.forEach((element, i) => {
    //Se toman los valores que el usuario agregó en el formulario y se utilizan los necesarios
    if (element.capacidad === "Low") {
      capacidad = 1;
    } else if (element.capacidad === "Medium") {
      capacidad = 2;
    } else {
      capacidad = 3;
    }
    /****************************************************************************************************/
    if (element.costo === "Low") {
      costo = 1;
    } else if (element.costo === "Medium") {
      costo = 2;
    } else {
      costo = 3;
    }

    const diferenciaConfiabilidad =
      element.confiabilidad -
      parseInt(document.getElementById("confiabilidad").value);
    const diferenciaEnlaces =
      element.numeroEnlaces - parseInt(document.getElementById("numero").value);
    const diferenciaCapacidad =
      capacidad - parseInt(document.getElementById("capacidad").value);
    const diferenciaCosto =
      costo - parseInt(document.getElementById("costo").value);

    //se calcula la distancia utilizando la formula con la diferencia entre los valores
    //ingresados por el usuario y los valores del set de datos, la cual nos dará la distacia.
    distancia = Math.sqrt(
      Math.pow(diferenciaConfiabilidad, 2) +
        Math.pow(diferenciaEnlaces, 2) +
        Math.pow(diferenciaCapacidad, 2) +
        Math.pow(diferenciaCosto, 2)
    );
    // Con la distancia calculada con la formula, se compara con los resultados anteriores para
    // determinar si se acerca más o es más similar a los valores del usuario, si es el caso,
    // la distancia actual es la nueva y se repite hasta que termine de recorrer los datos,
    // al final la distacia menor será la que represente la más similar al usuario.
    if (distancia < distanciaAnterior) {
      distanciaAnterior = distancia;
      index = i;
    }
  });
  //al tener la opción más similar, se imprime al usuario cuál es el tipo de red.
  document.getElementById("resultado").innerHTML =
    "Clasificacion de red: Clase " + datosRedes[index].clase;
};

document.addEventListener("DOMContentLoaded", obtenerDatosRedes);
document
  .querySelector("button")
  .addEventListener("click", () => calcularRedes());
