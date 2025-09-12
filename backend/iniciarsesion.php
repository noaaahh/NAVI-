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
    $bienvenido = "Bienvenido!!"

?>

<?php
require 'conexion.php';

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion']) && $_POST['accion'] === 'iniciar-sesion') {
    $email = $mysqli->real_escape_string($_POST['email']);
    $password = $mysqli->real_escape_string($_POST['password']);

    // Buscar primero en empresas
    $sql = "SELECT empresa_id AS id, nombre, email, contraseña FROM empresa WHERE email='$email' LIMIT 1";
    $result = $mysqli->query($sql);

    if ($result && $result->num_rows > 0) {
        $empresa = $result->fetch_assoc();
        if ($password === $empresa['contraseña']) { // Ojo: más adelante conviene usar password_hash
            $_SESSION['tipo'] = 'empresa';
            $_SESSION['id'] = $empresa['id'];
            $_SESSION['nombre'] = $empresa['nombre'];
            header("Location: dashboard_empresa.php");
            exit();
        } else {
            $mensaje = "Contraseña incorrecta para empresa.";
        }
    } else {
        // Buscar en usuarios
        $sql = "SELECT usuario_id AS id, nombre, email, contraseña FROM usuario WHERE email='$email' LIMIT 1";
        $result = $mysqli->query($sql);

        if ($result && $result->num_rows > 0) {
            $usuario = $result->fetch_assoc();
            if ($password === $usuario['contraseña']) { // lo mismo, mejor usar password_hash
                $_SESSION['tipo'] = 'usuario';
                $_SESSION['id'] = $usuario['id'];
                $_SESSION['nombre'] = $usuario['nombre'];
                header("Location: dashboard_usuario.php");
                exit();
            } else {
                $mensaje = "Contraseña incorrecta para usuario.";
            }
        } else {
            $mensaje = "El correo no está registrado.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Iniciar Sesión - SAVI</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container mt-5">
    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Iniciar Sesión</h4>
      </div>
      <div class="card-body">
        <?php if (!empty($mensaje)): ?>
          <div class="alert alert-danger"><?= $mensaje ?></div>
        <?php endif; ?>

        <form action="" method="POST">
          <input type="hidden" name="accion" value="iniciar-sesion">

          <div class="mb-3">
            <label for="email" class="form-label">Correo:</label>
            <input type="email" name="email" id="email" class="form-control" required>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Contraseña:</label>
            <input type="password" name="password" id="password" class="form-control" required>
          </div>

          <button type="submit" class="btn btn-success w-100">Ingresar</button>
        </form>
      </div>
    </div>
  </div>
</body>
</html>

