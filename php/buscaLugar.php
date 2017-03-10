<?php
// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "gestion_eventos";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

$descripcion=$_REQUEST['descripcion'];
$respuesta[0]=false;

$numFilas = mysql_num_rows(mysql_query("select * from lugar where DESCRIPCION='".$descripcion."'",$conexion));

if($numFilas!=0) {
    $respuesta[0] = true;
}


// función de PHP que convierte a formato JSON el array.
echo json_encode($respuesta);

mysql_close($conexion);

?>