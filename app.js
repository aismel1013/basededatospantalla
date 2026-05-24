

/* URL base del backend (cambia el puerto si es diferente) */
var URL_BACKEND = 'http://localhost:3000';

/* Guardamos el ID del producto que estamos editando */
var idEditando = null;


/* -----------------------------------------------
   Cuando la página termina de cargar, ejecutamos:
   - Cargar las categorías en el select
   - Cargar los productos en la tabla
   ----------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  cargarCategorias();
  cargarProductos();

  /* Conectar los botones con sus funciones */
  document.getElementById('btn-guardar').addEventListener('click', guardar);
  document.getElementById('btn-limpiar').addEventListener('click', limpiar);
  document.getElementById('btn-nuevo').addEventListener('click', limpiar);
  document.getElementById('btn-editar').addEventListener('click', editar);
  document.getElementById('btn-foto').addEventListener('click', function () {
    document.getElementById('foto').click();
  });

  /* Buscar mientras el usuario escribe */
  document.getElementById('busqueda').addEventListener('input', buscar);
});


/* -----------------------------------------------
   CARGAR CATEGORÍAS
   Le pide al backend la lista de categorías
   y las pone en el select del formulario
   ----------------------------------------------- */
function cargarCategorias() {
  fetch(URL_BACKEND + '/categorias')
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (categorias) {
      var select = document.getElementById('id_categoria');

      /* Limpiamos el select y ponemos la opción por defecto */
      select.innerHTML = '<option value="">Seleccionar...</option>';

      /* Agregamos una opción por cada categoría */
      for (var i = 0; i < categorias.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = categorias[i].id_categoria;
        opcion.textContent = categorias[i].nombre;
        select.appendChild(opcion);
      }
    })
    .catch(function (error) {
      console.error('Error al cargar categorías:', error);
    });
}


/* -----------------------------------------------
   CARGAR PRODUCTOS
   Le pide al backend todos los productos
   y los muestra en la tabla
   ----------------------------------------------- */
function cargarProductos() {
  fetch(URL_BACKEND + '/productos')
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (productos) {
      mostrarEnTabla(productos);
    })
    .catch(function (error) {
      console.error('Error al cargar productos:', error);
      document.getElementById('cuerpo-tabla').innerHTML =
        '<tr><td colspan="8" class="sin-datos">Error al cargar datos</td></tr>';
    });
}


/* -----------------------------------------------
   MOSTRAR PRODUCTOS EN LA TABLA
   Recibe una lista de productos y los dibuja
   ----------------------------------------------- */
function mostrarEnTabla(lista) {
  var tbody = document.getElementById('cuerpo-tabla');

  /* Si la lista está vacía mostramos un mensaje */
  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="sin-datos">No hay productos registrados</td></tr>';
    return;
  }

  /* Construimos las filas de la tabla */
  var filas = '';
  for (var i = 0; i < lista.length; i++) {
    var p = lista[i];
    filas += '<tr onclick="seleccionarFila(' + p.id_producto + ')">'
      + '<td>' + p.id_producto + '</td>'
      + '<td>' + p.nombre + '</td>'
      + '<td>' + (p.nombre_categoria || '—') + '</td>'
      + '<td>' + (p.tipo_producto || '—') + '</td>'
      + '<td>$' + Number(p.precio).toLocaleString() + '</td>'
      + '<td>$' + Number(p.costo).toLocaleString() + '</td>'
      + '<td>' + p.stock + '</td>'
      + '<td>' + (p.descripcion || '—') + '</td>'
      + '</tr>';
  }
  tbody.innerHTML = filas;
}


/* -----------------------------------------------
   SELECCIONAR UNA FILA
   Cuando el usuario hace clic en una fila,
   cargamos ese producto en el formulario
   ----------------------------------------------- */
