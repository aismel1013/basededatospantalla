const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "26.248.115.226", 
    user: "root",            
    password: "Drr03102010090127",            
    database: "ferreteria_bellon"       
});

connection.connect((error) => {
    if (error) {
        console.error(" Error", error.message);
        return;
    }
    console.log(" Conectado con éxito ");
});

module.exports = connection;