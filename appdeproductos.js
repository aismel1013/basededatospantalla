console.log("¡El archivo appdeproductos.js se ha cargado correctamente!");

document.getElementById("btn-guardar").addEventListener("click", async () => {
    console.log("¡Hiciste clic en el botón Guardar Producto!");

    const producto = {
        id_categoria: document.getElementById("categoria").value,
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        costo: document.getElementById("costo").value,
        stock: document.getElementById("stock").value,
        tipo_producto: document.getElementById("tipo_producto").value,
        descripcion: document.getElementById("descripcion").value
    };

    if (!producto.id_categoria || !producto.nombre || !producto.precio) {
        alert("Por favor, llena los campos obligatorios (Categoría, Nombre y Precio)");
        return;
    }

    console.log("Datos listos para enviar al servidor:", producto);

    try {
        const respuesta = await fetch("http://26.248.115.226:3000/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        const data = await respuesta.json();
        console.log("Respuesta recibida del backend:", data);
        alert(data.mensaje);

        if (respuesta.ok) {
            document.getElementById("categoria").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("costo").value = "";
            document.getElementById("stock").value = "";
            document.getElementById("tipo_producto").value = "";
            document.getElementById("descripcion").value = "";
        }

    } catch (error) {
        console.error("Error al intentar hacer el Fetch:", error);
        alert("Error de conexión: No se pudo comunicar con el servidor de tu compañero.");
    }
});