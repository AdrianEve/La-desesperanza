document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario de la forma tradicional

    const nombre = document.getElementById('nombre').value;

    // Hacer la solicitud POST para agregar el producto
    fetch('/agregarProducto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    })
    .then(response => response.json())
    .then(producto => {
        alert(`Producto agregado: ${producto.nombre}`); // Mostrar mensaje de éxito
        document.getElementById('nombre').value = ''; // Limpiar el campo de entrada
        obtenerProductos(); // Actualizar la lista de productos
    })
    .catch(error => console.error('Error al agregar el producto:', error));
});

// Función para obtener y mostrar productos
function obtenerProductos() {
    fetch('/obtenerProductos')
    .then(response => response.json())
    .then(productos => {
        const tbody = document.getElementById('tbodyProductos');
        tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error al obtener productos:', error));
}

// Función para eliminar un producto
function eliminarProducto(id) {
    fetch('/eliminarProducto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => {
        if (response.ok) {
            alert("Producto eliminado correctamente");
            obtenerProductos(); // Actualizar la lista de productos
        } else {
            alert("Error al eliminar el producto.");
        }
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
}
// ... Código existente para agregar y obtener productos ...

document.getElementById('formularioClientes').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario de la forma tradicional

    const nombre = document.getElementById('nombreCliente').value;
    const producto_comprado = document.getElementById('productoComprado').value;
    const precio = document.getElementById('precio').value;

    // Hacer la solicitud POST para agregar el cliente
    fetch('/agregarCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, producto_comprado, precio })
    })
    .then(response => response.json())
    .then(cliente => {
        alert(`Cliente agregado: ${cliente.nombre}`); // Mostrar mensaje de éxito
        document.getElementById('formularioClientes').reset(); // Limpiar el formulario
        obtenerClientes(); // Actualizar la lista de clientes
    })
    .catch(error => console.error('Error al agregar el cliente:', error));
});

// Función para obtener y mostrar clientes
function obtenerClientes() {
    fetch('/obtenerClientes')
    .then(response => response.json())
    .then(clientes => {
        const tbody = document.getElementById('tbodyClientes');
        tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.producto_comprado}</td>
                <td>${cliente.precio}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error al obtener clientes:', error));
}

// Cargar clientes al inicio
window.onload = () => {
    obtenerProductos();
    obtenerClientes(); // Cargar clientes al inicio
};


// Cargar productos al inicio
window.onload = obtenerProductos;
