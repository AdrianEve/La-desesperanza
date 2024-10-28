const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Configuración de la conexión a la base de datos
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',        
    password: 'n0m3l0',    
    database: 'panaderiaN' 
});

// Conectar a la base de datos
con.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Para servir archivos estáticos

// Endpoint para la ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para agregar un producto
app.post('/agregarProducto', (req, res) => {
    const nombre = req.body.nombre;

    con.query('INSERT INTO inventario (nombre) VALUES (?)', [nombre], (err, respuesta) => {
        if (err) {
            console.error("Error al agregar el producto:", err);
            return res.status(500).send("Error al agregar el producto");
        }
        res.send({ id: respuesta.insertId, nombre });
    });
});

// Endpoint para obtener todos los productos
app.get('/obtenerProductos', (req, res) => {
    con.query('SELECT * FROM inventario', (err, respuesta) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).send("Error al obtener productos");
        }
        res.send(respuesta);
    });
});

// Endpoint para eliminar un producto
app.post('/eliminarProducto', (req, res) => {
    const id = req.body.id;

    con.query('DELETE FROM inventario WHERE id = ?', [id], (err, resultado) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            return res.status(500).send("Error al eliminar el producto");
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).send("Producto no encontrado");
        }
        res.send("Producto eliminado correctamente");
    });
});
// Endpoint para agregar un cliente
app.post('/agregarCliente', (req, res) => {
    const { nombre, producto_comprado, precio } = req.body; // Obtener la información del cliente

    con.query('INSERT INTO clientes (nombre, producto_comprado, precio) VALUES (?, ?, ?)', [nombre, producto_comprado, precio], (err) => {
        if (err) {
            console.error("Error al agregar el cliente:", err);
            return res.status(500).send("Error al agregar el cliente");
        }
        return res.send({ nombre, producto_comprado, precio }); // Enviar la información del cliente agregado
    });
});

// Endpoint para obtener todos los clientes
app.get('/obtenerClientes', (req, res) => {
    con.query('SELECT * FROM clientes', (err, respuesta) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            return res.status(500).send("Error al obtener clientes");
        }
        res.json(respuesta); // Enviar la respuesta como JSON
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
