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

$oEvento = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "insert into evento (DESCRIPCION,FECHA,ID_LUGAR,DNI_CONTRATANTE,PRECIO)
values ('".$oEvento->descripcion."','".$oEvento->fecha."','".$oEvento->lugar."','".$oEvento->contratante."','".$oEvento->precio."')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Alta de evento realizado';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>