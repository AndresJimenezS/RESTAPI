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