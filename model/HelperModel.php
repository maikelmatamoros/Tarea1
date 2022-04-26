<?php
class HelperModel{
    public $db;   

    // constructor
    public function __construct() {
        require 'libs/SPDO.php';
        $this->db = SPDO::singleton();
    }

    public function obtenerEstiloAprendizaje() {
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select 
                estiloRecinto_recinto as "recinto", 
                estiloRecinto_ca as "ca",
                estiloRecinto_ec as "ec",
                estiloRecinto_ea as "ea",
                estiloRecinto_or as "or",
                estiloRecinto_ca_ec as "ec",
                estiloRecinto_ea_or as "or",
                estiloRecinto_estilo as "estilo"
            from estilo_recinto');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    public function obtenerEstiloAprendizajeValidar() {
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select 
                estiloRecinto_recinto as "recinto", 
                estiloRecinto_ca as "ca",
                estiloRecinto_ec as "ec",
                estiloRecinto_ea as "ea",
                estiloRecinto_or as "or",
                estiloRecinto_ca_ec as "ec",
                estiloRecinto_ea_or as "or",
                estiloRecinto_estilo as "estilo"
            from estilo_recinto LIMIT 200');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }
    
    public function obtenerTipoProfesor() {
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select
                profesor_a as a,
                profesor_b as b,
                profesor_c as c,
                profesor_d as d,
                profesor_e as e,
                profesor_f as f,
                profesor_g as g,
                profesor_h as h,
                profesor_class as class
            from profesor');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public function obtenerClasificacionRedes(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select  
                redes_confiabilidad as confiabilidad,
                redes_numeroEnlaces as numeroEnlaces,
                redes_capacidad as capacidad,
                redes_costo as costo,
                redes_clase as clase
            from redes');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }

    public function obtenerCaracterisiticasEstudianteRecinto(){
        $this->db->exec("set names utf8");
        $consulta = $this->db->prepare('
            select 
                estudiante_sexo as sexo,
                estudiante_recinto as recinto,
                estudiante_promedio as promedio,
                estudiante_estilo as estilo
            from estudiante_recinto');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->CloseCursor();
        return $resultado;
    }


}
?>