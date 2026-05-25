console.log("¡El archivo index.js de sucursales se ha cargado correctamente!");

document.getElementById("btn-guardar").addEventListener("click", async () => {
    console.log("¡Hiciste clic en el botón Guardar Sucursal!");

   
    const sucursal = {
        id_sucursal: document.getElementById("id_sucursal").value,
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value, 
        telefono: document.getElementById("telefono").value
    };

   
    if (!sucursal.id_sucursal || !sucursal.nombre || !sucursal.direccion) {
        alert("Por favor, llena los campos obligatorios (ID, Nombre y Dirección)");
        return;
    }

    console.log("Datos de la sucursal listos para enviar:", sucursal);

    try {
        const respuesta = await fetch("http://localhost:3000/sucursales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sucursal)
        });

        const data = await respuesta.json();
        console.log("Respuesta recibida del backend:", data);
        alert(data.mensaje);

        if (respuesta.ok) {
           
            document.getElementById("id_sucursal").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("telefono").value = "";
        }

    } catch (error) {
        console.error("Error al intentar hacer el Fetch:", error);
        alert("Error: No se pudo comunicar con tu servidor local. ¿Olvidaste ejecutar 'node server.js'?");
    }
});