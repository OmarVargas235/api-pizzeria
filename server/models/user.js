const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	img: String,
	tokenURL: String,
	tokenAuth: String,
});

// Envia alerta cuando un usuario ya esta registrado
usuarioSchema.post('save', function(error, doc, next) {
	
	if (error.name === 'MongoError' && error.code === 11000) next('Ese correo ya esta registrado');
	else next(error);
});

module.exports = mongoose.model('usuario', usuarioSchema);