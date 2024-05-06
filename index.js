const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/restapis', {
    useNewUrlParser: true
});


// Crear el servidor
const app = express();

// habilitar BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Rutas del app
app.use('/', routes());


// puerto
app.listen(5000);
