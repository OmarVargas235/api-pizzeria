require('./config/config');
require('./config/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/');
const expressValidator = require('express-validator');
const hbs = require('hbs');
const fileUpload = require('express-fileupload');
const path = require('path');

// crear el servidor
const app = express();

// Configuracion para guardar imagenes
app.use( fileUpload() );

// configuracion de handlebars
app.set('view engine', 'hbs');

// habilitar bodyparser
app.use( bodyParser.urlencoded({ extend: false }) );
app.use( bodyParser.json() );

// Configuracion de los cors

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200,
}

app.use( cors(corsOptions) );

// validacion de campos
app.use( expressValidator() );

// Rutas de la app
app.use('/', routes() );

// carpeta publica
app.use(express.static( path.resolve(__dirname, '../public/assets/') ));
app.use(express.static( path.resolve(__dirname, '../public/uploads/') ));

// puerto
app.listen(process.env.PORT, () => console.log('corriendo en el puerto', process.env.PORT));