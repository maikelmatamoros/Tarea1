<?php
// configuration
    require 'Config.php';
    $config=Config::singleton();
    $config->set('controllerFolder', 'controller/');
    $config->set('modelFolder', 'model/');
    $config->set('viewFolder', 'view/');
    
    $config->set('dbhost', "163.178.107.10");
    $config->set('dbname', 'DBTarea1ExpertosB64219');
    $config->set('dbuser', 'laboratorios');
    $config->set('dbpass', "KmZpo.2796");

    
    
?>