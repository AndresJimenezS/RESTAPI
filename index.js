const express = require('express');
const routes = require('./routes')

// Crear el servidor
const app = express();

// Rutas del app
app.use('/', routes());


// puerto
app.listen(5000);
