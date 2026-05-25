console.log("¡El archivo index.js de sucursales se ha cargado correctamente!");

document.getElementById("btn-guardar").addEventListener("click", async () => {
    console.log("¡Hiciste clic en el botón Guardar Sucursal!");

    const sucursal = {
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value, 
        telefono: document.getElementById("telefono").value
    };

    if (!sucursal.nombre || !sucursal.direccion) {
        alert("Por favor, llena los campos obligatorios (Nombre y Dirección)");
        return;
    }

    console.log("Datos de la sucursal listos para enviar:", sucursal);

    try {
        const respuesta = await fetch("http://26.248.115.226:3000/sucursales", {
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
            document.getElementById("nombre").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("telefono").value = "";
        }

    } catch (error) {
        console.error("Error al intentar hacer el Fetch:", error);
        alert("Error de conexión: No se pudo comunicar con el servidor de tu compañero.");
    }
});