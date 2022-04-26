<?php
class CrossValidationController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function crossValidation() {
        $this->view->show("crossValidationView.php");//se llama a la vista
        
    }

    //Método que genera el 10-Fold Cross-Validation y retorna el resultado por bloques en un JSON.
    public function validar(){
        require 'model/HelperModel.php';
        $helper = new HelperModel();
        //Se llama  a la base de datos para obtener los valores del set de datos
        $datosEstilo=$helper->obtenerEstiloAprendizajeValidar();
        //Se divide el total de los datos en 10 sub conjuntos para evaluar
        $arraySetsSplit = array_chunk($datosEstilo, count($datosEstilo)/10);
        
        //se declaran las variables necesarias para el proceso
        $bueno = 0;
        $malo = 0;
        $respuesta = array();
        $totalSubSets =count($arraySetsSplit);

        //Se recorre cada uno de los 10 subSets para la comparación.
        for ($p=0; $p <$totalSubSets ; $p++) { 
            //Sacamos el primero del conjunto para reservarlo y compararlo contra los otros 9
            $actual = array_shift($arraySetsSplit);    
            array_push($respuesta,array("bloque"=>($p+1),"malos"=>0,"buenos"=>0));
            //por cada elemento del subset que se reservo se comienza a comparar con los demás
            for ($i = 0; $i < count($actual); $i++) {
                $distAnterior = 1000;
                $distancia = 0;
                //se recorre los otros 9 subset uno por uno para comparar
                for ($j = 0; $j < count($arraySetsSplit); $j++) {
                    //por cada elemento de cada subset de los 9 que quedaban se realiza el calculo
                    // de euclides
                    for ($k=0; $k < count($arraySetsSplit[$j]); $k++) {
                        $diferenciaCA = intval($arraySetsSplit[$j][$k][1]) - intval($actual[$i][1]);
                        $diferenciaEC = intval($arraySetsSplit[$j][$k][2]) - intval($actual[$i][2]);
                        $diferenciaEA = intval($arraySetsSplit[$j][$k][3]) - intval($actual[$i][3]);
                        $diferenciaOR = intval($arraySetsSplit[$j][$k][4]) - intval($actual[$i][4]);
                         //se calcula la distancia utilizando la formula con la diferencia 
                         //entre los valores del subset extraido y los valores de los subset
                         // de datos, la cual nos dará la distacia.
                        $distancia = sqrt(
                            pow($diferenciaCA, 2) +
                            pow($diferenciaEC, 2) +
                            pow($diferenciaEA, 2) +
                            pow($diferenciaOR, 2)
                        );
                        // Con la distancia calculada con la formula, se compara con los resultados anteriores para
                        // determinar si se acerca más o es más similar a los valores utilizados, si es el caso,
                        // la distancia actual es la nueva y se repite hasta que termine de recorrer los datos,
                        // al final la distacia menor será la que represente la más similar al usuario.
                        if ($distancia < $distAnterior) {
                            $distAnterior = $distancia;
                            $index = $arraySetsSplit[$j][$k][7];
                        } 
                    }
                }
                //Si el resultado es igual al esperado, entonces se aumenta el valor de los
                //correctos, caso contrarios, el de los erroneos.
                if($actual[$i][7] == $index){
                    $bueno+=1;
                    $respuesta[$p]["buenos"]+=1;
                }else{
                    $malo+=1;
                    $respuesta[$p]["malos"]+=1;
                }
            }
            //Se devuelve el subset extraido al conjunto, par ser utilizado en los calculos de
            //los otros subsets
            array_push($arraySetsSplit,$actual);
        }
        //Al final se retorna al front end por medio de un json la respuesta del calculo.
        array_push($respuesta,array("porcentaje"=>number_format(($bueno/222*100),2),"malos"=>$malo,"buenos"=>$bueno));
        header('Content-Type: application/json');
        echo json_encode($respuesta);//convierte el objeto en json
    }   
}
?>