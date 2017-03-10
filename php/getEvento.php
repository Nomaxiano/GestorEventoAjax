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

$id_evento=$_REQUEST['id_evento'];

// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los propietarios
$sql = "SELECT * FROM evento WHERE ID_EVENTO='".$id_evento."'";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());
while ($fila = mysql_fetch_assoc($resultados)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
    $datos[] = $fila;
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($datos);

mysql_close($conexion);

?>