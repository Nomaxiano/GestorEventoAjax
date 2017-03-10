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

$oEntrada = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

//Compruebo si ya existe ese dni antes de hacer update o insert nuevo

$sql = "SELECT * FROM entrada WHERE PERSONA_DNI='".$oEntrada->dni."'";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$num = mysql_num_rows($resultados);

if($num==0){

    $sql = "insert into entrada (EVENTO_ID_EVENTO,PERSONA_DNI,UNIDADES)
            values ('".$oEntrada->idEntrada."','".$oEntrada->dni."','".$oEntrada->numEntradas."')";
    $resultados = @mysql_query($sql, $conexion) or die(mysql_error());

    $mensaje='Alta de entrada realizado';

}

else{
    $sql = "UPDATE entrada SET UNIDADES=UNIDADES+'".$oEntrada->numEntradas."' WHERE PERSONA_DNI='".$oEntrada->dni."'";

    $resultados = @mysql_query($sql, $conexion) or die(mysql_error());

    $mensaje='Actualización de entrada realizada';

}

$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);
?>