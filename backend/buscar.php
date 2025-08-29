<?php
require 'conexion.php';

$edicion_fecha = isset($_GET['edicion_fecha']) ? $mysqli->real_escape_string($_GET['edicion_fecha']) : 0;

// Verificar si se enviaron las fechas
if (isset($_POST['fecha_desde']) && isset($_POST['fecha_hasta'])) {
    $desde = $_POST['fecha_desde'];
    $hasta = $_POST['fecha_hasta'];

    // Asegurarse de que estén en el formato correcto
    if (!empty($desde) && !empty($hasta)) {
        //Traer todas las ediciones cuya fecha esté entre esas dos fechas.
        $sql = "SELECT * FROM edicion WHERE fecha BETWEEN '$desde' AND '$hasta' ORDER BY fecha ASC";
        $resultado = $mysqli->query($sql);

        if ($resultado->num_rows > 0) {
            echo "<h2>Resultados entre $desde y $hasta</h2>";
            while ($edicion_fecha = $resultado->fetch_assoc()) {
                echo "<li>{$edicion_fecha['nombre']} - {$edicion_fecha['fecha']}</li>";
            }
        } else {
            echo "No se encontraron ediciones en ese rango de fechas.";
        }
    }
}

if (!empty($desde) && !empty($hasta)) {
    // Obtiene todas las fechas existentes en la base de datos en ese rango
    $sql = "SELECT fecha FROM edicion WHERE fecha BETWEEN '$desde' AND '$hasta'";
    $resultado = $mysqli->query($sql);

    $fechas_existentes = [];
    while ($row = $resultado->fetch_assoc()) {
        $fechas_existentes[] = $row['fecha'];
    }

    //Generar todas las fechas entre $desde y $hasta
    $inicio = new DateTime($desde);
    $fin = new DateTime($hasta);
    $fechas_faltantes = [];

    while ($inicio <= $fin) {
        $fecha_actual = $inicio->format('Y-m-d');
        if (!in_array($fecha_actual, $fechas_existentes)) {
            $fechas_faltantes[] = $fecha_actual;
        }
        $inicio->modify('+1 day');
    }

    //Mostrar resultados
    echo "<h2>Fechas sin ediciones entre $desde y $hasta:</h2>";
    if (count($fechas_faltantes) > 0) {
        echo "<ul>";
        foreach ($fechas_faltantes as $falta) {
            echo "<li>$falta</li>";
        }
        echo "</ul>";
    } else {
        echo "Todas las fechas tienen ediciones registradas.";
    }
}

?>
<html>

<head>
    <title>Buscar restaurantes</title>
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <form method="POST" action="buscar.php">
        <div class="col-md-6">
            <!--begin::Different Height-->
            <div class="card card-secondary card-outline mb-4">
                <!--begin::Header-->
                <div class="card-header">
                    <div class="card-title">Buscar restaurantes</div>
                </div>
                <!--end::Header-->
                <!--begin::Body-->
                <div class="card-body">
        </div>
</body>
</html>