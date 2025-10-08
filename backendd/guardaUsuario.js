// backend/usuarios.js
import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // tu password
  database: "savi" // tu BD
});

db.connect(err => {
  if (err) throw err;
  console.log("Conectado a MySQL 🚀");
});

// Endpoint para insertar/actualizar usuario
app.post("/usuario", (req, res) => {
  const { guarda, usuario_id, nombre, email, contraseña } = req.body;

  if (guarda == 1) {
    // Inserta o actualiza si ya existe
    const sql = `
      INSERT INTO usuarios (usuario_id, nombre, email, contraseña, publicado)
      VALUES (?, ?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), email = VALUES(email), contraseña = VALUES(contraseña)
    `;

    db.query(sql, [usuario_id, nombre, email, contraseña], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensaje: "Error al guardar usuario ❌" });
      }
      res.json({ mensaje: "Usuario guardado/modificado con éxito ✅" });
    });
  } else {
    res.status(400).json({ mensaje: "Acción inválida" });
  }
});

// Servidor ON
app.listen(port, () => {
  console.log(`Servidor usuarios corriendo en http://localhost:${port}`);
});
