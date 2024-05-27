const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')

const usuariosController = require('../controllers/usuariosController')

// Middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function(){
    
    // Agrega nuevos clientes via POST
    router.post('/clientes', 
        auth,
        clienteController.nuevoCliente 
    );

    // Obtener todos los clientes
    router.get('/clientes', 
        auth,
        clienteController.mostrarClientes
    );

    // Muestra un cliente en específico
    router.get('/clientes/:idCliente', 
        auth,
        clienteController.mostrarCliente)
    ;

    // Actualizar cliente
    router.put('/clientes/:idCliente', 
        auth,
        clienteController.actualizarCliente
    );

    // Eliminar cliente
    router.delete('/clientes/:idCliente', 
        auth,
        clienteController.eliminarCliente
    );


    /* PRODUCTOS */

    // Nuevos productos
    router.post('/productos', 
        auth,
        productosController.subirArchivo, productosController.nuevoProducto
    );

    //Muestra todos los productos
    router.get('/productos', 
        auth,
        productosController.mostrarProductos
    );

    // Muestra producto en específico según ID
    router.get('/productos/:idProducto', 
        auth,
        productosController.mostrarProducto
    );

    // Actualizar Productos
    router.put('/productos/:idProducto', 
        auth,
        productosController.subirArchivo, productosController.actualizarProducto
    );

    // Eliminar Producto
    router.delete('/productos/:idProducto', 
        auth,
        productosController.eliminarProducto
    );

    // Busqueda de productos
    router.post('/productos/busqueda/:query',        
        auth,
        productosController.buscarProducto
    );


    /* PEDIDOS */

    // agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', 
        auth,
        pedidosController.nuevoPedido
    );

    // mostrar todos los pedidos
    router.get('/pedidos', 
        auth,
        pedidosController.mostrarPedidos
    );

    // mostrar pedido según id
    router.get('/pedidos/:idPedido', 
        auth,
        pedidosController.mostrarPedido
    );

    // actualizar pedido
    router.put('/pedidos/:idPedido', 
        auth,
        pedidosController.actualizarPedido
    );

    // eliminar pedido
    router.delete('/pedidos/:idPedido', 
        auth,
        pedidosController.eliminarPedido
    );


    /* AUTH USUARIOS*/
    router.post('/crear-cuenta',
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );


    return router;
}