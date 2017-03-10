<?php
/**
 * Created by PhpStorm.
 * User: iterrero
 * Date: 8/03/16
 * Time: 14:41
 */

$servidor  = "localhost";
$basedatos = "gestion_eventos";
$usuario   = "root";
$password  = "";

$datos=$_REQUEST['datos'];

$oPersona = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

$sql = "insert into persona (DNI,TIPO,NOMBRE,APELLIDOS,TELEFONO,EMAIL)
values ('".$oPersona->dni."','".$oPersona->tipo."','".$oPersona->nombre."','".$oPersona->apellidos."','".$oPersona->telefono."','".$oPersona->correo."')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Alta de persona realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>