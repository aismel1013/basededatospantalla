
function seleccionarCuenta(elementoFila, usuario) {
   
    const filas = document.querySelectorAll('.account-row');
    filas.forEach(fila => fila.classList.remove('active'));

  
    elementoFila.classList.add('active');
    
    console.log("Sesión activa cambiada localmente a: " + usuario);
}

function cerrarSesionPerfil(event, usuario) {
    event.stopPropagation(); // Evita cambiar de cuenta al hacer click en el botón interno
    
    const respuesta = confirm("¿Deseas cerrar la sesión asignada a " + usuario + "?");
    if (respuesta) {
        alert("Sesión destruida para: " + usuario);
        // Aquí puedes realizar un fetch post para eliminar la sesión en tu backend de Node/Express
    }
}

function agregarCuenta() {
    alert("Redireccionando a la pantalla de inicio de sesión seguro...");
}