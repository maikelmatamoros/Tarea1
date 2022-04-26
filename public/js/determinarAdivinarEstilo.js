let datosEstiloEstudiante = [];

//Método que extrae de la base de datos los registros relacionados y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerDatosEstilos = async () => {
  try {
    let res = await fetch("?controlador=AdivinarEstilo&accion=itemsEstilos"),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    datosEstiloEstudiante = json;
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    console.log(`Error ${err.status}: ${message}`);
  }
};

//Método que adivina el estilo de aprendizaje utilizando la formula de distancia eucladiana
const calcularEstilo = () => {
  let distanciaAnterior = 100;
  let distancia = 0;
  let recinto = 0;
  let promedio = 0;
  let sexo = 0;
  let index = 0;

  //En este punto se realiza el calculo de euclides, se recorre la  variable que almacena
  //el set de datos para poder realizar las formulas
  datosEstiloEstudiante.forEach((element, i) => {
    if (element.recinto === "Paraiso") recinto = 1;
    else if (element.recinto === "Turrialba") recinto = 2;
    /---------------------------------------------------------------/;
    if (element.sexo === "F") sexo = 1;
    else if (element.sexo === "M") sexo = 2;
    /----------------------------------------------------------------/;
    promedio = element.promedio;

    //Para legibilidad se calculan las diferencias aquí y se almacenan en una variable
    const diferenciaRecinto =
      recinto - parseInt(document.getElementById("recinto").value);
    const diferenciaPromedio =
      parseFloat(promedio) -
      parseFloat(document.getElementById("promedio").value);
    const diferenciaSexo = sexo - parseInt(document.getElementById("sexo").value);

    //se calcula la distancia utilizando la formula con la diferencia entre los valores
    //ingresados por el usuario y los valores del set de datos, la cual nos dará la distacia.
    distancia = Math.sqrt(
      Math.pow(diferenciaRecinto, 2) + Math.pow(diferenciaPromedio, 2) + Math.pow(diferenciaSexo, 2)
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
  //al tener la opción más similar, se imprime al usuario cuál es su estilo de aprendizaje.
  document.getElementById("resultado").innerHTML =
    "Estilo de Aprendizaje: " + datosEstiloEstudiante[index].estilo;
};

document.addEventListener("DOMContentLoaded", obtenerDatosEstilos);

document
  .querySelector("button")
  .addEventListener("click", () => calcularEstilo());
