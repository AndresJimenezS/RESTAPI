const Pedidos = require('../models/Pedidos');


exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body)
    try {
        await pedido.save();
        res.json({mensaje : 'Se agregó un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}


// muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        // populate para traer datos de otra colección
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// muestra un pedido según su 
exports.mostrarPedido = async (req, res, next) => {
    try {
        // POPULATE para traer datos de otra colección
        const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        // mostrar el pedido
        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.json({ message: 'Ese pedido no existe'});
        next();
    }
}

// actualizar pedido
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido }, req.body, {
            new: true
        });

        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}


// eliminar pedido
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id: req.params.idPedido});
        res.json({message: 'Pedido Eliminado Correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
}