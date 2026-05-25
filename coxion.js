const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "26.248.115.226", // La IP de Radmin VPN de tu compañero
    user: "root",            // El usuario de MySQL de tu compañero
    password: "Drr03102010090127",            // La contraseña de MySQL de tu compañero (si tiene, ponla aquí)
    database: "sistema_ferreteria"       // El nombre exacto de la base de datos de tu compañero
});

connection.connect((error) => {
    if (error) {
        console.error("❌ Error al conectarse a la base de datos remota:", error.message);
        return;
    }
    console.log("🔌 ¡Conectado con éxito a la base de datos de tu compañero!");
});

module.exports = connection;