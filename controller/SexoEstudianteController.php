<?php
class SexoEstudianteController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function sexoEstudiante() {
        $this->view->show("SexoEstudianteView.php");//se llama a la vista  
    }

    public function obtenerDatosSexo(){
        require 'model/HelperModel.php';
        $helper = new HelperModel();
        $datosSexos=$helper->obtenerCaracterisiticasEstudianteRecinto();
        header('Content-Type: application/json');
        echo json_encode($datosSexos);//convierte el objeto en json
    }   
}
?>
