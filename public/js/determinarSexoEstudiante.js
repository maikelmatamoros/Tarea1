let datosEstudianteSexo = [];

//Método que extrae de la base de datos los registros relacionados y los almacena en
//en una variable para poder trabajar con sus datos.
const obtenerDatosSexo = async () => {
  try {
    let res = await fetch(
        "?controlador=SexoEstudiante&accion=obtenerDatosSexo"
      ),
      json = await res.json();

    if (!res.ok) throw { status: res.status, message: res.statusText };
    datosEstudianteSexo = json;
  } catch (err) {
    let message = err.statusText || "Error no identificado";
    console.log(`Error ${err.status}: ${message}`);
    document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
  }
};

//Método que calcula cual es el sexo utilizando la formula de distancia eucladiana
const calcularSexo = () => {
  let distanciaAnterior = 100;
  let distancia = 0;
  let recinto = 0;
  let estilo = 0;
  let index = 0;
  //En este punto se realiza el calculo de euclides, se recorre la  variable que almacena
  //el set de datos para poder realizar las formulas
  datosEstudianteSexo.forEach((element, i) => {
    //Se toman los valores que el usuario agregó en el formulario y se utilizan los necesarios
    //para relizar el calculo
    if (element.estilo === "DIVERGENTE") estilo = 1;
    else if (element.estilo === "CONVERGENTE") estilo = 2;
    else if (element.estilo === "ASIMILADOR") estilo = 3;
    else estilo = 4;
    /--------------------------------------------------------/;
    if (element.recinto === "Paraiso") recinto = 1;
    else if (element.recinto === "Turrialba") recinto = 2;
    /--------------------------------------------------------/;

    const diferenciaEstilo =
      estilo - parseInt(document.getElementById("estilo").value);
    const diferenciaPromedio =
      parseFloat(element.promedio) -
      parseInt(document.getElementById("promedio").value);
    const diferenciaRecinto =
      recinto - parseInt(document.getElementById("recinto").value);

    //se calcula la distancia utilizando la formula con la diferencia entre los valores
    //ingresados por el usuario y los valores del set de datos, la cual nos dará la distacia.
    distancia = Math.sqrt(
      Math.pow(diferenciaEstilo, 2) +
        Math.pow(diferenciaPromedio, 2) +
        Math.pow(diferenciaRecinto, 2)
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
  //al tener la opción más similar, se imprime al usuario cuál es su sexo.
  document.getElementById("resultado").innerHTML =
    "Sexo del estudiante: " +
    (datosEstudianteSexo[index].sexo == "M" ? "Masculino" : "Femenino");
};

document.addEventListener("DOMContentLoaded", obtenerDatosSexo);
document
  .querySelector("button")
  .addEventListener("click", () => calcularSexo());
