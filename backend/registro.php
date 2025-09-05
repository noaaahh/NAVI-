<?php
require 'conexion.php';

$accion = $_POST['accion'] ?? "";

if ($accion == "agregar") {
    $tipo = $mysqli->real_escape_string($_POST['tipo']); // empresa o usuario
    $nombre = $mysqli->real_escape_string($_POST['nombre']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $password = $mysqli->real_escape_string($_POST['password']);

    if ($tipo === "empresa") {
        $sql = "INSERT INTO empresa (nombre, email, contraseña) 
                VALUES ('$nombre', '$email', '$password')";
    } elseif ($tipo === "usuario") {
        $sql = "INSERT INTO usuario (nombre, email, contraseña) 
                VALUES ('$nombre', '$email', '$password')";
    } else {
        die("Tipo de registro no válido.");
    }

    if ($mysqli->query($sql) === TRUE) {
        header("Location: index.php?registro=ok");
        exit();
    } else {
        echo "Error al insertar: " . $mysqli->error;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container mt-5">
    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Registro</h4>
      </div>
      <div class="card-body">
        <form action="" method="POST">
          <input type="hidden" name="accion" value="agregar">

          <!-- Selección de tipo -->
          <div class="mb-3">
            <label for="tipo" class="form-label">Registrarse como:</label>
            <select name="tipo" id="tipo" class="form-control" required>
              <option value="">-- Selecciona una opción --</option>
              <option value="empresa">Empresa</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>

          <!-- Nombre -->
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre:</label>
            <input type="text" name="nombre" id="nombre" class="form-control" required>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" name="email" id="email" class="form-control" required>
          </div>

          <!-- Contraseña -->
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña:</label>
            <input type="password" name="password" id="password" class="form-control" required>
          </div>

          <button type="submit" class="btn btn-success w-100">Registrarse</button>
        </form>
      </div>
    </div>
  </div>
</body>
</html>
