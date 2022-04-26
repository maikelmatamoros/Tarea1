<?php
class RecintoOrigenController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function recintoOrigen() {
        $this->view->show("recintoOrigenView.php");//se llama a la vista
    }   

    public function obtenerCaracterisiticasEstudianteRecinto(){
        require 'model/HelperModel.php';
        $helper = new HelperModel();
        $datosEstudianteRecinto=$helper->obtenerCaracterisiticasEstudianteRecinto();
        header('Content-Type: application/json');
        echo json_encode($datosEstudianteRecinto);//convierte el objeto en json
    }
}
?>
