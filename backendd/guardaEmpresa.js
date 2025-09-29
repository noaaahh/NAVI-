// backend/index.js
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
  password: "", // tu contraseña
  database: "savi" // tu base de datos
});

db.connect(err => {
  if (err) throw err;
  console.log("Conectado a MySQL 🚀");
});

// Endpoint para insertar/actualizar empresa
app.post("/empresa", (req, res) => {
  const { guarda, empresa_id, nombre, email, contraseña } = req.body;

  if (guarda == 1) {
    // Inserta o actualiza según empresa_id
    const sqlInsert = `
      INSERT INTO empresa (empresa_id, nombre, email, contraseña)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), email = VALUES(email), contraseña = VALUES(contraseña)
    `;

    db.query(sqlInsert, [empresa_id, nombre, email, contraseña], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensaje: "Error al guardar" });
      }
      res.json({ mensaje: "Registro guardado con éxito ✅" });
    });
  } else {
    res.status(400).json({ mensaje: "No se especificó acción válida" });
  }
});

// Arrancar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
