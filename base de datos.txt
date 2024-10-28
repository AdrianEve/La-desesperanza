create database panaderiaN;
use panaderiaN;
CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

select*from inventario;


CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    producto_comprado VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);

SELECT * FROM clientes;