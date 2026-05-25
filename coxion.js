const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    database: 'sistema_ferreteria',
    user: 'Aismel',
    password: 'aismel1013'
}); 

db.connect(function (err) {
    if (err) {
        console.log("Error al conectar a la base de datos:", err);
    } else {
        console.log('¡Conexión exitosa a sistema_ferreteria!');
    }
});

module.exports = db;