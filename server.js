const express = require("express");
const cors = require("cors");
const db = require("./coxion"); 

const app = express();

// Configuración de CORS para tus entornos de Live Server
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true
}));

app.use(express.json()); 

// Ruta para guardar Productos (Adaptada 100% a la tabla de tu compañero sin 'stock')
app.post("/productos", (req, res) => {
    console.log("📥 Datos recibidos de Productos:", req.body);
    
    // Extraemos solo lo necesario para la base de datos
    const { id_categoria, nombre, precio, costo, tipo_producto, descripcion } = req.body;
    
    // Consulta SQL exacta con las 6 columnas de destino (id_producto es autoincremental)
    const sql = "INSERT INTO producto (id_categoria, nombre, precio, costo, tipo_producto, descripcion) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [id_categoria, nombre, precio, costo, tipo_producto, descripcion], (error, resultado) => {
        if (error) { 
            console.error("❌ Error de MySQL en Productos:", error.message);
            return res.status(500).json({ mensaje: "Error de MySQL: " + error.message }); 
        }
        res.json({ mensaje: "Producto guardado correctamente" });
    });
});

// Ruta para guardar Sucursales
app.post("/sucursales", (req, res) => {
    console.log("📥 Datos recibidos de Sucursales:", req.body);
    const { nombre, direccion, telefono } = req.body;
    
    const sql = "INSERT INTO sucursal (nombre, direccion, telefono) VALUES (?, ?, ?)";
    
    db.query(sql, [nombre, direccion, telefono], (error, resultado) => {
        if (error) { 
            console.error("❌ Error de MySQL en Sucursales:", error.message);
            return res.status(500).json({ mensaje: "Error de MySQL: " + error.message }); 
        }
        res.json({ mensaje: "¡Sucursal guardada correctamente!" });
    });
});

// El servidor corre en tu máquina local
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo localmente en el puerto 3000");
});