require('./config/config');
require('./config/db');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/');
const path = require('path');
const cors = require('cors');
const expressValidator = require('express-validator');

// crear el servidor
const app = express();

// habilitar bodyparser
app.use( bodyParser.urlencoded({ extend: false }) );
app.use( bodyParser.json() );

// Habilitar cors
app.use( cors() );

// validacion de campos
app.use( expressValidator() );

// Rutas de la app
app.use('/', routes() );

// carpeta publica
app.use(express.static( path.resolve(__dirname, '../public/assets/') ));

// puerto
app.listen(process.env.PORT, () => console.log('corriendo en el puerto', process.env.PORT));