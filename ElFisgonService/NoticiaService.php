<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");


include_once("Conexion.php");
include_once("Noticia.php");

//obtención del metodo empleado por el cliente para hacer la petición
$metodo =  $_SERVER['REQUEST_METHOD'];

if($metodo == "GET"){
    $clasificado = new Clasificado();
    $clasificados = array();
        if($_GET['opc']==0){
            $clasificados =  $clasificado->cosultarClasificado();
        }else if ($_GET['opc'] == 1){
            $clasificados = $clasificado->consultarClasificadoLike($_GET['param']);
        }else {
            $clasificados = $clasificado->consultarClasificadoFecha($_GET['param'], $_GET['param1']);
        }
        // Se envia encabezado con el estado de la solicitud
        header("HTTP/1.1 200 OK");
        //codifico los datos en formato JSON
        echo json_encode($clasificados);
        exit();
}

if($metodo =="POST"){

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $clasificado = new Clasificado();
    $clasificado->titular= $request->titular;
    $clasificado->fecha= $request->fecha;
    $clasificado->autor= $request->autor;
    $clasificado->contenido= $request->contenido;
    $clasificado->registrarClasificado();

    header("HTTP/1.1 200 OK");
    $request->recibido = 'OK';
    echo json_encode($request);
    exit();
}



?>