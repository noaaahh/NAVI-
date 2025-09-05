<?php
require 'conexion.php';

$guarda = isset($_POST['guarda']) ? $_POST['guarda'] : 0;
$empresa_id = isset($_POST['empresa_id']) ? $_POST['empresa_id'] : 0;


if ($guarda == 1) {
    $empresa_id = $mysqli->real_escape_string($_POST['empresa_id']);
    $nombre = $mysqli->real_escape_string($_POST['nombre']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $contraseña = $mysqli->real_escape_string($_POST['contraseña']);

    $sql = "INSERT INTO empresa (nombre, email, contraseña, empresa_id)
    VALUES ('$nombre', '$email', '$contraseña', '$empresa_id')";

    $fila = $resultado->fetch_assoc();
    $resultado = $mysqli->query($sql);
    $sql = "UPDATE empresa SET nombre='$nombre', email='$email', contraseña='$contraseña' WHERE empresa_id=$id";


    // echo $sql;
    $resultado = $mysqli->query($sql);

    if ($resultado > 0) {
        // echo 'REGISTRO MODIFICADO';
        header("location: index.php");
        die();
    } else {
        echo 'ERROR AL MODIFICAR REGISTRO';
    }
}

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Ediciones</title>
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <div class="">
        <h3>Ediciones</h3>
        <div class="formulario2">
            <form action="?" method="POST">
                <div class="form3">
                    <label for="nombre" class="form-label">Nombre:</label>
                    <input type="text" class="f" name="nombre" id="nombre" value="<?php echo $nombre; ?>" autofocus required>
                </div>

                <div class="form3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="text" class="" name="email" id="email" value="<?php echo $email; ?>" required>
                </div>

                <div class="form3">
                    <label for="contraseña" class="form-label">Contraseña:</label>
                    <input type="contraseña" class="" name="contraseña" id="contraseña" value="<?php echo $contraseña; ?>" required>
                </div>
                <input type="hidden" name="accion" value="agregar">
                <input type="hidden" name="empresa_id" value="<?php echo $id; ?>">

                <input type="hidden" id="guarda" name="guarda" value="1" />

                <button class="" type="submit">Enviar</button>

                <br>

            </form>
        </div>
    </div>
</body>

</html>