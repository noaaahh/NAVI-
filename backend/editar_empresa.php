<?php
ob_start(); // Para evitar errores de "headers already sent"

require 'conexion.php';
//
$id = isset($_GET['empresa_id']) ? (int)$_GET['empresa_id'] : 0;
$id = isset($_POST['id']) ? (int)$_POST['id'] : $id;

$guarda = isset($_POST['guarda']) ? (int)$_POST['guarda'] : 0;

if ($guarda === 1) {
    // Verificar si existe el ID en la base de datos
    $sql = "SELECT * FROM savi WHERE empresa_id = $id";
    $resultado = $mysqli->query($sql);

    if ($resultado && $resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
        $empresa_id = $fila['empresa_id'];

        // Validar y escapar los campos del formulario
        $empresa_id = isset($_POST['empresa_id']) ? $mysqli->real_escape_string($_POST['empresa_id']) : '';
        $nombre = isset($_POST['nombre']) ? $mysqli->real_escape_string($_POST['nombre']) : '';
        $email = isset($_POST['email']) ? $mysqli->real_escape_string($_POST['email']) : '';
        $contraseña = isset($_POST['contraseña']) ? $mysqli->real_escape_string($_POST['contraseña']) : '';

        // Ejecutar el UPDATE
        $sql = "UPDATE savi SET empresa_id='$empresa_id', nombre='$nombre', email='$email', contraseña='$contraseña' WHERE empresa_id=$id";
        $resultado = $mysqli->query($sql);

        // Redirigir después de guardar
        header("Location: index.php?empresa_id=$empresa_id");
        exit;
    }
} else {
    // Al cargar la página, obtener los datos actuales de la edición
    $sql = "SELECT * FROM savi WHERE empresa_id = $id";
    $resultado = $mysqli->query($sql);
    if ($resultado && $resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
    } else {
        // Si no existe el registro, redirigir o mostrar error
        echo "<p>No se encontró la empresa.</p>";
        exit;
    }
}

?>

<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Editar empresa</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <form id="registro" name="registro" method="POST" action="editar.php" autocomplete="off">
            <div class="row">
                <div class="card card-secondary card-outline mb-4">
                    <!--begin::Header-->
                    <div class="card-header">
                        <div class="card-title">Editar edición</div>                  
                    </div>
                        <div class="card-body">
                            <label for="nombre" class="form-control">Nombre: </label>
                            <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" placeholder="Introduce el nombre" value="<?php echo $fila['nombre']; ?>" autofocus required>

                            <input type="hidden" id="id" name="id" value="<?php echo $id; ?>" />
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="email" class="form-control">Email: </label>
                            <input type="text" class="form-control form-control-sm" id="email" name="email" value="<?php echo $fila['email']; ?>" placeholder="Introduce tu email" autofocus required>
                        </div>
                        <br>

                        <div class="form-group">
                            <label for="contraseña" class="form-control">Contraseña: </label>
                            <input type="text" class="form-control form-control-sm" id="contraseña" name="contraseña" value="<?php echo $fila['contraseña']; ?>" placeholder="Introduce la contraseña" required>
                        </div>
                        <br>

                        <input type="hidden" name="guarda" value="1" />

                        <button type="submit" class="btn btn-outline-primary mb-2">Guardar</button>
                    </div>
                </div>
            </div>
    </div>
</body>
</html>