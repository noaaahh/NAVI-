<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>SAVI - Inicio</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

  <div class="container text-center mt-5">
    <h1 class="mb-4">Bienvenido a SAVI</h1>
    <p class="lead mb-5">Accede al sistema para empresas y usuarios</p>

    <!-- Botones -->
    <div class="d-grid gap-3 col-6 mx-auto">
      <!-- Botón Modal Login -->
      <button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#loginModal">
        Iniciar sesión
      </button>

      <!-- Botón a web.php -->
      <a href="web.php" class="btn btn-success btn-lg">
        Ir a la Web
      </a>

      <!-- Botón a registro.php -->
      <a href="registro.php" class="btn btn-warning btn-lg">
        Registro
      </a>
    </div>
  </div>

  <!-- Modal de Login -->
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Iniciar sesión</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <form action="iniciarsesion.php" method="POST">
            <input type="hidden" name="accion" value="iniciar-sesion">

            <div class="mb-3">
              <label>Email:</label>
              <input type="email" name="email" class="form-control" required>
            </div>

            <div class="mb-3">
              <label>Contraseña:</label>
              <input type="password" name="password" class="form-control" required>
            </div>

            <button type="submit" class="btn btn-success w-100">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
