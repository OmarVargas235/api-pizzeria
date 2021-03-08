require('./config/config');
require('./config/db');

const express = require('express');
const bodyParser = require('body-parser');

// crear el servidor
const app = express();

// habilitar bodyparser
app.use( bodyParser.urlencoded({ extend: false }) );
app.use( bodyParser.json() );

// puerto
app.listen(process.env.PORT, () => console.log('corriendo en el puerto', process.env.PORT));