<?php
ob_start();

require 'conexion.php';
//AGREGAR USUARIO

// Precargamos variables que pueden venir por POST o GET
$accion = isset($_POST['accion']) ? $_POST['accion'] : "";
$_GET["empresa_id"] = isset($_GET["empresa_id"]) ? $_GET["empresa_id"] : "";
$empresa_id = isset($_POST["empresa_id"]) ? $_POST["empresa_id"] : $_GET["empresa_id"];

$sql = "SELECT * FROM empresa WHERE publicado = 1 ORDER BY nombre";

if ($accion == "agregar") {
    $usuario_id = $mysqli->real_escape_string($_POST['usuario_id']);
    $nombre = $mysqli->real_escape_string($_POST['nombre']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $contraseña = $mysqli->real_escape_string($_POST['contraseña']);

    $sql = "INSERT INTO usuario (usuario_id, nombre, email, contraseña)
        VALUES ('$usuario_id', '$nombre', '$email', '$contraseña')";

    if ($mysqli->query($sql) === TRUE) {
        header("Location: index.php?usuario_id=" . $usuario_id);
        exit();
    } else {
        echo "Error al insertar: " . $mysqli->error;
    }
}



if (strlen($empresa_id) && is_numeric($empresa_id)) {
    $sql = "SELECT nombre, email, contraseña, usuario_id FROM usuario where usuario_id='{$usuario_id}'";
    $resultado = $mysqli->query($sql);
    // Obtengo la primer tupla con sus valores por nombre de columna
    $fila = $resultado->fetch_assoc();
}

?>