<?php
require 'conexion.php';

$sql = "SELECT usuario_id, nombre, email, contraseña FROM usuario WHERE publicado=1";
$resultado = $mysqli->query($sql);



//*session_start();
// Si no hay usuario logueado, mandamos al login
//if (!isset($_SESSION['usuario_id'])) {
  //  header("Location: iniciarsesion.php");
    //exit();
//*}

// Traemos datos del usuario logueado
//$nombreUsuario = $_SESSION['usuario_nombre'] ?? "Usuario";
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>SAVI - Inicio</title>
    <link rel="stylesheet" href="styles.css"> <!-- tu css -->
</head>
<body>
    <header>
        <h1>Bienvenido a SAVI, <?php echo ($nombre); ?> 👋</h1>
        <nav>
            <ul>
                <li><a href="buscar.php">🔍 Buscar</a></li>
                <li><a href="registroempresa.php">🏢 Registrar Empresa</a></li>
                <li><a href="registropersonal.php">👤 Registrar Usuario</a></li>
                <li><a href="editar.php">✏️ Editar Datos</a></li>
                <li><a href="formadepago.php">💳 Métodos de Pago</a></li>
                <li><a href="cerrarsesion.php">🚪 Cerrar Sesión</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <p>Selecciona una opción del menú para continuar.</p>
    </main>
</body>
</html>
