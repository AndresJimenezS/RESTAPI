const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')

const usuariosController = require('../controllers/usuariosController')


module.exports = function(){
    
    // Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente );

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    // Muestra un cliente en específico
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)

    // Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);


    /* PRODUCTOS */

    // Nuevos productos
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);

    //Muestra todos los productos
    router.get('/productos', productosController.mostrarProductos);

    // Muestra producto en específico según ID
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    // Actualizar Productos
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);

    // Eliminar Producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    // Busqueda de productos
    router.post('/productos/busqueda/:query', productosController.buscarProducto);


    /* PEDIDOS */

    // agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);

    // mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    // mostrar pedido según id
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    // actualizar pedido
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    // eliminar pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);


    /* AUTH USUARIOS*/
    router.post('/crear-cuenta',
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );


    return router;
}