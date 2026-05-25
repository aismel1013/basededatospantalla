const express = require("express");
const cors = require("cors");
const db = require("./coxion"); // Importa tu conexión real desde coxion.js

const app = express();

app.use(cors());
app.use(express.json());

// RUTA PARA GUARDAR PRODUCTOS
app.post("/productos", (req, res) => {
    // Esto nos mostrará en la terminal exactamente qué datos están llegando desde el HTML
    console.log("Datos que llegaron del formulario:", req.body);

    const {
        id_categoria,
        nombre,
        precio,
        costo,
        stock,
        tipo_producto,
        descripcion
    } = req.body;

    // Asegúrate de que los nombres de abajo coincidan con tus columnas en MySQL
    const sql = `
        INSERT INTO producto 
        (id_categoria, nombre, precio, costo, stock, tipo_producto, descripcion) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        id_categoria,
        nombre,
        precio,
        costo,
        stock,
        tipo_producto,
        descripcion
    ], (error, resultado) => {
        if (error) {
            // Si MySQL rechaza los datos, aquí nos dirá la razón exacta
            console.error("Error exacto de MySQL:", error.message);
            return res.status(500).json({
                mensaje: "Error interno al guardar en la base de datos"
            });
        }

        // Si todo sale bien, vemos el resultado exitoso en la terminal
        console.log("¡Producto insertado con éxito!", resultado);
        
        res.json({
            mensaje: "Producto guardado correctamente"
        });
    });
});

// Levantar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
