let datosEstilos = [];

//Método que extrae de la base de datos los registros relacionados y los almacena en
//en una variable para poder trabajar con sus datos.
const getDatos = async () => {
  try {
    let res = await fetch("?controlador=EstiloAprendizaje&accion=itemsEstilos"),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    datosEstilos = json;
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    console.log(`Error ${err.status}: ${message}`);
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
};

//Método que calcula el estilo de aprendizaje utilizando la formula de distancia eucladiana
const calcularEstilo = () => {
  let distAnterior = 100;
  let distancia = 0;
  let index = 0;

  //Se toman los valores que el usuario agregó en el formulario y se utilizan los necesarios
  //para calcular los valores de EC, OR, CA y EA
  const ec =
    parseInt(document.getElementById("5").value) +
    parseInt(document.getElementById("9").value) +
    parseInt(document.getElementById("13").value) +
    parseInt(document.getElementById("17").value) +
    parseInt(document.getElementById("25").value) +
    parseInt(document.getElementById("29").value);
  const or =
    parseInt(document.getElementById("2").value) +
    parseInt(document.getElementById("10").value) +
    parseInt(document.getElementById("22").value) +
    parseInt(document.getElementById("26").value) +
    parseInt(document.getElementById("30").value) +
    parseInt(document.getElementById("34").value);
  const ca =
    parseInt(document.getElementById("7").value) +
    parseInt(document.getElementById("11").value) +
    parseInt(document.getElementById("15").value) +
    parseInt(document.getElementById("19").value) +
    parseInt(document.getElementById("31").value) +
    parseInt(document.getElementById("35").value);
  const ea =
    parseInt(document.getElementById("4").value) +
    parseInt(document.getElementById("12").value) +
    parseInt(document.getElementById("24").value) +
    parseInt(document.getElementById("28").value) +
    parseInt(document.getElementById("32").value) +
    parseInt(document.getElementById("36").value);

  //En este punto se realiza el calculo de euclides, se recorre la  variable que almacena
  //el set de datos para poder realizar las formulas
  datosEstilos.forEach((el, i) => {
    //se calcula la distancia utilizando la formula con la diferencia entre los valores
    //ingresados por el usuario y los valores del set de datos, la cual nos dará la distacia.
    distancia = Math.sqrt(
      Math.pow((el.ca - ca), 2) +
        Math.pow((el.ec - ec), 2) +
        Math.pow((el.ea - ea), 2) +
        Math.pow((el.or - or), 2)
    );

    // Con la distancia calculada con la formula, se compara con los resultados anteriores para
    // determinar si se acerca más o es más similar a los valores del usuario, si es el caso,
    // la distancia actual es la nueva y se repite hasta que termine de recorrer los datos,
    // al final la distacia menor será la que represente la más similar al usuario.
    if (distancia < distAnterior) {
      distAnterior = distancia;
      index = i;
    }
  });
  //al tener la opción más similar, se imprime al usuario cuál es su estilo de aprendizaje.
  document.getElementById("resultado").innerHTML =
    "Su estilo de Aprendizaje es: " + datosEstilos[index].estilo;
};

document.addEventListener("DOMContentLoaded", getDatos);

document
  .querySelector("button")
  .addEventListener("click", () => calcularEstilo());
