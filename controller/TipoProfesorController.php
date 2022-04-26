<?php
class TipoProfesorController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function tipoProfesor() {
        $this->view->show("tipoProfesorView.php");//se llama a la vista  
    }   

    public function obtenerDatosProfesores(){
        require 'model/HelperModel.php';
        $helper = new HelperModel();
        $dataProfesores=$helper->obtenerTipoProfesor();
        header('Content-Type: application/json');
        echo json_encode($dataProfesores);//convierte el objeto en json
    }
}
?>
