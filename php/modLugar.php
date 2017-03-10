<?php
// Va a devolver una respuesta JSON que no se debe cachear
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "gestion_eventos";
$usuario   = "root";
$password  = "";

$datos=$_REQUEST['datos'];

$oLugar = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "UPDATE lugar SET DESCRIPCION='".$oLugar->descripcion."',DIRECCION='".$oLugar->direccion."',CAPACIDAD='".$oLugar->capacidad."' WHERE ID_LUGAR='".$oLugar->id."'";
//$sql = "update cliente set nombre='".$oCliente->nombre."',apellidos='".$oCliente->apellidos."',direccion='".$oCliente->direccion."',telefono='".$oCliente->telefono."',email='".$oCliente->email."',cod_claset='".$oCliente->clase."' where dni='".$oCliente->dni."'";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Modificacion de lugar realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>