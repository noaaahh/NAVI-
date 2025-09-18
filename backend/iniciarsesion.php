<?php
session_start();
require 'conexion.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Leer datos enviados desde React (JSON)
$data = json_decode(file_get_contents("php://input"), true);

$email = $mysqli->real_escape_string($data["email"] ?? "");
$password = $mysqli->real_escape_string($data["password"] ?? "");

// ---- Buscar primero en usuario ----
$sql = "SELECT usuario_id, nombre, contraseña FROM usuario WHERE email='$email' LIMIT 1";
$res = $mysqli->query($sql);

if ($res && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    if ($password === $row['contraseña']) {
        $_SESSION['tipo'] = 'usuario';
        $_SESSION['id'] = $row['usuario_id'];
        $_SESSION['nombre'] = $row['nombre'];

        echo json_encode([
            "success" => true,
            "tipo" => "usuario",
            "nombre" => $row['nombre']
        ]);
        exit;
    }
}

// ---- Buscar en empresa ----
$sql = "SELECT empresa_id, nombre, contraseña FROM empresa WHERE email='$email' LIMIT 1";
$res = $mysqli->query($sql);

if ($res && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    if ($password === $row['contraseña']) {
        $_SESSION['tipo'] = 'empresa';
        $_SESSION['id'] = $row['empresa_id'];
        $_SESSION['nombre'] = $row['nombre'];

        echo json_encode([
            "success" => true,
            "tipo" => "empresa",
            "nombre" => $row['nombre']
        ]);
        exit;
    }
}

// ---- Si no se encontró nada ----
echo json_encode([
    "success" => false,
    "message" => "Email o contraseña incorrectos"
]);
