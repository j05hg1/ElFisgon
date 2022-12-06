<?php 
include_once("Conexion.php");

class Clasificado{

    var $oid;
    var $titular;
    var $fecha;
    var $autor;
    var $contenido;
 


    function __construct(){}


    function registrarClasificado(){
        $sql="insert into noticias (titular, fecha, autor, contenido) values ('$this->titular','$this->fecha', '$this->autor','$this->contenido')";
        $conexion = new Conexion();
        if($conexion->executeQuery($sql)){
            $conexion->close();
            return true;
        }
    }

    function cosultarClasificado(){
        $sql="select * from noticias";
        $conexion = new Conexion();
        $res = $conexion->executeQuery($sql);
        $clasificados = array();

        while($u = $res->fetch_object()){
            array_push($clasificados,$u);
        }
        $conexion->close();

        return $clasificados;
    }
    function consultarClasificadoLike($param){
        $sql="select * from noticias where autor = '$param'";
        $conexion = new Conexion();
        $res = $conexion->executeQuery($sql);
        $clasificados = array();
        while($u = $res->fetch_object()){
            array_push($clasificados,$u);
        }
        $conexion->close();

        return $clasificados;
    }
    function consultarClasificadoFecha($param, $param1){
        $sql="select * from noticias where  fecha  BETWEEN '$param' AND '$param1'";
        $conexion = new Conexion();
        $res = $conexion->executeQuery($sql);
        $clasificados = array();
        while($u = $res->fetch_object()){
            array_push($clasificados,$u);
        }
        $conexion->close();

        return $clasificados;
    }



   
}







?>