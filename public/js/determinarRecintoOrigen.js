let datosEstudianteRecinto = [];

//Método que extrae de la base de datos los registros relacionados y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerEstudianteRecinto = async () => {
  try {
    let res = await fetch(
        "?controlador=RecintoOrigen&accion=obtenerCaracterisiticasEstudianteRecinto"
      ),
      json = await res.json();

    if (!res.ok) throw { status: res.status, message: res.statusText };
    datosEstudianteRecinto = json;
    console.log(json);
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    console.log(`Error ${err.status}: ${message}`);
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
};

//Método que calcula de cual recinto es el usuario utilizando la formula de distancia eucladiana
const calcularRecinto = () => {
  let distanciaAnterior = 100;
  let distancia = 0;
  let sexo = 0;
  let promedio = 0;
  let estilo = 0;
  let index = 0;

  //En este punto se realiza el calculo de euclides, se recorre la  variable que almacena
  //el set de datos para poder realizar las formulas
  datosEstudianteRecinto.forEach((element, i) => {
    //Se toman los valores que el usuario agregó en el formulario y se utilizan los necesarios
    //para calcular los valores de EC, OR, CA y EA
    if (element.estilo === "DIVERGENTE") estilo = 1;
    else if (element.estilo === "CONVERGENTE") estilo = 2;
    else if (element.estilo === "ASIMILADOR") estilo = 3;
    else estilo = 4;

    /************************************/
    if (element.sexo === "F") sexo = 1;
    else if (element.sexo === "M") sexo = 2;
    promedio = element.promedio;

    const diferenciaEstilo =
      estilo - parseInt(document.getElementById("estilo").value);
    const diferenciaPromedio =
      parseFloat(promedio) -
      parseFloat(document.getElementById("promedio").value);
    const diferenciaSexo = sexo - parseInt(document.getElementById("sexo").value);
	//------------------------------------------------------------------------------------//

	//se calcula la distancia utilizando la formula con la diferencia entre los valores
    //ingresados por el usuario y los valores del set de datos, la cual nos dará la distacia.
    distancia = Math.sqrt(
      Math.pow(diferenciaEstilo, 2) +
        Math.pow(diferenciaPromedio, 2) +
        Math.pow(diferenciaSexo, 2)
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
  //al tener la opción más similar, se imprime al usuario cuál es su recinto de origen.
  document.getElementById("resultado").innerHTML =
    "Recinto de origen: " + datosEstudianteRecinto[index].recinto;
};

document.addEventListener("DOMContentLoaded", obtenerEstudianteRecinto);
document
  .querySelector("button")
  .addEventListener("click", () => calcularRecinto());
