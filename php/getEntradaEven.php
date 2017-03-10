<?php
$conexion = new mysqli("localhost", "root", "", "gestion_eventos");
if ($conexion->error) {
    die("Error conectando a la base de datos");
}
$conexion->set_charset("utf8");

$sql = "SELECT evento.DESCRIPCION as evento, SUM(entrada.UNIDADES) as unidades FROM entrada, evento WHERE evento.ID_EVENTO=entrada.EVENTO_ID_EVENTO GROUP BY evento.DESCRIPCION";
$resultado = $conexion->query($sql);
$clientes = [];
$cadena = "";

$cadena .= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
$cadena .= "<asistentes>";
while ($fila = $resultado->fetch_object()) {
    $cadena .= "<asistente>";
    $cadena .= "<nombre>".$fila->evento."</nombre>";
    $cadena .= "<unidades>".$fila->unidades."</unidades>";
    $cadena .= "</asistente>";
}
$cadena .= "</asistentes>";
header("Content-Type: text/xml");
echo $cadena;
?>