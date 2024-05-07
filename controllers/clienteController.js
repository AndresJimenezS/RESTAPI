const Clientes = require('../models/Clientes');


// agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        // almacenar registro
        await cliente.save();
        res.json({ mensaje: 'Se agregó un nuevo cliente' });
    } catch (error) {
        // en caso de error, next
        console.log(error);
        next();
    }
}

// muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// muestra cliente según id
exports.mostrarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        // Mostrar el cliente
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.json({mensaje : 'Ese cliente no existe'});
        next();
    }
}


// Actualiza cliente
exports.actualizarCliente = async (req, res, next) => {
    try{
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, req.body, { new: true }) // este callback es true porque trae el nuevo
        res.json(cliente);
    }catch(error){
        console.log(error);
        next();
    }
}


// Elimina cliente según su id
exports.eliminarCliente = async (req, res, next) => {
    try {
        // este es el más recomendado de mongoose
        await Clientes.findOneAndDelete({ _id: req.params.idCliente });
        res.json({ mensaje: 'Eliminado Correctamente' });
    } catch (error) {
        console.log(error);
        next();
    }
}