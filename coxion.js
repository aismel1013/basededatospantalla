const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    database:'Sistemabellon',
    user: 'root',
    password: 'tejera1013'
}); 



db.connect(function (err) {
    if(err){
        console.log(err);
    }else{
        console.log('conexion exitosa');
    };
});

module.exports = db;