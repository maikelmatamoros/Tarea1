<?php

class EstiloAprendizajeController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function estiloAprendizaje() {        
        $this->view->show("estiloAprendizajeView.php");     
    } 

    public function itemsEstilos(){
        require 'model/HelperModel.php';
        $helper = new HelperModel();
        $estilosData=$helper->obtenerEstiloAprendizaje();
        header('Content-Type: application/json');
        echo json_encode($estilosData);
    }  
}
?>
