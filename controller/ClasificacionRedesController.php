<?php
class ClasificacionRedesController {
	public function __construct() {
        $this->view=new View();
    }  // constructor
    
    public function clasificacionRedes() {
        $this->view->show("clasificacionRedesView.php");//se llama a la vista
            
    }

    public function obtenerDatosRedes(){
        require 'model/HelperModel.php';
        $helper = new HelperModel();
        $dataRedes=$helper->obtenerClasificacionRedes();
        header('Content-Type: application/json');
        echo json_encode($dataRedes);//convierte el objeto en json
    }

}
?>
