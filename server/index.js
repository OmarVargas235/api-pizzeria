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
console.log('process.env.FRONTEND_URL', process.env.FRONTEND_URL);

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
	origin: (origin, callback) => {
		console.log("origin", origin);
		// Revisar si la peticion  viene de un servidor que esta en la whiteList
		const exists = whiteList.some(dominio => dominio === origin);
		
		if (exists) {

			callback(null, true);
		
		} else {
			
			callback(new Error('No permitido por CORS'), true);
		}
	}
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