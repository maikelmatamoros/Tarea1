<?php
class AdivinarEstiloController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function adivinarEstilo() {
        $this->view->show("AdivinarEstiloView.php");//se llama a la vista
    }

    public function itemsEstilos(){
        require 'model/HelperModel.php';
        $helper = new HelperModel();
        $datosEstilo=$helper->obtenerCaracterisiticasEstudianteRecinto();
        header('Content-Type: application/json');
        echo json_encode($datosEstilo);//convierte el objeto en json
    }   
}
?>
