// ================================
// CAMBIAR FORMULARIOS
// ================================

function mostrarFormulario(tipo) {

    const productos = document.getElementById("form-productos");
    const sucursales = document.getElementById("form-sucursales");

    const botones = document.querySelectorAll(".sidebar-btn");

    botones.forEach(btn => {
        btn.classList.remove("active");
    });

    if (tipo === "productos") {

        productos.style.display = "block";
        sucursales.style.display = "none";

        botones[0].classList.add("active");

    } else {

        productos.style.display = "none";
        sucursales.style.display = "block";

        botones[1].classList.add("active");

    }

}

// ================================
// GUARDAR PRODUCTO
// ================================

const btnProducto = document.getElementById("btn-guardar-producto");

if (btnProducto) {

    btnProducto.addEventListener("click", async () => {

        const producto = {

            id_producto: document.getElementById("id_producto").value,
            id_categoria: document.getElementById("categoria").value,
            nombre: document.getElementById("nombre").value,
            precio: document.getElementById("precio").value,
            costo: document.getElementById("costo").value,
            stock: document.getElementById("stock").value,
            tipo_producto: document.getElementById("tipo_producto").value,
            descripcion: document.getElementById("descripcion").value

        };

        // VALIDACION

        if (
            !producto.id_producto ||
            !producto.id_categoria ||
            !producto.nombre ||
            !producto.precio ||
            !producto.stock
        ) {

            alert("Completa todos los campos obligatorios");
            return;

        }

        try {

            const respuesta = await fetch("/productos", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(producto)

            });

            const data = await respuesta.json();

            alert(data.mensaje);

            if (respuesta.ok) {
                limpiarProducto();
            }

        } catch (error) {

            console.error(error);

            alert("Error al guardar el producto");

        }

    });

}

// ================================
// LIMPIAR PRODUCTO
// ================================

function limpiarProducto() {

    document.getElementById("id_producto").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("costo").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("tipo_producto").value = "";
    document.getElementById("descripcion").value = "";

}

// ================================
// GUARDAR SUCURSAL
// ================================

const btnSucursal = document.getElementById("btn-guardar-sucursal");

if (btnSucursal) {

    btnSucursal.addEventListener("click", async () => {

        const sucursal = {

            id_sucursal: document.getElementById("id_sucursal").value,
            nombre: document.getElementById("nombre_sucursal").value,
            direccion: document.getElementById("direccion").value,
            telefono: document.getElementById("telefono").value

        };

        // VALIDACION

        if (
            !sucursal.id_sucursal ||
            !sucursal.nombre ||
            !sucursal.direccion
        ) {

            alert("Completa todos los campos obligatorios");
            return;

        }

        try {

            const respuesta = await fetch("/sucursales", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(sucursal)

            });

            const data = await respuesta.json();

            alert(data.mensaje);

            if (respuesta.ok) {
                limpiarSucursal();
            }

        } catch (error) {

            console.error(error);

            alert("Error al guardar la sucursal");

        }

    });

}

// ================================
// LIMPIAR SUCURSAL
// ================================

function limpiarSucursal() {

    document.getElementById("id_sucursal").value = "";
    document.getElementById("nombre_sucursal").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";

}

// ================================
// CERRAR SESION
// ================================

function cerrarSesion() {

    window.location.href = "/logout";

}

console.log("Panel administrativo cargado correctamente");