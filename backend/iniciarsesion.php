<?php
session_start();
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion']) && $_POST['accion'] === 'iniciar-sesion') {
    $email = $mysqli->real_escape_string($_POST['email']);
    $password = $mysqli->real_escape_string($_POST['password']);

    // Buscar primero en usuario
    $sql = "SELECT usuario_id, nombre, contraseña FROM usuario WHERE email='$email' LIMIT 1";
    $res = $mysqli->query($sql);

    if ($res && $res->num_rows > 0) {
        $row = $res->fetch_assoc();
        if ($password === $row['contraseña']) { // ⚠️ O usar password_verify si usás hash
            $_SESSION['tipo'] = 'usuario';
            $_SESSION['id'] = $row['usuario_id'];
            $_SESSION['nombre'] = $row['nombre'];
            header("Location: index.php");
            exit();
        }
    }

    // Buscar en empresa
    $sql = "SELECT empresa_id, nombre, contraseña FROM empresa WHERE email='$email' LIMIT 1";
    $res = $mysqli->query($sql);

    if ($res && $res->num_rows > 0) {
        $row = $res->fetch_assoc();
        if ($password === $row['contraseña']) {
            $_SESSION['tipo'] = 'empresa';
            $_SESSION['id'] = $row['empresa_id'];
            $_SESSION['nombre'] = $row['nombre'];
            header("Location: index.php");
            exit();
        }
    }

    // Si no se encontró nada
    $error = "Email o contraseña incorrectos";
}
?>