function seleccionarFila(id) {
  /* Quitamos la clase seleccionada de todas las filas */
  var filas = document.querySelectorAll('#cuerpo-tabla tr');
  for (var i = 0; i < filas.length; i++) {
    filas[i].classList.remove('seleccionada');
  }

  /* Le pedimos al backend el producto por su ID */
  fetch(URL_BACKEND + '/productos/' + id)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (producto) {
      /* Guardamos el ID que estamos editando */
      idEditando = producto.id_producto;

      /* Llenamos el formulario con los datos */
      document.getElementById('id_producto').value  = producto.id_producto;
      document.getElementById('id_categoria').value = producto.id_categoria;
      document.getElementById('nombre').value        = producto.nombre;
      document.getElementById('precio').value        = producto.precio;
      document.getElementById('costo').value         = producto.costo;
      document.getElementById('stock').value         = producto.stock;
      document.getElementById('tipo_producto').value = producto.tipo_producto;
      document.getElementById('descripcion').value   = producto.descripcion;

      /* Marcamos la fila como seleccionada */
      var filaActiva = document.querySelector('#cuerpo-tabla tr[onclick="seleccionarFila(' + id + ')"]');
      if (filaActiva) {
        filaActiva.classList.add('seleccionada');
      }
    })
    .catch(function (error) {
      console.error('Error al cargar producto:', error);
    });
}


/* -----------------------------------------------
   GUARDAR
   Si idEditando tiene un valor → actualiza
   Si idEditando es null → crea uno nuevo
   ----------------------------------------------- */
function guardar() {
  /* Leemos los valores del formulario */
  var nombre       = document.getElementById('nombre').value.trim();
  var id_categoria = document.getElementById('id_categoria').value;
  var precio       = document.getElementById('precio').value;
  var costo        = document.getElementById('costo').value;
  var stock        = document.getElementById('stock').value;
  var tipo         = document.getElementById('tipo_producto').value.trim();
  var descripcion  = document.getElementById('descripcion').value.trim();

  /* Validaciones básicas */
  if (nombre === '') {
    alert('El nombre del producto no puede estar vacío.');
    return;
  }
  if (id_categoria === '') {
    alert('Por favor selecciona una categoría.');
    return;
  }

  /* Armamos el objeto con los datos */
  var datos = {
    id_categoria:  id_categoria,
    nombre:        nombre,
    precio:        precio,
    costo:         costo,
    stock:         stock,
    tipo_producto: tipo,
    descripcion:   descripcion
  };

  if (idEditando !== null) {
    /* --- ACTUALIZAR (PUT) --- */
    fetch(URL_BACKEND + '/productos/' + idEditando, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function () {
        alert('Producto actualizado correctamente.');
        limpiar();
        cargarProductos();
      })
      .catch(function (error) {
        console.error('Error al actualizar:', error);
      });

  } else {
    /* --- CREAR NUEVO (POST) --- */
    fetch(URL_BACKEND + '/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function () {
        alert('Producto guardado correctamente.');
        limpiar();
        cargarProductos();
      })
      .catch(function (error) {
        console.error('Error al guardar:', error);
      });
  }
}


/* -----------------------------------------------
   BUSCAR
   Filtra los productos mientras el usuario escribe
   sin volver a llamar al backend
   ----------------------------------------------- */
function buscar() {
  var texto = document.getElementById('busqueda').value.toLowerCase();

  /* Obtenemos todas las filas de la tabla */
  var filas = document.querySelectorAll('#cuerpo-tabla tr');

  for (var i = 0; i < filas.length; i++) {
    var contenido = filas[i].textContent.toLowerCase();
    /* Si el texto está en la fila la mostramos, si no la ocultamos */
    if (contenido.indexOf(texto) !== -1) {
      filas[i].style.display = '';
    } else {
      filas[i].style.display = 'none';
    }
  }
}


/* -----------------------------------------------
   LIMPIAR
   Vacía todos los campos del formulario
   ----------------------------------------------- */
function limpiar() {
  idEditando = null;

  document.getElementById('id_producto').value  = '';
  document.getElementById('id_categoria').value = '';
  document.getElementById('nombre').value        = '';
  document.getElementById('precio').value        = '';
  document.getElementById('costo').value         = '';
  document.getElementById('stock').value         = '';
  document.getElementById('tipo_producto').value = '';
  document.getElementById('descripcion').value   = '';
  document.getElementById('busqueda').value      = '';

  /* Quitamos la selección de la tabla */
  var filas = document.querySelectorAll('#cuerpo-tabla tr');
  for (var i = 0; i < filas.length; i++) {
    filas[i].classList.remove('seleccionada');
    filas[i].style.display = '';
  }
}


/* -----------------------------------------------
   EDITAR
   Solo avisa si no hay ningún producto seleccionado
   ----------------------------------------------- */
function editar() {
  if (idEditando === null) {
    alert('Primero haz clic en un producto de la tabla para seleccionarlo.');
  } else {
    alert('El producto ya está cargado en el formulario. Haz tus cambios y presiona Guardar.');
  }
}