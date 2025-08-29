<?php
ob_start();

require 'conexion.php';
//AGREGAR USUARIO

// Precargamos variables que pueden venir por POST o GET
$accion = isset($_POST['accion']) ? $_POST['accion'] : "";
$_GET["usuario_id"] = isset($_GET["usuario_id"]) ? $_GET["usuario_id"] : "";
// si esta seteada(isset) la variable id en POST, entonces la guardo en $id, si no, la tomo de GET
$usuario_id = isset($_POST["usuario_id"]) ? $_POST["usuario_id"] : $_GET["usuario_id"];

$sql = "SELECT * FROM NAVI WHERE publicado = 1 ORDER BY nombre";

if ($accion == "agregar") {
    // Escapear todos los datos de post para evitar hackeo de la base de datos
    $usuario_id = $mysqli->real_escape_string($_POST['usuario_id']);
    $nombre = $mysqli->real_escape_string($_POST['nombre']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $contraseña = $mysqli->real_escape_string($_POST['contraseña']);

    $sql = "INSERT INTO NAVI (usuario_id, nombre, email, contraseña)
        VALUES ('$usuario_id', '$nombre', '$email', '$contraseña')";


    // Si la consulta ejecuto correctamente
    if ($mysqli->query($sql) === TRUE) {
        header("Location: index.php?usuario_id=" . $usuario_id);
        exit();
    } else {
        echo "Error al insertar: " . $mysqli->error;
    }
}



if (strlen($usuario_id) && is_numeric($usuario_id)) {
    $sql = "SELECT nombre, email, contraseña, usuario_id FROM NAVI where usuario_id='{$usuario_id}'";
    $resultado = $mysqli->query($sql);
    // Obtengo la primer tupla con sus valores por nombre de columna
    $fila = $resultado->fetch_assoc();
}

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Agregar USUARIO</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <form action="?" method="POST">
            <div class="row">
                <div class="card card-secondary card-outline mb-4">
                    <!--begin::Header-->
                    <div class="card-header">
                        <div class="card-title">Agregar usuario</div>
                    </div>
                    <!--end::Header-->

                    <!--begin::Body-->
                    <div class="card-body">
                        <input
                            class="form-control"
                            type="text"
                            name="nombre"
                            placeholder="Nombre de usuario"
                            required />
                        <br />

                        <input
                            class="form-control"
                            type="text"
                            name="email"
                            placeholder="Agrega un email"
                            required />
                        <br />

                        <input
                            class="form-control"
                            type="text"
                            name="contraseña"
                            placeholder="Agrega una contraseña"
                            required />
                        <br />

                        <input type="hidden" name="accion" value="agregar" />
                        <input type="hidden" name="usuario_id" value="<?php echo $usuario_id; ?>" />

                        <button type="submit" class="btn btn-outline-primary mb-2">Guardar</button>
                    </div>
                    <!--end::Body-->
                </div>
            </div>
        </form>

    </div>
    </div>
</body>

</html>