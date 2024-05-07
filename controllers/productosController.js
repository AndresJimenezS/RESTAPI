const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
const { rawListeners } = require('../models/Clientes');


// Opciones de Multer
const configuracionMulter = {
    limits: { fileSize : 100000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            // el callback se ejecuta como true o false: true cuando se acepta la imagen
            cb(null, true);
        }else{
            cb(new Error('Formato No Válido'), false);
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error});
        } else{
            return next();
        }
    });
}


// agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }

        await producto.save();
        res.json({ mensaje: 'Se agregó un nuevo producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}