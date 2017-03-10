<?php
/**
 * Created by PhpStorm.
 * User: Isa
 * Date: 8/03/16
 * Time: 19:01
 */


// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

/* Utilizar el fichero dbcreacion.sql incluído en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo.*/

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

$dni=$_REQUEST['dni'];
$respuesta[0]=false;

$numFilas = mysql_num_rows(mysql_query("select * from persona where DNI='".$dni."'",$conexion));

if($numFilas!=0) {
    $respuesta[0] = true;
}


// función de PHP que convierte a formato JSON el array.
echo json_encode($respuesta);

mysql_close($conexion);

?>