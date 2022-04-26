//Método que llama al controlador para que genere el calculo del 10-Fold Cross-Validation
//Eso retorna el resultado por cada bloque de ejecucion(Correctos y erroneos)
const generarCrossValidator = async () =>{
    try {
		let res = await fetch(
			"?controlador=CrossValidation&accion=validar"
		),
			json = await res.json();

		if (!res.ok) throw { status: res.status, message: res.statusText };
		
        $template = document.getElementById("template-fila").content;
        $fragment = document.createDocumentFragment();
        //Recorre la respuesta y coloca los valores en la vista.
        json.forEach((el,i) =>{
            if(i<10){
                $template.getElementById("bloque").textContent = el.bloque;
                $template.getElementById("buenos").textContent = el.buenos;
                $template.getElementById("malos").textContent = el.malos;
                $template.getElementById("total").textContent = (el.buenos/(el.buenos+el.malos)*100)+"%";
            }else{
                $template.getElementById("bloque").textContent = "Total";
                $template.getElementById("buenos").textContent = el.buenos;
                $template.getElementById("malos").textContent = el.malos;
                $template.getElementById("total").textContent = el.porcentaje+"%";
            }
            let $clone = document.importNode($template, true);
            $fragment.appendChild($clone);     
        });
        document.getElementById("table-content").appendChild($fragment);
	} catch (err) {
		let message = err.statusText || "Error no identificado";
		console.log(`Error ${err.status}: ${message}`);
        document.getElementById("resultado").innerHTML = "Ha ocurrido un error, recargue y trate de nuevo."
	}
}


document.querySelector("button").addEventListener("click",()=> generarCrossValidator())